import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../api/axios";
import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import {
    AiFillHeart,
  AiFillPlusCircle,
  AiOutlineHeart,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import "../Styles/ProductPage.css";
import { error } from "console";
import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { SpecificProduct } from "../Types/SpecificProduct.types";
import useAuth from "../hooks/useAuth";


const ProductPage = () => {
  const navigate = useNavigate();
    const {auth} = useAuth();
  const productName = window.localStorage.getItem("productName");
  const [isAdmin, setIsAdmin] = useState(false);
  const [edit,setEdit] = useState(false);

  const [products, setProducts] = useState<SpecificProduct[]>([
    {
      id: 0,
      name: "",
      price: 0,
      brand: { id: 0, name: "" },
      gender: { id: 0, name: "" },
      category: { id: 0, name: "" ,typeName: ""},
      image: "",
      description: "",
      isFavorite: false,
      attributes: [{ attribute_name: "", value: "" }],
      size: "",
      stock:0
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<SpecificProduct>(
    products.at(0)!
  );
  const [favorited,setFavorited] = useState(selectedProduct.isFavorite);


  //convert image data
  const base64String = window.localStorage.getItem("imageUrl");
  const byteCharacters = atob(base64String!);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const image = new Blob([byteArray], { type: "image/jpeg" });
  const imageUrl = URL.createObjectURL(image);

  useEffect(() => {
    fetchProducts();
    if(auth.accessToken){
      setIsAdmin(auth.roles.includes("ROLE_ADMIN"));
    }
  }, []);

  useEffect(()=>{
    fetchProducts();
    setFavorited(selectedProduct.isFavorite);
    console.log(selectedProduct)
  },[selectedProduct]);
  
  const fetchProducts = () => {
   
    if(auth.accessToken){
    const token = window.localStorage.getItem('accessToken');
      fetch(`https://slope-emporium-app-b7686b574df7.herokuapp.com/products/${productName}`,{
        method: 'GET',
        
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
      .then((response) => response.json())
      .then((data) =>{ setProducts(data)})
      .catch((error) => console.log(error));
    }
    else{
      fetch(`https://slope-emporium-app-b7686b574df7.herokuapp.com/products/${productName}`)
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.log(error));
    }
  
  };

  const addToFavorite = () => {
    //verify if authenticated
    if(auth.accessToken){
     const token = window.localStorage.getItem('accessToken')
     if(!favorited){
         //send server request
             fetch(`https://slope-emporium-app-b7686b574df7.herokuapp.com/favorites/add/${selectedProduct.id}`,{
                 method: 'POST',
                 headers: {
                     'Authorization': `Bearer ${token}`
                 }
             })
             .then(response => response.json())
             .then(data =>{setFavorited(true);console.log(data)
             })
     }else{
                     //send server request
                     fetch(`https://slope-emporium-app-b7686b574df7.herokuapp.com/favorites/delete/${selectedProduct.id}`,{
                         method: 'DELETE',
                         headers: {
                             'Authorization': `Bearer ${token}`
                         }
                     })
                     .then(response => response.json())
                     .then(data =>{
                                     setFavorited(false);
                     })
     }
    }else{
     alert("You must log in first!")
    }
  };

  const addToCart = () => {
    if(auth.accessToken){
      const token = window.localStorage.getItem('accessToken')
   
      fetch(`https://slope-emporium-app-b7686b574df7.herokuapp.com/shoppingCart/add/${selectedProduct.id}`,{
          method: 'POST',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then(response => response.json())
      .then(data =>console.log(data))
    }else{
      alert("You must log in first!")
    }
  };

  const handleDelete=()=>{
    const token = window.localStorage.getItem('accessToken')
    fetch(`https://slope-emporium-app-b7686b574df7.herokuapp.com/products/admin/${selectedProduct.id}`,{
        method: 'DELETE',
        headers: {
            'Authorization' : `Bearer ${token}`
        }
    })
    .then(response => response.json())
    window.location.reload();
  }

  const handleAddSize =()=>{
    navigate("/admin/products");
    if(productName){
      window.localStorage.setItem('selectedName',productName);
    }
  }



  useEffect(()=>{
    console.log(products)
  },[products])



  return (
    <Card>
      <CardHeader>
        {
          isAdmin  ? <> <Button variant="danger" onClick={handleDelete}>Delete product :( </Button>
                      <Button variant="warning" onClick={handleAddSize} >Edit product :| </Button>
                     
          </>: <></> 
        }
      </CardHeader>
      <Card.Body className="product-page-container">
       
        <div className="image-container">
          <Card.Img variant="top" src={imageUrl}/>
        </div>
<div className="productDetails">

        {selectedProduct.name=="" ? <p >Select a size</p> : <>
        <div>
          <p className="bold">
            {selectedProduct?.gender.name}'s {selectedProduct?.brand.name}{" "}
            {selectedProduct?.category.name.toUpperCase()} {selectedProduct.category.typeName}
            <br />
            <label className="head-big">{selectedProduct.name}</label>
            <br />
            <label className="head-big">{selectedProduct.price} RON</label>
          </p>

          <div className="aesthetic-bar"></div>
          <p className="description-container">{selectedProduct.description}</p>
          <div className="aesthetic-bar"></div>
          <hr />
          <label className="bold">Product specs:</label>
          <br />
          {selectedProduct.attributes.map((product) => (
            <>
              <label className="bold">{product.attribute_name}</label>
              <label className="head-big">{`: ${product.value}`}</label>
              <br />
            </>
          ))}
           <div className="product-buttons">
        <IconContext.Provider value={{ size: "50px" }}>
          <Button className={favorited ? "favoritedd" : "not-favoritedd"} onClick={addToFavorite}>
           {favorited ? <AiFillHeart/> :  <AiOutlineHeart />} 
          </Button>
            
            {selectedProduct.stock !== 0 ?           <Button className="cart-button" disabled={selectedProduct.stock===0} onClick={addToCart}>
            <AiFillPlusCircle />
            Add to cart
          </Button> : <label>Out of stock</label>}

        </IconContext.Provider>
      </div>
</div>
        </> }
        <div>
   
          <div className="size-buttons">
            {products.map((product,index) => (
              <Button key={product.id}  className={product.id == selectedProduct.id ? "selected-size" : "not-selected-size"}
                    onClick={()=>{setSelectedProduct(product); }}>
                {product.size}
              </Button>
            ))}
          </div>
        </div>
        </div>
      </Card.Body>
     
    </Card>
  );
};

export default ProductPage;
