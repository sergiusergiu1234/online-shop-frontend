import { Brand } from "./Brand.types";
import { Category } from "./Category.types";
import { Gender } from "./Gender.type";
import { ProductAttribute } from "./ProductAttribute";
import { Size } from "./Size.types";

export  type ProductTypeGeneral = {
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
    stock:number;
    sizes:{
      id:number;
      size:string;
      stock:number;
      favorite:boolean
    }[]
  };