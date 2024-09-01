import { useGlobalState } from "@/hooks/useGlobalState";
import {
  Role,
  ResourcePermission,
  PagePermission,
  PermissionCategory,
  RBAC_ROLES
} from "../lib/accessControl";

const checkPermission = (
  role: Role,
  permission: ResourcePermission | PagePermission,
  permissionType: PermissionCategory
): boolean => {
  const permissions = RBAC_ROLES[role];
  if (!permissions) {
    return false;
  }

  switch (permissionType) {
    case "views": {
      const viewPermissions = permissions.views;
      if (!viewPermissions || viewPermissions.length === 0) {
        return false;
      }

      const canViewPage = viewPermissions.includes(permission as PagePermission);
      if (!canViewPage) {
        return false;
      }

      return true;
    }

    case "actions": {
      const actionPermissions = permissions.actions;
      if (!actionPermissions || actionPermissions.length === 0) {
        return false;
      }

      const canPerformAction = actionPermissions.includes(permission as ResourcePermission);
      if (!canPerformAction) {
        return false;
      }

      return true;
    }

    default:
      return false;
  }
};

type CanProp = {
  permission: ResourcePermission | PagePermission;
  yes: () => JSX.Element;
  no?: () => JSX.Element | null;
  permissionType: PermissionCategory;
};

export const Can = ({ permission, permissionType, yes, no = () => null }: CanProp) => {
  const { state } = useGlobalState();
  const USER_ROLE: Role | undefined = state.loggedInUser?.role as Role | undefined;

  if (!USER_ROLE) {
    console.error("User role is not defined or invalid");
    return no();
  }
  return checkPermission(USER_ROLE, permission, permissionType) ? yes() : no();
};
