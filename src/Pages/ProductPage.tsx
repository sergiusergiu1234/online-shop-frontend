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
import { API_URL } from "../api/api";



const ProductPage = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();
  const [searchParams] = useSearchParams();
  const [isAdmin, setIsAdmin] = useState(false);
  const [edit, setEdit] = useState(false);
  const [products, setProducts] = useState<SpecificProduct[]>([
    {
      id: 0,
      name: "",
      price: 0,
      brand: { id: 0, name: "" },
      gender: { id: 0, name: "" },
      category: { id: 0, name: "", typeName: "" },
      image: "",
      description: "",
      isFavorite: false,
      attributes: [{ attribute_name: "", value: "" }],
      size: "",
      stock: 0
    },
  ]);

  const [selectedProduct, setSelectedProduct] = useState<SpecificProduct>(products[0]);
  const [favorited, setFavorited] = useState(selectedProduct.isFavorite);


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
    fetchProducts();
    if (auth.accessToken) {
      setIsAdmin(auth.roles.includes("ROLE_ADMIN"));
    }
  }, []);


  useEffect(() => {

    setFavorited(selectedProduct.isFavorite);
    console.log(selectedProduct)
  }, [selectedProduct]);
  useEffect(() => {
    setSelectedProduct(products[0]);
  }, [products])
  const fetchProducts = async () => {

    if (auth.accessToken) {
      const token = window.sessionStorage.getItem("accessToken");;
      fetch(`${API_URL}/products/${searchParams.get('name')}`, {
        method: 'GET',

        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then((response) => response.json())
        .then((data) => { setProducts(data) })
        .catch((error) => console.log(error));
    }
    else {

      fetch(`${API_URL}/products/${searchParams.get('name')}`)
        .then((response) => response.json())
        .then((data) => { setProducts(data); })
        .catch((error) => console.log(error));
    }

  };

  const addToFavorite = () => {
    //verify if authenticated
    if (auth.accessToken) {
      const token = window.sessionStorage.getItem("accessToken");
      if (!favorited) {
        //send server request
        fetch(`${API_URL}/favorites/add/${selectedProduct.id}`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(data => {
            setFavorited(true); console.log(data)
          })
      } else {
        //send server request
        fetch(`${API_URL}/favorites/delete/${selectedProduct.id}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
          .then(response => response.json())
          .then(data => {
            setFavorited(false);
          })
      }
    } else {
      alert("You must log in first!")
    }
  };

  const addToCart = () => {
    if (auth.accessToken) {
      const token = window.sessionStorage.getItem("accessToken");

      fetch(`${API_URL}/shoppingCart/add/${selectedProduct.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
        .then(response => response.json())
        .then(data => console.log(data))
    } else {
      alert("You must log in first!")
    }
  };

  const handleDelete = () => {
    const token = window.sessionStorage.getItem("accessToken");
    fetch(`${API_URL}/products/admin/${selectedProduct.id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
    window.location.reload();
  }

  const handleAddSize = () => {
    navigate("/admin/products");
    if (selectedProduct) {
      window.localStorage.setItem('selectedProduct', selectedProduct.id.toString());
    }
  }



  useEffect(() => {
    console.log(products)
  }, [products])



  return (
    <Card>
      <CardHeader>
        {
          isAdmin ? <> <Button variant="danger" onClick={handleDelete}>Delete product :( </Button>
            <Button variant="warning" onClick={handleAddSize} >Edit product :| </Button>

          </> : <></>
        }

      </CardHeader>

      <div className="product-page-container">

        <div className="product-info">
          <img className="product-image" src={imageUrl} />
          <div>
            <div className="product-title">
              {selectedProduct.gender.name}'s {selectedProduct.brand.name}{" "}
              {selectedProduct.category.name.toUpperCase()} {selectedProduct.category.typeName}
              <label className="head-big">{selectedProduct.name}</label>
              <label className="head-big">${selectedProduct.price}</label>
            </div >
            <label className="bold">Product specs:</label>
            <br />
              <table className="specs-table"> 
                <tbody>
                    {selectedProduct.attributes.map((product,index) => (
                        <tr key={index}>
                          <td >{product.attribute_name}</td>
                          <td>{` ${product.value}`}</td>
                        </tr>
                    ))}   
                </tbody>
              </table>
            <div className="size-buttons">
              {products.map((product, index) => (
                <Button key={product.id} className={product.id == selectedProduct.id ? "selected-size" : "not-selected-size"}
                  onClick={() => { setSelectedProduct(product); }}>
                  {product.size}
                </Button>
              ))}
            </div>
            {selectedProduct.name !== "" ? <>
              <div>


                <div className="product-buttons">
                  <IconContext.Provider value={{ size: "50px" }}>
                    <Button className={ favorited ? `favorited` : `not-favorited`} onClick={addToFavorite}>
                      {favorited ? <AiFillHeart /> : <AiOutlineHeart />}
                    </Button>

                    {selectedProduct.stock !== 0 ? <Button className="cart-button" disabled={selectedProduct.stock === 0} onClick={addToCart}>
                      <AiFillPlusCircle />
                      Add to cart
                    </Button> : <label>Out of stock</label>}

                  </IconContext.Provider>
                </div>
              </div>
            </> : <></>}

          </div>
        </div>
        <p className="product-description">{selectedProduct.description}</p>



      </div>

    </Card>
  );
};

export default ProductPage;
