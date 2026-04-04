import type { ActivitiesProps } from "../../types/type";
import { formatDate } from "../../utility/formatDate";

export const RecentActivityCard = ({
  title,
  description,
  amount,
  date,
  imageUrl,
}: ActivitiesProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-3 ">
        <div className="border dark:border-gray-700 rounded-full items-center justify-center flex size-11 border-gray-200">
          <img src={imageUrl} alt={title + description} className="size-6 " />
        </div>
        <div className="space-y-1">
          <p className="text-gray-900 dark:text-gray-50 font-black text-sm leading-[150%] tracking-[0.2px]">
            {title}
          </p>
          <p className="text-xs text-gray-600 truncate font-medium leading-[150%] tracking-[0.2px] ">
            {description}
          </p>
        </div>
      </div>
      <div>
        <div className="flex flex-col items-end">
          <p className="text-gray-900 dark:text-gray-50 font-black text-sm leading-[150%] tracking-[0.2px]">
            {amount}
          </p>
          <p className="text-xs text-gray-600 truncate font-medium leading-[150%] tracking-[0.2px]">
            {formatDate(date, "short")}
          </p>
        </div>
      </div>
    </div>
  );
};
