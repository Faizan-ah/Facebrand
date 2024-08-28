import { Product } from "@/types/product";
import { Action } from "./action";
import { User } from "@/types/user";
import { Cart } from "@/types/cart";

export interface GlobalState {
  products: Product[];
  users: User[];
  cart: Cart | null;
}

export const initialState: GlobalState = {
  products: [],
  users: [],
  cart: null
};

export const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
