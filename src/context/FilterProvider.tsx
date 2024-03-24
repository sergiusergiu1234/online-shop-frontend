import { createContext, useState } from "react";
export type FilterContent = {
    filter:{
        productName:string,
        brands:string[], 
        gender:string,
        category_name:string,
        minPrice:string,
        maxPrice:string,
        type_name:string,
        attributes:string,
        sizes:string[],
        tp:string,
    };
    setFilter: React.Dispatch<React.SetStateAction<FilterContent['filter']>>;
}
const FilterContext = createContext<FilterContent>({
    filter:{
        productName: '',
        brands:[],
        gender: '',
        category_name: '',
        minPrice:'',
        maxPrice:'',
        type_name: "" ,
        attributes:"",
        sizes:[],
        tp:''
    },
    setFilter: ()=>{}
});

type FilterProviderProps ={
    children: React.ReactNode;
}

export const FilterProvider =({children}:FilterProviderProps) =>{
    const [filter,setFilter]= useState({
        productName: '',
        brands:[''],
        gender: '',
        category_name: '',
        minPrice:'',
        maxPrice:'',
        type_name: "" ,
        attributes:"",
        sizes:[""],
        tp:''
    });
    return (
        <FilterContext.Provider value={{filter,setFilter:setFilter}}>
            {children}
        </FilterContext.Provider>
    )
}

export default FilterContext;