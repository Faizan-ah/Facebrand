import { useEffect, useState } from "react";

import { useAddToCart, useGetCart } from "@/features/useCart";
import {
  calculateTotalCartAmount,
  getDataFromLocalStorage,
  getTotalProductPrice
} from "@/lib/utils";
import { User } from "@/types/user";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { routeNames } from "@/routes/routeNames";
import { Product } from "@/types/product";

const Cart = () => {
  const [userId, setUserId] = useState("");

  const navigate = useNavigate();
  useEffect(() => {
    const user: User = getDataFromLocalStorage("user");
    if (user?.id) {
      setUserId(user.id);
    }
  }, []);

  const { data: cart, isFetching } = useGetCart(userId, {
    enabled: !!userId
  });
  const addToCart = useAddToCart();

  const handleCheckout = () => {
    navigate(routeNames.user.checkout, { state: { cart, userId } });
  };

  //TODO: maybe remove this when cart is properly structured
  const handleAddProductToCart = (product: Product, increment: boolean) => {
    const currentQuantity = cart?.products?.find((p) => p.product.id === product.id)?.quantity ?? 0;

    const cartBody = {
      userId: userId,
      productId: product.id,
      quantity: increment ? currentQuantity + 1 : currentQuantity - 1
    };

    //TODO: use global state when cart is moved to navbar
    addToCart.mutate(cartBody);
  };
  return (
    <div className="mt-5 md:w-11/12 md:mx-auto md:gap-x-14 flex justify-center md:flex-row flex-col">
      <div className="md:w-6/12 md:px-0 px-3 w-full ">
        <h1 className="text-4xl font-semibold my-3">Your cart</h1>
        {!isFetching && cart.products.length ? (
          cart.products.map((product) => (
            <div
              key={product.product.id}
              className="border border-1 border-grey p-3 flex justify-between items-center"
            >
              <div className="flex justify-around items-center">
                <img
                  src={
                    product.product.images?.length
                      ? product.product.images[0]
                      : "/images/dummy-placeholder.png"
                  }
                  className="max-h-24 hover:cursor-pointer"
                />
                <div className="pl-5 flex justify-evenly flex-col">
                  <span
                    title={product.product.name}
                    className="text-2xl max-w-sm overflow-hidden text-ellipsis"
                  >
                    {product.product.name}
                  </span>
                  <p className="text-xl font-semibold">${getTotalProductPrice(product)}</p>
                  <div className="">
                    <Button
                      variant="secondary"
                      onClick={() => handleAddProductToCart(product.product, false)}
                    >
                      -
                    </Button>
                    <span className="mx-2">{product.quantity}</span>
                    <Button
                      variant="secondary"
                      onClick={() => handleAddProductToCart(product.product, true)}
                    >
                      +
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div>
            <h2 className="text-2xl my-3">No Items in your cart</h2>
            <Button onClick={() => navigate(routeNames.public.home)}>Continue Shopping</Button>
          </div>
        )}
      </div>
      {!isFetching && cart.products.length ? (
        <div className="md:w-3/12 border h-72 mt-16 p-3 mx-3 md:mx-0 flex justify-center flex-col">
          <h1 className="text-4xl font-semibold">Sub total</h1>
          <span>(excludes shipping)</span>
          <h2 className="text-2xl font-semibold">${calculateTotalCartAmount(cart)}</h2>
          <Button
            className="my-2 sm:max-md:w-5/12 w-full  bg-green-500"
            variant={"outline"}
            onClick={handleCheckout}
          >
            Checkout
          </Button>
          <img src="/images/payment-logos.avif" className="md:h-20 sm:max-md:w-4/12 w-full  my-2" />
        </div>
      ) : null}
    </div>
  );
};

export default Cart;
