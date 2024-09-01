import { createContext, useReducer, ReactNode, Dispatch, useEffect } from "react";

import { Action } from "./action";
import { globalReducer, GlobalState, initialState } from "./reducer";
import { getDataFromLocalStorage } from "@/lib/utils";
import { TOKEN_KEY, USER_KEY } from "@/lib/constants";

// Context
export const GlobalStateContext = createContext<
  | {
      state: GlobalState;
      dispatch: Dispatch<Action>;
    }
  | undefined
>(undefined);

// Provider
export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    const token = getDataFromLocalStorage(TOKEN_KEY);
    const user = getDataFromLocalStorage(USER_KEY);
    if (token && user) {
      dispatch({ type: "SET_USER", payload: user });
    }
  }, []);

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
