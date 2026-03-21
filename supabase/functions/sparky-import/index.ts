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
            content: `Você é um parser de extratos bancários. Analise o texto e extraia transações.

REGRAS:
- Retorne SOMENTE o JSON, sem markdown, sem explicações
- Identifique data, descrição, valor e se é crédito(C) ou débito(D)
- Sugira uma categoria para cada: Alimentação, Transporte, Moradia, Saúde, Lazer, Educação, Receita, Transferência, Cartão, Outros
- Datas devem estar no formato DD/MM/AAAA
- Valores devem ser números positivos
- type: "in" para crédito/receita, "out" para débito/despesa

Formato de resposta:
{"transactions":[{"date":"DD/MM/AAAA","description":"...","category":"...","value":0.00,"type":"in|out"}]}`
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
                        value: { type: "number" },
                        type: { type: "string", enum: ["in", "out"] }
                      },
                      required: ["date", "description", "category", "value", "type"],
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
