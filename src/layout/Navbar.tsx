import { UserCircle } from "lucide-react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";

import { useGlobalState } from "@/hooks/useGlobalState";
import { routeNames } from "../routes/routeNames";
import { logout } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const { state, dispatch } = useGlobalState();
  const { isAuthenticated, isAdmin } = state;
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    dispatch({ type: "SET_USER", payload: null });
    navigate(routeNames.public.home);
  };

  return (
    <nav className="flex items-center justify-between sticky top-0 bg-slate-700 p-3 z-50">
      <div className="flex items-center">
        <Link
          className="text-white font-bold text-xl"
          to={isAdmin ? routeNames.admin.dashboard : routeNames.public.home}
        >
          Ecom App
        </Link>
        <ul className="hidden md:flex md:ml-3 space-x-4">
          {!location.pathname.includes("admin") && (
            <>
              <li className="font-bold">
                <NavLink
                  to={routeNames.public.home}
                  className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
                >
                  Home
                </NavLink>
              </li>
              <li className="font-bold">
                <NavLink
                  to={routeNames.public.contact}
                  className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
                >
                  Contact
                </NavLink>
              </li>
            </>
          )}
          {isAdmin && (
            <>
              <li className="font-bold">
                <NavLink
                  to={routeNames.admin.users}
                  className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
                >
                  Users
                </NavLink>
              </li>
              <li className="font-bold">
                <NavLink
                  to={routeNames.admin.products}
                  className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
                >
                  Products
                </NavLink>
              </li>
              <li className="font-bold">
                <NavLink
                  to={routeNames.admin.orders}
                  className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
                >
                  Orders
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className="relative">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <div className="text-white font-bold flex items-center">
              <UserCircle className="w-8 h-8" />
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
            <ul className="py-1">
              {isAuthenticated ? (
                <>
                  <DropdownMenuItem className="block px-4 py-2 text-gray-800 hover:bg-gray-200">
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={handleLogout}
                  >
                    Logout
                  </DropdownMenuItem>
                </>
              ) : (
                <>
                  <DropdownMenuItem
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => navigate(routeNames.public.login)}
                  >
                    Login
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                    onClick={() => navigate(routeNames.public.register)}
                  >
                    Register
                  </DropdownMenuItem>
                </>
              )}
            </ul>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
