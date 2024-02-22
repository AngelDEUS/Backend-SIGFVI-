import React, { useState, useEffect } from 'react';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import './mod_ventas.css';
import TabsVentas from './tabs_ventas';
import ListaProductosModal from './ListaProductosModal';
import Producto from './productos.json';

const MainVentas = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [productos, setProductos] = useState([]);

    const handleSearch = (term) => {
        setSearchTerm(term);
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        import('./productos.json')
            .then((data) => setProductos(data))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    const descipcion =
        'En este panel puede realizar la gestión de ventas y facturación, la búsqueda de productos por nombre y código de producto están activas; Puede dar clic abrir lista para visualizar todos los productos.';

    const cantidadTriangulos = 25;
    const triangulos = Array.from({ length: cantidadTriangulos }, (_, index) => (
        <div key={index} className='triangulito'></div>
    ));

    return (
        <div>
            <div>
                <TituloyDesc titulo='Ventas y Facturación' descripcion={descipcion} />
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
                                    onChange={(e) => handleSearch(e.target.value)}
                                />
                                <button className='btn_buscar'>Buscar</button>
                            </div>
                            {/* onClick={openModal} */}
                            <button className="btn_f abrir">
                                + Abrir lista
                            </button>
                            <div className='sep_vertical_b--outS'></div>
                            <button className="btn_f limpiar">Limpiar</button>
                        </div>
                        <div className='left__b'>
                            <button className="btn_f nuevo">+ Nuevo ticket</button>
                            <div className='sep_vertical_b--outS'></div>
                            <button className="btn_f cancelar">Cancelar</button>
                        </div>
                    </div>
                </div>
                <div className='cointainer__tickets__factura'>
                    <div className="__tickets">
                        <TabsVentas productos={Producto} />
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

            {isModalOpen && (
                <ListaProductosModal productos={productos} onClose={closeModal} />
            )}
        </div>
    );
};

export default MainVentas;