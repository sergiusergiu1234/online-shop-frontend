import { useEffect, useState } from "react"
import { Category } from "../../Types/Category.types"
import { addCategory, addType, deleteCategory, deleteType, editCategory, editType, fetchCategories, fetchTypes } from "../../api/api";
import { IconContext } from "react-icons";
import { MdOutlineModeEdit } from "react-icons/md";
import { Button } from "react-bootstrap";
import "../../Styles/ManageCategories.css";
import {FloatingLabel, Form} from "react-bootstrap"
import { Type } from "../../Types/Type.types";
const ManageCategories = () =>{

    const [categories,setCategories] = useState<Category[]>([])
    const [categoryId,setCategoryId] = useState<number | null>(null);
    const [categoryName,setCategoryName]= useState('');


    const [types, setTypes] = useState<Type[]>([])
    const [typeId, setTypeId] = useState<number | null >(null);
    const [typeName, setTypeName] = useState("");

    useEffect(()=>{
        fetchTypes().then((data)=>setTypes(data));
    },[]);

    useEffect(()=>{
        fetchTypes().then((data)=>setTypes(data));
    },[categories])


    const handleAddCategory =(event:any)=>{
        event.preventDefault();
        addCategory(categoryName,typeId).then((data)=>{
            setCategories((prev)=>[...prev, data]);
        })
    }


    const handleDeleteCategory =(categoryId:number)=>{
        deleteCategory(categoryId).then((data)=>{
            setCategories((prev)=> prev.filter((category)=> category.id !== data.id))
        })
    }

    const handleEditCategory =(event:any)=>{
        event.preventDefault();
        editCategory(categoryId,categoryName).then((data)=>{setCategories((prev)=>{
            const updatedCategories = prev.map((category)=>{
                if(category.id === categoryId){
                    return data;
                }
                return category;
            });
            return updatedCategories;
        })})
    }

    const handleDeleteType=(typeId:number)=>{
        const confirmed = window.confirm("Are you sure you want to delete this type?");
        if (confirmed){
            deleteType(typeId).then((data)=>{
                setTypes((prev)=>prev.filter((type:Type)=> type.id !== data.id ));
            });
            setCategories([]);
        }
    }

    const handleAddType =(event:any) =>{
        event.preventDefault();
            addType(typeName).then((data)=> {setTypes((prev) => [...prev, data])});
    }

    const handleEditType =(event:any) =>{
        event.preventDefault();
        const confirmed = window.confirm("Are you sure you want to edit this type?");
        if (confirmed){
        editType(typeName,typeId).then((data)=>{setTypes((prev)=> {
            const updatedTypes= prev.map((type)=>{
                if(type.id === typeId){
                    return data;
                }
                return type;
            });
            return updatedTypes;
        })
        })
    }
    }

    
    return (<div className="manage-categories-page">
      
        <section className="tables">
            <div className="tab">
        <h3>Categories</h3>
        <label>Selected type: {typeId}</label>
        <table className="brands-table" >
            <thead>
                <tr>
                    <th>
                        Cateogory id
                    </th>
                    <th>
                        Category name
                    </th>
                </tr>
            </thead>
            <tbody>
                {categories.map((category:Category)=><tr key={category.id}>
                    <td>
                        {category.id}
                    </td>
                    <td>
                        {category.name}
                    </td>
                    <td className="actions">
                        <IconContext.Provider  value={{size: '30px'}}>
                        <Button className="edit" onClick={()=>setCategoryId(category.id)}><MdOutlineModeEdit /></Button>
                        <Button type="submit" variant="danger" onClick={()=>handleDeleteCategory(category.id)}>Delete</Button>
                        </IconContext.Provider>
                    </td>
                </tr>)}
            </tbody>
        </table>
        </div>
        <div className="tab">
        <h3>Types</h3>
        <table className="brands-table" >
            <thead>
                <tr>
                    <th>
                        Type id
                    </th>
                    <th>
                        Type name
                    </th>
                </tr>
            </thead>
            <tbody>
                {types.map((type:Type)=><tr key={type.id}>
                    <td>
                        {type.id}
                    </td>
                    <td>
                        {type.name}
                    </td>
                    <td className="actions">
                        <IconContext.Provider  value={{size: '30px'}}>
                        <Button className="edit" onClick={()=>{setTypeId(type.id);setCategories(type.categoryDtoList)}}><MdOutlineModeEdit /></Button>
                        <Button type="submit" variant="danger" onClick={()=>handleDeleteType(type.id)}>Delete</Button>
                        </IconContext.Provider>
                    </td>
                </tr>)}
            </tbody>
        </table>
        </div>
        </section>


        <section>
        <h2>Add new category</h2>
        <form onSubmit={handleAddCategory}>
            <FloatingLabel label='Category name'>
                <Form.Control
                placeholder="Category name"
                type="text"
                id="categoryName"
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
                required
                /></FloatingLabel>
                   <FloatingLabel label="Type id ">
                    <Form.Control
                        placeholder="Type id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setTypeId(parseInt(e.currentTarget.value))}
                        value={typeId !== null ? typeId.toString() : ''}
                    /></FloatingLabel>
            <Button type="submit" variant="success">Add category</Button>
            </form>
        </section>

        <section>
            <h2>Edit category</h2>
            <form onSubmit={handleEditCategory}>
            <FloatingLabel label='Category name'>
                <Form.Control
                placeholder="Category name"
                type="text"
                id="categoryName"
                onChange={(e) => setCategoryName(e.target.value)}
                value={categoryName}
                required
                /></FloatingLabel>
                 <FloatingLabel label="Category id ">
                    <Form.Control
                        placeholder="Cateogry id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setCategoryId(parseInt(e.currentTarget.value))}
                        value={categoryId !== null ? categoryId.toString() : ''}
                    /></FloatingLabel>
            <Button type="submit" variant="success">Edit category</Button>
            </form>
        </section>

        <section>
            <h2>Add/edit type</h2>
            <form onSubmit={handleAddType}>
            <FloatingLabel label='Type name'>
                <Form.Control
                placeholder="Type name"
                type="text"
                id="typeName"
                onChange={(e) => setTypeName(e.target.value)}
                value={typeName}
                required
                /></FloatingLabel>
             <FloatingLabel label="Type id ">
                    <Form.Control
                        placeholder="Type id"
                        id="id"
                        type="number"
                        pattern="[0-9]*"
                        onChange={(e) => setTypeId(parseInt(e.currentTarget.value))}
                        value={typeId !== null ? typeId.toString() : ''}
                    /></FloatingLabel>
                <Button type="submit" variant="success">Add type</Button>
                <Button onClick={handleEditType} variant="warning">Edit type</Button>
            </form>
            
                
           
        </section>
    </div>)
}

export default ManageCategories