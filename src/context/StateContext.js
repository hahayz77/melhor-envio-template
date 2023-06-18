import { createContext, useContext } from "react";

const Context = createContext();

export const StateContext = ( { children } ) => {

    const isAlive = "StateContext is alive!";

    return(
        <Context.Provider value={{
            isAlive,
        }}>
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);