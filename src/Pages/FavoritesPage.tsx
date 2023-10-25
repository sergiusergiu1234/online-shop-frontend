import { useEffect, useState } from "react";
import { FavoriteType } from "../Types/FavoriteType.types";
import Favorite from "../components/Favorite";
import "../Styles/FavoritePage.css"

const FavoritesPage =()=>{
    const [favoriteList,setFavorites] = useState<FavoriteType[]>([]);
    useEffect(()=>{
        const token = window.localStorage.getItem('accessToken');
        fetch('http://localhost:8080/favorites',{
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => response.json())
        .then(data => { setFavorites(data);
                        console.log(data)}
           )
        .catch(error => console.log(error));
    },[]);

    const handleRemove =(favorite:FavoriteType)=>{
        const token = window.localStorage.getItem('accessToken')
        fetch(`http://localhost:8080/favorites/delete/${favorite.productId}`,{
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response =>response.json())
        .then(data => setFavorites(prev=> prev.filter((fav)=> fav.productId != data.productId)))
    }

    
    return (<div  className="favorite-page">
        <h1 className="small-title">Favorite products</h1>
        <div>
        {favoriteList.map((favorite:FavoriteType)=>(
            <Favorite key={favorite.productId} favorite={favorite} handleRemove={handleRemove} />
        ))}
        </div>
    </div>)
}
export default FavoritesPage;