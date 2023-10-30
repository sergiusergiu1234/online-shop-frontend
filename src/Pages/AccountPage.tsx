import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { OrderType } from "../Types/Order.types";
import { API_URL, fetchOrders } from "../api/api";
import Order from "../components/Order";
import useAuth from "../hooks/useAuth";
import "../Styles/AccountPage.css";
import { IconContext } from "react-icons";
import { MdOutlineModeEdit } from "react-icons/md";
import EditAccount from "../components/EditAccount";

const ACCOUNT_URL = "/me";

const AccountPage = () => {
  const { setAuth } = useAuth();
  const [editing, setEditing] = useState(false);
  const [customer, setCustomer] = useState({
    username: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });
  const [orders, setOrders] = useState<OrderType[]>([]);
  const [pendingOrders, setPendingOrders] = useState<OrderType[]>([]);
  const [acceptedOrders, setAcceptedOrders] = useState<OrderType[]>([]);
  const [declinedOrders, setDeclinedOrders] = useState<OrderType[]>([]);
  const [deliveredOrders, setDeliveredOrders] = useState<OrderType[]>([]);

  useEffect(() => {
    const token = window.sessionStorage.getItem("accessToken");

    fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCustomer(data))
      .catch((error) => console.error(error));

    fetchOrders().then((data) => {
      setOrders(data);
      
    });
  }, []);

  useEffect(() => {
    setPendingOrders(
      orders.filter((order: OrderType) => order.status === "pending")
    );
    setAcceptedOrders(
      orders.filter((order: OrderType) => order.status === "Accepted")
    );
    setDeclinedOrders(
      orders.filter((order: OrderType) => order.status === "Declined")
    );
    setDeliveredOrders(
      orders.filter((order: OrderType) => order.status === "Delivered")
    );
  }, [orders]);
  console.log(pendingOrders);
  const handleLogout = () => {
    window.localStorage.clear();
    setAuth({
      user: "",
      roles: [""],
      accessToken: "",
    });
  };

  return (
    <div className="account-page">
     
        <h1 className="small-title">
          Personal data
          <IconContext.Provider value={{ size: "1rem" }}>
            <Button
              variant="warning"
              onClick={() => {
                if(editing){
                  setEditing(false);
                }else{
                  setEditing(true);  
                }
                
              }}
            >
              <MdOutlineModeEdit />
            </Button>
          </IconContext.Provider>
        </h1>
        {editing ? (
          <EditAccount />
        ) : (
          <p>
            <label>Name:</label>
            <label>
              {customer.firstName} {customer.lastName}
            </label>{" "}
            <br />
            <label>Email:</label> <label>{customer.email}</label> <br />
            <label>Username:</label>
            <label>{customer.username}</label> <br />
            <label>Phone number:</label> <label>{customer.phoneNumber}</label>{" "}
            <br />
          </p>
        )}

     
        <h1 className="small-title">Issued orders</h1>

        <div className="issued-orders-section">
          <h3>Pending orders</h3>
          {pendingOrders.length > 0 ? (
            pendingOrders.map((order: OrderType) => (
              <Order key={order.id} order={order} />
            ))
          ) : (
            <p>You have no pending orders</p>
          )}
       

        <div>
          <h3>Delivered orders</h3>
          {deliveredOrders.length > 0 ? (
            deliveredOrders.map((order: OrderType) => (
              <Order key={order.id} order={order} />
            ))
          ) : (
            <p>You have no delivered orders</p>
          )}
        </div>

        <div>
          <h3>Declined orders</h3>
          {declinedOrders.length > 0 ? (
            declinedOrders.map((order: OrderType) => (
              <Order key={order.id} order={order} />
            ))
          ) : (
            <p>You have no declined orders</p>
          )}
        </div>

        <div>
          <h3>Accepted orders</h3>
          {acceptedOrders.length > 0 ? (
            acceptedOrders.map((order: OrderType) => (
              <Order key={order.id} order={order} />
            ))
          ) : (
            <p>You have no accepted orders.</p>
          )}
        </div>
        </div>
        <Button variant="danger" onClick={handleLogout}>
          Log Out
        </Button>
      
    </div>
  );
};
export default AccountPage;
