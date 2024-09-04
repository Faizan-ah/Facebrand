export const ROLE_ADMIN = "ADMIN";
export const ROLE_USER = "USER";

export type Role = "ADMIN" | "USER";

export type RoleControl = {
  [key: string]: {
    views: PagePermission[];
    actions: ResourcePermission[];
  };
};

export type PermissionCategory = keyof RoleControl[Role];

type Page =
  | "HOME"
  | "ADMIN_DASHBOARD"
  | "ADMIN_PRODUCT"
  | "ADMIN_USER"
  | "ADMIN_ORDER"
  | "CART"
  | "CHECKOUT";
type Resource = "PRODUCT" | "USER" | "CART";
type Method = "GET" | "ADD" | "EDIT" | "REMOVE";

export type ResourcePermission = `${Resource}:${Method}`;
export type PagePermission = `${Page}:VIEW`;

export const RBAC_ROLES: RoleControl = {
  ADMIN: {
    views: [
      "HOME:VIEW",
      "ADMIN_DASHBOARD:VIEW",
      "ADMIN_PRODUCT:VIEW",
      "ADMIN_USER:VIEW",
      "ADMIN_ORDER:VIEW"
    ],
    actions: ["PRODUCT:GET", "PRODUCT:REMOVE", "PRODUCT:ADD"]
  },
  USER: {
    views: ["HOME:VIEW", "CART:VIEW", "CHECKOUT:VIEW"],
    actions: ["PRODUCT:GET", "CART:GET"]
  }
};
