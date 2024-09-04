import React, { useEffect } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Modal from "../Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddProduct, useUpdateProduct } from "@/features/useProduct";
import { AddOrUpdateProduct, CreateProduct, Product } from "@/types/product";
import { Textarea } from "../ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

//TODO: add type
const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z
    .number({ message: "Price is required" })
    .min(1, { message: "Price must be greater than 0" }),
  description: z.string().min(1, { message: "Description is required" }),
  images: z.array(z.string()).optional(),
  stock: z.number({ message: "Stock is required" }).min(0, { message: "Stock must be at least 0" }),
  deleted: z.boolean().optional()
});

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<AddOrUpdateProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: type === "Update" ? data : {}
  });

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  // Submit handler
  const onSubmit: SubmitHandler<AddOrUpdateProduct> = (formData) => {
    if (type === "Add") {
      const productData: CreateProduct = {
        ...formData,
        images: [],
        rating: 0
      };
      addProduct.mutate(productData, { onSuccess: toggleModal });
    } else {
      const updatedProduct: Product = { ...data, ...formData };
      updateProduct.mutate(updatedProduct, { onSuccess: toggleModal });
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
    <Modal open={open} toggleModal={toggleModal} modalTitle={`${type} Product`} className="w-6/12">
      <div className="w-full md:w-9/12 mt-6">
        <Button>Add images</Button>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="my-3">
            <Label htmlFor="productName">Product Name</Label>
            <Input id="productName" placeholder="Enter name.." {...register("name")} />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="my-3">
            <Label htmlFor="productDescription">Description</Label>
            <Textarea
              id="productDescription"
              placeholder="Enter description.."
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </div>
          <div className="my-3">
            <Label htmlFor="productPrice">Price</Label>
            <Input
              type="number"
              id="productPrice"
              placeholder="Enter price.."
              {...register("price", { valueAsNumber: true })}
            />
            {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
          </div>
          <div className="my-3">
            <Label htmlFor="productStock">Stock</Label>
            <Input
              type="number"
              id="productStock"
              placeholder="Enter stock.."
              {...register("stock", { valueAsNumber: true })}
            />
            {errors.stock && <p className="text-red-500 text-sm">{errors.stock.message}</p>}
          </div>
          <Separator className="mb-3 mt-5" />
          <Button type="submit" disabled={addProduct.isPending || updateProduct.isPending}>
            {`${type} Product`}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditProductModal;
