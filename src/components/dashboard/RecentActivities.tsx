import { Link } from "react-router-dom";
import { activities } from "../../data/data";
import { RecentActivityCard } from "./RecentActivityCard";
import { PATH } from "../../routes";
import { RecentActivitiesEmpty } from "../global-ui";

export const RecentActivities = () => {
  return (
    <div className="  py-6 px-4 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden h-fit md:px-6">
      <div className="flex justify-between items-center mb-4">
        <p className="text-gray-900 font-black text-lg leading-[135%] tracking-[0.2px] dark:text-gray-50">
          Recent Activity
        </p>
        <Link
          to={PATH.TRANSACTIONS}
          className="text-gray-600 hover:scale-105 duration-300 ease-in-out transition cursor-pointer dark:text-gray-600 font-medium text-sm"
        >
          View all
        </Link>
      </div>
      <div className="flex flex-col gap-4">
        {activities.length === 0 ? (
          <RecentActivitiesEmpty />
        ) : (
          activities.map((activity, index) => (
            <RecentActivityCard
              key={activity.title + activity.description + index}
              {...activity}
            />
          ))
        )}
      </div>
    </div>
  );
};
