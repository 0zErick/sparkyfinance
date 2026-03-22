import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { messages, userContext } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const today = new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    const dayOfMonth = new Date().getDate();
    const daysInMonth = new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0).getDate();

    const contextBlock = userContext ? `
PAINEL FINANCEIRO EM TEMPO REAL:
┌─────────────────────────────────────┐
│ Saldo Real:        R$ ${(userContext.real ?? 0).toFixed(2).padStart(10)}  │
│ A Pagar:           R$ ${(userContext.toPay ?? 0).toFixed(2).padStart(10)}  │
│ Saldo Disponível:  R$ ${(userContext.available ?? 0).toFixed(2).padStart(10)}  │
│ Receita do Mês:    R$ ${(userContext.income ?? 0).toFixed(2).padStart(10)}  │
│ Despesas do Mês:   R$ ${(userContext.expenses ?? 0).toFixed(2).padStart(10)}  │
│ Pode Gastar Hoje:  R$ ${(userContext.dailyBudget ?? 0).toFixed(2).padStart(10)}  │
│ Dias Restantes:    ${String(userContext.daysLeft ?? 0).padStart(13)}  │
└─────────────────────────────────────┘

CARTÕES DE CRÉDITO: ${userContext.cards || "Nenhum cadastrado"}
METAS DE INVESTIMENTO: ${userContext.goals || "Nenhuma definida"}

CONTAS A VENCER: ${userContext.upcomingBills || "Nenhuma pendente"}

MAIORES CATEGORIAS DE GASTO (mês atual):
${userContext.topCategories || "Sem dados"}

ÚLTIMAS TRANSAÇÕES:
${userContext.recentTransactions || "Nenhuma"}

PREFERÊNCIA DE CONVERSA: ${userContext.chatStyle || "Ainda não definida"}` : "\n[Dados financeiros indisponíveis no momento]";

    // Transform messages: if any message has images/files, format for multimodal
    const formattedMessages = messages.map((msg: any) => {
      if (msg.role === "user" && msg.attachments && msg.attachments.length > 0) {
        const content: any[] = [];
        if (msg.content) {
          content.push({ type: "text", text: msg.content });
        }
        for (const att of msg.attachments) {
          if (att.type === "image") {
            content.push({
              type: "image_url",
              image_url: { url: att.data },
            });
          } else if (att.type === "document") {
            content.push({
              type: "text",
              text: `[Documento anexado: ${att.name}]\n\n${att.extractedText || "Conteúdo não disponível para leitura."}`,
            });
          }
        }
        return { role: msg.role, content };
      }
      return { role: msg.role, content: msg.content };
    });

    const systemPrompt = `Você é o Sparky, um analista financeiro de elite e assistente pessoal de alta performance. Você é onisciente sobre as finanças do usuário — tem acesso direto e em tempo real ao banco de dados dele.

Data de hoje: ${today} (dia ${dayOfMonth} de ${daysInMonth}).

${contextBlock}

═══════════════════════════════════════
DIRETRIZES DE INTELIGÊNCIA E COMPORTAMENTO
═══════════════════════════════════════

1. PROATIVIDADE ABSOLUTA:
   - Nunca espere o usuário perguntar "quanto eu tenho?". Ao ser acionado, se houver conta vencendo hoje, saldo criticamente baixo, ou gasto anormal, sua PRIMEIRA frase deve ser um alerta ou sugestão.
   - Se o saldo disponível for negativo ou próximo de zero, alerte IMEDIATAMENTE.
   - Se há contas a pagar e o saldo é insuficiente, avise com urgência.

2. ANÁLISE DE FLUXO DE CAIXA:
   - Interprete tendências, não apenas leia números.
   - Compare gastos por categoria com períodos anteriores quando possível.
   - Se notar aumento em alguma categoria, mencione de forma inteligente (ex: "Notei aumento nos gastos com Lazer esta semana").
   - Calcule percentuais de comprometimento de renda automaticamente.

3. MEMÓRIA DE CONTEXTO:
   - Use o histórico de transações para prever gastos futuros.
   - Lembre o usuário de contas próximas do vencimento.
   - Reconheça padrões de gastos recorrentes.

4. RESPOSTAS ESTRUTURADAS E ÁGEIS:
   - Use negrito para destacar valores monetários e datas importantes.
   - Linguagem técnica, porém amigável e direta (estilo Apple).
   - Sem introduções longas. Vá direto ao ponto.
   - Máximo 3-4 parágrafos por resposta, a menos que o usuário peça detalhes.

5. FORMATO DE RESPOSTA:
   - Quando o usuário iniciar uma conversa, comece confirmando ciência do estado atual.
   - Exemplo: "Vi que você pagou a conta X. Saldo disponível agora: R$ 1.200,00. Como posso ajudar?"
   - Ao final de análises financeiras, ofereça 1-2 sugestões de ação rápida.

═══════════════════════════════════════
REGRAS DE FORMATAÇÃO
═══════════════════════════════════════
- NUNCA use asteriscos (*) ou markdown pesado (**, ##, etc.).
- Escreva de forma natural e limpa.
- Use emojis com moderação quando apropriado 🐱
- Para valores monetários, use o formato: R$ X.XXX,XX

═══════════════════════════════════════
APRENDIZADO DO USUÁRIO
═══════════════════════════════════════
- Adapte seu tom conforme o estilo do usuário (formal, informal, direto, detalhista).
- Se ele escreve curto, seja conciso. Se gosta de detalhes, aprofunde.
- Observe padrões nos gastos para sugestões personalizadas.

═══════════════════════════════════════
SOBRE VOCÊ
═══════════════════════════════════════
- Seu nome é Sparky ("Faísca" em inglês), homenagem ao gatinho Faísca, de quem seu criador tem grande carinho.
- O Sparky Finance nasceu em 19 de março de 2026, criado por Erick Milhomens (Erick Developer).

═══════════════════════════════════════
CAPACIDADES
═══════════════════════════════════════
- Análise financeira completa com dados reais do usuário
- Dúvidas sobre finanças pessoais, investimentos, orçamento
- Análise de imagens (extratos, notas fiscais, comprovantes)
- Leitura de documentos (PDF, planilhas, textos)
- Qualquer dúvida geral

═══════════════════════════════════════
RESTRIÇÕES
═══════════════════════════════════════
- Seja aberto a qualquer assunto, exceto conteúdo 100% explícito/sexual.
- Nunca peça senhas ou dados sensíveis.
- Nunca invente dados financeiros — use APENAS os dados reais fornecidos acima.

Responda sempre em português brasileiro.`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...formattedMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const status = response.status;
      if (status === 429) {
        return new Response(JSON.stringify({ error: "Muitas requisições. Tente novamente em instantes." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (status === 402) {
        return new Response(JSON.stringify({ error: "Créditos insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", status, t);
      return new Response(JSON.stringify({ error: "Erro no gateway AI" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Erro desconhecido" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
