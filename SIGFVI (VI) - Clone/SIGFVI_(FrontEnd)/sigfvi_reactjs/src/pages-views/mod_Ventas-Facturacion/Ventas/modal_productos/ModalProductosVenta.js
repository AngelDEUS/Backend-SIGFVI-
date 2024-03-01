import React, { useState } from 'react';
import './ModalProductosVenta.css';
import TituloyDesc from '../../../../components/Titles/TituloyDesc';
import Swal from 'sweetalert2';

const ModalProductosVenta = () => {
    const descipcion = 'En este panel puede realizar la busqueda de todos los productos, tanto las busquedas por nombre o por ID de producto.'
    const tituloVentasControl = 'Modal Busqueda de productos'

    // Use states    
    const [modalAbierto, setModalAbierto] = useState(true);

    // Cancelar Agregar productos al Ticket.
    const handleCancelar = () => {
        Swal.fire({
            title: '¿No desea agregar productos?',
            text: 'No se agregarán productos al ticket.',
            icon: 'warning',
            confirmButtonText: 'Sí, No agregar productos',
            cancelButtonText: 'Cancelar',
            showCancelButton: true,
        }).then((result) => {
            if (result.isConfirmed) {
                setModalAbierto(false); // Cerrar el modal al confirmar
            }
        });
    };


    return (
        <div className={`modal-productos-venta ${modalAbierto ? '' : 'cerrado'}`}>
            <div className="modal-content">
                <div>
                    <TituloyDesc titulo={tituloVentasControl} descripcion={descipcion} />
                </div>
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
                            <button className="btn_f abrir">+ Abrir lista</button>
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
                <div className="separador-vertical"></div>
                <div className="contenedor-productos">
                    <div className="productos-seleccionados">
                        <h2>Productos Seleccionados</h2>
                        <div className="subcontenedor-productos">
                            {/* Contenido de productos seleccionados */}
                        </div>
                    </div>
                    <div className="productos-encontrados">
                        <h2>Productos Encontrados</h2>
                        <div className="subcontenedor-productos">
                            {/* Contenido de productos encontrados en tabla */}
                        </div>
                    </div>
                </div>
                <div className="separador-horizontal"></div>
                <div className="acciones">
                    <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                    <button className="btn-agregar">Agregar Productos</button>
                </div>
            </div>
        </div>
    );
};

export default ModalProductosVenta;
