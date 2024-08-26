import { Cart, CartCreate } from "@/types/cart";
import api from ".";
import { AxiosResponse } from "axios";

export const createEmptyCart = (): Cart => ({
  cartId: null,
  user: null,
  products: []
});

export const getUserCart = async (id: string) => {
  try {
    const response: AxiosResponse<{ data: Cart }> = await api.get("/carts/" + id);
    return response.data.data ?? createEmptyCart();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return createEmptyCart();
  }
};

export const addToCart = async (cart: CartCreate) => {
  try {
    const res = await api.post("/carts", cart);
    return res;
  } catch (error) {
    console.error(error);
    return Promise.reject(new Error("Something went wrong"));
  }
};
