import { Can } from "@/components/Can";
import UserTable from "@/components/admin/UserTable";

const User = () => {
  return (
    <Can
      permission="ADMIN_PRODUCT:VIEW"
      permissionType="views"
      yes={() => (
        <div>
          <h1 className="text-3xl font-semibold text-center my-3">Users</h1>
          <UserTable />
        </div>
      )}
    />
  );
};

export default User;
