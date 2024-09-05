import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { useAddToCart, useGetCart } from "@/features/useCart";
import { routeNames } from "@/routes/routeNames";
import { Product as ProductType } from "@/types/product";
import { useGlobalState } from "@/hooks/useGlobalState";

const Product = () => {
  const navigate = useNavigate();
  const location = useLocation();

  //TODO: fetch product by id
  const { product }: { product: ProductType } = location.state;

  const [fullDescription, setFullDescription] = useState(false);

  const { state } = useGlobalState();
  const addToCart = useAddToCart();

  const userId = state.loggedInUser?.id;
  const description = fullDescription ? product.description : product.description.slice(0, 700);

  const showFullDescriptionHandler = () => {
    setFullDescription(!fullDescription);
  };

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

  return (
    <div className="flex flex-col lg:flex-row w-[85%] max-w-screen-xl mx-auto mt-8 p-4 lg:p-8">
      <div className="lg:w-1/2 w-full mt-6">
        <img
          src={product.images?.length ? product.images[0] : "/images/dummy-placeholder.png"}
          className="w-full max-w-xs lg:max-w-md object-contain hover:scale-105 transition-transform duration-300"
          alt={product.name}
        />
      </div>
      <div className="lg:w-1/2 w-full flex flex-col justify-between p-4 lg:ml-8">
        <h1 className="text-2xl lg:text-4xl font-semibold mb-4">{product.name}</h1>
        <p className="text-sm lg:text-base mb-4 text-gray-700">
          <p className="whitespace-pre-line">{description}</p>
          {product.description.length > 700 && (
            <>
              <span>{!fullDescription && "..."}</span>
              <span
                className="text-blue-500 hover:underline hover:cursor-pointer mx-1"
                onClick={showFullDescriptionHandler}
              >
                Read {fullDescription ? "Less" : "More"}
              </span>
            </>
          )}
        </p>
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-6">
          <div>
            <div className="text-xl lg:text-2xl font-bold mb-2">
              Price: <span className="text-green-600">${product.price}</span>
            </div>
            <div className="text-lg lg:text-xl">
              Rating: <span className="font-semibold">{product.rating}/5</span>
            </div>
          </div>
          <Button
            className="mt-4 lg:mt-0 lg:ml-6 w-full lg:w-auto"
            onClick={handleAddProductToCart}
          >
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
