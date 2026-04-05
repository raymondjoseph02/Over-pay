import { Lightbulb } from "lucide-react";
import { useInsights } from "../../hooks/useInsights";

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
  const insights = useInsights();

  return (
    <div className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-5">
      <div className="flex items-center gap-2 mb-5">
        <Lightbulb size={15} className="text-primary-500" />
        <p className="text-sm font-black text-gray-900 dark:text-white">Insights</p>
      </div>
      <div className="space-y-4">
        {insights.map((item, i) => (
          <div key={i} className="flex gap-3 items-start">
            <div className={`size-8 rounded-xl flex items-center justify-center shrink-0 ${item.bg}`}>
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
