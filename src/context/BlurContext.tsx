import { createContext, useContext } from "react";

export type BlurContextType ={
    blurred:boolean;
    setBlurred: (c:boolean) => void 
}

export const BlurContext = createContext<BlurContextType>({
    blurred:false,
    setBlurred: ()=>{}
});

export const useBlurContext=()=> useContext(BlurContext);