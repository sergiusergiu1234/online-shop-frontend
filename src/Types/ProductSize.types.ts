import { Size } from "./Size.types"

export type ProductSize = {
    productSizeId:number,
    size:Size
    productId:number,
    stock:number,
    favorite:boolean
}