/* eslint-disable react-refresh/only-export-components */
import { Suspense, lazy } from "react";
import { Outlet } from "react-router-dom";
import { CommonGuard } from "@/components/guard";
import { PublicLayout } from "@/layout";

const HomePage = lazy(() => import("@/pages/home"));
const ChatPage = lazy(() => import("@/pages/chat"));

export const PublicRouter = [
  {
    path: "/",
    element: (
      <CommonGuard>
        <PublicLayout>
          <Suspense fallback={<div>Loading...</div>}>
            <Outlet />
          </Suspense>
        </PublicLayout>
      </CommonGuard>
    ),
    children: [
      { element: <HomePage />, path: "home" },
      { element: <ChatPage />, path: "chat" },
    ],
  },
];
