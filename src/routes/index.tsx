import { ActivitiesIcon, HomeIcon } from "../assets/svg/icons";
import type { Route } from "../types/type";

export const PATH: Record<string, string> = {
  ROOT: "/",
  DASHBOARD: "/dashboard",
  TRANSACTIONS: "/activities/transactions",
};

export const ROUTES: Record<string, Route[]> = {
  //   dashboard routes
  dashboard: [
    {
      name: "Dashboard",
      path: PATH.DASHBOARD,
      hasSubRoutes: false,
      icon: <HomeIcon />,
    },

    {
      name: "activities",
      path: PATH.ACTIVITIES,
      hasSubRoutes: true,
      icon: <ActivitiesIcon />,
      subRoutes: [
        {
          name: "transactions",
          path: PATH.TRANSACTIONS,
          hasSubRoutes: false,
        },
      ],
    },
  ],
};
