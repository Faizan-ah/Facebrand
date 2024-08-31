import { useLocation, useNavigate } from "react-router-dom";

import { calculateTotalCartAmount } from "@/lib/utils";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Label } from "../ui/label";
import { Separator } from "../ui/separator";
import { useCreateOrder } from "@/features/useOrder";
import { OrderCreate } from "@/types/order";
import { Product, ProductWithQuantity } from "@/types/product";
import { ORDER_STATUS } from "@/lib/constants";
import { routeNames } from "@/routes/routeNames";

const Checkout = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { cart, userId } = location.state;

  const { register, watch } = useForm<{ address: string; comments: string }>();

  const createOrder = useCreateOrder();

  const handlePayNow = () => {
    //TODO: backend cart does not handle quantity
    const products: Product[] = cart?.products?.map(
      (product: ProductWithQuantity) => product.product
    );
    const body: OrderCreate = { ...watch(), userId, products, status: ORDER_STATUS.PENDING };
    createOrder.mutate(body, { onSuccess: () => navigate(routeNames.public.home) });
  };

  return (
    <div className="mt-5 md:w-11/12 md:mx-auto md:gap-x-14 flex justify-center md:flex-row flex-col">
      <div className="md:w-6/12 md:px-0 px-3 w-full ">
        <h1 className="text-4xl font-semibold my-3">Your information</h1>
        <div className="border border-1 border-grey p-3">
          <Label htmlFor="address">Address</Label>
          <Input className="my-2" placeholder="Enter address.." {...register("address")} />
          <Label htmlFor="comments">Comments</Label>
          <Input className="my-2" placeholder="Enter comments.." {...register("comments")} />
        </div>
      </div>
      {cart.products.length ? (
        <div className="md:w-3/12 border h-72 mt-16 p-3 mx-3 md:mx-0 flex justify-center flex-col">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Subtotal</h1>
            <h2 className="text-xl font-semibold">${calculateTotalCartAmount(cart)}</h2>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Shipping</h1>
            <h2 className="text-xl font-semibold">FREE</h2>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-semibold">Total</h1>
            <h2 className="text-xl font-semibold">${calculateTotalCartAmount(cart)}</h2>
          </div>
          <Button
            className="my-2 sm:max-md:w-5/12 w-full  bg-green-500"
            variant={"outline"}
            onClick={handlePayNow}
          >
            Pay now
          </Button>
          <img src="/images/payment-logos.avif" className="md:h-20 sm:max-md:w-4/12 w-full  my-2" />
        </div>
      ) : null}
    </div>
  );
};

export default Checkout;
