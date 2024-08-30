import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAddToCart, useGetCart } from "@/features/useCart";
import { getDataFromLocalStorage } from "@/lib/utils";
import { routeNames } from "@/routes/routeNames";
import { Product as ProductType } from "@/types/product";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { product }: { product: ProductType } = location.state;

  const [fullDescription, setFullDescription] = useState(false);

  const userId = getDataFromLocalStorage("user")?.id;
  const description = fullDescription ? product.description : product.description.slice(0, 700);

  //TODO: find a better solution when cart structure is good
  const { data: cart } = userId?.trim() ? useGetCart(userId) : { data: undefined };
  const addToCart = useAddToCart();

  const showFullDescriptionHandler = () => {
    setFullDescription(!fullDescription);
  };

  const handleAddProductToCart = () => {
    if (userId) {
      const currentQuantity =
        cart?.products?.find((p) => p.product.id === product.id)?.quantity ?? 0;
      const cartBody = {
        userId: userId,
        productId: product.id,
        quantity: currentQuantity + 1
      };

      addToCart.mutate(cartBody);
    } else {
      navigate(routeNames.public.login);
    }
  };

  return (
    <div className="flex w-9/12 justify-evenly mx-auto mt-6">
      <img
        src={product.images?.length ? product.images[0] : "/images/dummy-placeholder.png"}
        className="max-h-72 max-w-72 hover:cursor-pointer "
      />
      <div>
        <h1 className="text-3xl font-semibold py-2 mt-6">{product.name}</h1>
        <p className="min-h-[100px]">
          {description}
          {product.description.length > 700 ? (
            <>
              <span>{!fullDescription && "..."}</span>
              <span
                className="text-blue-500 hover:underline hover:cursor-pointer mx-1"
                onClick={showFullDescriptionHandler}
              >
                Read {fullDescription ? "Less" : "More"}
              </span>
            </>
          ) : null}
        </p>
        <div className="flex justify-between items-center my-2">
          <div>
            <div className="text-xl">
              <span className="text-xl font-semibold">Price: </span>${product.price}
            </div>
            <div className="text-xl">
              <span className="text-xl font-semibold">Rating: </span> {product.rating}/5
            </div>
          </div>
          <Button className="mr-4" onClick={handleAddProductToCart}>
            Add to cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
