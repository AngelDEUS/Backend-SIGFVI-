import React, { useState } from 'react';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import './LoginMain.css';
import LogoImagenBG from '../../assets/Logo/LoginLogoBG_02.png';
import datosPrueba from './DatosPrueba.json';

const LoginMain = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (event) => {
        event.preventDefault();

        const user = datosPrueba.find(
            (user) => user.apodo === username && user.contrasena === password
        );

        if (user) {
            Swal.fire({
                title: `¡Bienvenido, ${user.apodo}!`,
                icon: 'success',
                showCancelButton: false,
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/Dashboard');
                }
            });

            onLogin({
                username: user.apodo,
                userType: user.tipoUsuario,
                isLoggedIn: true,
            });
        } else {
            Swal.fire({
                title: 'Oops...',
                text: 'El usuario o la contraseña son incorrectos.',
                icon: 'error',
                confirmButtonColor: '#3085d6',
                confirmButtonText: 'Aceptar',
            });
        }
    };

    return (
        <div className="login__container">
            <div className="left-container">
                <div className="title">
                    <span>Tiendecita Alemana </span>
                    <span className="highlight">SIGFVI</span>
                </div>
                <img className="logo__BG" src={LogoImagenBG} alt="Logo-BG" draggable="false" />
            </div>
            <div className="right-container">
                <div className="right-content">
                    <div className="right-title">
                        <span>Iniciar Sesión</span>
                        <span className="highlight">.</span>
                    </div>
                    <div className="right-subtitle">
                        <span>Inicia sesión con tus </span>
                        <span className="highlight">credenciales.</span>
                    </div>
                    <form className="login-form" onSubmit={handleLogin}>
                        <div className="centered-container">
                            <div className="form-container">
                                <div className="input-container">
                                    <div>
                                        <span className="highlight form-title">Nombre de Usuario</span>
                                        <input type="text" placeholder="Ingrese su nombre de usuario" onChange={(e) => setUsername(e.target.value)} />
                                    </div>
                                    <svg className="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                                        {/* Icono */}
                                    </svg>
                                </div>
                                <div className="input-container">
                                    <div>
                                        <span className="highlight form-title">Contraseña</span>
                                        <input type="password" placeholder="Ingrese su contraseña" onChange={(e) => setPassword(e.target.value)} />
                                    </div>
                                    <svg className="svg" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                        {/* Icono */}
                                    </svg>
                                </div>
                            </div>

                            <button type="submit" className="login-button">INICIAR SESIÓN</button>
                        </div>
                    </form>

                    <div className="forgot-password">
                        ¿Olvidaste tu contraseña?
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LoginMain;
