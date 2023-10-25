import { Button, Card} from "react-bootstrap";
import '../Styles/AdvertCard.css';

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
      <div  className="card-container"   onClick={handleClick}>
        <img src={imgSrc}  className="card-image" />
        <label className="card-text">{text}</label>
      </div>
    );
  };
export default AdvertCard;