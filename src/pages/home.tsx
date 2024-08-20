import { Button } from "../components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createProduct, getAllProducts } from "@/api/products";
import { Product } from "@/types";
import { useEffect } from "react";

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
      "eyJhbGciOiJIUzM4NCJ9.eyJzdWIiOiJhZG1pbkBnbWFpbC5jb20iLCJpYXQiOjE3MjQxNTczMzAsImV4cCI6MTcyNDI0MzczMH0.S8mEsyl7d1vS7WOlHYEJU7Gbdw2go2IeGH3qRUsHzSduVHQX1n6HuDkIr6RshDEe";
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
    <div className="flex flex-col justify-center items-center gap-10 h-screen">
      <h1 className="text-2xl">Welcome!</h1>
      <Button onClick={() => mutation.mutate(body)}>Add product</Button>
      {products && products.map((product: Product) => <div key={product.id}>{product.name}</div>)}
    </div>
  );
};

export default Home;
