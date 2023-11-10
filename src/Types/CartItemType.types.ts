import { ProductType } from "./ProductType.types";

export type CartItemType={
    productId: number;
    productName: string;
    productImage: string;
    price: number;
    quantity:number;
    product:ProductType;
    stock:number;
}