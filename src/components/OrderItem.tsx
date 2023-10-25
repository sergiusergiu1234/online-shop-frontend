import { CartItemType } from "../Types/CartItemType.types";
import "../Styles/OrderItem.css"

interface Props{
    item:CartItemType;
}

const OrderItem =({item}:Props)=>{
    return(<div className="order-item-container">
        <label className="product-name">{item.productName}({item.quantity})_size {item.product.size} - {item.price} RON</label>
    </div>)
}

export default OrderItem;