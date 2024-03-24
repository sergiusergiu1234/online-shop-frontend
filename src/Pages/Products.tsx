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
import useProducts from "../hooks/useProducts";

const HomePage = () => {

  const {products,paginationItems} = useProducts();
  
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