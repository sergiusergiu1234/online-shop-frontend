import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import { AiFillHeart, AiOutlineCloseCircle, AiOutlineDelete, AiOutlineHeart, AiOutlineShoppingCart } from "react-icons/ai";
import useAuth from "../hooks/useAuth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Card, Spinner } from "react-bootstrap";
import { MdAddShoppingCart } from "react-icons/md";
import { deleteProduct, fetchProductImage } from "../api/api";
import "../Styles/Product.css";
import { ProductCardType } from "../Types/ProductCardType";

interface Props {
  product: ProductCardType

}
const Product = ({ product}: Props) => {
  const navigate = useNavigate();
  const [imageData,setImageData] = useState();

  const goToProductDetails = () => {
    navigate(`/ProductPage?name=${product.name}`)
  }

  useEffect(() => {
    const fetchImage = async () => {
      try {
          const response = await fetchProductImage(product.id);
          if (!response.ok) {
              throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data:any = await response.text();
          setImageData(data);
      } catch (error) {
          console.error('Error fetching image:', error);
      }
  };

  fetchImage();
  }, [product.id]);
  return (
    <div  onClick={goToProductDetails} className="product-container">
      <div className="product-image-container">
      {imageData ? (
       <img src={`data:image/png;base64,${imageData}`} alt="Red dot" />
      ) : <Spinner className="image-spinners"></Spinner>}
       
      </div>
      <div className="card-details">
          <label className="productName">{product.name} </label>
          <label className="productName">$ {product.price}  </label>
          
          {/* {product.sizes.length === 0 ? 
          <br/> :  <label >{product.sizes[0].value} - {product.sizes[product.sizes.length-1].value}</label>} */}
         
          <Button  onClick={goToProductDetails} className="go-to-details">Go to details</Button>
      </div>
    </div>
  )
}

export default Product;