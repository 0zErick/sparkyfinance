import { useMemo } from "react";
import { Wallet, CreditCard, Calendar, Target } from "lucide-react";
import { useFinancialData, fmt } from "@/hooks/useFinancialData";

interface WidgetGridProps {
  hideValues?: boolean;
}

/**
 * Grade de mini-widgets estilo Apple Watch (referência IMG_2589):
 * blocos pequenos, cantos arredondados, foco em métricas-chave.
 */
const WidgetGrid = ({ hideValues = false }: WidgetGridProps) => {
  const { data, dailyBudget, daysLeft, available } = useFinancialData();

  const masked = "••••••";

  const stats = useMemo(() => {
    const now = new Date();
    const m = now.getMonth();
    const y = now.getFullYear();
    const monthTxs = data.transactions.filter((t) => {
      const d = new Date(t.date);
      return d.getMonth() === m && d.getFullYear() === y;
    });
    const txCount = monthTxs.length;
    const expenseRatio = data.income > 0 ? (data.expenses / data.income) * 100 : 0;
    return { txCount, expenseRatio };
  }, [data]);

  const healthy = dailyBudget >= 50;

  return (
    <div className="grid grid-cols-2 gap-2 fade-in-up stagger-1">
      {/* Pode gastar hoje */}
      <div className="card-zelo relative overflow-hidden p-3">
        <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-success/10 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-success/12 border border-success/20">
            <Wallet size={13} className="text-success" />
          </div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Hoje
          </span>
        </div>
        <p className={`relative z-10 text-lg font-display font-extrabold tabular-nums leading-none ${healthy ? "text-success" : "text-warning"}`}>
          {hideValues ? masked : fmt(dailyBudget)}
        </p>
        <p className="relative z-10 text-[9px] text-muted-foreground mt-1">
          {daysLeft} dia{daysLeft !== 1 ? "s" : ""} restantes
        </p>
      </div>

      {/* Disponível */}
      <div className="card-zelo relative overflow-hidden p-3">
        <div className="absolute -top-6 -right-6 h-20 w-20 rounded-full bg-primary/8 blur-2xl pointer-events-none" />
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-primary/12 border border-primary/20">
            <Target size={13} className="text-primary" />
          </div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Disponível
          </span>
        </div>
        <p className="relative z-10 text-lg font-display font-extrabold tabular-nums leading-none">
          {hideValues ? masked : fmt(available)}
        </p>
        <p className="relative z-10 text-[9px] text-muted-foreground mt-1">
          após reservas
        </p>
      </div>

      {/* Receitas vs gasto */}
      <div className="card-zelo relative overflow-hidden p-3">
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-destructive/12 border border-destructive/20">
            <CreditCard size={13} className="text-destructive" />
          </div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Gasto / Renda
          </span>
        </div>
        <p className="relative z-10 text-lg font-display font-extrabold tabular-nums leading-none">
          {hideValues ? masked : `${stats.expenseRatio.toFixed(0)}%`}
        </p>
        <div className="relative z-10 mt-2 h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              stats.expenseRatio > 80
                ? "bg-destructive"
                : stats.expenseRatio > 60
                ? "bg-warning"
                : "bg-success"
            }`}
            style={{ width: `${Math.min(100, stats.expenseRatio)}%` }}
          />
        </div>
      </div>

      {/* Movimentos do mês */}
      <div className="card-zelo relative overflow-hidden p-3">
        <div className="relative z-10 flex items-center gap-2 mb-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-info/12 border border-info/20">
            <Calendar size={13} className="text-info" />
          </div>
          <span className="text-[9px] uppercase tracking-wider text-muted-foreground font-semibold">
            Movimentos
          </span>
        </div>
        <p className="relative z-10 text-lg font-display font-extrabold tabular-nums leading-none">
          {stats.txCount}
        </p>
        <p className="relative z-10 text-[9px] text-muted-foreground mt-1">neste mês</p>
      </div>
    </div>
  );
};

export default WidgetGrid;
