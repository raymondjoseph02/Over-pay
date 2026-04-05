import { useTransactionStore } from "../../store/transactionStore";
import { isIncome } from "../../utility/transaction";
import { getStatChartColor } from "../../utility/statistics";
import { StatisticsEmpty } from "../global-ui";
import { useTheme } from "../../context/ThemeContext";

const parseAmount = (amount: string) =>
  parseFloat(amount.replace(/[^0-9.]/g, "")) || 0;

export const SpendingBreakdown = () => {
  const { transactions } = useTransactionStore();
  const theme = useTheme((s) => s.theme);

  const categoryTotals: Record<string, number> = {};
  transactions
    .filter((t) => !isIncome(t.amount))
    .forEach((t) => {
      categoryTotals[t.category] =
        (categoryTotals[t.category] || 0) + parseAmount(t.amount);
    });

  const data = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .map(([label, value]) => ({
      label,
      value,
      color: getStatChartColor(label, theme),
    }));

  const total = data.reduce((acc, d) => acc + d.value, 0);

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5 pb-7">
      <p className="text-sm font-black text-gray-900 dark:text-white mb-4">
        Spending Breakdown
      </p>

      {data.length === 0 ? (
        <StatisticsEmpty />
      ) : (
        <div className="flex items-center gap-5">
          <div className="relative shrink-0">
            <StatisticsChart data={data} size={120} strokeWidth={16} />
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
              <p className="text-xs font-black text-gray-900 dark:text-white leading-tight">
                $
                {total >= 1000
                  ? `${(total / 1000).toFixed(1)}k`
                  : total.toFixed(0)}
              </p>
              <p className="text-[10px] text-gray-400 font-medium">total</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 flex-1 min-w-0">
            {data.map((item) => (
              <div
                key={item.label}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex items-center gap-1.5 min-w-0">
                  <span
                    className="size-2 rounded-full shrink-0"
                    style={{ backgroundColor: item.color }}
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 font-medium truncate">
                    {item.label}
                  </p>
                </div>
                <p className="text-xs font-black text-gray-900 dark:text-white shrink-0">
                  {((item.value / total) * 100).toFixed(0)}%
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
