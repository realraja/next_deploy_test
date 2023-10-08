'use client';

import Cookies from "js-cookie";
import jwt from 'jsonwebtoken'
import { usePathname, useRouter } from "next/navigation";

const { createContext, useState, useEffect } = require("react");


export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {

    const todayDate = new Date().getDate()
    const [isAuthUser,setIsAuthUser] = useState(null);
    const [user,setUser] = useState(null);    
    const [pageLevelLoader, setPageLevelLoader] = useState(false);
    const [componentLevelLoader, setComponentLevelLoader] = useState({
        loading: false,
        id: "",
    });

    const router = useRouter();
    const pathName = usePathname();

    useEffect(()=>{
        let token = Cookies.get('token')
        // console.log('token========>',token);
        
        // console.log('token========>',tokenData);


        if(token !== undefined){
            let tokenData = jwt.verify(token,'rajesh8875');
            setIsAuthUser(true);
            // const userData = JSON.parse(localStorage.getItem('user')) || {};
            // console.log(tokenData)
            setUser(tokenData);
        }else{
            setIsAuthUser(false);
        }


        if (!isAuthUser && pathName !== "/comment") {
            router.push("/login");
          }
    },[Cookies,isAuthUser])

    return(
        <GlobalContext.Provider value={{todayDate,isAuthUser,setIsAuthUser,user,setUser,componentLevelLoader, setComponentLevelLoader,pageLevelLoader, setPageLevelLoader}}>
            {children}
        </GlobalContext.Provider>
    )
} 

// export default GlobalState;