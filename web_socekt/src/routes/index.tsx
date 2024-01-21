import { Navigate, useRoutes } from "react-router-dom";

import { PublicRouter } from "./publicRouter";
import { PrivateRouter } from "./privateRouter";

const Router = () => {
  return useRoutes([
    // 공통 라우터
    ...PublicRouter,

    // 인증 라우터
    ...PrivateRouter,

    // 404 Not Found
    { path: "*", element: <Navigate to="/404" /> },
  ]);
};

export default Router;
