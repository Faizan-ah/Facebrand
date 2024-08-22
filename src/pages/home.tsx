import { Button } from "../components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "@/api/products";
import { Product } from "@/types/Product";
import { useEffect } from "react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Can } from "@/components/Can";

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
  const queryClient = useQueryClient();

  const body = {
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
  };

  useEffect(() => {
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjQyNDcxNDMsImV4cCI6MTcyNDMzMzU0M30.7xCa1-CnLTPnLNxcsnBsRO35EIiHbDTgdhLmZ6zQ3gkEWCzO4gDsQaOm6OvKyBMX";
    localStorage.setItem("authToken", token);
  }, []);

  const {
    data: products,
    isLoading,
    isError
  } = useQuery({
    queryKey: ["getProductList"],
    queryFn: getAllProducts
  });

  const mutation = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getProductList"] });
    }
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching products.</div>;

  return (
    <div className="flex flex-col justify-center items-center flex-wrap w-screen">
      <h1 className="text-2xl my-2">Welcome!</h1>
      <Can
        permission="PRODUCT:ADD"
        permissionType="actions"
        yes={() => <Button onClick={() => mutation.mutate(body)}>Add product</Button>}
      />

      <Can
        permission="PRODUCT:GET"
        permissionType="actions"
        yes={() => (
          <div className="flex justify-center items-center gap-10 flex-wrap my-2">
            {products &&
              products.map((product: Product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
        )}
      />
    </div>
  );
};

export default Home;
