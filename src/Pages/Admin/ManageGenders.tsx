import { useEffect, useState } from "react";
import { addGender, deleteGender, fetchGenders } from "../../api/api";
import { Gender } from "../../Types/Gender.type";
import { Button, FloatingLabel, Form } from "react-bootstrap";
import { IconContext } from "react-icons";
import { MdOutlineModeEdit } from "react-icons/md";
import "../../Styles/ManageGenders.css";
const ManageGenders = ()=>{

    const [genders,setGenders] = useState<Gender[]>([]);
    const [genderId,setGenderId] = useState(0);
    const [genderName, setGenderName] = useState('');
    
    useEffect(()=>{
        fetchGenders().then((data)=>setGenders(data))
    },[])

    const handleDeleteGender =(genderId:number)=>{
        const confirmed = window.confirm("Are you sure you want to delete this gender?");
        if (confirmed){
            deleteGender(genderId).then((data)=>{setGenders((prev)=>{
               const updated= prev.filter((gender)=>{
                    return genderId !== gender.id;
                })
                return updated
            })
        })
        }
    }

    const handleAddGender = (event:any) =>{
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you want to add this gender?");
        if (confirmed){
        addGender(genderName).then((data)=>setGenders((prev)=>[...prev, data]));
        }
    }


    return (<div className="manage-genders-page">
   
    <section>
        <table className="brands-table">
            <thead>
                <tr>
                    <th>
                        Gender id
                    </th>
                    <th>
                        Gender name
                    </th>
                </tr>
            </thead>
            <tbody>
                {genders.map((gender:Gender)=><tr key={gender.id}>
                    <td>
                        {gender.id}
                    </td>
                    <td>
                        {gender.name}
                    </td>
                    <td className="actions">
                        <IconContext.Provider  value={{size: '30px'}}>
                        <Button className="edit" onClick={()=>setGenderId(gender.id)}><MdOutlineModeEdit /></Button>
                        <Button type="submit" variant="danger" onClick={()=>handleDeleteGender(gender.id)}>Delete</Button>
                        </IconContext.Provider>
                    </td>
                </tr>)}
            </tbody>
        </table>
    </section>


    <section>
        <h2>Add new gender</h2>
        <form onSubmit={handleAddGender}>
            <FloatingLabel label='Gender name'>
                <Form.Control
                placeholder="Gender name"
                type="text"
                id="genderName"
                onChange={(e) => setGenderName(e.target.value)}
                value={genderName}
                required
                /></FloatingLabel>
            <Button type="submit" variant="success">Add gender</Button>
            </form>
        </section>v
</div>)
}
export default ManageGenders;