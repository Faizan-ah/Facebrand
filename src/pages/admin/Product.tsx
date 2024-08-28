import { useState } from "react";

import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import ProductTable from "@/components/admin/ProductTable";
import AddEditProductModal from "@/components/admin/AddUpdateProductModal";

const Product = () => {
  const [open, setOpen] = useState(false);
  const toggleModal = () => {
    setOpen(!open);
  };

  return (
    <div>
      <Can
        permission="ADMIN_PRODUCT:VIEW"
        permissionType="views"
        yes={() => (
          <div className="w-9/12 mx-auto">
            <h1 className="text-3xl font-semibold text-center my-3">Products</h1>
            <Button className="m-2" onClick={toggleModal}>
              Add product
            </Button>
            <ProductTable />
            <AddEditProductModal type="Add" toggleModal={toggleModal} open={open} />
          </div>
        )}
      />
    </div>
  );
};

export default Product;
