import { Button } from "../components/ui/button";
import { CreateProduct, Product } from "@/types/Product";
import { useEffect, useState } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Can } from "@/components/Can";
import { useAddProduct, useGetProduct } from "@/features/useProduct";

const ProductCard = (props: { product: Product }) => {
  const { product } = props;
  return (
    <Card key={product.id} className="w-[350px]">
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button>Add to cart</Button>
      </CardFooter>
    </Card>
  );
};

const Home = () => {
  const [newProduct] = useState<CreateProduct>({
    name: "Wireless Headphones",
    price: 199.99,
    description: "High-quality wireless headphones with noise cancellation.",
    images: ["image1.jpg", "image2.jpg"],
    color: "Black",
    meta: {
      category: "Electronics",
      subcategory: "Audio"
    },
    rating: 4.5,
    quantity: 100
  });

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjQ0Mjk1NjQsImV4cCI6MTcyNDUxNTk2NH0.VRNBMVO2VP9IFVPEOs4qEVmxpsZnRhxutpyNlYRyOL4a0zxEOEcFR8b5n97DB-1O";
    localStorage.setItem("authToken", token);
  }, []);

  const { data: products, isLoading, isError } = useGetProduct();
  const addProduct = useAddProduct();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products.</div>;

  return (
    <div className="flex flex-col justify-center items-center flex-wrap w-screen">
      <h1 className="text-2xl my-2">Welcome!</h1>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => <Button onClick={() => addProduct.mutate(newProduct)}>Add product</Button>}
      />

      <Can
        permission="PRODUCT:GET"
        permissionType="actions"
        yes={() => (
          <div className="flex justify-center items-center gap-10 flex-wrap my-2">
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
