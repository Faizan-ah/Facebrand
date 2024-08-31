import Dashboard from "@/pages/admin/Dashboard";
import Home from "@/pages/Home";
import { routeNames } from "./routeNames";
import Product from "@/pages/admin/Product";
import Order from "@/pages/admin/Order";
import User from "@/pages/admin/User";
import ProductDetails from "@/pages/product/index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Cart from "@/pages/user/Cart";
import Checkout from "@/pages/user/Checkout";

export const publicRoutes = [
  { path: routeNames.public.home, element: <Home /> },
  { path: routeNames.public.productDetails + ":id", element: <ProductDetails /> },
  { path: routeNames.public.login, element: <Login /> },
  { path: routeNames.public.register, element: <Register /> }
];

export const adminRoutes = [
  { path: routeNames.admin.dashboard, element: <Dashboard /> },
  { path: routeNames.admin.products, element: <Product /> },
  { path: routeNames.admin.orders, element: <Order /> },
  { path: routeNames.admin.users, element: <User /> }
];

export const userRoutes = [
  { path: routeNames.user.cart, element: <Cart /> },
  { path: routeNames.user.checkout, element: <Checkout /> }
];
