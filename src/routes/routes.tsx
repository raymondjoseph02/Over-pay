import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import { PATH } from "./index";
import { DashboardLayout } from "../layouts/dashboardLayout";
import { DashboardPage, TransactionsPage } from "../pages";

const routes = createBrowserRouter([
  // Dashboard layout
  {
    element: <DashboardLayout />,
    path: PATH.ROOT,
    children: [
      // Redirect "/" → "/dashboard"
      { index: true, element: <Navigate to={PATH.DASHBOARD} replace /> },
      { path: PATH.DASHBOARD, element: <DashboardPage /> },
      {
        element: <Outlet />,
        path: "/activities",
        children: [{ path: PATH.TRANSACTIONS, element: <TransactionsPage /> }],
      },
    ],
  },
]);

export default routes;
