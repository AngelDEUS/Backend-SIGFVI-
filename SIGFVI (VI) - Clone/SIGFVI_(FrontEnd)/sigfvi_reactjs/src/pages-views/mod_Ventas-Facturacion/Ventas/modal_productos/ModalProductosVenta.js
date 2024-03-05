import React, { useState } from 'react';
import './ModalProductosVenta.css';
import TituloyDesc from '../../../../components/Titles/TituloyDesc';
import Swal from 'sweetalert2';

const ModalProductosVenta = () => {
    const descipcion = 'En este panel puede realizar la busqueda de todos los productos, tanto las busquedas por nombre o por ID de producto.'
    const tituloVentasControl = 'Modal Busqueda de productos'

    // Guardar Productos
    const productosModal = {
        "": ""
    }

    // Use states    
    const [modalAbierto, setModalAbierto] = useState(true);
    let [calcularCantProd, setCalcularCantProd] = useState(1);

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

    // Calcular total de producto seleccionado

    // Funcion solo sumar.
    const sumarProducSelect = () => {
        setCalcularCantProd(parseInt(calcularCantProd) + 1);
    }

    const restarProductSelect = () => {
        parseInt(calcularCantProd);
        if (calcularCantProd <= 1) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Para agregar cantidad de producto, como mínimo debe ser 1, para agregar al ticket.",
                footer: '<p>Revisa la cantidad de producto que desea agregar por favor.</p>'
            });
            setCalcularCantProd(1);
        } else {
            setCalcularCantProd(parseInt(calcularCantProd) - 1);
        }
    }


    //Cosnt del input calcular cantidad de productos

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
                        </div>
                    </div>
                </div>
                <div className="contenedor-productos--Main">
                    <div className="productos-encontrados">
                        <div className="titleContentModal">
                            <h2>Lista de Productos Encontrados</h2>
                            <div className="caretTitle"></div>
                        </div>
                        <div className="subcontenedor-productos-encontradosDiv">
                            {/* Contenido de productos encontrados en tabla */}
                            <table className='table'>
                                <thead>
                                    <tr>
                                        <th className='esquinaIz-Top'>Código de Producto</th>
                                        <th>Nombre de producto</th>
                                        <th>Tipo Producto</th>
                                        <th>Cantidad Neta Producto</th>
                                        <th>Cantidad (Stock) Inventario</th>
                                        <th>Precio Venta</th>
                                        <th className='thAcciones esquinaDe-Top'>Acciones</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ss</td>
                                        <td>ss</td>
                                        <td>ss</td>
                                        <td>ss</td>
                                        <td>ss</td>
                                        <td>ss</td>
                                        <td className='tdAcciones'>
                                            <div className="btn-grup">
                                                <button className="btn_f limpiar">Seleccionar</button><br />
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>

                            </table>
                        </div>
                    </div>
                    <div className="separador-vertical"></div>
                    <div className="productos-seleccionados">
                        <div className="contentProdSecTop">
                            <div className="titleContentModal">
                                <h2>Productos Seleccionados</h2>
                                <div className="caretTitle"></div>
                            </div>
                            <div className="subcontenedor-productos">
                                <div className="sub-content-prod-encontrados">
                                <div className='productoSelect-Container'>
                                    <div className="bolita_imgProd--selected">
                                        <img className='prodBolita--selected' src="" alt="productoImg" />
                                    </div>
                                    <div className="tittle_Prod--Selected">
                                        <span className='TitleProd'></span>
                                        <span className='CantidadProd--selected'>x{calcularCantProd}</span>
                                        <div className="radio_prod
                                        --selected"></div>
                                    </div>
                                    <div className="sub-tittle_Prod--Selected">
                                        <span className='sub-TitleProd--ID'>ID Producto:</span>
                                        <span className='sub-TitleProd'></span>
                                    </div>
                                </div>
                                </div>
                            </div>
                        </div>
                        <div className="contentProdSecBootom">
                            <div className="titleContentModal">
                                <h2>Productos Seleccionados</h2>
                                <div className="caretTitle"></div>
                            </div>
                            <div className="subcontenedor-productos-sum">
                                <div className="sumar-restar-cantidad-prod">
                                    <button className="btnCantidadModal" id='opModal_Resta' onClick={restarProductSelect}><span className='txtbtn'>-</span></button>
                                    <span className="totalSumatoria-CantProd" id='opModal_Resultado' >{calcularCantProd}</span>
                                    {/*<input type="number" className='noneInputClass' id='opModal_Resultado' value={calcularCantProd} onChange={(e) => setCalcularCantProd(parseInt(e.target.value))} />*/}
                                    <button className="btnCantidadModal" id='opModal_Suma' onClick={sumarProducSelect}><span className='txtbtn'>+</span></button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="separador-horizontal"></div>
                <div className="acciones">
                    <button className="btn-cancelar" onClick={handleCancelar}>Cancelar</button>
                    <button className="btn-agregar">Agregar Productos</button>
                </div>
            </div>
        </div >
    );
};

export default ModalProductosVenta;
