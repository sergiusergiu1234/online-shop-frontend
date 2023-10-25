import { OrderDetail } from "./OrderDetail.types"

export type OrderType ={
    id:number,
    userId:number,
    billingName:string,
    deliveryAddress:string,
    orderDetails: OrderDetail[],
    status:string,
    total:number,
    generationDateTime: string,
    paymentMethod:string;
}