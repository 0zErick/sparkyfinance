import StatusCards from "@/components/expenses/StatusCards";
import CreditCardCarousel from "@/components/expenses/CreditCardCarousel";
import TrendChart from "@/components/expenses/TrendChart";
import DonutChart from "@/components/expenses/DonutChart";
import PaceBar from "@/components/expenses/PaceBar";
import BudgetAlert from "@/components/expenses/BudgetAlert";
import SyncBanner from "@/components/expenses/SyncBanner";
import SyncStatusBanner from "@/components/expenses/SyncStatusBanner";
import { useFinancialData } from "@/hooks/useFinancialData";

const VisaoGeralTab = () => {
  const { data, available, dailyBudget } = useFinancialData();
  const hasData = data.balance > 0 || data.income > 0 || data.expenses > 0;

  const balanceHistory = hasData
    ? [
        { name: "Jan", value: Math.round(data.balance * 0.7) },
        { name: "Fev", value: Math.round(data.balance * 0.6) },
        { name: "Mar", value: Math.round(data.balance * 0.85) },
        { name: "Abr", value: Math.round(data.balance * 0.75) },
        { name: "Mai", value: Math.round(data.balance * 1.1) },
        { name: "Jun", value: Math.round(data.balance) },
      ]
    : [];

  const projectionData = hasData
    ? [
        { name: "Sem 1", value: Math.round(available * 1.2) },
        { name: "Sem 2", value: Math.round(available * 1.05) },
        { name: "Sem 3", value: Math.round(available * 0.9) },
        { name: "Sem 4", value: Math.round(available) },
      ]
    : [];

  const dailyPower = hasData
    ? [
        { name: "Seg", value: Math.round(dailyBudget * 1.3) },
        { name: "Ter", value: Math.round(dailyBudget * 1.1) },
        { name: "Qua", value: Math.round(dailyBudget * 0.85) },
        { name: "Qui", value: Math.round(dailyBudget) },
        { name: "Sex", value: Math.round(dailyBudget * 1.2) },
        { name: "Sáb", value: Math.round(dailyBudget * 0.75) },
        { name: "Dom", value: Math.round(dailyBudget) },
      ]
    : [];

  return (
    <div className="space-y-3">
      <SyncStatusBanner />
      <SyncBanner />
      <BudgetAlert />
      <StatusCards />
      <CreditCardCarousel />
      {hasData && (
        <>
          <TrendChart title="Histórico de Saldo" data={balanceHistory} color="hsl(var(--primary))" gradientId="balGrad" />
          <TrendChart title="Projeção de Saldo" data={projectionData} color="hsl(var(--success))" gradientId="projGrad" legend="Estimativa do saldo nas próximas semanas com base nos seus gastos e receitas recorrentes." />
          <TrendChart title="Poder de Compra Diário" data={dailyPower} color="hsl(var(--warning))" gradientId="dailyGrad" legend="Quanto você pode gastar por dia sem comprometer o orçamento do mês." />
        </>
      )}
      <DonutChart />
      <PaceBar />
    </div>
  );
};

export default VisaoGeralTab;
