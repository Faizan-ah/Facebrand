import { Button } from "../ui/button";
import { Product } from "@/types/product";
import { useAddToCart, useGetCart } from "@/features/useCart";
import { routeNames } from "@/routes/routeNames";
import { useNavigate } from "react-router-dom";
import { calculateTotalCartAmount, getTotalProductPrice } from "@/lib/utils";
import { useGlobalState } from "@/hooks/useGlobalState";

const DisplayCart = (props: { userId: string }) => {
  const { userId } = props;
  const navigate = useNavigate();
  const { state } = useGlobalState();
  const { data: cart, isFetching } = useGetCart(userId);
  const addToCart = useAddToCart();

  const isLoadingAddToCart = addToCart.isPending;

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

  const handleCheckout = () => {
    navigate(routeNames.user.cart);
  };

  return (
    <div>
      {state.isAuthenticated && cart.products.length ? (
        cart.products.map((product) => (
          <div
            key={product.product.id}
            className="border-b border-b-1 border-grey p-3 flex justify-between items-center"
          >
            <div>
              <span>{product.product.name}</span>
              <p className="text-sm font-semibold">${getTotalProductPrice(product)}</p>
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
        <div className="border-b border-b-1 border-grey p-3 text-center">Cart is empty</div>
      )}
      <div className="flex justify-between items-center my-2 ">
        {state.isAuthenticated && cart.products.length > 0 && (
          <div className="pl-3">
            <h2 className="font-semibold">Total</h2>
            <span>${calculateTotalCartAmount(cart)}</span>
          </div>
        )}
        <Button
          disabled={
            !state.isAuthenticated || cart.products.length === 0 || isFetching || isLoadingAddToCart
          }
          className="mr-0 ml-auto"
          onClick={handleCheckout}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default DisplayCart;
