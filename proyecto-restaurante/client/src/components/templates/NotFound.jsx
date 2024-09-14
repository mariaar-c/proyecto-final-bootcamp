import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Error 404</h1>
            <p>La página que estás buscando no existe.</p>
            <Link to="/" style={{ color: '#007bff', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>
                Ir a Inicio
            </Link>
        </div>
    );
};
export default NotFound;

