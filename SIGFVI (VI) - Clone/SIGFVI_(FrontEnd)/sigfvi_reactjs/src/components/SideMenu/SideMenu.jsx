import React, { useEffect, useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LogoTiendecita from '../../assets/Logo/LogoMid_01.png';
import imagenUsuario from '../../assets/Usuarios/Login-User-1.jpg';
import Navbar from './Navbar/Navbar';
import './SideMenu.css';

function SideMenu({ miniBarraLateral, toggleMiniBarraLateral }) {
    const [isSessionClosed, setSessionClosed] = useState(false);
    const navigate = useNavigate();

    const [showSubMenu, setShowSubMenu] = useState(null);
    const [rotateIcon, setRotateIcon] = useState(false);
    const [usuario, setUsuario] = useState(null);
    const [cargo, setCargo] = useState(null);

    const traerDatos = async () => {
        const datos = await JSON.parse(localStorage.getItem("usuario"));
        setTimeout(()=>{if (datos && datos.rol === 1) {
            setCargo("SuperAdmin")
        } else if (datos.rol === 2) {
            setCargo("Administrador")
        } else if (datos.rol === 3) {
            setCargo("Empleado")
        }},2000)
        setUsuario({
            user: datos.name + ' ' + datos.lastname,
            cargo: cargo,
            rol:datos.rol
        })
    }

    const toggleSubMenu = (menu) => {
        setShowSubMenu((prevShowSubMenu) => (prevShowSubMenu === menu ? null : menu));
        setRotateIcon(!rotateIcon);
    };

    useEffect(() => {
        traerDatos();
        const spans = document.querySelectorAll('.barra-lateral span');
        spans.forEach(span => {
            span.classList.toggle('oculto', miniBarraLateral);
        });
    }, [miniBarraLateral]);

    const handleLogout = () => {
        Swal.fire({
            title: 'Cerrar Sesión',
            text: '¿Desea cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'No, mantener sesión',
        }).then((result) => {
            if (result.isConfirmed) {
                setSessionClosed(true);

                Swal.fire({
                    title: 'Sesión cerrada con éxito',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    if (result.isConfirmed) {
                        localStorage.removeItem("usuario");
                    }
                }).then(() => {
                    <Navigate to='/' />
                });
            }
        });
    };
    // const nada = () => {
    //     window.location.reload();
    // }

    const preguntaVenta = () => {
        const miRuta = "VentasFacturacion/ventas";
        const miRutaFinal = "/";

        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
                return miRutaFinal = miRuta;
            }
        });
    }
    return (
        <>
            <div className={`barra-lateral ${miniBarraLateral ? 'mini-barra-lateral' : ''}`} id="barraLateral">
                <div className="nom-pagina">
                    <div className="nombre-pagina">
                        <img
                            className="Logo-barralateral"
                            src={LogoTiendecita}
                            alt="Logo Tiendecita alemana"
                            id="LogoSideMenu"
                            onClick={toggleMiniBarraLateral}
                        />
                        <div className="textsTopMenu">
                            <span className=''>Tiendecita Alemana</span>
                            <span className='highlight'>.</span>
                        </div>
                    </div>
                </div>
                <div className='rules'>
                    <div>
                        <Link to='VentasFacturacion/ventas'>
                            <button className='boton'>
                                <i className="bi bi-patch-plus-fill svg"></i>
                                <span className=''>Nueva Venta</span>
                            </button>
                        </Link>
                        <div className='lineaSeparador'></div>
                    </div>

                    <div className="navegacion">
                        <ul>
                            <li>
                                <Link to={usuario && (usuario.rol === 3) ? (
                                    "/dashboard"
                                ) : usuario && (usuario.rol === 2) ? (
                                    "/home"
                                ) : "/ayuda"}>
                                    <div className='btnList'>
                                        <i className="bi bi-house-fill svg"></i>
                                    </div>
                                    <span>Dashboard</span>
                                </Link>
                            </li>

                            <li>
                                <Link to="#" onClick={() => toggleSubMenu('usuarios')}>
                                    <div className='btnList'>
                                        <i className="bi bi-person-fill svg"></i>
                                    </div>
                                    <span>Gestión de Usuarios</span>
                                    <div className="arrow">
                                        <i className={`bi bi-chevron-right rotate-icon${showSubMenu === 'usuarios' ? ' active' : ''}${showSubMenu === 'usuarios' && rotateIcon ? ' rotate-icon-active' : ''}`}></i>
                                    </div>
                                </Link>
                                <ul className={`sub-menu-options${showSubMenu === 'usuarios' ? ' active' : ''}`}>
                                    <div className={usuario && usuario.rol === 2 ? '' : 'hide'}>
                                        <li><Link to="/GestionUsuarios/Admins/TablaAdmin">
                                        <div className={`circle__sidemenu`}></div>
                                        <span>Gerentes</span>
                                        </Link></li>
                                    </div>
                                    <div className={usuario && usuario.rol === 2 ? '' : 'hide'}>
                                        <li><Link to="/GestionUsuarios/TablaUsuarios">
                                            <div className='circle__sidemenu'></div>
                                            <span>Usuarios</span>
                                        </Link></li>
                                    </div>
                                    <li><Link to="/GestionUsuarios/TablaProveedores">
                                        <div className='circle__sidemenu'></div>
                                        <span>Proveedores</span>
                                    </Link></li>
                                    <li><Link to="/GestionUsuarios/TablaDeudores">
                                        <div className='circle__sidemenu'></div>
                                        <span>Deudores</span>
                                    </Link></li>
                                </ul>
                            </li>

                            <li>
                                <Link to="#" onClick={() => toggleSubMenu('inventario')}>
                                    <div className='btnList'>
                                        <i className="bi bi-box-seam-fill svg"></i>
                                    </div>
                                    <span>Inventario</span>
                                    <div className="arrow">
                                        <i className={`bi bi-chevron-right rotate-icon${showSubMenu === 'inventario' ? ' active' : ''}${showSubMenu === 'inventario' && rotateIcon ? ' rotate-icon-active' : ''}`}></i>
                                    </div>
                                </Link>
                                <ul className={`sub-menu-options${showSubMenu === 'inventario' ? ' active' : ''}`}>
                                    <li><Link to="/Inventario/Producto">
                                        <div className='circle__sidemenu'></div>
                                        <span>Gestion de Productos</span>
                                    </Link></li>
                                    <li><Link to="/Inventario/GestionInventario">
                                        <div className='circle__sidemenu'></div>
                                        <span>Gestion Inventario</span>
                                    </Link></li>
                                </ul>
                            </li>

                            <li className={`ventas-facturacion ${showSubMenu ? 'active' : ''}`}>
                                <Link to="#" onClick={() => toggleSubMenu('ventas')}>
                                    <div className='btnList'>
                                        <i className="bi bi-cart-fill svg"></i>
                                    </div>
                                    <span>Ventas y Facturación</span>
                                    <div className="arrow">
                                        <i className={`bi bi-chevron-right rotate-icon${showSubMenu ? 'rotate-icon-active' : ''}`}></i>
                                    </div>

                                </Link>
                                <ul className={`sub-menu-options${showSubMenu === 'ventas' ? ' active' : ''}`}>
                                    <li ><Link to="/VentasFacturacion/ventas_main">
                                        <div className='circle__sidemenu'></div>
                                        <span>Ventas Main</span>
                                    </Link></li>
                                    <li ><Link to="/VentasFacturacion/venta_pagar">
                                        <div className='circle__sidemenu'></div>
                                        <span>Pagar Venta</span>
                                    </Link></li>
                                    <li ><Link to="/VentasFacturacion/tabs">
                                        <div className='circle__sidemenu'></div>
                                        <span>ver tabs</span>
                                    </Link></li>
                                    <li ><Link to="/VentasFacturacion/list">
                                        <div className='circle__sidemenu'></div>
                                        <span>Lista de ventas</span>
                                    </Link></li>
                                    <div className={usuario && usuario.rol === 2 ? '' : 'hide'}>
                                        <li ><Link to="/VentasFacturacion/metodo_pago">
                                            <div className='circle__sidemenu'></div>
                                            <span>Métodos de pago</span>
                                        </Link></li>
                                    </div>
                                </ul>
                            </li>

                            <li>
                                <Link to="/Informes">
                                    <div className='btnList'>
                                        <i className="bi bi-clipboard-data-fill svg"></i>
                                    </div>
                                    <span>Informes</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/Ayuda">
                                    <div className='btnList'>
                                        <i className="bi bi-chat-heart-fill svg"></i>
                                    </div>
                                    <span>Ayuda</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='footer-div'>
                    <div className='rules'>
                        <div className='lineaSeparador'></div>
                        <div className="navegacion ">
                            <ul>
                                <li>
                                    <Link to="/Configuracion">
                                        <div className='btnList'>
                                            <i className="bi bi-gear-fill svg"></i>
                                        </div>
                                        <span>Configuración</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link onClick={handleLogout}>
                                        <div className='btnList'>
                                            <i className="bi bi-arrow-bar-left svg"></i>
                                        </div>
                                        <span>Cerrar Sesión</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className='usuario-fill'>
                        <div className="usuario">
                            <img src={imagenUsuario} alt="imagen Usuario" />
                            <div className="info-usuario">
                                {usuario && (
                                    <div className="nombre-email">
                                        <span className='rol'>{usuario.cargo}</span>
                                        <span className='nombre'>{usuario.user}</span>
                                    </div>
                                )}
                                <i className="bi bi-chevron-right svg flechaUser"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Navbar className='Navbar' />
        </>
    );
}

export default SideMenu;
