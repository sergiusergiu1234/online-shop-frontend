import Form from "react-bootstrap/esm/Form";
import "../Styles/OrderDetailsPage.css"
import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import {CgCreditCard} from "react-icons/cg";
import { useContext, useEffect, useState } from "react";
import OrderContext from "../context/OrderDetailsProvider";
import { IconContext } from "react-icons";
import { VscDebugStart } from "react-icons/vsc";
import CartItem from "../components/CartItem";
import OrderItem from "../components/OrderItem";
import {BsCash} from "react-icons/bs";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
const OrderDetailsPage =()=>{
    const [spayment,setsPayment] = useState("cash");
    const {order, setOrder} = useContext(OrderContext);
    const navigate = useNavigate();
    const location= useLocation();
    const handleRadioChange =(event:any)=>{
        setsPayment(event?.target.value)
    }

    useEffect(() => {
        // Check if the order context is empty
        if (!order.items || order.items.length === 0) {
          // Redirect to the shopping cart page or any other desired page
          navigate('/ShoppingCart', { state: { from: location }, replace: true });
        }
      }, [order, location, navigate]);

    const handleSubmit = (event:any)=>{
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string ;
        const street = formData.get("street") as string ;
        const province = formData.get("province") as string ;
        const city = formData.get("city") as string ;
        const zipcode = formData.get("zipcode") as string;
        const payment = spayment as string;
        const updatedOrder = {...order, personal: {
            name,
            phone,
          },
          address: {
            street,
            province,
            city,
            zipcode: Number(zipcode),
          },
            payment:spayment};
        
          setOrder(updatedOrder);
       navigate("/ConfirmOrder")
    }

    return (<div className="order-details-page">
            <h1>Order details</h1>
        <Form className="orderDetails-container" onSubmit={handleSubmit}>
            <Card className="sect">
                <CardHeader as="h4">
                    Personal information
                </CardHeader>
                <Card.Body>
                <Form.Group controlId="shippingAddress">
                        <Form.Label>Name and Surname:</Form.Label>
                        <Form.Control name="name"  placeholder="Enter name and surname"  required={true}/>
                        <br/>
                        <Form.Label>Phone number:</Form.Label>
                        <Form.Control name="phone" placeholder="07xxxxxxxx"  required={true}/>
                </Form.Group>
                </Card.Body>
            </Card >
            <br/>
            <Card className="sect">
                <CardHeader as="h4">
                    Shipping address
                </CardHeader>
                <Card.Body>
                    <Form.Group>
                    <Form.Control name="street"  placeholder="Street, house/apartment*" required={true}/>
                    <br/>
                    <Form.Control name="province"  placeholder="Province*"  required={true}/>
                    <br/>
                    <Form.Control name="city" placeholder="City*"  required={true}/>
                    <br/>
                    <Form.Control name="zipcode"  placeholder="Zipcode*"  required={true}/>
                    </Form.Group>
                </Card.Body>
            </Card>
            <br/>
            <Card className="sect">
                <CardHeader as="h4">
                    Payment methods
                </CardHeader>
                <Card.Body>
                <Form.Group>
                    <div className="cash-check">
                <Form.Check 
                        type="radio" 
                        label={`Cash`} 
                        value={"cash"}
                        checked={spayment === 'cash'}
                        onChange={handleRadioChange}/>   
                        <IconContext.Provider value={{size:'20px'}}>
                            <BsCash/>
                        </IconContext.Provider>
                        </div>
                    <Form.Check 
                        type="radio" 
                        label={"card1"} 
                        value={"card1"}
                        checked={spayment === 'card1'}
                        onChange={handleRadioChange}/>
                    <Form.Check 
                        type="radio" 
                        label={"card2"} 
                        value={"card2"}
                        checked={spayment === 'card2'}
                        onChange={handleRadioChange}/>
                    <a className="link"><CgCreditCard/> Add a new card </a>
                </Form.Group>
                </Card.Body>
            </Card >
            <br/>
            <Card className="sect">
                <CardHeader as="h4">
                    Items
                </CardHeader>
                <Card.Body>
                <div>
                    {order.items.map((item)=><OrderItem key={item.productSizeId} item={item}/>)}
                </div>
                <hr/>
                <div>
                    <h4>Total:</h4>
                    <h3>{order.total} RON</h3>
                </div>
                </Card.Body>
            </Card>
            <IconContext.Provider value={{ size: "30px" }}>

            <button className="continue" type="submit" >
            <VscDebugStart />
            Continue
            </button>
        </IconContext.Provider>
        </Form>
    </div>)
}

export default OrderDetailsPage;