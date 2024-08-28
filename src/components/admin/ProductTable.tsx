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
import AddEditProductModal from "./AddEditProductModal";
import { Product } from "@/types/product";

const ProductTable = () => {
  const deleteProduct = useDeleteProduct();
  const { data: products, isFetching, isError } = useGetProducts();
  const [open, setOpen] = useState(false);
  const [updateData, setUpdateData] = useState<Product>({
    id: "",
    name: "",
    description: "",
    images: [],
    price: 0,
    stock: 0,
    rating: 0
  });
  const toggleModal = () => {
    setOpen(!open);
  };
  return (
    <div>
      <Table className="w-9/12 mx-auto">
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Rating</TableHead>
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
                <TableCell>
                  <Button
                    className="mr-2 my-1 w-16"
                    disabled={deleteProduct.isPending && deleteProduct.variables === product.id}
                    onClick={() => {
                      toggleModal();
                      setUpdateData(product);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-16"
                    disabled={deleteProduct.isPending && deleteProduct.variables === product.id}
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
      ) : isError ? (
        <div className="text-center my-2">Error fetching products.</div>
      ) : null}
      <AddEditProductModal type="Update" toggleModal={toggleModal} open={open} data={updateData} />
    </div>
  );
};

export default ProductTable;
