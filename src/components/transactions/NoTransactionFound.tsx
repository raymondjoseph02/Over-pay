export const NoTransactionFound = () => (
  <div className="py-16 flex flex-col items-center justify-center gap-3">
    <div className="size-14 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center text-2xl">
      🧾
    </div>
    <p className="text-sm font-semibold text-gray-900 dark:text-gray-50">
      No transactions found
    </p>
    <p className="text-xs text-gray-400 dark:text-gray-500 text-center max-w-[200px]">
      Try adjusting your filters or check back later
    </p>
  </div>
);
