import { useTransactionStore } from "../store/transactionStore";
import { isIncome } from "../utility/transaction";

const MONTH_NAMES = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const parseAmount = (amount: string) =>
  parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export interface Insight {
  title: string;
  body: string;
  color: string;
  bg: string;
}

export const useInsights = (): Insight[] => {
  const { transactions } = useTransactionStore();

  const expenses = transactions.filter((t) => !isIncome(t.amount));

  // Top spending category
  const categoryTotals: Record<string, number> = {};
  expenses.forEach((t) => {
    categoryTotals[t.category] = (categoryTotals[t.category] || 0) + parseAmount(t.amount);
  });
  const topEntry = Object.entries(categoryTotals).sort(([, a], [, b]) => b - a)[0];

  // Month-over-month comparison
  const monthlyExpenses: Record<string, number> = {};
  expenses.forEach((t) => {
    const d = new Date(t.date);
    if (isNaN(d.getTime())) return;
    const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
    monthlyExpenses[key] = (monthlyExpenses[key] || 0) + parseAmount(t.amount);
  });
  const sortedMonths = Object.keys(monthlyExpenses).sort();
  const recentKey = sortedMonths[sortedMonths.length - 1];
  const prevKey = sortedMonths[sortedMonths.length - 2];
  const recentTotal = monthlyExpenses[recentKey] || 0;
  const prevTotal = monthlyExpenses[prevKey] || 0;
  const monthDiff = recentTotal - prevTotal;
  const monthPct = prevTotal > 0 ? Math.abs((monthDiff / prevTotal) * 100).toFixed(0) : null;
  const recentMonthName = recentKey ? MONTH_NAMES[parseInt(recentKey.split("-")[1])] : null;
  const prevMonthName = prevKey ? MONTH_NAMES[parseInt(prevKey.split("-")[1])] : null;

  // Pending transactions
  const pendingCount = transactions.filter((t) => t.status === "pending").length;

  // 1. Top spending category
  const topCategoryInsight: Insight = topEntry
    ? {
        title: `Top spend: ${topEntry[0]}`,
        body: `$${formatCurrency(topEntry[1])} spent in this category — your highest.`,
        color: "text-primary-500",
        bg: "bg-primary-500/10 dark:bg-primary-500/15",
      }
    : {
        title: "No expenses yet",
        body: "Start adding transactions to see your top spending category.",
        color: "text-primary-500",
        bg: "bg-primary-500/10 dark:bg-primary-500/15",
      };

  // 2. Month-over-month comparison
  let monthInsight: Insight;
  if (recentMonthName && prevMonthName) {
    const direction = monthDiff >= 0 ? "up" : "down";
    const pctText = monthPct ? ` (${monthPct}%)` : "";
    monthInsight = {
      title: `${recentMonthName} vs ${prevMonthName}`,
      body:
        direction === "up"
          ? `Spending went up by $${formatCurrency(Math.abs(monthDiff))}${pctText} compared to last month.`
          : `Spending went down by $${formatCurrency(Math.abs(monthDiff))}${pctText} — good progress.`,
      color: direction === "up" ? "text-red-500" : "text-emerald-500",
      bg: direction === "up" ? "bg-red-500/10 dark:bg-red-500/15" : "bg-emerald-500/10 dark:bg-emerald-500/15",
    };
  } else if (recentMonthName) {
    monthInsight = {
      title: `${recentMonthName} spending`,
      body: `$${formatCurrency(recentTotal)} spent so far — add more months to compare trends.`,
      color: "text-primary-500",
      bg: "bg-primary-500/10 dark:bg-primary-500/15",
    };
  } else {
    monthInsight = {
      title: "No monthly data",
      body: "Add dated transactions to unlock month-over-month comparisons.",
      color: "text-primary-500",
      bg: "bg-primary-500/10 dark:bg-primary-500/15",
    };
  }

  // 3. Pending transactions
  const pendingInsight: Insight =
    pendingCount > 0
      ? {
          title: `${pendingCount} pending transaction${pendingCount > 1 ? "s" : ""}`,
          body: "These haven't settled yet and may still affect your balance.",
          color: "text-amber-500",
          bg: "bg-amber-500/10 dark:bg-amber-500/15",
        }
      : {
          title: "All transactions settled",
          body: "No pending transactions — your balance is up to date.",
          color: "text-emerald-500",
          bg: "bg-emerald-500/10 dark:bg-emerald-500/15",
        };

  return [topCategoryInsight, monthInsight, pendingInsight];
};
