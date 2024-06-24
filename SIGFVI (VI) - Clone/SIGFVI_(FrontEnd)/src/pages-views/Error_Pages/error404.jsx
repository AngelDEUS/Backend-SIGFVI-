import React from 'react';
import { Link } from 'react-router-dom';
import AdmiracionIco from '../../assets/Iconos/warning.png';
import './Error404.css';

const Error404 = () => {
    return (
        <div className="error-container">
            <img src={AdmiracionIco} alt="Error 404" />
            <p className="error-text error-text-orange">Oops!</p>
            <p className="error-text error-text-gray">¡Está página no existe!</p>
            <div>
                <p className="tex404">404</p>
            </div>
            <p className='vuelve'>
                <span>Vuelve al </span>
                <Link to='/Home'>
                    <span className='home'>Inicio</span>
                </Link>
            </p>
            <div className="separator404" />
            <p className="error-message">
                Ha ocurrido un error inesperado, esta página NO existe o está en mantenimiento.<br />
                <strong>Tenga en cuenta si está visitando la ruta correcta.</strong>  <br />
                Si este problema persiste, no dude en enviar un mensaje al administrador.<br />
            </p>
        </div>
    );
};

export default Error404;
