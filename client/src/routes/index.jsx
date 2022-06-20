import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../views/components/layout";
import Forget from "../views/pages/auth/forget";
import Login from "../views/pages/auth/login";
import Register from "../views/pages/auth/register";
import Reset from "../views/pages/auth/reset";
import Dashboard from "../views/pages/dashboard";
import Devices from "../views/pages/device";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export default function MainRoutes() {
  return useRoutes([
    {
      path: "",
      element: <Layout />,
      children: [
        {
          path: "",
          element: <ProtectedRoute />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "devices",
              element: <Devices />,
            },
          ],
        },
        {
          path: "auth",
          element: <Outlet />,
          children: [
            {
              element: <PublicRoute />,
              children: [
                {
                  path: "login",
                  element: <Login />,
                },
                {
                  path: "forget",
                  element: <Forget />,
                },
                {
                  path: "reset",
                  element: <Reset />,
                },
                {
                  path: "register",
                  element: <Register />,
                },
              ],
            },
          ],
        },
      ],
    },
  ]);
}
