import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import Modal from "@/components/Modal";
import { useForm, SubmitHandler } from "react-hook-form";
import { useAddProduct, useUpdateProduct } from "@/features/useProduct";
import { AddOrUpdateProduct, CreateProduct, Product } from "@/types/product";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Loader from "@/components/Loader";
import { uploadImageToImgBB } from "@/lib/imageUpload";

const ProductSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  price: z
    .number({ message: "Price is required" })
    .min(0.01, { message: "Price must be greater than 0" }),
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
    reset,
    setValue
  } = useForm<AddOrUpdateProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: type === "Update" ? data : {}
  });

  const addProduct = useAddProduct();
  const updateProduct = useUpdateProduct();

  const [imagePreviews, setImagePreviews] = useState<string[]>(data?.images || []);

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const uploadPromises = Array.from(files).map((file) => uploadImageToImgBB(file));
      Promise.all(uploadPromises)
        .then((imageUrls) => {
          setImagePreviews([...imagePreviews, ...imageUrls]);
          setValue("images", [...imagePreviews, ...imageUrls]);
        })
        .catch((error) => console.error("Image upload failed: ", error));
    }
  };

  const removeImage = async (imageUrl: string) => {
    const updatedImages = imagePreviews.filter((url) => url !== imageUrl);
    setImagePreviews(updatedImages);
    setValue("images", updatedImages);
  };

  //!Bug: fix image bug
  const onSubmit: SubmitHandler<AddOrUpdateProduct> = (formData) => {
    if (type === "Add") {
      const productData: CreateProduct = {
        ...formData,
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
        setImagePreviews(data.images || []);
      } else if (type === "Add") {
        reset();
        setImagePreviews([]);
      }
    }
  }, [open, data, type, reset]);

  return (
    <Modal open={open} toggleModal={toggleModal} modalTitle={`${type} Product`} className="w-6/12">
      <div className="w-full md:w-9/12 mt-6">
        <div className="my-3">
          <Label htmlFor="productImages">Product Images</Label>
          <Input
            type="file"
            id="productImages"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          <div className="flex flex-wrap gap-2 mt-2">
            {imagePreviews.map((image, index) => (
              <div key={index} className="relative w-24 h-24">
                <img
                  src={image}
                  alt={`Product Preview ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <Button
                  type="button"
                  onClick={() => removeImage(image)}
                  className="absolute top-0 right-0 w-1 h-1 bg-red-500 text-white"
                >
                  X
                </Button>
              </div>
            ))}
          </div>
        </div>
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
              step="any"
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
            <Loader
              width="20"
              height="20"
              color="white"
              visible={addProduct.isPending || updateProduct.isPending}
              wrapperClass="mr-1 flex justify-center items-center"
            />
            {`${type} Product`}
          </Button>
        </form>
      </div>
    </Modal>
  );
};

export default AddEditProductModal;
