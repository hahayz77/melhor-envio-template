import { createContext, useContext, useState } from "react";

const Context = createContext();

export const StateContext = ( { children } ) => {

    const isAlive = "StateContext is alive!";
    const [loading, setLoading] = useState(false);

    return(
        <Context.Provider value={{
            isAlive,
            loading, setLoading,
        }}>
        {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context);