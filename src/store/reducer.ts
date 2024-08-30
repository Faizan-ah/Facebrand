import { Product } from "@/types/product";
import { Action } from "./action";
import { User } from "@/types/user";
import { Cart } from "@/types/cart";

export type GlobalState = {
  products: Product[];
  users: User[];
  cart: Cart | null;
  loggedInUser: User | null;
};

export const initialState: GlobalState = {
  products: [],
  users: [],
  cart: null,
  loggedInUser: null
};

export const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "SET_USER":
      return { ...state, loggedInUser: action.payload };
    case "SET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
