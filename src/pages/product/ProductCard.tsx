import { Button } from "@/components/ui/button";
import { Product } from "@/types/Product";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routeNames";

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
export default ProductCard;
