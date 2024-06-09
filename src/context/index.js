'use client';

import axios from "axios";
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

    const fetchAuthUserData = () =>{
        let token = Cookies.get('token')
        if(token !== undefined){
            let tokenData = jwt.verify(token,'rajesh8875');
            setIsAuthUser(true);
            
            axios.get(`/api/allusers/${tokenData?._id}`)
            .then(function (response) {
                // handle success
                // console.log(response);
                setUser(response.data.user);
            })
            .catch(function (error) {
                // handle error
                // console.log(error);
                setIsAuthUser(false);
            })
            
        }else{
            setIsAuthUser(false);
        }
    }

    useEffect(()=>{        
       fetchAuthUserData();
    },[Cookies,isAuthUser])

    return(
        <GlobalContext.Provider value={{fetchAuthUserData,todayDate,isAuthUser,setIsAuthUser,user,setUser,componentLevelLoader, setComponentLevelLoader,pageLevelLoader, setPageLevelLoader}}>
            {children}
        </GlobalContext.Provider>
    )
} 

// export default GlobalState;