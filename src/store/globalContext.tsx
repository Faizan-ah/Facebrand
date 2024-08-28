import { createContext, useReducer, ReactNode, Dispatch } from "react";

import { Action } from "./action";
import { globalReducer, GlobalState, initialState } from "./reducer";

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

  return (
    <GlobalStateContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalStateContext.Provider>
  );
};
