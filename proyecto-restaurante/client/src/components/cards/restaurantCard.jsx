import { useNavigate } from 'react-router-dom';
import React from 'react';

const RestaurantCard = ({ name, picture, address, category, id }) => {
  const navigate = useNavigate();


  return (
    <div className="card" style={{ width: '18rem' }}>
      <img src={picture} className="card-img-top" alt={name} />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{address}</p>
        <p className="card-text"><small className="text-muted">{category}</small></p>
        <button onClick={() => {
          navigate('/restaurant', { state: { restaurantId: id } })
        }
           }>Visitar</button>
        <button onClick={() => {
          navigate('/reservation', {state:{restaurantId: id}})
        }
           }>Reservar</button>
      </div>
    </div>
  );
};

export default RestaurantCard;
