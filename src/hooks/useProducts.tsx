import { useContext, useEffect, useState } from "react";
import { ProductCardType } from "../Types/ProductCardType";
import FilterContext from "../context/FilterProvider";
import { API_URL } from "../api/api";
import { Pagination } from "react-bootstrap";

const useProducts = () =>{

    const [products, setProducts] = useState<ProductCardType[]>([]);
    const {filter} = useContext(FilterContext);

    const [totalPages,setTotalPages] = useState(2);
    const [activePage, setActivePage] = useState(1);
    
    const paginationItems = [];
    for (let number = 1; number <= totalPages; number++) {
      paginationItems.push(
        <Pagination.Item
          key={number}
          active={number === activePage}
          onClick={() => handlePageChange(number)}
        >
          {number}
        </Pagination.Item>
      );
    }

    const handlePageChange = (pageNumber:number) => {
        setActivePage(pageNumber);
      }
    
    const fetchProducts = async ()=>{
        const {productName, brands, gender, category_name, minPrice, maxPrice,type_name,attributes,sizes,tp} = filter;
        let params ='';
        params += `&pageNumber=${activePage-1}`
        if(productName !== "") params += `&name=${productName}`;
        if(brands.length !== 0) params += `&brands=${brands}`
        if(gender !== "") params += `&genders=${gender}`;
        if(category_name !== "") params += `&category_name=${category_name}`;
        if(minPrice !== "") params += `&minPrice=${minPrice}`;
        if(maxPrice !=="") params += `&maxPrice=${maxPrice}`;
        if(tp){
          params += `&type_name=${tp}`
        }else{
          if(type_name) params += `&type_name=${type_name}`;
        }
        if(attributes) params +=`&attributes=${attributes}`
        if(sizes) params += `&sizes=${sizes}`;
        const token = window.sessionStorage.getItem("accessToken");;
        const url = `${API_URL}/products?${params.slice(1)}`;
        let response;
        if(token != null){
          response = await fetch(url,{
            method: 'GET',
            headers:{
              'Authorization': `Bearer ${token}`
            }
          });
        }else{
          response = await fetch(url);
        }
        const data = await response.json();
        setProducts( data.content);
        setTotalPages(data.totalPages)
      };
    
      useEffect(()=>{

        fetchProducts();
        localStorage.removeItem('f');
      },[filter,activePage]);
      
    return {products,totalPages,paginationItems};
}

export default useProducts;