import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

const data = [
  { name: "Moradia", value: 1200, color: "#3B82F6" },
  { name: "Alimentação", value: 850, color: "#22C55E" },
  { name: "Transporte", value: 400, color: "#F59E0B" },
  { name: "Lazer", value: 280, color: "#EF4444" },
  { name: "Outros", value: 150, color: "#6366F1" },
];

const DonutChart = () => {
  return (
    <div className="card-zelo fade-in-up">
      <p className="text-xs font-semibold text-muted-foreground mb-3">Distribuição de Gastos</p>
      <div className="flex items-center gap-4">
        <div className="h-28 w-28 flex-shrink-0">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                innerRadius={30}
                outerRadius={50}
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
        </div>
        <div className="flex flex-col gap-2">
          {data.map((entry) => (
            <div key={entry.name} className="flex items-center gap-2">
              <div className="h-2.5 w-2.5 rounded-full" style={{ background: entry.color }} />
              <span className="text-xs text-muted-foreground">{entry.name}</span>
              <span className="text-xs font-semibold tabular-nums ml-auto">
                R$ {entry.value.toLocaleString("pt-BR")}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DonutChart;
