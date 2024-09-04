import { routeNames } from "@/routes/routeNames";
import { NavLink, useLocation } from "react-router-dom";

const NavLinks = ({
  isAdmin,
  isMenuOpen,
  closeMenu,
  isMobile
}: {
  isAdmin: boolean;
  isMenuOpen: boolean;
  isMobile: boolean;
  closeMenu: () => void;
}) => {
  const location = useLocation();

  return (
    <ul
      className={`md:space-x-4 md:flex-row ${
        !isMobile ? "flex" : isMenuOpen ? "flex flex-col mt-4 space-y-2" : "hidden"
      } md:mt-0`}
    >
      {!location.pathname.includes("admin") && (
        <>
          <li className="font-bold">
            <NavLink
              to={routeNames.public.home}
              className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
              onClick={closeMenu}
            >
              Home
            </NavLink>
          </li>
          <li className="font-bold">
            <NavLink
              to={routeNames.public.contact}
              className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
              onClick={closeMenu}
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
              onClick={closeMenu}
            >
              Users
            </NavLink>
          </li>
          <li className="font-bold">
            <NavLink
              to={routeNames.admin.products}
              className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
              onClick={closeMenu}
            >
              Products
            </NavLink>
          </li>
          <li className="font-bold">
            <NavLink
              to={routeNames.admin.orders}
              className={({ isActive }) => (isActive ? "text-blue-400" : "text-white")}
              onClick={closeMenu}
            >
              Orders
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
};

export default NavLinks;
