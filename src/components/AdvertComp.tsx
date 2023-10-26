import { Form } from "react-bootstrap";
import AdvertCard from "./AdvertCard";
import "../Styles/AdvertComp.css";
import bootsPromo from "../assets/images/boots-promo.webp"
import snowboardPromo from "../assets/images/sn-promo.jpg"
import bindingsPromo from "../assets/images/bindings-promo.webp"
import helmetsPromo from "../assets/images/helmet-promo.webp"
import gogglesPromo from "../assets/images/goggles-promo.jpeg"

const AdvertComp = () => {
    return (
    <div>
        <div className="advert" >
            <AdvertCard key={1} imgSrc={snowboardPromo} text="Snowboards" filter="Snowboards" linkTo="/products"/>
            <AdvertCard key={2} imgSrc={bootsPromo} text="Boots" linkTo="/products" filter="Boots"/>
            <AdvertCard key={3} imgSrc={bindingsPromo} text="Bindings" linkTo="/products" filter="Bindings"/>
            <AdvertCard key={4} imgSrc={helmetsPromo} text="Helmets" linkTo="/products" filter="Helmets"/>
            <AdvertCard key={5} imgSrc={gogglesPromo} text="Goggles" linkTo="/products" filter="Goggles"/>

        </div>
  </div>)
}

export default AdvertComp;