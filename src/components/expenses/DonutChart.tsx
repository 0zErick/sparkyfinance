import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Moradia", value: 1200, color: "hsl(217 91% 60%)", pct: 41.7 },
  { name: "Alimentação", value: 850, color: "hsl(142 71% 45%)", pct: 29.5 },
  { name: "Transporte", value: 400, color: "hsl(38 92% 50%)", pct: 13.9 },
  { name: "Lazer", value: 280, color: "hsl(0 84% 60%)", pct: 9.7 },
  { name: "Outros", value: 150, color: "hsl(239 84% 67%)", pct: 5.2 },
];

const total = data.reduce((sum, d) => sum + d.value, 0);

const DonutChart = () => {
  return (
    <div className="card-zelo fade-in-up">
      <p className="text-xs font-semibold text-muted-foreground mb-1">Distribuição de Gastos</p>
      <p className="text-[10px] text-muted-foreground/70 mb-3">
        Total gasto: <span className="text-foreground font-medium">R$ {total.toLocaleString("pt-BR")}</span> · Veja como seus gastos estão divididos por categoria.
      </p>
      <div className="flex items-center gap-4">
        <div className="h-32 w-32 flex-shrink-0 relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={34}
                outerRadius={56}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {data.map((entry) => (
                  <Cell key={entry.name} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-[9px] text-muted-foreground">Total</span>
            <span className="text-xs font-bold tabular-nums">R$ {(total / 1000).toFixed(1)}k</span>
          </div>
        </div>
        <div className="flex flex-col gap-2.5 flex-1">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full flex-shrink-0" style={{ background: entry.color }} />
              <span className="text-xs text-muted-foreground flex-1">{entry.name}</span>
              <div className="text-right">
                <span className="text-xs font-semibold tabular-nums">
                  R$ {entry.value.toLocaleString("pt-BR")}
                </span>
                <span className="text-[9px] text-muted-foreground ml-1">
                  {entry.pct}%
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
