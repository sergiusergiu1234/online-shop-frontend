import { useEffect } from "react";
import  Toast  from "react-bootstrap/Toast";
import { useNotifications } from "../context/NotificationContext";
import "../Styles/NotificationComponent.css";
const NotificationComponent = () => {

    const { notifications,hideNotification } = useNotifications();
    return (
      <div className="notification-container">
        {notifications.map((notification:any) => (
           <Toast 
          
            show={notification.show}
            onClose={()=>hideNotification(notification.id)}>
           <Toast.Header  className={`${getToastVariant(notification.type)}`}>
             <img
               src="holder.js/20x20?text=%20"
               className="rounded me-2"
               alt=""
             />
             <strong className="me-auto">{notification.message}</strong>
             <small>{notification.time}</small>
           </Toast.Header>
           
         </Toast>
        ))}
      </div>
    );
  };
  export default NotificationComponent;

  const getToastVariant = (type: string): string => {
    switch (type) {
      case 'success':
        return 'bg-success text-white'; // Bootstrap success variant
      case 'danger':
        return 'bg-danger text-white'; // Bootstrap danger variant
      case 'warning':
        return 'bg-warning text-dark'; // Bootstrap warning variant
      default:
        return 'bg-info text-white'; // Default to Bootstrap info variant
    }
  };