import { useState } from "react";

import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/admin/ProductTable";
import AddEditProductModal from "@/components/admin/AddEditProductModal";

const Product = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => (
          <Button className="m-2" onClick={toggleModal}>
            Add product
          </Button>
        )}
      />
      <Can permission="ADMIN_PRODUCT:VIEW" permissionType="views" yes={() => <ProductTable />} />
      <AddEditProductModal type="Add" toggleModal={toggleModal} open={open} />
    </div>
  );
};

export default Product;
