import { Button } from "../components/ui/button";
import { CreateProduct, Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Can } from "@/components/Can";
import { useAddProduct, useGetProduct } from "@/features/useProduct";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routeNames";
import { useDebounce } from "@/hooks/customHooks";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectValue
} from "@/components/ui/select";
import { Controller, useForm } from "react-hook-form";
const ProductCard = (props: { product: Product }) => {
  const navigate = useNavigate();
  const { product } = props;
  const viewProduct = () =>
    navigate(routeNames.public.productDetails + product.id, { state: { product } });
  return (
    <Card key={product.id} className="w-64 h-[24rem] border-none shadow-none">
      <CardHeader className="p-0">
        <img
          onClick={viewProduct}
          src={product.images.length ? product.images[0] : "/images/dummy-placeholder.png"}
          className="max-h-48 max-w-36 hover:cursor-pointer"
        />
        <CardTitle
          onClick={viewProduct}
          className="px-6 h-12 flex items-center hover:cursor-pointer hover:underline"
        >
          {product.name}
        </CardTitle>
        <CardDescription
          className="h-16 px-6"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            overflow: "hidden"
          }}
          title={product.description}
        >
          {product.description}
        </CardDescription>
        {/* // TODO: Implement stars */}
        {/* // TODO: Add review count */}
        <CardDescription className="px-6">Rating: {product.rating}/5</CardDescription>
      </CardHeader>
      <CardFooter className="p-0 px-6 py-2">
        <Button className="w-full">Add | ${product.price}</Button>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  const { register, watch, control, setValue, getValues } = useForm<{
    search: string;
    sortBy: string;
  }>();
  console.log(watch());
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
  const debouncedSearchTerm = useDebounce(watch("search"), 1000);
  const sortOptions = [
    { label: "Price: High to Low", value: "ph" },
    { label: "Price: Low to High ", value: "pl" },
    { label: "Names Ascending", value: "asc" },
    { label: "Names Descending", value: "dsc" },
    { label: "Top rated", value: "tr" }
  ];
  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjQ1MDg5NzYsImV4cCI6MTcyNDU5NTM3Nn0.Vt6FAMfRiA1xrt_9Kd5GSOAvLz1G6C55eLP2f0vraLxCJXU6GkVKG9ldA9nZPyaR";
    localStorage.setItem("authToken", token);
  }, []);

  const {
    data: products,
    isLoading,
    isError
  } = useGetProduct(debouncedSearchTerm, getValues("sortBy"));
  const addProduct = useAddProduct();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products.</div>;

  return (
    <div className="flex flex-col justify-center items-center flex-wrap">
      <h1 className="text-2xl my-2">Welcome!</h1>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => <Button onClick={() => addProduct.mutate(newProduct)}>Add product</Button>}
      />
      <div className="flex gap-5 my-3">
        <Input type="search" {...register("search")} placeholder="Search products.." />
        <Controller
          name="sortBy"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value);
                setValue("sortBy", value);
              }}
            >
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />
      </div>
      <Can
        permission="PRODUCT:GET"
        permissionType="actions"
        yes={() => (
          <div className="grid grid-cols-4 gap-10 my-2">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      />
    </div>
  );
};

export default Home;
