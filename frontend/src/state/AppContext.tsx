import React, { createContext, Dispatch } from "react";
import { useReducerAsync } from "use-reducer-async";
import { initialState, rootReducer, RootState } from "./rootReducer";
import { AnyAction } from "./actions";
import { asyncActionHandlers } from "./asyncActionHandlers";

const AppContext = createContext<{
  state: RootState;
  dispatch: Dispatch<AnyAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const AppProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducerAsync(
    rootReducer,
    initialState,
    asyncActionHandlers
  );

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export { AppProvider, AppContext };
