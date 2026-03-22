import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { text } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um parser de extratos bancários brasileiro de alta precisão. Analise o texto e extraia transações.

REGRAS RIGOROSAS:
- Retorne SOMENTE via tool call, sem texto adicional
- Identifique data, descrição, valor e se é crédito(C) ou débito(D)
- Sugira uma categoria para cada: Alimentação, Transporte, Moradia, Saúde, Lazer, Educação, Receita, Transferência, Cartão, Outros
- Datas DEVEM estar no formato DD/MM/AAAA. Se o ano não estiver presente, use ${new Date().getFullYear()}
- Valores DEVEM ser números positivos (float). Remova pontos de milhar e use ponto decimal (ex: 1.234,56 → 1234.56)
- type: "in" para crédito/receita/PIX recebido/depósito, "out" para débito/despesa/pagamento/saque
- Se houver ambiguidade no tipo (crédito vs débito), analise o contexto: "recebido", "depósito", "salário" = "in"; "pagamento", "compra", "débito" = "out"
- Ignore linhas de saldo, cabeçalhos, rodapés e informações não-transacionais
- Cada transação DEVE ter todos os campos preenchidos
- confidence: número de 0 a 1 indicando confiança na extração geral`

          },
          { role: "user", content: `Extraia as transações deste extrato:\n\n${text}` }
        ],
        tools: [
          {
            type: "function",
            function: {
              name: "extract_transactions",
              description: "Extract transactions from bank statement text",
              parameters: {
                type: "object",
                properties: {
                  transactions: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        date: { type: "string", description: "DD/MM/AAAA" },
                        description: { type: "string" },
                        category: { type: "string", enum: ["Alimentação", "Transporte", "Moradia", "Saúde", "Lazer", "Educação", "Receita", "Transferência", "Cartão", "Outros"] },
                        value: { type: "number", description: "Valor positivo como float (ex: 1234.56)" },
                        type: { type: "string", enum: ["in", "out"] },
                        confidence: { type: "number", description: "Confiança na leitura desta transação (0-1)" }
                      },
                      required: ["date", "description", "category", "value", "type", "confidence"],
                      additionalProperties: false
                    }
                  }
                },
                required: ["transactions"],
                additionalProperties: false
              }
            }
          }
        ],
        tool_choice: { type: "function", function: { name: "extract_transactions" } },
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    
    // Extract from tool call response
    const toolCall = data.choices?.[0]?.message?.tool_calls?.[0];
    if (toolCall) {
      const parsed = JSON.parse(toolCall.function.arguments);
      return new Response(JSON.stringify(parsed), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fallback: try content
    const content = data.choices?.[0]?.message?.content || "{}";
    const cleaned = content.replace(/```json\n?/g, "").replace(/```/g, "").trim();
    return new Response(cleaned, {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("import error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
