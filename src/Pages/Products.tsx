import { useContext, useEffect, useState } from "react";
import { ProductType } from "../Types/ProductType.types";
import Product from "../components/Product";
import '../Styles/Products.css';
import FilterBar from "../components/FilterBar";
import Pagination from 'react-bootstrap/Pagination';
import { Offcanvas } from "react-bootstrap";
import FilterContext from "../context/FilterProvider";
import { ProductCardType } from "../Types/ProductCardType";
import { API_URL } from "../api/api";





const HomePage = () => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages,setTotalPages] = useState(2);
  const [products, setProducts] = useState<ProductCardType[]>([]);
  let tp = localStorage.getItem("f");
  const {filter} = useContext(FilterContext);

  const fetchProducts = async ()=>{
    const {productName, brands, gender, category_name, minPrice, maxPrice,type_name,attributes,sizes} = filter;
     console.log(filter)
    let params ='';
    params += `&pageNumber=${activePage-1}`
    if(productName) params += `&name=${productName}`;
    if(brands) params += `&brands=${brands}`
    if(gender) params += `&genders=${gender}`;
    if(category_name) params += `&category_name=${category_name}`;
    if(minPrice) params += `&minPrice=${minPrice}`;
    if(maxPrice) params += `&maxPrice=${maxPrice}`;
    if(tp){
      params += `&type_name=${tp}`
    }else{
      if(type_name) params += `&type_name=${type_name}`;
    }
    if(attributes) params +=`&attributes=${attributes}`
    if(sizes) params += `&sizes=${sizes}`;
    const token = window.sessionStorage.getItem("accessToken");;
    const url = `${API_URL}/products?${params.slice(1)}`;
    console.log(params)
    let response;
    if(token != null){
      response = await fetch(url,{
        method: 'GET',
        headers:{
          'Authorization': `Bearer ${token}`
        }
      });
    }else{
      console.log(url)
      response = await fetch(url);
    }
    const data = await response.json();
    setProducts( data.content);
    setTotalPages(data.totalPages)
    console.log( await data.content);
  };

  useEffect(()=>{
    fetchProducts();
    localStorage.removeItem('f');
  },[filter,activePage]);
  


  const handlePageChange = (pageNumber:number) => {
    setActivePage(pageNumber);
  }

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

  return (
    <div className="homepage">

      <div className="filter-container">
      <FilterBar/>
      
      <br/>
      <Pagination>{paginationItems}</Pagination>
      </div>
   
      <div>
            <div className="product-grid">
              {products.map((product: ProductCardType) => (
                
                <Product 
                   key={product.id}
                   product={product} 

                    />  
              ))}
            </div>
     </div>
   </div>
  )
}

export default HomePage;