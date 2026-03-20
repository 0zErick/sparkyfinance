import { AlertCircle } from "lucide-react";

const BudgetAlert = () => {
  return (
    <div className="flex items-start gap-3 rounded-2xl border border-destructive/30 bg-destructive/10 p-3 fade-in-up">
      <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-destructive/20">
        <AlertCircle size={14} className="text-destructive" />
      </div>
      <div>
        <p className="text-xs font-semibold text-destructive">Atenção Necessária</p>
        <p className="text-[11px] text-muted-foreground mt-0.5">
          Você está gastando 45% acima do orçamento saudável.
        </p>
      </div>
    </div>
  );
};

export default BudgetAlert;
