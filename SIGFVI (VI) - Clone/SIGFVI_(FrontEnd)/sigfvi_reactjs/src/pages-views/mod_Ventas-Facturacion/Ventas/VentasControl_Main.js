import React, { useState, useEffect } from 'react';
//import '../mod_ventas.css';
import './mainVentas.css'
import Swal from 'sweetalert2';

import TituloyDesc from '../../../components/Titles/TituloyDesc';
import TabsMainGenerator from '../Tabs/TabsMainGenerator'

//Cards
import ProductCardMaker from '../Card_Maker/ProductCardMaker';

// Modales
import ModalProductosVenta from './modal_productos/ModalProductosVenta'; // modal para productos
import Modal_Agregar_Deudor from './mini_modal_deudor/Modal_Agregar_Deudor'; // modal para Deudores


const VentasControl_Main = () => {
    const descipcion = 'En este panel puede realizar la gestión de ventas y facturación, la búsqueda de productos por nombre y código de producto están activas; Puede dar clic abrir lista para visualizar todos los productos.'
    const tituloVentasControl = 'Ventas y Facturación'



    // Modal productos
    const [modalAbierto, setModalAbierto] = useState(false);

    const handleAbrirModal = () => {
        setModalAbierto(true);
        console.log(`(MainVentas_Comp) - Se abre el Modal, abierto.`);
    };

    const handleCloseModal = () => {
        setModalAbierto(false);
        console.log(`(MainVentas_Comp) - Se cierra el Modal, cerrado.`);
    };

    // Para dar legibilidad a los datos en un objeto de objetos.
    const [productosAgregados, setProductosAgregados] = useState({});

    // Estado para almacenar la pestaña activa
    const [activeTab, setActiveTab] = useState(0);
    // Estado para almacenar los productos seleccionados
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    console.log('------> Esto tiene productosSeleccionados', productosSeleccionados);

    const agregarProductosAPestana = (productos, tabId) => {
        console.log('Valor de tabId recibido en MainVentas_Comp:', tabId);
        const nuevosProductos = { ...productosAgregados };

        productos.forEach((producto, index) => {
            const newIndex = Object.keys(nuevosProductos).length + 1;
            const productoValidado = {
                ...producto,
                Precio_Venta: parseInt(producto.Precio_Venta)  // Convertir el precio de venta a número
            };
            const productoAgregado = {
                index: newIndex,
                id_tab: tabId, // Añadir el ID de la pestaña actual
                datos_producto: productoValidado
            };
            nuevosProductos[newIndex] = productoAgregado;
            console.log('(MainVentas_Comp)--> Así queda seteado el objeto con los productos: ', productoAgregado);
        });

        setProductosAgregados({
            ...productosAgregados,
            [tabId]: nuevosProductos
        });
        console.log(`(MainVentas_Comp)--: Así queda el estado actual de los datos: \nTab activa id:(${tabId}), y tiene los productos: `, productos);
    };



    // UseEffect para controlar el renderizado de las cards
    useEffect(() => {
        // Actualizar las tarjetas de productos aquí
    }, [productosSeleccionados]);

    /* SIN las Tabs Funciones */

    const handleToggleModal = () => {
        setModalAbierto(!modalAbierto);
        console.log('(MainVentas_Comp) - Se abre/cierra el Modal');
    };

    const agregarProductosAlContenedor = (productos) => {
        setProductosSeleccionados([...productosSeleccionados, ...productos]);
        console.log('(MainVentas_Comp) - Productos agregados al contenedor:', productos);
    };

    const handleCerrarModal = () => {
        setModalAbierto(false);
        console.log(`(MainVentas_Comp) - Se cierra el Modal, cerrado.`);
    };

    /* Funcion para abrir mi modal para agregar Deudorres a la venta */
    const [modalDeudorAbierto, setModalDeudorAbierto] = useState(false);
    const [nombreDeudor, setNombreDeudor] = useState('');
    const [direccionDeudor, setDireccionDeudor] = useState('');

    const handleAbrirModalDeudor = () => {
        setModalDeudorAbierto(true);
    };

    // Función para cerrar el modal de deudores
    const handleCerrarModalDeudor = () => {
        setModalDeudorAbierto(false);
    };

    const agregarDeudor = (deudorId) => {
        console.log('Agregando deudor con ID:', deudorId);
        setModalDeudorAbierto(false);
    };

    /* Funciones para calcular la venta */
    // Función para calcular el total del IVA
    const calcularTotalIVA = () => {
        const totalSubtotal = productosSeleccionados.reduce((acc, producto) => {
            // Asegurémonos de que los precios de venta y las cantidades sean números
            const precio = parseInt(producto.Precio_Venta);
            const cantidad = parseInt(producto.cantidad);
            // Verifiquemos que los datos sean números válidos
            if (isNaN(precio) || isNaN(cantidad)) {
                console.error('Precio de venta o cantidad no válidos:', producto);
                return acc;
            }
            return acc + (precio * cantidad);
        }, 0);
        return Math.round(totalSubtotal * 0.12);
    };

    // Función para calcular el subtotal sin IVA
    const calcularSubtotalSinIVA = () => {
        return productosSeleccionados.reduce((acc, producto) => {
            // Asegurémonos de que los precios de venta y las cantidades sean números
            const precio = parseInt(producto.Precio_Venta);
            const cantidad = parseInt(producto.cantidad);
            // Verifiquemos que los datos sean números válidos
            if (isNaN(precio) || isNaN(cantidad)) {
                console.error('Precio de venta o cantidad no válidos:', producto);
                return acc;
            }
            return acc + precio * cantidad;
        }, 0);
    };

    // Función para calcular el total de la factura
    const calcularTotalFactura = () => {
        const subtotalSinIVA = calcularSubtotalSinIVA();
        const totalIVA = calcularTotalIVA();
        return subtotalSinIVA + totalIVA;
    };

    //Función para actualizar la cantidad de producto.
    const updateProduct = (productId, newQuantity) => {
        setProductosSeleccionados((prevProducts) =>
            prevProducts.map((product) =>
                product.ID_Producto_PK === productId ? { ...product, cantidad: newQuantity } : product
            )
        );
    };

    //Función para quitar el producto de la venta.
    const quitarProducto = (productId) => {
        setProductosSeleccionados((prevProducts) =>
            prevProducts.filter((product) => product.ID_Producto_PK !== productId)
        );
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
                            <div className="buscar--Ventas">
                                <i className="bi bi-search buscar_i"></i>
                                <div className='sep_vertical_b'></div>
                                <input
                                    type="text"
                                    placeholder='Buscar productos'
                                    id='buscarProducto'
                                />
                                <button className='btn_buscar'>Buscar</button>
                            </div>
                            <button className="btn_f abrir" onClick={handleToggleModal}>+ Abrir lista</button>
                            {modalAbierto ? (
                                <ModalProductosVenta
                                    onAgregarProductos={agregarProductosAlContenedor}
                                    onClose={handleCerrarModal}
                                />
                            ) : null}

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
                        <div className="ticket-provicional">
                            <div className='ticket-p_top'></div>
                            <div className='ticket-p_contenido'>
                                <ProductCardMaker products={productosSeleccionados} updateProduct={updateProduct} quitarProducto={quitarProducto} />
                            </div>
                            <div className='ticket-p_footer'></div>
                        </div>
                    </div>
                    <div className="__factura">
                        <div className='triangulo-container'>{triangulos}</div>
                        <div className='title__f'>
                            <h1 className='tittle'>Factura</h1>
                        </div>
                        <div className='middle__f'>
                            {productosSeleccionados.map((producto, index) => (
                                <div key={index} className='fila__container_f'>
                                    <div className='fila__f'>
                                        <span className='fila__numero'>{producto.cantidad}</span>
                                        <span className='fila__nombre'>{producto.Nombre_Producto}</span>
                                    </div>
                                    <span className='fila__subtotal'>{`$${producto.Precio_Venta * producto.cantidad}`}</span>
                                </div>
                            ))}
                        </div>
                        <div className='footer__f'>
                            <div className='footer__calculos'>
                                <div className='sep--'>
                                    <span id='titulo-iva'>IVA (12%)</span>
                                    <span id='ivaTotalFactura'>{`$${calcularTotalIVA()}`}</span>
                                </div>
                                <div className='sep__factura'></div>
                                <div className='sep--'>
                                    <span id='titulo-subtotal'>Sub-Total</span>
                                    <span id='subTotalSinIva'>{`$${calcularSubtotalSinIVA()}`}</span>
                                </div>
                            </div>
                            <div className='footer__title'>
                                <h1 className='__cobrar'>Cobar:</h1>
                                <span className='__total_factura'>${calcularTotalFactura()}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container__resumen">
                    <div className="resumen__venta">
                        <div className='resumen--left'>
                            <div className='agregar__deudor' id='agregarDeudorControl' onClick={handleAbrirModalDeudor}>
                                <h2 className='tiitle__a-deudor'>Agregar Deudor</h2>
                                <div className='info__deudor'>
                                    <div className="imagen__container">
                                        <p>+</p>
                                    </div>
                                    <div className="--sep_vertical"></div>
                                    <div className="text__container">
                                        <p id='nombreDeudor'>{nombreDeudor}</p>
                                        <p id='direccionDeudor'>{direccionDeudor}</p>
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
                                        <p id='impuestosVentaResumen'>{`$${calcularTotalIVA()}`}</p>
                                        <p style={{ color: '#fc7c02' }} id='sub-totalResumen'>{`$${calcularSubtotalSinIVA()}`}</p>
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
                                <p className='p-m' style={{ color: '#fc7c02' }} id='totalApagarResumen'>{`$${calcularTotalFactura()}`}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {modalDeudorAbierto && (
                <Modal_Agregar_Deudor
                    onCloseModalDeudor={() => setModalDeudorAbierto(false)}
                    onAgregarDeudor={agregarDeudor} />
            )}
        </div>

    );
}

export default VentasControl_Main;
