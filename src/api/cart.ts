import { Cart, CartCreate } from "@/types/cart";
import api from ".";
import { AxiosResponse } from "axios";
import { GlobalResponse } from "@/types";

export const createEmptyCart = (): Cart => ({
  cartId: null,
  user: null,
  products: []
});

//GET CART
export const getUserCart = async (id: string) => {
  try {
    const response: AxiosResponse<GlobalResponse<Cart>> = await api.get("/carts/" + id);
    return response.data.data ?? createEmptyCart();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return createEmptyCart();
  }
};

//ADD PRODUCT TO CART
export const addToCart = async (cart: CartCreate) => {
  try {
    const res: AxiosResponse<GlobalResponse<Cart>> = await api.post("/carts", cart);
    return res.data.data;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
