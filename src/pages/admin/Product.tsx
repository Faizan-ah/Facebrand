import { useState } from "react";

import { Can } from "@/components/Can";
import { Button } from "@/components/ui/button";
import { useAddProduct } from "@/features/useProduct";
import { CreateProduct } from "@/types/product";
import ProductTable from "@/components/admin/ProductTable";
import Modal from "@/components/Modal";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";

interface AddNewProduct {
  name: string;
  price: number;
  description: string;
  images: string[];
  stock: number;
}

const Product = () => {
  // TODO: validations with zod
  // TODO: add react-toastify for errors
  const { register, watch } = useForm<AddNewProduct>();

  const [open, setOpen] = useState(false);

  const addProduct = useAddProduct();

  const toggleModal = () => setOpen(!open);

  const handleAddProduct = () => {
    const product: CreateProduct = { ...watch(), rating: 0 };
    addProduct.mutate(product, { onSuccess: toggleModal });
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
      <Modal open={open} toggleModal={toggleModal} modalTitle="Add product" className="w-6/12">
        <div className="w-full md:w-9/12 mt-6">
          <Button>Add images</Button>
          <div className="my-3">
            <Label htmlFor="productName">Product name</Label>
            <Input id="productName" placeholder="Enter name.." {...register("name")} />
          </div>
          <div className="my-3">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Enter description.."
              {...register("description")}
            />
          </div>
          <div className="my-3">
            <Label htmlFor="productPrice">Price</Label>
            <Input
              type="number"
              id="productPrice"
              placeholder="Enter price.."
              {...register("price")}
            />
          </div>
          <div className="my-3">
            <Label htmlFor="productStock">Stock</Label>
            <Input
              type="number"
              id="productStock"
              placeholder="Enter stock.."
              {...register("stock")}
            />
          </div>
        </div>
        <Separator className="mb-3 mt-5" />
        <Button onClick={handleAddProduct} disabled={addProduct.isPending}>
          Add Product
        </Button>
      </Modal>
    </div>
  );
};

export default Product;
