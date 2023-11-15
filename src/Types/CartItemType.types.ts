import { ProductType } from "./ProductType.types";

export type CartItemType={
    productSizeId: number;
    productName: string;
    productImage: string;
    price: number;
    quantity:number;
    stock:number;
    product:ProductType;
    size:string;
}