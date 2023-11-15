import { Brand } from "./Brand.types"
import { Category } from "./Category.types"
import { Gender } from "./Gender.type"
import { ProductAttribute } from "./ProductAttribute"

import { ProductSize } from "./ProductSize.types"
import { Size } from "./Size.types"

export type ProductDetails = {
    id:number,
    name:string,
    price:number,
    image:string,
    description:string,
    brand:Brand,
    gender:Gender,
    category:Category,
    isFavorite:boolean,
    sizes:ProductSize[],
    attributes:ProductAttribute[]

}