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
const ProductTable = () => {
  const deleteProduct = useDeleteProduct();
  const { data: products, isFetching, isError } = useGetProducts();

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
    </div>
  );
};

export default ProductTable;
