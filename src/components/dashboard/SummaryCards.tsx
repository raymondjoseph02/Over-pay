import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useTransactionStore } from "../../store/transactionStore";
import { isIncome } from "../../utility/transaction";

const parseAmount = (amount: string) =>
  parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

const formatCurrency = (amount: number) =>
  amount.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const SummaryCardsSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 animate-pulse">
    {[1, 2, 3].map((i) => (
      <div key={i} className="rounded-2xl border border-gray-200 dark:border-gray-700 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="h-4 w-24 rounded bg-gray-200 dark:bg-gray-700" />
          <div className="size-9 rounded-xl bg-gray-200 dark:bg-gray-700" />
        </div>
        <div className="h-7 w-32 rounded bg-gray-200 dark:bg-gray-700" />
      </div>
    ))}
  </div>
);

export const SummaryCards = () => {
  const { transactions } = useTransactionStore();

  const totalIncome = transactions
    .filter((transaction) => isIncome(transaction.amount))
    .reduce((sum, transaction) => sum + parseAmount(transaction.amount), 0);

  const totalExpenses = transactions
    .filter((transaction) => !isIncome(transaction.amount))
    .reduce((sum, transaction) => sum + parseAmount(transaction.amount), 0);

  const netBalance = totalIncome - totalExpenses;

  const cards = [
    {
      label: "Total Balance",
      value: `$${formatCurrency(netBalance)}`,
      icon: Wallet,
      iconBg: "bg-primary-500/10 dark:bg-primary-500/15",
      iconColor: "text-primary-500",
      valueColor: "text-gray-900 dark:text-white",
    },
    {
      label: "Total Income",
      value: `+$${formatCurrency(totalIncome)}`,
      icon: TrendingUp,
      iconBg: "bg-emerald-500/10 dark:bg-emerald-500/15",
      iconColor: "text-emerald-500",
      valueColor: "text-emerald-500",
    },
    {
      label: "Total Expenses",
      value: `-$${formatCurrency(totalExpenses)}`,
      icon: TrendingDown,
      iconBg: "bg-red-500/10 dark:bg-red-500/15",
      iconColor: "text-red-500",
      valueColor: "text-red-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.label}
            className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                {card.label}
              </p>
              <div className={`size-9 rounded-xl flex items-center justify-center ${card.iconBg}`}>
                <Icon size={16} className={card.iconColor} />
              </div>
            </div>
            <p className={`text-2xl font-extrabold ${card.valueColor}`}>
              {card.value}
            </p>
          </div>
        );
      })}
    </div>
  );
};
