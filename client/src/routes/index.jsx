import { Outlet, useRoutes } from "react-router-dom";
import Layout from "../views/components/layout";
import Forget from "../views/pages/auth/forget";
import Login from "../views/pages/auth/login";
import Register from "../views/pages/auth/register";
import Reset from "../views/pages/auth/reset";
import Dashboard from "../views/pages/dashboard";

export default function MainRoutes() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "auth",
          element: <Outlet />,
          children: [
            {
              element: <Outlet />,
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
