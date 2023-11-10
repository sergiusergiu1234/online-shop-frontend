import Card from "react-bootstrap/esm/Card";
import CardHeader from "react-bootstrap/esm/CardHeader";
import "../Styles/ConfirmOrder.css"
import OrderContext, { OrderContent } from "../context/OrderDetailsProvider";
import {useContext, useEffect, useState} from "react"
import Button from "react-bootstrap/esm/Button";
import { handleCheckout } from "../api/api";
import { useNavigate } from "react-router";
const ConfirmOrderPage = () =>{
    const [success,setSuccess] = useState(false);
    const {order,setOrder} = useContext(OrderContext);
    const navigate = useNavigate();
    const Checkout =(event:any) =>{
        const deliveryAddress= `${order.address.city}, ${order.address.province}, ${order.address.street}, ${order.address.zipcode}`
        const billingName = order.personal.name;
        const contactPhone = order.personal.phone;
        const paymentMethod = order.payment;
        handleCheckout({
            deliveryAddress, billingName, contactPhone, paymentMethod
        }).then((response)=>setSuccess(response.ok));
        console.log(deliveryAddress)
    }   
    const goShopping=()=>{
       navigate("/")
    }

    return (
    <div className="container">
        {success ?<>
         <h1>Order Placed</h1>
            <Button variant="success" onClick={goShopping}>Continue shopping</Button>
         </>:
         <>
         <h4> Order Summary</h4>
        <div className="details-container">
            <Card className="order-section">
                <CardHeader as="h5">
                    Shipping address
                </CardHeader>
                <Card.Body>
                   <label>{order.address.province}, {order.address.city}, {order.address.street}, {order.address.zipcode}</label> 
                </Card.Body>
            </Card>
            <Card className="order-section">
                <CardHeader as="h5">
                    Contact data
                </CardHeader>
                <Card.Body>
                <label>{order.personal.name} - {order.personal.phone}</label>
                </Card.Body>
            </Card>
            <Card className="order-section">
                <CardHeader as="h5">
                    Payment method
                </CardHeader>
                <Card.Body>
                    {order.payment}
                </Card.Body>
            </Card>
        </div>
        <Card className="items-summary">
                <CardHeader>
                    Ordered items
                </CardHeader>
                <Card.Body>
                    {order.items.map((item)=>(<div><label>{item.productName} ({item.quantity}) - {item.price} RON</label><br/></div>))}
                </Card.Body>
            </Card>
            <Button className="place-order-button" onClick={(order)=>Checkout(order)}>Place order</Button></>}
        
    </div>)
}

export default ConfirmOrderPage;