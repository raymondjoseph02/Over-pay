import { Lightbulb, AlertCircle } from "lucide-react";
import { useTransactionStore } from "../../store/transactionStore";
import { isIncome } from "../../utility/transaction";

const parseAmount = (amount: string) =>
  parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const MONTH_NAMES = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const InsightsSkeleton = () => (
  <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 animate-pulse">
    <div className="h-5 w-24 rounded bg-gray-200 dark:bg-gray-700 mb-5" />
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-3">
          <div className="size-8 rounded-xl bg-gray-200 dark:bg-gray-700 shrink-0" />
          <div className="space-y-1.5 flex-1">
            <div className="h-3.5 w-40 rounded bg-gray-200 dark:bg-gray-700" />
            <div className="h-3 w-56 rounded bg-gray-100 dark:bg-gray-800" />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export const Insights = () => {
  const { transactions } = useTransactionStore();

  //  Top spending category
  const categoryTotals: Record<string, number> = {};
  transactions
    .filter((transaction) => !isIncome(transaction.amount))
    .forEach((transaction) => {
      categoryTotals[transaction.category] =
        (categoryTotals[transaction.category] || 0) + parseAmount(transaction.amount);
    });
  const topEntry = Object.entries(categoryTotals).sort(
    ([, a], [, b]) => b - a,
  )[0];

  // --- Month-over-month comparison ---
  const monthlyExpenses: Record<string, number> = {};
  transactions
    .filter((transaction) => !isIncome(transaction.amount))
    .forEach((transaction) => {
      const d = new Date(transaction.date);
      if (isNaN(d.getTime())) return;
      const key = `${d.getFullYear()}-${String(d.getMonth()).padStart(2, "0")}`;
      monthlyExpenses[key] =
        (monthlyExpenses[key] || 0) + parseAmount(transaction.amount);
    });
  const sortedMonths = Object.keys(monthlyExpenses).sort();
  const recentKey = sortedMonths[sortedMonths.length - 1];
  const prevKey = sortedMonths[sortedMonths.length - 2];
  const recentTotal = monthlyExpenses[recentKey] || 0;
  const prevTotal = monthlyExpenses[prevKey] || 0;
  const monthDiff = recentTotal - prevTotal;
  const monthPct =
    prevTotal > 0 ? Math.abs((monthDiff / prevTotal) * 100).toFixed(0) : null;
  const recentMonthName = recentKey
    ? MONTH_NAMES[parseInt(recentKey.split("-")[1])]
    : null;
  const prevMonthName = prevKey
    ? MONTH_NAMES[parseInt(prevKey.split("-")[1])]
    : null;

  // --- Pending transactions ---
  const pendingCount = transactions.filter(
    (transaction) => transaction.status === "pending",
  ).length;

  const insights: { title: string; body: string; color: string; bg: string }[] =
    [];

  if (topEntry) {
    insights.push({
      title: `Top spend: ${topEntry[0]}`,
      body: `$${formatCurrency(topEntry[1])} spent in this category — your highest.`,
      color: "text-primary-500",
      bg: "bg-primary-500/10 dark:bg-primary-500/15",
    });
  }

  if (recentMonthName && prevMonthName) {
    const direction = monthDiff >= 0 ? "up" : "down";
    const pctText = monthPct ? ` (${monthPct}%)` : "";
    insights.push({
      title: `${recentMonthName} vs ${prevMonthName}`,
      body:
        direction === "up"
          ? `Spending went up by $${formatCurrency(Math.abs(monthDiff))}${pctText} compared to last month.`
          : `Spending went down by $${formatCurrency(Math.abs(monthDiff))}${pctText} — good progress.`,
      color: direction === "up" ? "text-red-500" : "text-emerald-500",
      bg:
        direction === "up"
          ? "bg-red-500/10 dark:bg-red-500/15"
          : "bg-emerald-500/10 dark:bg-emerald-500/15",
    });
  }

  if (pendingCount > 0) {
    insights.push({
      title: `${pendingCount} pending transaction${pendingCount > 1 ? "s" : ""}`,
      body: "These haven't settled yet and may still affect your balance.",
      color: "text-amber-500",
      bg: "bg-amber-500/10 dark:bg-amber-500/15",
    });
  }

  if (insights.length === 0) {
    return (
      <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 flex flex-col items-center justify-center gap-2 py-10 text-center">
        <AlertCircle size={32} className="text-gray-300 dark:text-gray-600" />
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
          No insights yet. Add transactions to get started.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb size={15} className="text-primary-500" />
        <p className="text-sm font-black text-gray-900 dark:text-white">
          Insights
        </p>
      </div>
      <div className="space-y-4">
        {insights.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div
              className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}
            >
              <Lightbulb size={14} className={item.color} />
            </div>
            <div>
              <p className={`text-sm font-bold ${item.color}`}>{item.title}</p>
              <p className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">
                {item.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
