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
    productId: item.productId,
    productImage: item.productImage,
    productName: item.productName,
    quantity: item.quantity,
    price: item.price,
    product:{
      id: item.product.id,
      name: item.productName,
      price: item.price,
      brand: {
        id: item.product.brand.id,
        name: item.product.brand.name
      },
      gender: {
        id: item.product.gender.id,
        name: item.product.gender.name
      },
      category: {
        id: item.product.category.id,
        name: item.product.category.name,
        typeName: item.product.category.typeName
      },
      image: item.productImage,
      description: item.product.description,
      isFavorite: item.product.isFavorite,
      attributes: item.product.attributes,
      stock: item.product.stock,
      size:item.product.size
    },
    stock:item.stock,
    size:item.product.size
  });

  useEffect(() => {
    setCartItem({
      productId: item.productId,
      productImage: item.productImage,
      productName: item.productName,
      quantity: item.quantity,
      price: item.price,
      product: {
        id: item.product.id,
        name: item.productName,
        price: item.price,
        brand: {
          id: item.product.brand.id,
          name: item.product.brand.name
        },
        gender: {
          id: item.product.gender.id,
          name: item.product.gender.name
        },
        category: {
          id: item.product.category.id,
          name: item.product.category.name,
          typeName: item.product.category.typeName
        },
        image: item.productImage,
        description: item.product.description,
        isFavorite: item.product.isFavorite,
        attributes: item.product.attributes,
        stock: item.product.stock,
        size:item.product.size
      },stock:item.stock
      ,size:item.product.size
    });
  }, [item]);

  
  useEffect(() => {
    setCartItem(item);
  }, [item]);

  useEffect(() => {
    setIsValid((prevIsValid) => prevIsValid && cartItem.quantity <= cartItem.product.stock);
  }, [cartItem.quantity, cartItem.product.stock, setIsValid]);

  useEffect(() => {
    setIsValid((prevIsValid) => prevIsValid && cartItem.quantity <= cartItem.product.stock);
  }, []);

  return (
    <Card className="cartItem">
      <CardHeader as="h5">{cartItem.productName}</CardHeader>
      <Card.Body >
            <div className="cart-attributes">
    
              <label  className="attribute_name">{item.product.brand.name} - {item.product.category.name} - {item.product.category.typeName}</label>
                <hr/>
                <label className="attribute_name">Size: </label>
              <label className="value">{item.product.size}</label>
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
                <label>({cartItem.product.stock} in stock)</label>
                <br/>
                <label className="attribute_name">Price: {cartItem.price}</label>
          </div>
          <div className="shoppingCart-buttons">
          <Button className="addToCart" 
                  disabled={cartItem.quantity >= cartItem.product.stock} onClick={()=>  cartItem.quantity !== cartItem.product.stock ? 
              addToCart(item) : alert(`Only ${cartItem.product.stock} left in stock!`)}>
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