
import Navbar from "./components/Navbar";
import FavoritesPage from "./Pages/FavoritesPage";
import Products from "./Pages/Products";
import './App.css';

import Register from "./Pages/Register";
import LoginPage from "./Pages/LoginPage";
import Layout from "./components/Layout";
import RequireAuth from "./components/RequireAuth";
import PersistLogin from "./components/PersistLogin";
import { Routes, Route, Outlet } from "react-router-dom";
import AccountPage from "./Pages/AccountPage";
import ProductPage from "./Pages/ProductPage";
import OrderDetailsPage from "./Pages/OrderDetailsPage";
import { OrderDetailsProvider } from "./context/OrderDetailsProvider";
import ShoppingCartPage from "./Pages/ShoppingCartPage";
import ConfirmOrderPage from "./Pages/ConfirmOrderPage";
import ManageProducts from "./Pages/Admin/ManageProducts";
import ManageBrands from "./Pages/Admin/ManageBrands";
import ManageCategories from "./Pages/Admin/ManageCategories";
import ManageAttributes from "./Pages/Admin/ManageAttributes";
import ManageGenders from "./Pages/Admin/ManageGenders";
import ManageOrders from "./Pages/Admin/ManageOrders";
import HomePage from "./Pages/HomePage";
import { BlurContext, useBlurContext } from "./context/BlurContext";
import { useState } from "react";
import { FilterProvider } from "./context/FilterProvider";
import Footer from "./components/Footer";
import ContactPage from "./Pages/ContactPge";





const OrderPagesWrapper =() =>{
  return(
    <OrderDetailsProvider>
      <Outlet/>
    </OrderDetailsProvider>
  )
}



function App() {
  const [blurred,setBlurred] = useState<boolean>(false);
  return (
    <BlurContext.Provider value={{blurred,setBlurred}}>
      <Navbar/>
    <div className={`${blurred ? 'blurred' : 'not-blurred'}`}> 
      
      


    < Routes>
      <Route path="/" element={<Layout />} >
        <Route path= 'Register' element ={<Register/>} />
        <Route path= 'LoginPage' element ={<LoginPage/>} />
        <Route path= "" element ={<HomePage/>} />

        <Route element={<PersistLogin />} >
          
          <Route path="products" element={<FilterProvider><Products/></FilterProvider>} />
          <Route path="ProductPage" element={<ProductPage/>} />
          <Route element={<RequireAuth allowedRoles={["ROLE_ADMIN"]}/>}>
            
            <Route path="admin/products" element={<ManageProducts/>}></Route>
            <Route path="admin/brands" element={<ManageBrands/>}></Route>
            <Route path="admin/categories" element={<ManageCategories/>}></Route>
            <Route path="admin/attributes" element={<ManageAttributes/>}></Route>
            <Route path="admin/genders" element={<ManageGenders/>}></Route>
            <Route path="admin/orders" element={<ManageOrders/>}></Route>
          </Route>
          <Route element={<RequireAuth  allowedRoles={["ROLE_USER"]}/>}>
            <Route path='Favorites' element={<FavoritesPage/>}></Route>
         
            <Route path='MyAccount' element={<AccountPage/>}></Route>

            <Route  element={<OrderPagesWrapper/>}>
              <Route path="ShoppingCart" element={<ShoppingCartPage/>} />
              <Route path="OrderDetails" element={<OrderDetailsPage />} />
              <Route path="/ConfirmOrder" element={<ConfirmOrderPage />} />
            </Route>
            
          </Route>

        </Route>

      </Route>
      <Route path="contact" element={<ContactPage/>}/>
    </Routes>
    <Footer/>
    </div>  
    </BlurContext.Provider>
   
  );
}

export default App;
