import { IconContext } from "react-icons";
import {HiOutlineMinusCircle, HiOutlinePlusCircle} from "react-icons/hi"
import { CartItemType } from "../Types/CartItemType.types";
import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";

import { useEffect, useState } from "react";
import '../Styles/CartItem.css'
import { json } from "stream/consumers";
interface Props {
   item:CartItemType;
   addToCart: (item: CartItemType) => void;
   removeFromCart: (item: CartItemType) => void;
   setIsValid: React.Dispatch<React.SetStateAction<boolean>>;
   isValid: boolean;
}

const CartItem =({item,addToCart,removeFromCart, setIsValid,isValid}:Props)=>{


  const [cartItem, setCartItem] = useState<CartItemType>({
    productName: item.productName,
    productImage: item.productImage,
    price: item.price,
    stock: item.stock,
    productSizeId: item.productSizeId,
    quantity: item.quantity,
    size:item.size,
    product: {
      id: item.product.id,
      image: item.product.image,
      name: item.product.name,
      price: item.product.price,
      category: item.product.category,
      brand: item.product.brand,
      attributes: item.product.attributes,
      description: item.product.description,
      gender: item.product.gender,
    }
  });

  useEffect(() => {
    setCartItem(item);
  }, [item]);

  
  useEffect(() => {
    setCartItem(item);
  }, [item]);

  useEffect(() => {
    setIsValid((prevIsValid) => prevIsValid && cartItem.quantity <= cartItem.stock);
  }, [cartItem.quantity, cartItem.stock, setIsValid]);

  useEffect(() => {
    setIsValid((prevIsValid) => prevIsValid && cartItem.quantity <= cartItem.stock);
  }, []);

  return (
    <Card className="cartItem">
      <CardHeader as="h5">{cartItem.productName}</CardHeader>
      <Card.Body >
            <div className="cart-attributes">
    
              <label  className="attribute_name">{item.product.brand.name} - {item.product.category.name} - {item.product.category.typeName}</label>
                <hr/>
                <label className="attribute_name">Size:  {item.size}</label>
            
                <div className="attr">
                {item.product.attributes.map((attribute)=>(
                  <div>
                    <label className="attribute_name">{attribute.attribute_name}:</label>
                    <label className="value">{attribute.value}</label>
                    <br/>
                  </div>
                ))}
                </div>
            </div>
      <div>
        <IconContext.Provider value={{ size: "30px" }}>
            <div  >
                <label className="attribute_name">Quantity: {cartItem.quantity}</label>
                <label>({cartItem.stock} in stock)</label>
                <br/>
                <label className="attribute_name">${cartItem.price}</label>
          </div>
          <div className="shoppingCart-buttons">
          <Button className="addToCart" 
                  disabled={cartItem.quantity >= cartItem.stock} onClick={()=>  cartItem.quantity !== cartItem.stock ? 
              addToCart(item) : alert(`Only ${cartItem.stock} left in stock!`)}>
            <HiOutlinePlusCircle />
          </Button>
          <button className="removeFromCart" onClick={()=>
             removeFromCart(item) }>
            <HiOutlineMinusCircle />
          </button>
          </div>
        </IconContext.Provider>
    </div>


      </Card.Body>
    </Card>
  );
}

export default CartItem;