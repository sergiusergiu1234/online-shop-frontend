import { useEffect } from "react";

import { Accordion, Table } from "react-bootstrap";
import { OrderType } from "../Types/Order.types";
import { OrderDetail } from "../Types/OrderDetail.types";



interface Props{
    order:OrderType;
}

const Order = ({order}:Props)=>{

    return (<Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
            <Accordion.Button className="order-collapsed">Order - {order.id} - {order.status} </Accordion.Button>
            <Accordion.Body>
            {order.orderDetails && order.orderDetails.length > 0 ? (
                <div> 
                 <Table>
                    <thead>
                        <tr>
                            <th>Product name</th>
                            <th>Quantity</th>
                            <th>Total</th>
                            <th>Ordered at</th>
                        </tr>
                    </thead>
                    <tbody>
            {order.orderDetails.map((detail: OrderDetail) => (
                    <tr key={detail.size+detail.price+detail.quantity+detail.productName}>
                        <td>{detail.productName} {detail.size}</td>
                        <td>{detail.quantity}</td>
                        <td>{detail.price} RON</td>
                        <td>{order.generationDateTime}</td>
                    </tr>
            ))}
            </tbody>
      
            </Table>
                  <label className="bold">Total: {order.total} RON</label>
                  <br/>
                  <label>{`Paid with ` + " " + order.paymentMethod} </label>
        </div>     
          ) : (
            <p>No order details found.</p>
          )}
               
            </Accordion.Body>
        </Accordion.Item>
    </Accordion>)
}

export default Order;