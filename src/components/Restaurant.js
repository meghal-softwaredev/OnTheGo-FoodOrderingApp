import React,{useEffect, useState} from "react";
import axios from "axios";
import "./restaurant.css";

var favid=0;
const Restaurant = (props) => {
    const LS_PREFIX = "my_unique_id";
    const [color,setColor] = useState("grey");
    const [restaurantImg, setRestaurantImg] = useState([]);
    function _setItem (key, item) {
        localStorage.setItem(`${LS_PREFIX}${key}`, JSON.stringify(item));
    }
    function _getItem (key) {
        localStorage.getItem(`${LS_PREFIX}${key}`);
    }
    function validateItem(target){
        let i = localStorage.length;
        while (i-- > 0) {
            let key = localStorage.key(i);
            if (JSON.parse(localStorage.getItem(key)) === target) {
                return true;
            }
        }
    }
    function removeLocalStorageValues(target) {
        let i = localStorage.length;
        while (i-- > 0) {
            let key = localStorage.key(i);
            if (JSON.parse(localStorage.getItem(key)) === target) {
                localStorage.removeItem(key);
            }
        }
    }
    const {_id,name,location,rating,ETA} = props.data;
       
    useEffect(() => {
        axios.get(`http://localhost:3005/restaurant/photo/`+_id)
            .then(res => {
                setRestaurantImg(res.data);
            })
    }, [_id]);
    
    const onFavButton = (id) =>{
        const fav = document.getElementById(id);
        if(color === "red"){
            setColor("grey");
            fav.style.color = "grey";
            removeLocalStorageValues(_id);
        }
        else 
        {
            setColor("red");
            fav.style.color = "red";
            _setItem(favid,id);
            favid++;
        }
    }
    useEffect(() => {
        const fav = document.getElementById(_id);
        if(validateItem(_id)) {
            setColor("red");
            fav.style.color = "red";
        } 
        else{
            setColor("grey");
            fav.style.color = "grey";
        }
    },[_id]);
    return(
        <div className="card">
        <div className="img" >
        <img src={restaurantImg} alt="Restaurant" width="250px" height="250px" />
            
        </div>
        <div className="container">
        <div className="btnfav">
        <h6>{name}</h6> 
        
        <button type="text" onClick={() => onFavButton(_id)}>
            <i className="material-icons" id={_id} style={{fontSize: "15px"}}>favorite</i>
        </button>
        </div>
        
        <div className="display">
        <p><label>Location: </label>{location}</p>
        <p><label>Rating: </label>{rating}</p>
        <p><label>ETA: </label>{ETA}</p>
        </div> 
        </div>               
    </div>
    );
}
export default Restaurant;