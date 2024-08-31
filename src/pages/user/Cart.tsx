import { Can } from "@/components/Can";
import CartComponent from "@/components/user/Cart";

const Cart = () => {
  return <Can permission="CART:VIEW" permissionType="views" yes={() => <CartComponent />} />;
};

export default Cart;
