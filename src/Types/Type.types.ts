import { Category } from "./Category.types"
import {Attribute} from "./Attribute.types"
import { Size } from "./Size.types";

export type AttributeValues ={
  [key: string]: string[] | null;
}
export interface Type {
    id: number;
    name: string;
    categoryDtoList: Category[];
    attributeDtoList: Attribute[];
    attributeValues: AttributeValues;
    sizeList: Size[];
  }
  