// Navbar.js
import React, { useState } from 'react';
import logo from '../../../assets/Logo/Logo-SIGFVI.png';
import iconUser from "../../../assets/Usuarios/Login-User-1.jpg";
import DropdownMenu from '../DropdownMenu';
import './Navbar.css';

const Navbar = () => {
    const [arrowRotated, setArrowRotated] = useState(false);
    const [dropdownVisible, setDropdownVisible] = useState(false);

    const handleArrowClick = () => {
        setArrowRotated(!arrowRotated);
    };

    const handleDropdownClick = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const handleUserClick = () => {
        setArrowRotated(!arrowRotated);
        setDropdownVisible(!dropdownVisible);
        console.log("Arrow Rotated:", arrowRotated, "- Drop menu", dropdownVisible);
    };


    return (
        <>
            <div className="navbar-container">
                <img src={logo} alt="Logo SIGFVI" className="logo" />

                <div className="user-info">
                    <div className='bell-icon'>
                        <i className="bi bi-bell-fill"></i>
                    </div>

                    <div className="separator"></div>

                    <div className='info-user' onClick={handleUserClick}>
                        <>
                            <img src={iconUser} alt="Usuario" className="user-icon" />
                        </>
                        <div className={`click-arrow ${arrowRotated ? 'rotated' : ''}`}>
                            <div className="caret-icon-container">
                                <i className="bi bi-caret-right-fill"></i>
                            </div>
                        </div>



                    </div>
                </div>
            </div>
            {dropdownVisible && <DropdownMenu />}
        </>
    );
};

export default Navbar;



{/*
                        <div>
                            <p className="user-info-text">Administrador</p>
                            <p className="user-name">Miguel Ayala</p>
                        </div>
*/}