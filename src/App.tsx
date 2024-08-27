import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Layout from "@/layout/Layout";
import ErrorPage from "@/pages/ErrorPage";
import { routeNames } from "@/routes/routeNames";
import { adminRoutes, publicRoutes, userRoutes } from "@/routes/routes";
import { ProtectedRoute } from "@/routes/ProtectedRoutes";
import NotFound from "@/pages/NotFound";
import { ROLE_ADMIN, ROLE_USER } from "@/lib/accessControl";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={routeNames.public.home} replace={true} />
      },
      ...publicRoutes,
      {
        path: routeNames.admin.parentRoute,
        element: <ProtectedRoute requiredRole={ROLE_ADMIN} />,
        children: adminRoutes
      },
      {
        path: routeNames.user.parentRoute,
        element: <ProtectedRoute requiredRole={ROLE_USER} />,
        children: userRoutes
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

function App() {
  return (
    <div>
      <ToastContainer />
      <RouterProvider router={router} />;
    </div>
  );
}

export default App;
