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
import { Button, Card, Spinner } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { SpecificProduct } from "../Types/SpecificProduct.types";
import useAuth from "../hooks/useAuth";
import { API_URL, addFavorite, addShoppingCart, deleteFavorite, deleteProductSize, fetchFavorites, fetchProductImage } from "../api/api";
import { ProductDetails } from "../Types/ProductDetails.type";
import { ProductSize } from "../Types/ProductSize.types";
import { useNotifications } from "../context/NotificationContext";
import { FavoriteType } from "../Types/FavoriteType.types";
import MiscellanousInfo from "../components/MiscellanousInfo";



const ProductPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [product, setProduct] = useState<ProductDetails>()
  const [selectedSize, setSelectedSize] = useState<ProductSize>();
  const { addNotification } = useNotifications();
  const [favoriteList, setFavoriteList] = useState([]);
  const [favorited, setFavorited] = useState(selectedSize?.favorite);
  const [imageData, setImageData] = useState();
  const [loadingFavorite,setLoadingFavorite] = useState(false);

  useEffect(() => {
    fetchProduct();
    if (auth.accessToken) {
      setIsAdmin(auth.roles.includes("ROLE_ADMIN"));
    }
  }, []);
  useEffect(() => {
    const fetchImage = async () => {
      if (product) {
        try {
          const response = await fetchProductImage(product.id);
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data: any = await response.text();
          setImageData(data);
        } catch (error) {
          console.error('Error fetching image:', error);
        }
      }
    };

    fetchImage();
  }, [product]);

  const updateFavorites = async () => {
    const favoriteData = await fetchFavorites();
    setFavoriteList(await favoriteData.json())
  }

  useEffect(() => {
    setFavorited(selectedSize?.favorite)
    updateFavorites();

  }, [selectedSize])



  const fetchProduct = async () => {
    const token = window.sessionStorage.getItem("accessToken");
    if (token != null) {
      fetch(`${API_URL}/products/Page/${searchParams.get('name')}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => { setProduct(data); console.log(data) })
        .catch((error) => console.log(error));
    }
    else {
      fetch(`${API_URL}/products/Page/${searchParams.get('name')}`, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => { setProduct(data); })
    }
  };

  const addToFavorite = async () => {
    if (selectedSize) {
      if (auth.accessToken) { 
        setLoadingFavorite(true);
        const response = favorited ? await deleteFavorite(selectedSize.productSizeId) :
          await addFavorite(selectedSize.productSizeId);
        if (response.ok) {
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
        } else {
          addNotification(await response.text(), 'danger', "Something happened");
        }
        setLoadingFavorite(false);
      } else {
        addNotification("You must log in first!", 'warning', 'warning');
      }

    } else {
      addNotification("You must select a size first!", 'warning', 'warning');
    }

  };


  const addToCart = async () => {
    if (selectedSize) {
      if (auth.accessToken) {
        const response = await addShoppingCart(selectedSize.productSizeId);
        if (response.ok) {
          console.log(await response.text())
          addNotification('Product added to cart.', 'success', "Product added to shopping cart succesfully");
        } else {
          addNotification(await response.text(), 'danger', "Couldn't add product to cart");
        }
      } else {
        addNotification("You must log in first!", 'warning', 'Warning');
      }


    } else {
      addNotification('You must select a size fisrt!', "warning", 'warning');
    }
  };

  const handleDelete = async () => {
    if (selectedSize) {
      const response = await deleteProductSize(selectedSize.productSizeId)
      if (response.ok) {
        addNotification("Product size with id " + selectedSize.productSizeId + " deleted succesfully", 'success', "Success");
        setProduct((prev) => {
          if (prev) {
            const updatedSizes = prev.sizes.filter((size) => size.productSizeId !== selectedSize.productSizeId)
            return { ...prev, sizes: updatedSizes };
          }
          return prev;
        })
      } else {
        addNotification(await response.text(), 'danger', 'Something happened');
      }
    } else {
      addNotification("You must select a size first!", 'warning', 'Warining');
    }

  }

  const handleAddSize = () => {
    navigate("/admin/products");
    // if (selectedProduct) {
    //   window.localStorage.setItem('selectedProduct', selectedProduct.id.toString());
    // }
  }


  return (
    <div>
      <CardHeader>
        {
          isAdmin ? <>
            <Button variant="danger" onClick={handleDelete}>Delete product  </Button>
            <Button variant="warning" onClick={handleAddSize} >Edit product </Button>
            <br />
            <label>current product :{product?.id}</label>
          </> : <></>
        }

      </CardHeader>

      <div className="product-page-container">

        <div className="product-info">
          {imageData ? (
            <div className="product-image-container">
              <img className="product-image" src={`data:image/png;base64,${imageData}`} alt="Red dot" />
            </div>
          ) : <Spinner className="image-spinners"></Spinner>}

          {product ? <>
            <div className="product-data">
              <div className="product-title">
                {product?.gender.name}'s {product?.brand.name}{" "}
                {product?.category.name.toUpperCase()} {product?.category.typeName}
                <label className="head-big">{product?.name}</label>
                <label className="head-big">${product?.price}</label>
              </div >

              <br />
              <table className="specs-table">
                <tbody>
                  {product?.attributes.map((product, index) => (
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
              <br />
              {selectedSize?.size.id !== 0 ? <>
                {selectedSize && (selectedSize.stock < 5 && <label className="attention-stock-label">Only {selectedSize.stock} left in stock!</label>)}
                <div>
                  <div className="product-buttons">
                    <IconContext.Provider value={{ size: "50px" }}>
                    <Button 
                         className={`buton ${favorited ? 'favorited' : 'not-favorited'} ${loadingFavorite ? 'disabled-button' : ''}`}
                        onClick={addToFavorite} 
                        disabled={loadingFavorite}>
                      {loadingFavorite ? <Spinner animation="border" variant="dark" size="sm" /> : favorited ? <AiFillHeart /> : <AiOutlineHeart />}
                      Add to wishlist
                    </Button>

                      {selectedSize?.stock !== 0 ? <Button className="buton cart-button" disabled={selectedSize?.stock === 0} onClick={addToCart}>
                        <AiFillPlusCircle />
                        Add to Cart
                      </Button> : <label>Out of stock</label>}

                    </IconContext.Provider>
                  </div>
                </div>
              </> : <></>}

            </div>

          </>:<><div className="spinner-container"> <Spinner animation="border"></Spinner></div></>}

          <div className="description-container">
            {product
              ?
              <>
                <h5>About the product</h5>
                <p className="product-description">{product?.description}</p>
              </>
              :
              <Spinner></Spinner>}

          </div>

        </div>
        {product && <MiscellanousInfo />}

      </div>

    </div>
  );

};

export default ProductPage;
