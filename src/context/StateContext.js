import { createContext, useContext, useEffect, useState } from "react";

const Context = createContext();

export const StateContext = ( { children } ) => {

    const isAlive = "StateContext is alive!";
    const [loading, setLoading] = useState(true);

    useEffect(()=>{
        setTimeout(()=>{
            setLoading(false);
        },2000)
    },[])

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