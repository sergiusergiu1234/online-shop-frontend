import { useEffect, useState } from "react";
import { Button, FloatingLabel, Form, Table } from "react-bootstrap";
import "../../Styles/ManageBrands.css";
import { addBrand, deleteBrand, editBrand, fetchBrands } from "../../api/api";
import { Brand } from "../../Types/Brand.types";
import { MdOutlineModeEdit } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { IconContext } from "react-icons";
const ManageBrands = () =>{

    const [brandName, setBrandName] = useState("");
    const [brandId,setBrandId] = useState<number | null>(null);
    const [brands, setBrands] = useState<Brand[]>([]);

    
    useEffect(()=>{
        fetchBrands().then((data) => setBrands(data));
    },[]);
    useEffect(()=>{
        console.log(brands);
    },[brands])

    const handleAddBrand =(event:any)=>{
        event.preventDefault();
        addBrand(brandName).then((data)=> {setBrands((prev) => [...prev, data])});
    }
    const handleEdit =(event:any)=>{
        event.preventDefault();
        editBrand(brandId,brandName).then((data)=> {setBrands((prev) =>{
            const updatedBrands = prev.map((brand)=>{
                if (brand.id === data.id) {
                    return data;
                }
                return brand;
            });
            return updatedBrands
        })});
    }
    const handleDelete =(brandId:number)=>{
       
        deleteBrand(brandId).then((data)=> setBrands(prev=> prev.filter((brand)=>brand.id !== data.id)));
        
    }
    return (<div className="manage-brands-page">
 
   
     <section>
        <table className="brands-table" >
            <thead>
                <tr>

                
                <th>
                    Brand id
                </th>
                <th>
                    Brand name
                </th>
                </tr>
            </thead>
            <tbody>
                {brands.map((brand:Brand)=><tr key={brand.id}>
                    <td>
                        {brand.id}
                    </td>
                    <td>
                        {brand.name}
                    </td>
                    <td className="actions">
                        <IconContext.Provider  value={{size: '30px'}}>
                        <Button className="edit" onClick={()=>setBrandId(brand.id)}><MdOutlineModeEdit /></Button>
                        <Button type="submit" variant="danger" onClick={()=>handleDelete(brand.id)}>Delete</Button>
                        </IconContext.Provider>
                    </td>
                </tr>)}
            </tbody>
        </table>
        </section>

        <section>
        <h2>Add new brand</h2>
        <form onSubmit={handleAddBrand}>
            <FloatingLabel label='Brand name'>
                <Form.Control
                placeholder="Brand name"
                type="text"
                id="brandName"
                onChange={(e) => setBrandName(e.target.value)}
                value={brandName}
                required
                /></FloatingLabel>
            <Button type="submit" variant="success">Add brand</Button>
            </form>
        </section>

        <section>
            <h2>Edit brand</h2>
            <form onSubmit={handleEdit}>
            <FloatingLabel label="Brand id ">
                    <Form.Control
                        placeholder="Brand id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setBrandId(parseInt(e.currentTarget.value))}
                        value={brandId !== null ? brandId.toString() : ''}
                    /></FloatingLabel>
            <FloatingLabel label='Brand name'>
                <Form.Control
                placeholder="Brand name"
                type="text"
                id="brandName"
                onChange={(e) => setBrandName(e.target.value)}
                value={brandName}
                required
                /></FloatingLabel>
            <Button variant="success" onClick={handleEdit}>Edit brand</Button>
            </form>
        </section>
    </div>)
}

export default ManageBrands;