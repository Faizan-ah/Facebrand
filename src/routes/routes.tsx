import Dashboard from "@/pages/admin/Dashboard";
import Home from "@/pages/home";
import { routeNames } from "./routeNames";
import Product from "@/pages/admin/Product";
import Order from "@/pages/admin/Order";
import User from "@/pages/admin/User";

export const publicRoutes = [{ path: routeNames.public.home, element: <Home /> }];

export const adminRoutes = [
  { path: routeNames.admin.dashboard, element: <Dashboard /> },
  { path: routeNames.admin.products, element: <Product /> },
  { path: routeNames.admin.orders, element: <Order /> },
  { path: routeNames.admin.users, element: <User /> }
];

export const userRoutes = [];
