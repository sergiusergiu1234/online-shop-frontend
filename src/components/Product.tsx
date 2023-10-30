import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { deleteProduct } from "../api/api";
import "../Styles/Product.css";
import { ProductTypeGeneral } from "../Types/ProductTypeGeneral";

interface Props {
  product: ProductTypeGeneral
  isFavorite: boolean
  // sizes: number[];
}
const Product = ({ product}: Props) => {
  const navigate = useNavigate();

  //convert image data 
  const base64String = product.image;
  const byteCharacters = atob(base64String);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const image = new Blob([byteArray], { type: 'image/jpeg' });
  const imageUrl = URL.createObjectURL(image);

  const goToProductDetails = () => {

    navigate(`/ProductPage/${product.name}`)
    window.localStorage.setItem("productName", product.name)
    window.localStorage.setItem("imageUrl", base64String)
  }
  useEffect(()=>{
    product.sizes.map((size)=>{
      console.log(size.size);
    })
  },[])
  return (
    <div  onClick={goToProductDetails} className="product-container">
      <div className="product-image-container">
        {/* <Card.Img  src={imageUrl} */}
        <img src={imageUrl}
         
          className="product-card-image"
        />
      </div>
      <div className="card-details">
          <label className="productName">{product.name} </label>
          <label className="productName">$ {product.price}  </label>
          <label >{product.sizes[0].size} - {product.sizes[product.sizes.length-1].size}</label>
          <Button  onClick={goToProductDetails} className="go-to-details">Go to details</Button>
      </div>
    </div>
  )
}

export default Product;