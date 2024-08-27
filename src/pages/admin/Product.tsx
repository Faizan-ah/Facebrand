import { useState } from "react";

import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import { useAddProduct } from "@/features/useProduct";
import { CreateProduct } from "@/types/product";
import ProductTable from "@/components/admin/ProductTable";
import Modal from "@/components/Modal";

const Product = () => {
  const [newProduct] = useState<CreateProduct>({
    name: "Wireless Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation.",
    images: [
      "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQTQ3?wid=2000&hei=2000&fmt=jpeg&qlt=90&.v=1687660671363"
    ],
    color: "Black",
    meta: {
      category: "Electronics",
      subcategory: "Audio"
    },
    rating: 4.5,
    stock: 100
  });
  const [open, setOpen] = useState(false);
  const toggleModal = () => setOpen(!open);
  const addProduct = useAddProduct();
  return (
    <div>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => (
          <Button className="m-2" onClick={() => addProduct.mutate(newProduct)}>
            Add product
          </Button>
        )}
      />
      <Can permission="ADMIN_PRODUCT:VIEW" permissionType="views" yes={() => <ProductTable />} />
      <Modal open={false} toggleModal={toggleModal} modalTitle="Add product">
        <div></div>
      </Modal>
    </div>
  );
};

export default Product;
