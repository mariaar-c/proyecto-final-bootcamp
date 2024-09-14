import React from "react";
import MenuItem from "../cards/menuItem";
import { useState, useEffect } from "react";

const RestaurantMenu = ({ id }) => {
    const [menuItems, setMenuItems] = useState([]);
    const [error, setError] = useState(null);
  
    useEffect(() => {
      const fetchMenuItems = async () => {
        try {
          const response = await fetch('http://localhost:3001/menus/restaurant/?restaurantId='+id, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
  
          const data = await response.json();
          setMenuItems(data); 
        } catch (err) {
          setError(err.message); 
        }
      };
  
      fetchMenuItems();
    },[id]);
  
    if (error) {
      return <div>Error: {error}</div>; 
    }
  
    return (
      <div className="container">
        <div className="row">
          {menuItems.map(menuItem => {
            return <div className="col-md-4" key={menuItem._id}>
            <MenuItem
            picture = {menuItem.picture}
            name = {menuItem.name}
            price = {menuItem.price}
            ingredients = {menuItem.ingredients}
            >
  
            </MenuItem>
          </div>
          })}
            
          
        </div>
      </div>
    );
  };
  
  export default RestaurantMenu;
  