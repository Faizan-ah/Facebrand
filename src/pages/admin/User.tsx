import { useState } from "react";

import { Can } from "@/components/Can";
import AddEditProductModal from "@/components/admin/AddEditProductModal";
import UserTable from "@/components/admin/UserTable";

const User = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Can permission="ADMIN_PRODUCT:VIEW" permissionType="views" yes={() => <UserTable />} />
      <AddEditProductModal type="Add" toggleModal={toggleModal} open={open} />
    </div>
  );
};

export default User;
