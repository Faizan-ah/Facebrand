import { Action } from "./action";
import { User } from "@/types/user";
import { Cart } from "@/types/cart";
import { ROLE_ADMIN } from "@/lib/accessControl";

export type GlobalState = {
  cart: Cart | null;
  loggedInUser: User | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
};

export const initialState: GlobalState = {
  cart: null,
  loggedInUser: null,
  isAuthenticated: false,
  isAdmin: false
};

export const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        loggedInUser: action.payload,
        isAuthenticated: !!action.payload,
        isAdmin: action.payload?.role === ROLE_ADMIN
      };
    case "SET_CART":
      return { ...state, cart: action.payload };
    default:
      return state;
  }
};
