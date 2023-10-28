
import "../Styles/HomePage.css";
import { Button, Form } from "react-bootstrap";


import { useNavigate } from "react-router";

import AdvertComp from "../components/AdvertComp";
import promoVideo from "../assets/images/promoVideo.mp4";
import promo2 from "../assets/images/promo2.mp4";

const HomePage = () => {
  const navigate = useNavigate();
  const goShopping = () => {
    navigate("/products");
  };

  return (
    <div className="homepage-container">
        <div  className="small-bar">
          <label>Free shipping for orders over 200$! <a href="">Shop now</a></label>
        </div>
        <div className="content">
          <div className="titles">
            <h1>Slope Emporium</h1>
            <h6>Unlock full potential...</h6>
          </div>
              <Button className="shop-now-button" onClick={goShopping}>
            EXPLORE
          </Button>
        </div>
        <video controls={false} disablePictureInPicture={true} width="100%" height="100%" autoPlay loop muted>
          <source src={promoVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
      <AdvertComp/>      
 
      
      <div >
        <video className="video2" controls={false} disablePictureInPicture={true}  autoPlay loop muted>
            <source src={promo2} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
      </div>
    
      <div className="contact-us-container">
        <Button className="contact-us-button">Contact Us</Button>
      </div>
    </div>
  );
};

export default HomePage;
