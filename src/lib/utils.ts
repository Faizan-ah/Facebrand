import { Token } from "@/types";
import { Cart } from "@/types/cart";
import { ProductWithQuantity } from "@/types/product";
import { type ClassValue, clsx } from "clsx";
import jwtDecode from "jwt-decode";
import { twMerge } from "tailwind-merge";
import { TOKEN_KEY, USER_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const removeDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

export const getDataFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    return data;
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const saveDataToLocalStorage = (key: string, data: any) => {
  return localStorage.setItem(key, JSON.stringify(data));
};

export const getTotalProductPrice = (product: ProductWithQuantity) =>
  product.product.price * product.quantity;

export const calculateTotalCartAmount = (cart: Cart) => {
  return cart.products.reduce((a, b) => {
    return a + getTotalProductPrice(b);
  }, 0);
};

export const isTokenValid = (): boolean => {
  const token = getDataFromLocalStorage(TOKEN_KEY);

  if (!token) {
    return false;
  }

  try {
    const decodedToken: Token = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp > currentTime;
  } catch (e) {
    removeDataFromLocalStorage(TOKEN_KEY);
    return false;
  }
};

export const logout = () => {
  removeDataFromLocalStorage(TOKEN_KEY);
  removeDataFromLocalStorage(USER_KEY);
};

//! deprecated, remove later if not needed
export const handleOnChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  e.preventDefault();
  setState(e.target.value as T);
};
