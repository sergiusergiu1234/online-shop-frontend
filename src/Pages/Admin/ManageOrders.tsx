import { useEffect, useState } from "react";
import { OrderType } from "../../Types/Order.types";
import { fetchAllOrders, updateOrderStatus } from "../../api/api";
import {  Accordion,  Button, Table,} from "react-bootstrap";
import "../../Styles/ManageOrders.css";
import { OrderDetail } from "../../Types/OrderDetail.types";

const ManageOrders = () => {
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [selectedStatus,setSelectedStatus] = useState('All');

  const handleStatusChange = (status:string)=>{
    setSelectedStatus(status);
  }
  const filteredOrders = selectedStatus ==='All' ? orders : orders.filter(order => order.status ===selectedStatus);
  useEffect(() => {
    fetchAllOrders().then((data) => {
      setOrders(data);
      console.log(data);
    });
  }, []);

  const handleUpdate =(orderId:number,status:string)=>{
    updateOrderStatus(orderId,status).then((response)=>{

      setOrders((prev)=>{
       const  updatedOrders = prev.map((order)=>{
          if(order.id === orderId) {
            console.log(response)
            return response; 
          }
          return order;
        });
        return updatedOrders;
      })

    })

  }


  return (
    <div className="manage-orders-page">
      <h1>Manage orders</h1>
      <div>
        <Button variant="info" onClick={()=>handleStatusChange('pending')}>Show Pending orders</Button>
        <Button variant="info" onClick={()=>handleStatusChange('Accepted')} >Show Accepted orders</Button>
        <Button variant="info" onClick={()=>handleStatusChange('Declined')}>Show Declined orders</Button>
        <Button variant="info" onClick={()=>handleStatusChange('Delivered')}>Show Delivered orders</Button>
      </div>
      {filteredOrders.map((order: OrderType) => (
        <div className="order-accordion"  key={order.id}>

        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header>
              Order - {order.id} - {order.status}{" "}
            </Accordion.Header>
            <Accordion.Body>
              <div className="manage-order-actions">
                {(order.status === "pending")  && 
                <> 
                  <Button variant="info" onClick={()=>handleUpdate(order.id,"Accepted")}>Set Accepted</Button>
                  <Button variant="danger" onClick={()=>handleUpdate(order.id,"Declined")}>Set Declined</Button>
                </>}

                {(order.status === "Accepted") && <>
                  <Button variant="danger" onClick={()=>handleUpdate(order.id,"Declined")}>Set Declined</Button>
                  <Button variant="success" onClick={()=>handleUpdate(order.id,"Delivered")}>Set Delivered</Button>
                </>}

              </div>
              {order.orderDetails && order.orderDetails.length > 0 ? (
                <Table variant="light">
                  <thead>
                    <tr key={order.id+"b"}>
                      <th>Product</th>
                      <th>Quantity</th>
                      <th>Price</th>
                      <th>Ordered at</th>
                      <th>User Id</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {order.orderDetails.map((detail: OrderDetail) => (
                      <tr key={`${detail.productName} - ${detail.size}`}>
                        <td>{detail.productName}</td>
                        <td>{detail.quantity}</td>
                        <td>{detail.price} RON</td>
                        <td>{order.generationDateTime}</td>
                        <td>{order.userId}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              ) : (
                <p>No order details found.</p>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
        </div>
      ))}
    </div>
  );
};

export default ManageOrders;
