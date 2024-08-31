export const routeNames = {
  public: {
    login: "/login",
    register: "/register",
    home: "/home",
    pageNotFound: "/page-not-found",
    contact: "/contact",
    productDetails: "/products/",
    logout: "/logout"
  },
  user: {
    parentRoute: "/user",
    profile: "/user/profile",
    cart: "/user/cart",
    checkout: "/user/checkout"
  },
  admin: {
    parentRoute: "/admin",
    dashboard: "/admin/dashboard",
    profile: "/admin/profile",
    users: "/admin/users",
    products: "/admin/products",
    orders: "/admin/orders"
  }
};
