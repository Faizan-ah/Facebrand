import { User } from "@/types/user";
import { Product } from "@/types/product";
import { Cart } from "@/types/cart";

export type Action =
  | { type: "SET_PRODUCTS"; payload: Product[] }
  | { type: "SET_USERS"; payload: User[] }
  | { type: "SET_CART"; payload: Cart | null };
