import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

import { routeNames } from "../routes/routeNames";
const Navbar = () => {
  const location = useLocation();
  return (
    <React.Fragment>
      <nav className="flex sticky top-0 bg-slate-700 h-max p-3">
        <Link className="text-white font-bold" to={routeNames.public.home}>
          Ecom App
        </Link>

        {!location.pathname.includes("admin") ? (
          <ul className="flex flex-row mr-auto">
            <li className="font-bold ml-4 mr-2">
              <NavLink to={routeNames.public.home}>Home</NavLink>
            </li>
            <li className="font-bold mx-2">
              <NavLink to={routeNames.public.contact}>Contact</NavLink>
            </li>
            <li className="font-bold mx-2">
              <NavLink to={routeNames.admin.dashboard}>Admin</NavLink>
            </li>
          </ul>
        ) : (
          <ul className="flex flex-row mr-auto">
            <li className="font-bold ml-4 mr-2">
              <NavLink to={routeNames.admin.users}>Users</NavLink>
            </li>
            <li className="font-bold mx-2">
              <NavLink to={routeNames.admin.products}>Products</NavLink>
            </li>
            <li className="font-bold mx-2">
              <NavLink to={routeNames.admin.dashboard}>Orders</NavLink>
            </li>
          </ul>
        )}
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
