import React, { useState, useEffect } from "react";
import Restaurant from "./Restaurant";
import axios from "axios";
import "./restaurantList.css";
import Pagination from "./Pagination";
import { useHistory, useLocation, useParams } from "react-router-dom";

const RestaurantList = (props) =>{
    const [restaurantList, setrestaurantList] = useState([]);
    const [sortType, setSortType] = useState('Sort');
    const [filterType, setFilterType] = useState('Tags');
    const history = useHistory();
    console.log(props);
    const {id,tag} =useParams();
    const location = useLocation();
    const LS_PREFIX = "my_unique_id";
    
    useEffect(() => {
        axios.get("http://localhost:3005/restaurant/")
        .then((res) => {
            if (res.data.length > 0) {
                setrestaurantList(res.data);
            }})
            .catch((err) => console.log(err));
    },[]);
    
      const onSearch = () => {
          const txt = document.querySelector(".search");
          const search = txt.value;
          history.push(`/restaurant/search?q=${search}`);
      }
      useEffect(() => {
      //  const currentPath = location.pathname;
        const searchParams = new URLSearchParams(location.search);
          axios.get(`http://localhost:3005/restaurant/search?`+searchParams)
          .then((res) => {
              if (res.data.length > 0) {
                  setrestaurantList(res.data);    
               }})
              .catch((err) => console.log(err));
      },[location]);
      useEffect(() => {
            axios.get(`http://localhost:3005/restaurant/`+id)
            .then((res) => {
                if (res.data.length > 0) {
                    setrestaurantList(res.data);    
                 }})
                .catch((err) => console.log(err));
        },[id]);

        useEffect(() => {              
            axios.get("http://localhost:3005/restaurant/tag/"+tag)
                .then((res) => {
                    if (res.data.length > 0) {
                      setrestaurantList(res.data);        
                 }})
                .catch((err) => console.log(err));
        },[tag]);
        useEffect(() => {              
            const favourite = new URLSearchParams(location.search);
            axios.get(`http://localhost:3005/restaurant/fav?`+favourite)
                .then((res) => {
                    if (res.data.length > 0) {
                      setrestaurantList(res.data);        
                 }})
                .catch((err) => console.log(err));
        },[location]);
        const onFav= () => {
            const fav = document.querySelector("#fav");
            if(fav.style.color === "red"){
                fav.style.color = "grey";
                history.replace(`/restaurant`);
            }
            else {
                fav.style.color = "red";
                var ids = [];
                for (let i = 0; i < window.localStorage.length; i++) {
                    let key = window.localStorage.key(i);
                    if (key.slice(0,12) === LS_PREFIX) {
                        ids.push(JSON.parse(window.localStorage.getItem(key)));
                    }
                }
                history.push(`/restaurant/fav?fav=${ids}`);
            }
        }
        
       
    return(
        <div className="main">
            <div id="rlbgimg">
                <br />
             <h1>OnTheGO - <span style={{color:"green",fontStyle:"italic"}}> Food Ordering </span> </h1>
             <div className="searchbtn">
                <input className="search" type="text" />
                <button className="btn" type="submit" onClick={onSearch}>Search</button>
                <button type="text" className="rlbtnfav" onClick={onFav}>
                    <i className="material-icons" id="fav" style={{fontSize: "15px", color:"grey"}} >favorite</i>
                </button>
            </div>

            <div className="sortfilter">
            <label><b>Sort: </b> </label>
            <select className="sort" onChange={(e) => {
                let id = e.target.value;
                setSortType(id);
                history.push(`/restaurant/${id}`);
            }} value= {sortType}>
                <option value="location">location</option>
                <option value="ETA">ETA</option>
                <option value="rating">rating</option>
            </select>
            <label><b>Tags: </b></label>
            <select className="filter" onChange={(e) => {
                let tag = e.target.value;
                setFilterType(tag);
                history.push(`/restaurant/tag/${tag}`);
                }} value={filterType}>
                <option>Mexican</option>
                <option>Indian</option>
                <option>Italian</option>
                <option>Chinese</option>
            </select>
            </div>  
        </div>
        {/* {isLoggedIn &&
        <div>
          <div>
            <img src={imageUrl} alt="pic"/>
          </div>
          <div>{name}</div>
          <div>{email}</div>
          <button className='btn-primary' onClick={logOut}>Log Out</button>
        </div>
      } */}
        {restaurantList.length > 0 ? (
         <Pagination
            data={restaurantList}
            RenderComponent={Restaurant}
            pageLimit={2}
            dataLimit={8}
          />
        
      ) : (
       <h1>No Restaurants to display</h1>
      )}
    </div>
    );    
}
export default RestaurantList;
