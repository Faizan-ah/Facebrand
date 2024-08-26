import React from "react";
import { Button } from "../ui/button";
import { Product, ProductWithQuantity } from "@/types/product";
import { useAddToCart, useGetCart } from "@/features/useCart";

const DisplayCart = (props: { userId: string }) => {
  const { userId } = props;
  const { data: cart } = useGetCart(userId);
  const addToCart = useAddToCart();

  //TODO: maybe remove this when cart is properly structured
  const handleAddProductToCart = (product: Product, type: boolean) => {
    const currentQuantity = cart?.products?.find((p) => p.product.id === product.id)?.quantity ?? 0;

    const cartBody = {
      userId: userId,
      productId: product.id,
      quantity: type ? currentQuantity + 1 : currentQuantity - 1
    };

    addToCart.mutate(cartBody);
  };

  const getTotalPrice = (product: ProductWithQuantity) => product.product.price * product.quantity;

  return (
    <div>
      {cart.products.length ? (
        cart.products.map((product) => (
          <div
            key={product.product.id}
            className="border-b border-b-1 border-grey p-3 flex justify-between items-center"
          >
            <div>
              <span>{product.product.name}</span>
              <p className="text-sm font-semibold">${getTotalPrice(product)}</p>
            </div>
            <div>
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
        ))
      ) : (
        <div className="text-center">Cart is empty</div>
      )}
    </div>
  );
};

export default DisplayCart;
