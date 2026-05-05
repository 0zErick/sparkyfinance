import { useState } from "react";
import { useFinancialData, fmt } from "@/hooks/useFinancialData";
import { InfoButton, InfoPanel } from "@/components/InfoButton";
import MerchantLogo from "@/components/MerchantLogo";

interface BiggestExpenseCardProps {
  hideValues?: boolean;
}

const BiggestExpenseCard = ({ hideValues = false }: BiggestExpenseCardProps) => {
  const { data } = useFinancialData();
  const [showInfo, setShowInfo] = useState(false);

  const now = new Date();
  const month = now.getMonth();
  const year = now.getFullYear();

  const expensesThisMonth = data.transactions.filter(t => {
    const d = new Date(t.date);
    return t.type === "expense" && d.getMonth() === month && d.getFullYear() === year;
  });

  if (expensesThisMonth.length === 0) return null;

  const biggest = expensesThisMonth.reduce((max, t) => t.amount > max.amount ? t : max, expensesThisMonth[0]);
  const biggestDate = new Date(biggest.date);
  const dateStr = biggestDate.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" });

  return (
    <div className="card-zelo fade-in-up relative overflow-hidden">
      <div className="absolute -top-6 -right-6 h-16 w-16 rounded-full bg-destructive/6 blur-2xl pointer-events-none" />
      <div className="absolute top-2 right-2 z-20">
        <InfoButton expanded={showInfo} onToggle={setShowInfo} />
      </div>
      <div className="flex items-center gap-3 relative z-10 pr-7">
        <MerchantLogo name={`${biggest.description} ${biggest.category ?? ""}`} size={44} rounded="rounded-2xl" />
        <div className="flex-1 min-w-0">
          <p className="text-label">MAIOR DESPESA</p>
          <p className="text-sm font-display font-bold truncate mt-0.5">
            {hideValues ? "••••••" : biggest.description}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[10px] text-muted-foreground">{biggest.category}</span>
            <span className="text-[10px] text-muted-foreground/30">•</span>
            <span className="text-[10px] text-muted-foreground">{dateStr}</span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <p className="text-lg font-display font-extrabold tabular-nums text-destructive">
            {hideValues ? "••••••" : fmt(biggest.amount)}
          </p>
        </div>
      </div>
      <InfoPanel expanded={showInfo} className="relative z-10">
        Identifica a transação de maior valor registrada no mês atual. Útil para entender qual gasto pesou mais no orçamento e planejar ajustes.
      </InfoPanel>
    </div>
  );
};

export default BiggestExpenseCard;
