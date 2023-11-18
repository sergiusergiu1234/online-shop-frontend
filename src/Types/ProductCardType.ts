import { Brand } from "./Brand.types";
import { Category } from "./Category.types";
import { Gender } from "./Gender.type";
import { ProductAttribute } from "./ProductAttribute";
import { Size } from "./Size.types";

export  type ProductCardType = {
    id: number;
    name: string;
    price: number;
    sizes:Size[];
  };