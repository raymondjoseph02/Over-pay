import {
  CashBackBanner,
  RecentActivities,
  SummaryCards,
  SummaryCardsSkeleton,
  Insights,
  InsightsSkeleton,
} from "../../components/dashboard";
import { Header } from "../../components/global-ui";
import { MoneyFlowChart, SpendingBarChart } from "../../components/charts";
import {
  CashbackBannerSkeleton,
  WalletWidgetSkeleton,
  RecentActivitiesSkeleton,
} from "../../components/global-ui";
import { useAuthStore } from "../../store/authStore";
import { adminSpendingHistory } from "../../data/data";
import { useLoadingStimulator } from "../../hooks/useLoadingStimulator";
import { WalletWidget } from "../../components/wallet";

export const DashboardPage = () => {
  const { currentUser } = useAuthStore();
  const isAdmin = currentUser.role === "admin";
  const { loading } = useLoadingStimulator();

  return (
    <>
      <Header title="Dashboard" />

      {/* Summary cards — full width */}
      <div className="mb-4 lg:mb-6">
        {loading ? <SummaryCardsSkeleton /> : <SummaryCards />}
      </div>

      <div className="flex flex-col-reverse lg:flex-row gap-4 lg:gap-6">
        {/* Left column */}
        <div className="flex flex-col flex-1 min-w-0 gap-6">
          <div className="hidden lg:flex h-fit">
            {loading ? (
              <CashbackBannerSkeleton />
            ) : isAdmin ? (
              <div className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">
                  Platform Monthly Spending
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                  Overall spending across all accounts
                </p>
                <SpendingBarChart history={adminSpendingHistory} />
              </div>
            ) : (
              <CashBackBanner />
            )}
          </div>
          {loading ? null : <MoneyFlowChart />}

          {loading ? <InsightsSkeleton /> : <Insights />}

        </div>

        {/* Right column */}
        <div className="w-full lg:w-91.25 lg:shrink-0 flex flex-col gap-4">
          <div className="lg:hidden">
            {loading ? (
              <CashbackBannerSkeleton />
            ) : isAdmin ? (
              <div className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 px-5 py-4">
                <p className="text-sm font-bold text-gray-900 dark:text-gray-50 mb-1">
                  Platform Monthly Spending
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mb-3">
                  Overall spending across all accounts
                </p>
                <SpendingBarChart history={adminSpendingHistory} />
              </div>
            ) : (
              <CashBackBanner />
            )}
          </div>

          {loading ? <WalletWidgetSkeleton /> : <WalletWidget />}
          {loading ? <RecentActivitiesSkeleton /> : <RecentActivities />}
        </div>
      </div>
    </>
  );
};
