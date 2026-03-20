import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

const transactions = [
  { id: 1, name: "Aluguel", category: "Moradia", value: -1800, date: "20 Mar", type: "out" },
  { id: 2, name: "Salário", category: "Receita", value: 6500, date: "15 Mar", type: "in" },
  { id: 3, name: "Supermercado Extra", category: "Alimentação", value: -342.5, date: "18 Mar", type: "out" },
  { id: 4, name: "Uber", category: "Transporte", value: -28.9, date: "19 Mar", type: "out" },
  { id: 5, name: "Netflix", category: "Lazer", value: -55.9, date: "17 Mar", type: "out" },
  { id: 6, name: "Freelance", category: "Receita", value: 1200, date: "12 Mar", type: "in" },
  { id: 7, name: "Conta de Luz", category: "Moradia", value: -185, date: "10 Mar", type: "out" },
  { id: 8, name: "iFood", category: "Alimentação", value: -67.8, date: "19 Mar", type: "out" },
];

const ExtratoTab = () => {
  const totalIn = transactions.filter(t => t.type === "in").reduce((s, t) => s + t.value, 0);
  const totalOut = transactions.filter(t => t.type === "out").reduce((s, t) => s + Math.abs(t.value), 0);

  return (
    <div className="space-y-3">
      {/* Summary */}
      <div className="grid grid-cols-2 gap-2">
        <div className="card-zelo fade-in-up stagger-1">
          <div className="flex items-center gap-2 mb-1">
            <ArrowUpRight size={14} className="text-success" />
            <span className="text-[10px] text-muted-foreground font-medium">Entradas</span>
          </div>
          <p className="text-base font-bold tabular-nums text-success">
            R$ {totalIn.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="card-zelo fade-in-up stagger-2">
          <div className="flex items-center gap-2 mb-1">
            <ArrowDownLeft size={14} className="text-destructive" />
            <span className="text-[10px] text-muted-foreground font-medium">Saídas</span>
          </div>
          <p className="text-base font-bold tabular-nums text-destructive">
            R$ {totalOut.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
          </p>
        </div>
      </div>

      {/* Transaction list */}
      <div className="card-zelo fade-in-up stagger-3 !p-0 divide-y divide-border">
        {transactions.map((t) => (
          <div key={t.id} className="flex items-center gap-3 px-4 py-3">
            <div className={cn(
              "flex h-8 w-8 items-center justify-center rounded-xl",
              t.type === "in" ? "bg-success/15" : "bg-destructive/15"
            )}>
              {t.type === "in"
                ? <ArrowUpRight size={14} className="text-success" />
                : <ArrowDownLeft size={14} className="text-destructive" />
              }
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{t.name}</p>
              <p className="text-[10px] text-muted-foreground">{t.category} • {t.date}</p>
            </div>
            <span className={cn(
              "text-sm font-bold tabular-nums",
              t.type === "in" ? "text-success" : "text-foreground"
            )}>
              {t.type === "in" ? "+" : "−"} R$ {Math.abs(t.value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExtratoTab;
