import React from "react";
import { Link, NavLink } from "react-router-dom";

import { routeNames } from "../routes/routeNames";
const Navbar = () => {
  return (
    <React.Fragment>
      <nav className="flex sticky top-0 bg-slate-700 h-max p-3">
        <Link className="text-white font-bold" to={routeNames.Public.home}>
          Ecom App
        </Link>
        <ul className="flex flex-row mr-auto">
          <li className="font-bold ml-4 mr-2">
            <NavLink to={routeNames.Public.home}>Home</NavLink>
          </li>
          <li className="font-bold mx-2">
            <NavLink to={routeNames.Public.contact}>Contact</NavLink>
          </li>
        </ul>
      </nav>
    </React.Fragment>
  );
};

export default Navbar;
