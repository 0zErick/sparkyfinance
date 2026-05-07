import { useState, useMemo, useEffect } from "react";
import { Lightbulb, TrendingDown, PiggyBank, Target, Sparkles, Zap, BookOpen, Shield, Heart, X } from "lucide-react";
import { useFinancialData, fmt } from "@/hooks/useFinancialData";

const ALL_TIPS = [
  { id: "rule-503020", icon: Lightbulb, bg: "bg-primary/12", color: "text-primary", title: "Regra 50-30-20", desc: "Divida sua renda: 50% necessidades, 30% desejos, 20% poupança/investimentos." },
  { id: "subs-review", icon: BookOpen, bg: "bg-accent/12", color: "text-accent-foreground", title: "Revise assinaturas", desc: "Cancele serviços que você não usa. Pequenos valores somam muito no ano." },
  { id: "emergency", icon: Shield, bg: "bg-success/12", color: "text-success", title: "Reserva de emergência", desc: "Tenha pelo menos 6 meses de despesas guardados para imprevistos." },
  { id: "impulse", icon: Zap, bg: "bg-warning/12", color: "text-warning", title: "Evite compras por impulso", desc: "Espere 48h antes de comprar algo não essencial. A vontade geralmente passa." },
  { id: "self-invest", icon: Heart, bg: "bg-destructive/12", color: "text-destructive", title: "Invista em você", desc: "Educação financeira é o melhor investimento. Leia, estude e pratique." },
  { id: "auto-save", icon: PiggyBank, bg: "bg-success/12", color: "text-success", title: "Automatize a poupança", desc: "Configure transferências automáticas no dia do pagamento para sua reserva." },
  { id: "goals", icon: Target, bg: "bg-primary/12", color: "text-primary", title: "Defina metas claras", desc: "Metas específicas com prazo motivam mais do que 'quero economizar'." },
  { id: "negotiate", icon: Lightbulb, bg: "bg-warning/12", color: "text-warning", title: "Negocie contas fixas", desc: "Ligue para operadoras e peça descontos. Funciona mais do que você imagina." },
  { id: "meals", icon: Zap, bg: "bg-accent/12", color: "text-accent-foreground", title: "Planeje as refeições", desc: "Cozinhar em casa pode economizar até 60% comparado com delivery." },
  { id: "daily-track", icon: BookOpen, bg: "bg-primary/12", color: "text-primary", title: "Acompanhe diariamente", desc: "Anotar cada gasto cria consciência e reduz desperdícios naturalmente." },
];

const DISMISS_KEY = "sparky-tips-dismissed";
const ROTATE_KEY = "sparky-tips-rotate";
const ROTATE_INTERVAL = 6 * 60 * 60 * 1000; // 6h

const loadDismissed = (): Record<string, number> => {
  try {
    const raw = localStorage.getItem(DISMISS_KEY);
    if (!raw) return {};
    const obj = JSON.parse(raw);
    const now = Date.now();
    // Clean expired (24h)
    return Object.fromEntries(Object.entries(obj).filter(([, ts]) => (ts as number) > now - 24 * 60 * 60 * 1000)) as Record<string, number>;
  } catch { return {}; }
};

const SuggestionsCard = () => {
  const { data, available } = useFinancialData();
  const [dismissed, setDismissed] = useState<Record<string, number>>(loadDismissed);

  const hasFinancialData = data.balance > 0 || data.income > 0 || data.expenses > 0;

  // Pick 1 or 2 tips randomly, rotate every 6h
  const visibleTips = useMemo(() => {
    let rotateData: { ts: number; ids: string[]; count: number } | null = null;
    try {
      const raw = localStorage.getItem(ROTATE_KEY);
      if (raw) rotateData = JSON.parse(raw);
    } catch {}

    const now = Date.now();
    const needsNew = !rotateData || (now - rotateData.ts) > ROTATE_INTERVAL;

    let ids: string[];
    let count: number;

    if (needsNew) {
      count = Math.random() < 0.55 ? 1 : 2;
      const pool = [...ALL_TIPS];
      // Optionally inject contextual tip
      const contextual: typeof ALL_TIPS[number] | null = (() => {
        if (!hasFinancialData) {
          return { id: "start", icon: Sparkles, bg: "bg-primary/12", color: "text-primary", title: "Comece agora!", desc: "Adicione sua primeira receita ou despesa para ativar seus insights." };
        }
        const ratio = data.income > 0 ? data.expenses / data.income : 0;
        if (ratio > 0.8) return { id: "high-spend", icon: TrendingDown, bg: "bg-destructive/12", color: "text-destructive", title: "Atenção aos gastos!", desc: `Você já gastou ${(ratio * 100).toFixed(0)}% da sua receita.` };
        if (available > 0 && ratio < 0.6) return { id: "good-pace", icon: PiggyBank, bg: "bg-success/12", color: "text-success", title: "Ótimo ritmo!", desc: `Você ainda tem ${fmt(available)} disponível este mês.` };
        return null;
      })();

      const shuffled = pool.sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, count);
      if (contextual && Math.random() < 0.6) picked[0] = contextual as any;
      ids = picked.map(t => t.id);
      try { localStorage.setItem(ROTATE_KEY, JSON.stringify({ ts: now, ids, count })); } catch {}
    } else {
      ids = rotateData!.ids;
      count = rotateData!.count;
    }

    const allWithContext = [...ALL_TIPS,
      { id: "start", icon: Sparkles, bg: "bg-primary/12", color: "text-primary", title: "Comece agora!", desc: "Adicione sua primeira receita ou despesa para ativar seus insights." },
      { id: "high-spend", icon: TrendingDown, bg: "bg-destructive/12", color: "text-destructive", title: "Atenção aos gastos!", desc: `Você já gastou ${data.income > 0 ? ((data.expenses / data.income) * 100).toFixed(0) : 0}% da sua receita.` },
      { id: "good-pace", icon: PiggyBank, bg: "bg-success/12", color: "text-success", title: "Ótimo ritmo!", desc: `Você ainda tem ${fmt(available)} disponível este mês.` },
    ];

    return ids
      .map(id => allWithContext.find(t => t.id === id))
      .filter((t): t is NonNullable<typeof t> => !!t && !dismissed[t.id]);
  }, [dismissed, hasFinancialData, data.income, data.expenses, available]);

  // Re-check dismissed on storage change
  useEffect(() => {
    const onStorage = () => setDismissed(loadDismissed());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleDismiss = (id: string) => {
    const next = { ...dismissed, [id]: Date.now() };
    setDismissed(next);
    try { localStorage.setItem(DISMISS_KEY, JSON.stringify(next)); } catch {}
  };

  if (visibleTips.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-label px-1">DICAS INTELIGENTES</p>
      {visibleTips.map((tip, i) => {
        const Icon = tip.icon;
        return (
          <div key={tip.id} className={`card-zelo fade-in-up stagger-${i + 1} flex items-center gap-3 relative`}>
            <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tip.bg} border border-current/5`}>
              <Icon size={18} className={tip.color} />
            </div>
            <div className="flex-1 min-w-0 pr-5">
              <p className="text-sm font-semibold">{tip.title}</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">{tip.desc}</p>
            </div>
            <button
              onClick={() => handleDismiss(tip.id)}
              aria-label="Ocultar dica"
              className="absolute top-2 right-2 rounded-full p-1 text-muted-foreground/60 hover:text-foreground hover:bg-muted/40 active:scale-90 transition-all"
            >
              <X size={12} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default SuggestionsCard;
