import React from 'react';
import RestaurantCard from '../cards/restaurantCard';

const RestaurantList = ({ restaurants, error }) => {
  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!restaurants || restaurants.length === 0) {
    return <p>No restaurants found</p>;
  }

  return (
    <div className="container">
      <div className="row">
        {restaurants.map((restaurant) => (
          <div className="col-md-4" key={restaurant._id}>
            <RestaurantCard
              name={restaurant.name}
              picture={restaurant.picture}
              address={restaurant.address}
              category={restaurant.category}
              id={restaurant._id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RestaurantList;
