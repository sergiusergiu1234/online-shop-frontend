import { useContext, useEffect, useState } from "react";
import { ProductType } from "../Types/ProductType.types";
import Product from "../components/Product";
import '../Styles/Products.css';
import FilterBar from "../components/FilterBar";
import Pagination from 'react-bootstrap/Pagination';
import { Offcanvas } from "react-bootstrap";
import FilterContext from "../context/FilterProvider";
import { ProductTypeGeneral } from "../Types/ProductTypeGeneral";





const HomePage = () => {
  const [activePage, setActivePage] = useState(1);
  const [totalPages,setTotalPages] = useState(2);
  const [products, setProducts] = useState<ProductTypeGeneral[]>([]);
  let tp = localStorage.getItem("f");
  const {filter} = useContext(FilterContext);

  const fetchProducts = async ()=>{
    const {productName, brands, gender, category_name, minPrice, maxPrice,type_name,attributes,sizes} = filter;
    let params ='';
    params += `&pageNumber=${activePage-1}`
    if(productName) params += `&name=${productName}`;
    if(brands) params += `&brands=${brands}`
    if(gender) params += `&genders=${gender}`;
    if(category_name) params += `&category_name=${category_name}`;
    if(minPrice) params += `&minPrice=${minPrice}`;
    if(maxPrice) params += `&maxPrice=${maxPrice}`;
    if(type_name) params += `&type_name=${type_name}`;
    if(attributes) params +=`&attributes=${attributes}`
    if(sizes) params += `&sizes=${sizes}`;
    const token = window.localStorage.getItem('accessToken');
    const url = `https://slope-emporium-app-b7686b574df7.herokuapp.com/products?${params.slice(1)}`;
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
      response = await fetch(url);
    }
    const data = await response.json();
    setProducts(data.content);
    setTotalPages(data.totalPages)
    console.log(data.content)
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
      {/* <Pagination>{paginationItems}</Pagination> */}
      </div>
   
      <div>
            <div className="product-grid">
              {products.map((product: ProductTypeGeneral) => (
                
                <Product 
                   key={product.id}
                   product={product} 
                   isFavorite={product.isFavorite}
                    />  
              ))}
            </div>
     </div>
   </div>
  )
}

export default HomePage;