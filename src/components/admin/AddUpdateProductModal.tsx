import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { useForm } from "react-hook-form";
import { useAddProduct, useUpdateProduct } from "@/features/useProduct";
import { AddOrUpdateProduct, CreateProduct, Product } from "@/types/product";
import { Textarea } from "../ui/textarea";

type AddEditProductModalBaseProps = {
  open: boolean;
  toggleModal: () => void;
  type: "Update" | "Add";
  data?: Product;
};

type AddProductModalProps = AddEditProductModalBaseProps & {
  type: "Add";
};

type UpdateProductModalProps = AddEditProductModalBaseProps & {
  type: "Update";
  data: Product;
};

type AddEditProductModalProps = AddProductModalProps | UpdateProductModalProps;

const AddEditProductModal: React.FC<AddEditProductModalProps> = ({
  open,
  toggleModal,
  type,
  data
}) => {
  const { register, watch, reset } = useForm<AddOrUpdateProduct>({
    defaultValues: type === "Update" ? data : {} // Set default values only for Update
  });

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();
  const handleAddUpdateProduct = () => {
    if (type === "Add") {
      const product: CreateProduct = { ...watch(), rating: 0 };
      addProduct.mutate(product, { onSuccess: toggleModal });
    } else {
      const product: Product = { ...data, ...watch() };
      updateProduct.mutate(product, { onSuccess: toggleModal });
    }
  };

  useEffect(() => {
    if (open) {
      if (type === "Update" && data) {
        reset(data);
      } else if (type === "Add") {
        reset();
      }
    }
  }, [open, data, type, reset]);

  return (
    <Modal open={open} toggleModal={toggleModal} modalTitle={`${type} product`} className="w-6/12">
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
      <Button onClick={handleAddUpdateProduct} disabled={addProduct.isPending}>
        {`${type} Product`}
      </Button>
    </Modal>
  );
};

export default AddEditProductModal;
