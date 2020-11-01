import React, { createContext, Dispatch, useReducer } from "react";
import { initialState, rootReducer, RootState } from "./rootReducer";
import { AnyAction } from "./actions";

const AppContext = createContext<{
  state: RootState;
  dispatch: Dispatch<AnyAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(rootReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
