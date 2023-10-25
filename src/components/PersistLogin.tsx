import { useEffect, useState } from "react"
import useAuth from "../hooks/useAuth";
import { Outlet } from "react-router";

const PersistLogin = ()=>{
    const [isLoadig, setIsLoading] = useState(true);
    const {auth} = useAuth();
    const {setAuth} = useAuth();
    useEffect(()=>{

        const verifyStorage = () =>{
                const accessToken = window.localStorage.getItem("accessToken");
                const roles = window.localStorage.getItem("roles")?.split(",");
                const user = window.localStorage.getItem("user");

                if(user != null && roles !=null && accessToken !=null){
                    setAuth({user,roles,accessToken})     
                }
                setIsLoading(false);
        }
        !auth?.accessToken ? verifyStorage() : setIsLoading(false);
    },[])



    return(
        <>
        {isLoadig
            ? <p>Loading...</p>
            : <Outlet />
        }
        </>
    )
}

export default PersistLogin;