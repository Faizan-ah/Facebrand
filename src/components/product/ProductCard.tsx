import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routeNames";
import { useAddToCart, useGetCart } from "@/features/useCart";
import { useGlobalState } from "@/hooks/useGlobalState";

type Props = {
  product: Product;
  userId: string;
};

const ProductCard = (props: Props) => {
  const navigate = useNavigate();
  const { product } = props;
  const { state } = useGlobalState();
  const addToCart = useAddToCart();
  const userId = state.loggedInUser?.id;

  //TODO: find a better solution when cart structure is good
  const { data: cart } = useGetCart(userId || "");

  const handleAddProductToCart = () => {
    if (!userId) {
      navigate(routeNames.public.login);
      return;
    }

    const currentQuantity = cart?.products?.find((p) => p.product.id === product.id)?.quantity ?? 0;

    const cartBody = {
      userId: userId,
      productId: product.id,
      quantity: currentQuantity + 1
    };

    addToCart.mutate(cartBody);
  };

  const viewProduct = () =>
    navigate(routeNames.public.productDetails + product.id, { state: { product } });
  return (
    <Card key={product.id} className="w-64 border-none h-[24rem] shadow-none">
      <CardHeader className="p-0">
        <img
          onClick={viewProduct}
          src={product.images?.length ? product.images[0] : "/images/dummy-placeholder.png"}
          className="h-48 w-full mx-auto hover:cursor-pointer"
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
        {/* //TODO: Implement stars */}
        {/* //TODO: Add review count */}
        <CardDescription className="px-6">Rating: {product.rating}/5</CardDescription>
      </CardHeader>
      <CardFooter className="p-0 px-6 py-2">
        <Button className="w-full" onClick={handleAddProductToCart}>
          Add | ${product.price}
        </Button>
      </CardFooter>
    </Card>
  );
};
export default ProductCard;
