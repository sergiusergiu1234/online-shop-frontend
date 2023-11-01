import { IconContext } from "react-icons";
import {VscDebugStart} from "react-icons/vsc"
import "../Styles/SumarComanda.css"
import { Card } from "react-bootstrap";
import CardHeader from "react-bootstrap/esm/CardHeader";
import { handleCheckout } from "../api/api";
import { useNavigate } from "react-router";
import useAuth from "../hooks/useAuth";
interface Props {
    total:number;
}



const SumarComanda = ({total}:Props) =>{


    return (<Card className="sumar-container">
        <div className="sumar-header">
        <h5>Summary</h5>
        </div>
        <Card.Body className="sumar-body">
        <label className="detail">Products:</label>
        <label></label>
        <label className="detail">Delivery:</label>
        <label></label>
        <label className="total">Total:</label>
        <label className="total">${total}</label>
        </Card.Body>
        </Card>)
}

export default SumarComanda;