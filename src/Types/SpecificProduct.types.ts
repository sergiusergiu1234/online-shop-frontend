import { Brand } from "./Brand.types";
import { Category } from "./Category.types";
import { Gender } from "./Gender.type";
import { ProductAttribute } from "./ProductAttribute";

export  type SpecificProduct = {
    id: number;
    name: string;
    price: number;
    brand: Brand;
    gender: Gender;
    category: Category;
    image: string;
    description: string;
    isFavorite: boolean;
    attributes: ProductAttribute[];
    size:string;
    stock: number;
  };