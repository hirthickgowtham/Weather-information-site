import {  createContext } from "react";
import { useState } from "react";




export const GlobalContext = createContext(null)

export default function GlobalState({children}){

    const [isAuthenticated,setisAuthenticated] = useState(false)

    return <GlobalContext.Provider value={{isAuthenticated,setisAuthenticated}}>{children}</GlobalContext.Provider>
}