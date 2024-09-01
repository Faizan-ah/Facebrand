import { Outlet, useNavigate } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { Role } from "@/lib/accessControl";
import { useGlobalState } from "@/hooks/useGlobalState";
import { routeNames } from "./routeNames";
import { isTokenValid, removeDataFromLocalStorage } from "@/lib/utils";
import { useEffect } from "react";
import { TOKEN_KEY, USER_KEY } from "@/lib/constants";

type ProtectedRouteProps = {
  requiredRole: Role;
};

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  const { state, dispatch } = useGlobalState();
  const navigate = useNavigate();
  const { isAdmin } = state;

  useEffect(() => {
    // If the token is expired, log out the user and navigate to login
    if (!isTokenValid()) {
      dispatch({ type: "SET_USER", payload: null });
      removeDataFromLocalStorage(TOKEN_KEY);
      removeDataFromLocalStorage(USER_KEY);
      navigate(routeNames.public.login);
    }
  }, [navigate, dispatch]);

  // TODO: Deprecated, redundant as token validity is checked above
  // TODO: Make a new useAuth hook and shift isTokenValid logic there
  // if (!isAuthenticated) {
  //   return <Navigate to={routeNames.public.login} />;
  // }

  // Reroutes to notfound if user or admin tries to access each other
  if ((requiredRole === "ADMIN" && !isAdmin) || (requiredRole === "USER" && isAdmin)) {
    return <NotFound />;
  }

  return <Outlet />;
};
