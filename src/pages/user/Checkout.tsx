import { Can } from "@/components/Can";
import CheckoutComponent from "@/components/user/Checkout";

const Cart = () => {
  return <Can permission="CART:VIEW" permissionType="views" yes={() => <CheckoutComponent />} />;
};

export default Cart;
