import { useContext, useEffect, useState } from "react";
import CartItem from "../components/CartItem";

import { CartItemType } from "../Types/CartItemType.types";
import SumarComanda from "../components/SumarComanda";
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../Styles/CartPage.css"
import OrderContext from "../context/OrderDetailsProvider";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { VscDebugStart } from "react-icons/vsc";
import { API_URL } from "../api/api";
const ShoppingCartPage =()=>{
    const [cartItems,setCartItems]=useState<CartItemType[]>([]);
    const token = window.sessionStorage.getItem("accessToken");;
    const [totalPrice,setTotalPrice]= useState(0);
    const {order, setOrder} = useContext(OrderContext);
    const [isValid, setIsValid] = useState(true);

    useEffect(()=>{
        
        fetch(`${API_URL}/shoppingCart`,{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => { setCartItems(data);
                        })
    },[]);

    useEffect(()=>{
        let price =0;
        cartItems.forEach((cart)=>{
            price += cart.price;
        })
        setTotalPrice(price);
        console.log(price)
    },[cartItems]);

    const handleAddToCart =(item: CartItemType) =>{
        fetch(`${API_URL}/shoppingCart/add/${item.productSizeId}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                setCartItems((prev) => prev.map((cart) => {
                    if (cart.productSizeId === data.productSizeId) {
                        return data;
                    }
                    return cart;
                }));
            });
    }

    
    const handleRemoveFromCart = (item: CartItemType) => {
        fetch(`${API_URL}/shoppingCart/delete/${item.productSizeId}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((response) => response.json())
            .then((data) => {
                if ((item.quantity-1) === 0) {
                    setCartItems((prev) => prev.filter((cart) => cart.productSizeId !== item.productSizeId));
                } else {
                    setCartItems((prev) => prev.map((cart) => {
                        if (cart.productSizeId === data.productSizeId) {
                            return data;
                        }
                        return cart;
                    }));
                }
            });
    };

    const navigate = useNavigate();
    const goToCheckout =()=>{
        //update order context
        const updatedOrder = {...order,items:cartItems,total:totalPrice};

        setOrder(updatedOrder);
        console.log(order)
        navigate("/OrderDetails");
    }
    useEffect(() => {
        const allItemsValid = cartItems.every((cartItem) => cartItem.quantity <= cartItem.stock);
        setIsValid(allItemsValid);
      }, [cartItems]);
    return(<div className="cartPage">
            <h1 className="small-title">Shopping cart</h1>
         <div className="cartContent">
         <div className="sumar-comanda">
                <SumarComanda total={totalPrice}/>
                <IconContext.Provider value={{ size: "30px" }}>
            <button className={isValid ? "continue-button" : "invalid-continue" } 
                    onClick={goToCheckout}
                    disabled={!isValid}>
            <VscDebugStart />
            Continue
            </button>
        </IconContext.Provider>
            </div>
            <div className="cartList">
            {cartItems.map((cart:CartItemType)=>(
                <CartItem key={cart.productSizeId} item={cart} addToCart={handleAddToCart}
                removeFromCart={handleRemoveFromCart}
                setIsValid={setIsValid}
                isValid={isValid}/>
            ))}
            </div>
      
            </div>
        </div>)
}
export default ShoppingCartPage;