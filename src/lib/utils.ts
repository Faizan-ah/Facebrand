import { Cart } from "@/types/cart";
import { ProductWithQuantity } from "@/types/product";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

//! deprecated, remove later if not needed
export const handleOnChange = <T>(
  e: React.ChangeEvent<HTMLInputElement>,
  setState: React.Dispatch<React.SetStateAction<T>>
) => {
  e.preventDefault();
  setState(e.target.value as T);
};
