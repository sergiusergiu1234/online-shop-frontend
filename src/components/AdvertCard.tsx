import { Button, Card} from "react-bootstrap";
import '../Styles/AdvertCard.css';
import { Link } from "react-router-dom";
export type AdvertCardType={
    text:string,
    imgSrc:string,
    linkTo:string,
    filter:string
}
const AdvertCard = ({ text, imgSrc, linkTo, filter }: AdvertCardType) => {

  const handleClick = () =>{
    localStorage.setItem('f', filter);
  }
  
    return (
      <Link  className="card-container"  to={linkTo} onClick={handleClick}>
        <img src={imgSrc}  className="card-image" />
        <label className="card-text">{text}</label>
      </Link>
    );
  };
export default AdvertCard;