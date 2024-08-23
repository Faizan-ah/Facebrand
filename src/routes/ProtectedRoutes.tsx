import { Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { Role } from "@/lib/accessControl";

interface ProtectedRouteProps {
  requiredRole: Role;
}
export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  //TODO: figure out auth
  // const user = localStorage.getItem("userInfo");
  const isUserLoggedIn = true; //user?.isUserLoggedIn;
  const isAdmin = true; //user?.isAdmin;

  if (!isUserLoggedIn) {
    //TODO: reroute to <Login />;
    return <></>;
  }

  // Reroutes to notfound if user or admin tries to access each other
  if ((requiredRole === "ADMIN" && !isAdmin) || (requiredRole === "USER" && isAdmin)) {
    return <NotFound />;
  }

  return <Outlet />;
};
