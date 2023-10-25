import { createContext, useState } from "react"
import { CartItemType } from "../Types/CartItemType.types";
export type OrderContent = {
    order: {
      items: CartItemType[];
      total:number;
      personal: {
        name: string;
        phone: string;
      };
      address: {
        street: string;
        province: string;
        city: string;
        zipcode: number;
      };
      payment:string
    };
    setOrder: React.Dispatch<
      React.SetStateAction<OrderContent["order"]>
    >;
  };
const OrderContext = createContext<OrderContent>({
    order: {
      items: [] as CartItemType[],
      total: 0,
      personal: {
        name: "",
        phone: ""
      },
      address: {
        street: "",
        province: "",
        city: "",
        zipcode: 9999
      },
      payment:""
    },
    setOrder: () => {}
  });

type OrderProviderProps ={
    children: React.ReactNode;
}
export const OrderDetailsProvider =({children}: OrderProviderProps)=>{
    const [order,setOrder] = useState({
        items:[] as CartItemType[],
        total:0,
        personal:{
            name:"",
            phone:""
        },
        address:{
            street:"",
            province:"",
            city:"",
            zipcode:9999
        },
        payment:""
    });

    return (
        <OrderContext.Provider value={{order, setOrder:setOrder}}>
            {children}
        </OrderContext.Provider>
    )
}

export default OrderContext;