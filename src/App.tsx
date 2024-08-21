import Layout from "./layout/Layout";
import ErrorPage from "./pages/ErrorPage";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router-dom";
import { routeNames } from "./routes/routeNames";
import { adminRoutes, publicRoutes, userRoutes } from "./routes/routes";
import { ProtectedRoute } from "./routes/ProtectedRoutes";
import NotFound from "./pages/NotFound";
import { ROLE_ADMIN, ROLE_USER } from "./lib/access-control";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Navigate to={routeNames.Public.home} replace={true} />
      },
      ...publicRoutes,
      {
        path: routeNames.Admin.parentRoute,
        element: <ProtectedRoute requiredRole={ROLE_ADMIN} />,
        children: adminRoutes
      },
      {
        path: routeNames.User.parentRoute,
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
  return <RouterProvider router={router} />;
}

export default App;
