import { Activity, PieChart } from "lucide-react";

export const RecentActivitiesEmpty = () => (
  <div className="flex flex-col items-center justify-center py-10 gap-2">
    <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-600">
      <Activity size={22} />
    </div>
    <p className="text-sm font-black text-gray-900 dark:text-gray-50">
      No activity yet
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500 text-center max-w-48">
      Your recent transactions will appear here once you start spending.
    </p>
  </div>
);

export const StatisticsEmpty = () => (
  <div className="flex flex-col items-center justify-center py-10 gap-2">
    <div className="size-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-gray-400 dark:text-gray-600">
      <PieChart size={22} />
    </div>
    <p className="text-sm font-black text-gray-900 dark:text-gray-50">
      No data yet
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500 text-center max-w-48">
      Statistics will show once transactions are recorded.
    </p>
  </div>
);

export const NoTransactionFound = () => (
  <div className="py-16 flex flex-col items-center justify-center gap-3">
    <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
      🧾
    </div>
    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
      No transactions found
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500 text-center max-w-50">
      Try adjusting your filters or check back later
    </p>
  </div>
);
