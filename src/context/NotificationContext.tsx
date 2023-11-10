import { createContext, useContext, useEffect, useState } from "react";


interface Notification {
    id: number;
    message: string;
    type: string;
    show:boolean;
    time:string;
    title:string;
  }

  
  interface NotificationsContextProps {
    notifications: Notification[];
    addNotification: (message: string, type: string, title:string) => void;
    hideNotification: (id: number) => void;
  }

  //create context
const NotificationContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationContextProvider  = ({children}:any)=>{
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const addNotification = (message:string, type:string, title:string) => {
        const id = Date.now();
        let show = true;
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const seconds = currentTime.getSeconds();
        let time =  `${hours}:${minutes}:${seconds}`;
       
        const newNotification = { id, message, type, show, time, createdTime: currentTime.getTime() ,title};
        setNotifications([...notifications, newNotification]);
  
        setTimeout(() => {
          hideNotification(newNotification.id);
        }, 15000); // 3 seconds in milliseconds
      };

      const hideNotification = (id: number) => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, show: false } : notification
          )
        );
      };
      
    const onDismiss = (id:number) => {
        setNotifications((prevNotifications) =>
          prevNotifications.map((notification) =>
            notification.id === id ? { ...notification, show: false } : notification
          )
        );
      };

      useEffect(() => {

        const dismissTimeout = 6000; 
    
        const timer = setTimeout(() => {
          setNotifications((prevNotifications) => {
            const updatedNotifications = prevNotifications.map((notification) => {
              if (notification.show) {
                return { ...notification, show: false };
              }
              return notification;
            });
            return updatedNotifications;
          });
        }, dismissTimeout);
    
        return () => {
          clearTimeout(timer);
        };
      }, [notifications]);
    
    return (
        <NotificationContext.Provider value={{notifications,addNotification,hideNotification}}>
            {children}
        </NotificationContext.Provider>
    )
}

export const useNotifications =() =>{
    const context = useContext(NotificationContext);
    if(!context){
        throw new Error('useNotifications must be used inside a NotificationProvider ')
    }
    return context;
}
