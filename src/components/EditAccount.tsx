import { Button } from "react-bootstrap";
import "../Styles/EditAccount.css";
import { useEffect, useState } from "react";
import { updatePersonalData } from "../api/api";

const EditAccount =()=>{
const [selected,setSelected] = useState("");
const [text,setText] = useState("");

useEffect(()=>{
    setText("");
},[selected])

const handleSubmit=()=>{
    updatePersonalData(selected, text).then((data)=>console.log(data));   
}

    return (<div className="editAccount-container">
        {selected == "firstname"   ?
            <div>
                <label>Enter new firstname</label><input value={text} onChange={(e)=>setText(e.target.value)}></input>
                <Button variant="success" onClick={handleSubmit}>confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("firstname")}}>Edit Firstname </Button> 
        } 


        {selected == "lastname"   ?
            <div>
                <label>Enter new lastname</label><input value={text} onChange={(e)=>setText(e.target.value)}></input>
                <Button variant="success"  onClick={handleSubmit}>confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("lastname")}}>Edit Lastname </Button> 
        } 


        {selected == "email"   ?
            <div>
                <label>Enter new email</label><input value={text} onChange={(e)=>setText(e.target.value)}></input>
                <Button variant="success" onClick={handleSubmit}>confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("email")}}>Edit Email </Button> 
        } 


        {selected == "phonenumber"   ?
            <div>
                <label>Enter new phone number</label><input value={text} onChange={(e)=>setText(e.target.value)}></input>
                <Button variant="success" onClick={handleSubmit}>confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("phonenumber")}}>Edit phone number </Button> 
        } 
        
        {selected == "password"   ?
            <div>
                <label>Enter new password</label><input value={text} onChange={(e)=>setText(e.target.value)}></input>
                <Button variant="success" onClick={handleSubmit}>confirm</Button>
                <Button variant="danger" onClick={()=>{setSelected("")}}>close</Button>  
            </div>
            : 
            <Button  onClick={()=>{setSelected("password")}}>Edit password </Button> 
        } 
    </div>)
}
export default EditAccount;