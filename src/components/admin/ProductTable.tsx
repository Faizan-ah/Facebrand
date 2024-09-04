import { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { useDeleteProduct, useGetProducts } from "@/features/useProduct";
import { Button } from "../ui/button";
import AddEditProductModal from "./AddUpdateProductModal";
import { Product } from "@/types/product";
import { PRODUCT_STATUS } from "@/lib/constants";

const ProductTable = () => {
  const deleteProduct = useDeleteProduct();
  const { data: products, isFetching, isError } = useGetProducts();
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>({
    id: "",
    name: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    rating: 0,
    deleted: false
  });
  const toggleModal = () => {
    setOpen(!open);
  };

  const displayProductStatus = (status: string) => {
    switch (status) {
      case PRODUCT_STATUS.ACTIVE:
        return (
          <span className="rounded-full p-2 font-semibold text-white  bg-blue-500">{status}</span>
        );
      case PRODUCT_STATUS.DELETED:
        return (
          <span className="rounded-full p-2 font-semibold text-white bg-red-600">{status}</span>
        );
    }
  };

  return (
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!isFetching &&
            products &&
            products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="w-56">{product.name}</TableCell>
                <TableCell className="max-w-[200px] truncate" title={product.description}>
                  {product.description}
                </TableCell>
                <TableCell>${product.price}</TableCell>
                <TableCell>{product.stock}</TableCell>
                <TableCell>{product.rating}/5</TableCell>
                <TableCell className="text-center">
                  {displayProductStatus(
                    product.deleted ? PRODUCT_STATUS.DELETED : PRODUCT_STATUS.ACTIVE
                  )}
                </TableCell>
                <TableCell>
                  <Button
                    className="mr-2 my-1 w-16"
                    disabled={
                      product.deleted ||
                      (deleteProduct.isPending && deleteProduct.variables === product.id)
                    }
                    onClick={() => {
                      toggleModal();
                      setCurrentProduct(product);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-16"
                    disabled={
                      product.deleted ||
                      (deleteProduct.isPending && deleteProduct.variables === product.id)
                    }
                    onClick={() => deleteProduct.mutate(product.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {isFetching ? (
        <div className="text-center my-2">Loading...</div>
      ) : products.length === 0 && isError ? (
        <div className="text-center my-2">Error fetching products.</div>
      ) : products.length === 0 ? (
        <div className="text-center my-2">No products</div>
      ) : null}
      <AddEditProductModal
        type="Update"
        toggleModal={toggleModal}
        open={open}
        data={currentProduct}
      />
    </div>
  );
};

export default ProductTable;
