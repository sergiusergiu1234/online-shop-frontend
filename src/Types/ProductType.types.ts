import { Brand } from "./Brand.types";
import { Category } from "./Category.types";
import { Gender } from "./Gender.type";
import { ProductAttribute } from "./ProductAttribute";
import { Size } from "./Size.types";

export  type ProductType = {
    id: number;
    name: string;
    price: number;
    brand: Brand;
    gender: Gender;
    category: Category;
    image: string;
    description: string;
    attributes: ProductAttribute[];
  };