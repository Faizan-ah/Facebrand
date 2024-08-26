import { useState } from "react";

import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import { useAddProduct } from "@/features/useProduct";
import { CreateProduct } from "@/types/product";

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
    quantity: 100
  });
  const addProduct = useAddProduct();

  return (
    <div>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => <Button onClick={() => addProduct.mutate(newProduct)}>Add product</Button>}
      />
    </div>
  );
};

export default Product;
