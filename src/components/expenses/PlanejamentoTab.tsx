import { Target, PiggyBank, TrendingUp, Calendar } from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, RadialBarChart, RadialBar } from "recharts";
import { cn } from "@/lib/utils";

const budgetCategories = [
  { name: "Moradia", budget: 2000, spent: 1985, color: "hsl(var(--primary))" },
  { name: "Alimentação", budget: 1200, spent: 850, color: "hsl(var(--success))" },
  { name: "Transporte", budget: 500, spent: 430, color: "hsl(var(--warning))" },
  { name: "Lazer", budget: 400, spent: 335, color: "hsl(var(--info))" },
  { name: "Outros", budget: 300, spent: 150, color: "hsl(var(--destructive))" },
];

const monthComparison = [
  { m: "Jan", plan: 4200, real: 4500 },
  { m: "Fev", plan: 4200, real: 3900 },
  { m: "Mar", plan: 4400, real: 3750 },
  { m: "Abr", plan: 4400, real: 4100 },
  { m: "Mai", plan: 4400, real: 4600 },
  { m: "Jun", plan: 4400, real: 3250 },
];

const savingsGoal = [{ name: "meta", value: 68, fill: "hsl(var(--success))" }];

const PlanejamentoTab = () => {
  const totalBudget = budgetCategories.reduce((s, c) => s + c.budget, 0);
  const totalSpent = budgetCategories.reduce((s, c) => s + c.spent, 0);

  return (
    <div className="space-y-3">
      {/* Savings goal radial */}
      <div className="card-zelo fade-in-up">
        <div className="flex items-center gap-2 mb-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-success/15">
            <PiggyBank size={14} className="text-success" />
          </div>
          <div>
            <p className="text-xs font-semibold">Meta de Economia</p>
            <p className="text-[10px] text-muted-foreground">R$ 1.360 de R$ 2.000</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-24 w-24 flex-shrink-0">
            <ResponsiveContainer width="100%" height="100%">
              <RadialBarChart cx="50%" cy="50%" innerRadius="70%" outerRadius="100%" data={savingsGoal} startAngle={90} endAngle={-270}>
                <RadialBar background={{ fill: "hsl(var(--muted))" }} dataKey="value" cornerRadius={8} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
          <div className="space-y-2 flex-1">
            <div>
              <p className="text-2xl font-extrabold tabular-nums text-success">68%</p>
              <p className="text-[10px] text-muted-foreground">da meta atingida</p>
            </div>
            <span className="inline-flex items-center gap-1 text-[10px] font-medium text-success bg-success/10 px-2 py-0.5 rounded-full">
              <TrendingUp size={10} /> No ritmo certo
            </span>
          </div>
        </div>
      </div>

      {/* Budget by category */}
      <div className="card-zelo fade-in-up stagger-1">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target size={14} className="text-primary" />
            <p className="text-xs font-semibold">Orçamento por Categoria</p>
          </div>
          <span className="text-[10px] text-muted-foreground tabular-nums">
            R$ {totalSpent.toLocaleString("pt-BR")} / R$ {totalBudget.toLocaleString("pt-BR")}
          </span>
        </div>
        <div className="space-y-3">
          {budgetCategories.map((cat) => {
            const pct = Math.round((cat.spent / cat.budget) * 100);
            const over = pct > 90;
            return (
              <div key={cat.name}>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium">{cat.name}</span>
                  <span className={cn("text-[10px] font-semibold tabular-nums", over ? "text-destructive" : "text-muted-foreground")}>
                    {pct}%
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(pct, 100)}%`, background: over ? "hsl(var(--destructive))" : cat.color }}
                  />
                </div>
                <div className="flex justify-between mt-0.5">
                  <span className="text-[9px] text-muted-foreground tabular-nums">R$ {cat.spent.toLocaleString("pt-BR")}</span>
                  <span className="text-[9px] text-muted-foreground tabular-nums">R$ {cat.budget.toLocaleString("pt-BR")}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Planned vs Real comparison */}
      <div className="card-zelo fade-in-up stagger-2">
        <div className="flex items-center gap-2 mb-3">
          <Calendar size={14} className="text-warning" />
          <p className="text-xs font-semibold">Planejado vs Real</p>
        </div>
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthComparison} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
              <XAxis dataKey="m" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: "hsl(0 0% 40%)" }} />
              <Bar dataKey="plan" radius={[3, 3, 0, 0]} fill="hsl(var(--muted))" />
              <Bar dataKey="real" radius={[3, 3, 0, 0]} fill="hsl(var(--primary))" opacity={0.8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="flex items-center gap-4 mt-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-muted" />
            <span className="text-[10px] text-muted-foreground">Planejado</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="h-2 w-2 rounded-full bg-primary" />
            <span className="text-[10px] text-muted-foreground">Real</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanejamentoTab;
