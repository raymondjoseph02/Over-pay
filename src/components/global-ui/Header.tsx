import type { DashboardHeaderProps } from "../../types/type";

export const Header = ({ title }: DashboardHeaderProps) => {
  return (
    <div className="lg:hidden mb-6 ">
      <p className="text-2xl font-black leading-[130%] tracking-[0px] dark:text-gray-50 text-gray-900">
        {title}
      </p>
    </div>
  );
};
