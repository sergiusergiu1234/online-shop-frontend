import { useLocation,  Outlet, Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import AuthContext from "../context/AuthProvider";
import { useContext, useEffect } from "react";

interface RequireAuthProps{
    allowedRoles: string[];
}


const RequireAuth :React.FC<RequireAuthProps> = ({ allowedRoles }) => {
    const { auth } = useAuth();
    const location = useLocation();

    return (
        auth?.roles?.find((role:string)=> allowedRoles.includes(role))
        ?
        <Outlet /> 
        :auth?.user ? <Navigate to="/unauthorized" state ={{from: location}} replace />
        :
         <Navigate to= "/LoginPage" state ={{from: location}} replace />
    );
}

export default RequireAuth;