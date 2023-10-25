import React from "react";
import { createContext, useState , ReactNode} from "react";

export type AuthContent ={
    auth: {
        user: string | null,
        roles: string[],
        accessToken: string | null,
    }
    setAuth: React.Dispatch<React.SetStateAction<{ user: string;  roles: string[]; accessToken: string; }>>
}

const AuthContext = createContext<AuthContent>({
    auth: {
        user: "",
        roles : [""],
        accessToken: ""
    },
    setAuth: ()=>{}
});

type AuthProviderProps={
    children: React.ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
    const [auth, setAuth] = useState(
        {
            user: "",
            roles : [""],
            accessToken: ""
        }
    );
    return (
        <AuthContext.Provider value={{ auth, setAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;