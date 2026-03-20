import { TrendingDown, TrendingUp, Wallet, CreditCard, ArrowUpRight } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, AreaChart, Area } from "recharts";

const weeklySpend = [
  { d: "S", v: 85 }, { d: "T", v: 120 }, { d: "Q", v: 65 },
  { d: "Q", v: 95 }, { d: "S", v: 150 }, { d: "S", v: 45 }, { d: "D", v: 70 },
];

const monthTrend = [
  { d: "1", v: 4800 }, { d: "5", v: 4500 }, { d: "10", v: 4100 },
  { d: "15", v: 3700 }, { d: "18", v: 3500 }, { d: "20", v: 3247 },
];

const SpendingOverview = () => {
  return (
    <div className="space-y-3">
      {/* Pode gastar hoje - hero card */}
      <div className="card-zelo fade-in-up relative overflow-hidden">
        <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-success/5" />
        <div className="absolute -right-2 -top-2 h-12 w-12 rounded-full bg-success/8" />
        <p className="text-label mb-1">Pode Gastar Hoje</p>
        <div className="flex items-end gap-3">
          <p className="text-4xl font-extrabold tracking-tight tabular-nums text-success">
            R$ 108<span className="text-2xl">,25</span>
          </p>
          <span className="mb-1 inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
            <TrendingUp size={10} /> Saudável
          </span>
        </div>
        <p className="text-[11px] text-muted-foreground mt-2">
          Baseado no seu saldo de <span className="text-foreground font-medium">R$ 3.247,50</span> e <span className="text-foreground font-medium">12 dias</span> restantes
        </p>

        {/* Mini sparkline */}
        <div className="mt-3 h-16">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthTrend} margin={{ top: 2, right: 2, left: 2, bottom: 0 }}>
              <defs>
                <linearGradient id="spendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={0.25} />
                  <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area type="monotone" dataKey="v" stroke="hsl(var(--success))" strokeWidth={2} fill="url(#spendGrad)" dot={false} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[10px] text-muted-foreground mt-1">Evolução do saldo no mês</p>
      </div>

      {/* Quick stats row */}
      <div className="grid grid-cols-2 gap-2">
        <div className="card-zelo fade-in-up stagger-1">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15">
              <Wallet size={14} className="text-primary" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Receita Mensal</span>
          </div>
          <p className="text-lg font-bold tabular-nums">R$ 6.500</p>
          <span className="text-[10px] text-success font-medium flex items-center gap-0.5">
            <ArrowUpRight size={10} /> +8% vs mês passado
          </span>
        </div>
        <div className="card-zelo fade-in-up stagger-2">
          <div className="flex items-center gap-2 mb-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-destructive/15">
              <CreditCard size={14} className="text-destructive" />
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">Gasto Mensal</span>
          </div>
          <p className="text-lg font-bold tabular-nums">R$ 3.252</p>
          <span className="text-[10px] text-destructive font-medium flex items-center gap-0.5">
            <TrendingDown size={10} /> +12% vs mês passado
          </span>
        </div>
      </div>

      {/* Weekly spending bar chart */}
      <div className="card-zelo fade-in-up stagger-3">
        <div className="flex items-center justify-between mb-3">
          <p className="text-xs font-semibold text-muted-foreground">Gastos da Semana</p>
          <span className="text-[10px] text-foreground font-medium tabular-nums">R$ 630,00</span>
        </div>
        <div className="h-20">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklySpend} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <Bar dataKey="v" radius={[4, 4, 0, 0]} fill="hsl(var(--primary))" opacity={0.7} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-between mt-1.5">
          {weeklySpend.map((d, i) => (
            <span key={i} className="text-[9px] text-muted-foreground w-full text-center">{d.d}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpendingOverview;
