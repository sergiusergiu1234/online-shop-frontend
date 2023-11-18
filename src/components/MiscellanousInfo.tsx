import '../Styles/Miscellanous.css'
import {TbTruckDelivery } from 'react-icons/tb';
import {GiSkullShield,GiHammerBreak} from 'react-icons/gi';
import { MdSupportAgent } from 'react-icons/md';
const MiscellanousInfo = () => {
    return (
    <div>
        <hr className='miscellanous-ribbon'/>
        <div className="miscellanous-container">
            <div className='miscellanous-fact '>
                <TbTruckDelivery />
            <label className='miscellanous-text'>Fast Delivery Service</label>
            </div>
            <div className='miscellanous-fact'>
                <GiSkullShield />
                <label className='miscellanous-text'>Durable Product</label>
            </div>
            <div className='miscellanous-fact'>
                <GiHammerBreak />
                <label className='miscellanous-text'>Limited Warranty</label>
            </div>
            <div className='miscellanous-fact'>
                <MdSupportAgent />
                <label className='miscellanous-text'>Reliable Support</label> 
            </div>
        </div>
    </div>)
}

export default MiscellanousInfo;