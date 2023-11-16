import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import axios from "../api/axios";
import { ProductType } from "../Types/ProductType.types";
import { IconContext } from "react-icons";
import {
  AiFillHeart,
  AiFillPlusCircle,
  AiOutlineHeart,

} from "react-icons/ai";
import "../Styles/ProductPage.css";
import { error } from "console";
import { Button, Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { SpecificProduct } from "../Types/SpecificProduct.types";
import useAuth from "../hooks/useAuth";
import { API_URL, addFavorite, addShoppingCart, deleteFavorite, deleteProductSize, fetchFavorites } from "../api/api";
import { ProductDetails } from "../Types/ProductDetails.type";
import { ProductSize } from "../Types/ProductSize.types";
import { useNotifications } from "../context/NotificationContext";
import { FavoriteType } from "../Types/FavoriteType.types";



const ProductPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [product,setProduct]= useState<ProductDetails>()
  const [selectedSize,setSelectedSize] = useState<ProductSize>();
  const {addNotification} = useNotifications();
  const [favoriteList,setFavoriteList] = useState([]);
  const [favorited, setFavorited] = useState(selectedSize?.favorite);


  //convert image data
  const base64String = window.localStorage.getItem("imageUrl");
  const byteCharacters = atob(base64String!);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const image = new Blob([byteArray], { type: "image/jpeg" });
  const imageUrl = URL.createObjectURL(image);

  useEffect(() => {
    fetchProduct();
    if (auth.accessToken) {
      setIsAdmin(auth.roles.includes("ROLE_ADMIN"));
    }
  
  }, []);

  const updateFavorites =  async () =>{
    const favoriteData = await fetchFavorites();
    setFavoriteList(await favoriteData.json())
  }

  useEffect(()=>{
    setFavorited(selectedSize?.favorite)
    updateFavorites();

  },[selectedSize])



  const fetchProduct = async () => {
    if (auth.accessToken) {
      const token = window.sessionStorage.getItem("accessToken");;
      fetch(`${API_URL}/products/Page/${searchParams.get('name')}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => { setProduct(data) })
        .catch((error) => console.log(error));
    }
    else {
      fetch(`${API_URL}/products/Page/${searchParams.get('name')}`,{
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => { setProduct(data); })
    }
  };
  
  const addToFavorite = async () => {
   if(selectedSize){
    const response = favorited ? await deleteFavorite(selectedSize.productSizeId) :
                                  await addFavorite(selectedSize.productSizeId);
    if(response.ok){
      setFavorited(!favorited);
      
       // Update the favorite attribute of the corresponding ProductSize in product
       setProduct((prevProduct) => {
        if (prevProduct) {
          const updatedProductSizes = prevProduct.sizes.map((size) =>
            size.size.id === selectedSize?.size.id
              ? { ...size, favorite: !favorited }
              : size
          );
          return { ...prevProduct, sizes: updatedProductSizes };
        }
        return prevProduct;
      });
    }else{
      addNotification(await response.text(),'danger',"Something happened");
    }
   }
  
  };


  const addToCart = async () => {
    if(selectedSize){
      const response =  await addShoppingCart(selectedSize.productSizeId);
    if(response.ok){
      console.log(await response.text())
      addNotification('Product added to cart.','success',"Product added to shopping cart succesfully");
    }else{
      addNotification(await response.text(),'danger',"Couldn't add product to cart");
    }
    }
  };

  const handleDelete = async () => {
    if(selectedSize){
      const response = await deleteProductSize(selectedSize.productSizeId)
      if(response.ok){
        addNotification("Product size with id " + selectedSize.productSizeId + " deleted succesfully", 'success', "Success");
        setProduct((prev)=>{
          if(prev){
            const updatedSizes = prev.sizes.filter((size)=> size.productSizeId !== selectedSize.productSizeId )
            return {...prev, sizes: updatedSizes};
          }
          return prev;
        })
      }else{
        addNotification(await response.text(),'danger','Something happened');
      }
    }else{
      addNotification("You must select a size first!",'warning','Warining');
    }

  } 

  const handleAddSize = () => {
    navigate("/admin/products");
    // if (selectedProduct) {
    //   window.localStorage.setItem('selectedProduct', selectedProduct.id.toString());
    // }
  }







  return (
    <Card>
      <CardHeader>
        {
          isAdmin ? <> 
          <Button variant="danger" onClick={handleDelete}>Delete product  </Button>
            <Button variant="warning" onClick={handleAddSize} >Edit product </Button>

          </> : <></>
        }

      </CardHeader>

      <div className="product-page-container">

        <div className="product-info">
          <img className="product-image" src={imageUrl} />
          <div className="product-data">
            <div className="product-title">
              {product ? <> {product?.gender.name}'s {product?.brand.name}{" "}
              {product?.category.name.toUpperCase()} {product?.category.typeName}
              <label className="head-big">{product?.name}</label>
              <label className="head-big">${product?.price}</label></> : <> <label>Loading data</label></>}
            </div >
           
            <br />
              <table className="specs-table"> 
                <tbody>
                    {product?.attributes.map((product,index) => (
                        <tr key={index}>
                          <td >{product.attribute_name}</td>
                          <td>{` ${product.value}`}</td>
                        </tr>
                    ))}   
                </tbody>
              </table>
            <div className="size-buttons">
              {product?.sizes.map((size, index) => (
                <Button key={size.size.id} className={size.size.id == selectedSize?.size.id ? "selected-size" : "not-selected-size"}
                  onClick={() => { setSelectedSize(size); }}>
                  {size.size.value}
                </Button>
              ))}
            </div>
            {selectedSize?.size.id !== 0 ? <>
              <div><br/>
                <div className="product-buttons">
                  <IconContext.Provider value={{ size: "50px" }}>
                    <Button className={ favorited ? `favorited` : `not-favorited`} onClick={addToFavorite}>
                      {favorited ? <AiFillHeart /> : <AiOutlineHeart />}
                    </Button>

                    {selectedSize?.stock !== 0 ? <Button className="cart-button" disabled={selectedSize?.stock === 0} onClick={addToCart}>
                      <AiFillPlusCircle />
                      Cart
                    </Button> : <label>Out of stock</label>}

                  </IconContext.Provider>
                </div>
              </div>
            </> : <></>}

          </div>
          <p className="product-description">{product?.description}</p>
        </div>
        



      </div>

    </Card>
  );

};

export default ProductPage;
