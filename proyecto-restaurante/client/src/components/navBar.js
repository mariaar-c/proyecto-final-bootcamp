import logo from '../assets/images/logo_1.svg';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IoSearchOutline } from 'react-icons/io5';
import { FaRegUser } from 'react-icons/fa';
import { HiOutlineLogout } from 'react-icons/hi';
import MobileLogo from "../assets/images/logo_2.svg";



const Navbar = () => {

    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [restaurant, setRestaurant] = useState(null);
    const [error, setError] = useState(null);

    const navigate = useNavigate()

    const getRestaurantByName = async (restaurantName) => {
        try {
            const response = await fetch(`http://localhost:5000/restaurants/${restaurantName}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            setRestaurant(data);
        } catch (error) {
            setError(error.message);
            console.error('Error fetching restaurant data:', error);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            getRestaurantByName(query);
        }
    };


    const handleLogout = () => {

        localStorage.removeItem('authToken');
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">

            <div className="container-fluid">
                <div className="me-3">
                    <a href='login'>

                        <FaRegUser size={24} className="cursor-pointer" /> {/* Añade un margen derecho */}
                    </a>
                </div>
                {/* Logo en la parte izquierda */}
                <div className="col-md-4 d-flex justify-content-start align-items-center">
                    <img
                        src={MobileLogo}
                        alt="logo"
                        className="d-block d-md-none" // Mostrar solo en móvil
                        height="30"
                    />
                    <img
                        src={logo}
                        alt="logo"
                        className="d-none d-md-block" // Mostrar solo en pantallas grandes
                        height="30"
                    />
                </div>

                {/* Barra de búsqueda en el centro */}
                <div className="col-md-4 d-flex justify-content-center position-relative">
                    <IoSearchOutline
                        size={24}
                        className="cursor-pointer me-2"
                        onClick={() => setSearchOpen(!searchOpen)}
                    />
                    {searchOpen && (
                        <div className="position-absolute top-100 start-50 translate-middle-x mt-2 bg-white p-3 rounded shadow-lg">
                            <form onSubmit={handleSearch}>
                                <input
                                    type="text"
                                    placeholder="Buscar restaurantes..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    className="form-control mb-2"
                                />
                                <button
                                    type="submit"
                                    className="btn btn-primary w-100"
                                >
                                    Buscar
                                </button>
                            </form>
                            {restaurant && (
                                <div className="mt-3">
                                    <h3>Resultado de la búsqueda</h3>
                                    <p>owner: {restaurant.owner}</p>
                                    <p>picture: {restaurant.picture}</p>
                                    <p>address: {restaurant.address}</p>
                                    <p>category: {restaurant.category}</p>
                                </div>
                            )}
                            {error && (
                                <div className="mt-3 alert alert-danger">
                                    <strong>Error:</strong> {error}
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Usuario, carrito y logout a la derecha */}
                <div className="col-md-4 d-flex justify-content-end align-items-center gap-3">
                    <div>
                        <HiOutlineLogout size={24} className="cursor-pointer"
                            onClick={handleLogout} />
                    </div>

                </div>
            </div>


        </nav>

    );
}

export default Navbar;
