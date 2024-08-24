import { Product as ProductType } from "@/types/Product";
import React from "react";
import { useLocation } from "react-router-dom";

const Product = () => {
  const location = useLocation();
  const { product }: { product: ProductType } = location.state;
  return (
    <div>
      Product view
      <div>{product.name}</div>
    </div>
  );
};

export default Product;
