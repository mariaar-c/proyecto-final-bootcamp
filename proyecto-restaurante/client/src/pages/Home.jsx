import React, { useState, useEffect } from 'react';
import RestaurantList from '../components/templates/RestaurantList';
import { IoSearchOutline } from 'react-icons/io5';
import CategoryCardList from '../components/cards/CategoryCardList';

const Home = () => {
  const [query, setQuery] = useState('');
  const [restaurants, setRestaurants] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null); // Nuevo estado para mensajes específicos
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const response = await fetch("http://localhost:3001/restaurants/all", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setRestaurants(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchRestaurants();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      const fetchRestaurantsByCategory = async () => {
        try {
          const response = await fetch(`http://localhost:3001/restaurants/category?category=${selectedCategory}`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          });

          if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
          }

          const data = await response.json();
          if (data.message) {
            setRestaurants(null); // Limpia la lista de restaurantes
            setMessage(data.message); // Establece el mensaje
          } else {
            setRestaurants(data);
            setMessage(null); // Limpia el mensaje
          }
          setError(null);
        } catch (error) {
          setError(error.message);
          setRestaurants(null);
          setMessage(null);
        }
      };

      fetchRestaurantsByCategory();
    }
  }, [selectedCategory]);

  const getRestaurantByName = async (name) => {
    try {
      const response = await fetch(`http://localhost:3001/restaurants/search?name=${name}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      setRestaurants(data);
      setError(null);
      setMessage(null); // Limpia el mensaje
    } catch (error) {
      setError(error.message);
      setRestaurants(null);
      setMessage(null);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query) {
      getRestaurantByName(query);
    }
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div>
      <h1>Bienvenido a la página de inicio</h1>
      <CategoryCardList onCategorySelect={handleCategorySelect} />
      <form onSubmit={handleSearch}>
        <div className="input-group mb-3">
          <IoSearchOutline size={24} className="input-group-text cursor-pointer" />
          <input
            type="text"
            className="form-control"
            placeholder="Search restaurants..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ borderRadius: '0.375rem' }}
          />
          <button type="submit" className="btn btn-primary">Search</button>
        </div>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {message && <p>{message}</p>}
      <RestaurantList restaurants={restaurants} />
    </div>
  );
};

export default Home;
