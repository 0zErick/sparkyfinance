import { AlertTriangle } from "lucide-react";

const PaceBar = () => {
  const daysLeft = 12;
  const cashDays = 11;
  const progress = (cashDays / (cashDays + daysLeft)) * 100;

  return (
    <div className="card-zelo fade-in-up">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-semibold text-muted-foreground">Ritmo & Autonomia</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">
          <AlertTriangle size={10} />
          Ritmo Acelerado
        </span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-muted overflow-hidden">
        <div
          className="h-full rounded-full bg-gradient-to-r from-success to-warning transition-all duration-700"
          style={{ width: `${progress}%` }}
        />
      </div>
      <div className="flex justify-between mt-2">
        <span className="text-[10px] text-muted-foreground">{cashDays} dias de caixa</span>
        <span className="text-[10px] text-muted-foreground">Faltam {daysLeft} dias no mês</span>
      </div>
    </div>
  );
};

export default PaceBar;
