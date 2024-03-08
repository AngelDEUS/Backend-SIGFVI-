import React, { useState, useEffect } from 'react';
//import '../mod_ventas.css';
import './mainVentas.css'
import Swal from 'sweetalert2';

import TituloyDesc from '../../../components/Titles/TituloyDesc';
import TabsMain from '../Tabs/TabsMainGenerator'

// Modales
import ModalProductosVenta from './modal_productos/ModalProductosVenta'; // modal par aproductos

//Hook


const VentasControl_Main = () => {
    const descipcion = 'En este panel puede realizar la gestión de ventas y facturación, la búsqueda de productos por nombre y código de producto están activas; Puede dar clic abrir lista para visualizar todos los productos.'
    const tituloVentasControl = 'Ventas y Facturación'

    // Modal productos
    const [modalAbierto, setModalAbierto] = useState(false);
    const handleAbrirModal = () => {
        setModalAbierto(true);
    };

    const handleCloseModal = () => {
        setModalAbierto(false);
    };



    // Visual:
    // Triangulos generados para la factura
    const cantidadTriangulos = 25;
    const triangulos = Array.from({ length: cantidadTriangulos }, (_, index) => (
        <div key={index} className='triangulito'></div>
    ));

    return (
        <div>
            <div>
                <TituloyDesc titulo={tituloVentasControl} descripcion={descipcion} />
            </div>
            <div className="container__ventas">
                <div className="busqueda__prod">
                    <div className='buscar_productos'>
                        <div className='right__b'>
                            <div className="buscar">
                                <i className="bi bi-search buscar_i"></i>
                                <div className='sep_vertical_b'></div>
                                <input
                                    type="text"
                                    placeholder='Buscar productos'
                                    id='buscarProducto'
                                />
                                <button className='btn_buscar'>Buscar</button>
                            </div>
                            <button className="btn_f abrir" onClick={handleAbrirModal}>+ Abrir lista</button>
                            {modalAbierto && <ModalProductosVenta onClose={handleCloseModal}/>}
                            <div className='sep_vertical_b--outS'></div>
                            <button className="btn_f limpiar">Limpiar</button>
                        </div>
                        <div className='left__b'>
                            <button className="btn_f nuevo">Consultar Deudores</button>
                            <div className='sep_vertical_b--outS'></div>
                            <button className="btn_f cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
                <div className='cointainer__tickets__factura'>
                    <div className="__tickets">
                        <TabsMain />
                    </div>
                    <div className="__factura">
                        <div className='triangulo-container'>{triangulos}</div>
                        <div className='title__f'>
                            <h1 className='tittle'>Factura</h1>
                        </div>
                        <div className='middle__f'>
                            <div className='fila__container_f'>
                                <div className='fila__f'>
                                    <span className='fila__numero'>1</span>
                                    <span className='fila__nombre'>Vodka Absolut</span>
                                </div>
                                <span className='fila__subtotal'>$75.000</span>
                            </div>
                            <div className='fila__container_f'>
                                <div className='fila__f'>
                                    <span className='fila__numero'>1</span>
                                    <span className='fila__nombre'>Whisky Johnnie Walker</span>
                                </div>
                                <span className='fila__subtotal'>$120.000</span>
                            </div>
                            <div className='fila__container_f'>
                                <div className='fila__f'>
                                    <span className='fila__numero'>1</span>
                                    <span className='fila__nombre'>Tequila Jose Cuervo</span>
                                </div>
                                <span className='fila__subtotal'>$50.000</span>
                            </div>
                            <div className='fila__container_f'>
                                <div className='fila__f'>
                                    <span className='fila__numero'>1</span>
                                    <span className='fila__nombre'>Ron Bacardi</span>
                                </div>
                                <span className='fila__subtotal'>$40.000</span>
                            </div>
                        </div>
                        <div className='footer__f'>
                            <div className='footer__calculos'>
                                <div className='sep--'>
                                    <span>IVA (12%)</span>
                                    <span>$34.200</span>
                                </div>
                                <div className='sep__factura'></div>
                                <div className='sep--'>
                                    <span>Sub-Total</span>
                                    <span>$285.000</span>
                                </div>
                            </div>
                            <div className='footer__title'>
                                <h1 className='__cobrar'>Cobar:</h1>
                                <span className='__total_factura'>$
                                    <span id='total_factura'>319.200</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container__resumen">
                    <div className="resumen__venta">
                        <div className='resumen--left'>
                            <div className='agregar__deudor'>
                                <h2 className='tiitle__a-deudor'>Agregar Deudor</h2>
                                <div className='info__deudor'>
                                    <div className="imagen__container">
                                        <p>+</p>
                                    </div>
                                    <div className="--sep_vertical"></div>
                                    <div className="text__container">
                                        <p>Nombre:</p>
                                        <p>Correo:</p>
                                    </div>
                                </div>
                            </div>
                            <div className="datos__venta">
                                <h2 className='tiitle__a-deudor'>Datos Venta</h2>
                                <div className='info__venta'>
                                    <div className="text__container">
                                        <p>Impuestos:</p>
                                        <p>Sub-Total:</p>
                                    </div>
                                    <div className="--sep_vertical"></div>
                                    <div className="text__container">
                                        <p >$34.200</p>
                                        <p style={{ color: '#fc7c02' }}>$285.000</p>
                                    </div>
                                </div>
                            </div>
                            <button className="pagar__factura">
                                <i className="bi bi-basket3"></i>
                                <span className='titulo--pagar'>Pagar</span>
                            </button>
                        </div>
                        <div className='resumen--right'>
                            <div className="total__venta">
                                <p className='p-t' style={{ color: '#6f727e' }}>Total:</p>
                                <p className='p-m' style={{ color: '#fc7c02' }}>$319.200</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VentasControl_Main;
