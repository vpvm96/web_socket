/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { AuthGuard } from "@/components/guard";
import { PrivateLayout } from "@/layout";

const LoginPage = lazy(() => import("@/pages/login"));

export const PrivateRouter = [
  {
    path: "/auth",
    element: (
      <AuthGuard>
        <PrivateLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </PrivateLayout>
      </AuthGuard>
    ),
    children: [{ element: <LoginPage />, path: "login" }],
  },
];
