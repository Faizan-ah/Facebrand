import { Outlet } from "react-router-dom";
import NotFound from "../pages/NotFound";
import { Role } from "@/lib/accessControl";
import Login from "@/pages/Login";

type ProtectedRouteProps = {
  requiredRole: Role;
};

export const ProtectedRoute = ({ requiredRole }: ProtectedRouteProps) => {
  //TODO: figure out auth
  // const user = localStorage.getItem("userInfo");
  const isUserLoggedIn = true; //user?.isUserLoggedIn;
  const isAdmin = false; //user?.isAdmin;

  if (!isUserLoggedIn) {
    //TODO: reroute to <Login />;
    return <Login />;
  }

  // Reroutes to notfound if user or admin tries to access each other
  if ((requiredRole === "ADMIN" && !isAdmin) || (requiredRole === "USER" && isAdmin)) {
    return <NotFound />;
  }

  return <Outlet />;
};
