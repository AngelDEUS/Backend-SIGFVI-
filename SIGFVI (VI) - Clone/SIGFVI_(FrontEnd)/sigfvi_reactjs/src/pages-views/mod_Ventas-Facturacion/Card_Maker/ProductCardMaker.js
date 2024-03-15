// ProductCardMaker.jsx
import React, { useState } from 'react';
import './estilosCardMaker.css';
import ModalComponent from '../../../components/modal/Modal.jsx';
import { useModal } from '../../../hooks/modal/useModal.js';
import Swal from 'sweetalert2';

const ProductCardMaker = ({ products, updateProduct, quitarProducto  }) => {
    const [isOpenModalProductoSelect, openModalProductoSelect, closeModalProductoSelect] = useModal(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [cantidad, setCantidad] = useState(1);

    const handleOpenModal = (product) => {
        setSelectedProduct(product);
        setCantidad(product.cantidad);
        openModalProductoSelect();
    };

    const sumarCantidad = () => {
        setCantidad((prevCantidad) => prevCantidad + 1);
    };

    const restarCantidad = () => {
        setCantidad((prevCantidad) => (prevCantidad > 1 ? prevCantidad - 1 : 1));
    };

    // Actualizador
    const handleActualizarCantidad = () => {
        updateProduct(selectedProduct.ID_Producto_PK, cantidad);
        closeModalProductoSelect();
    };

    // Quitar Producto
    const handleQuitarProducto = () => {
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción eliminará el producto de la venta.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                quitarProducto(selectedProduct.ID_Producto_PK);
                console.log('Card Producto eliminado de la venta.');
                closeModalProductoSelect();
            }
        });
    };

    return (
        <div className="containerCards">
            <ModalComponent isOpen={isOpenModalProductoSelect} closeModal={closeModalProductoSelect} tittleModal="Datos del Producto" descModal="Ver los datos del Producto y editar la cantidad de producto seleccionado en la venta.">
                {selectedProduct && (
                    <div className="editarPedido">
                        <div className="inputsGrup">
                            <fieldset>
                                <legend>Datos del producto seleccionado</legend>
                                <div className="productSelect-Container">
                                    <span className='tittleProdSelect' id='codigo_producto--select'>#{selectedProduct.ID_Producto_PK}</span>
                                    <div className='inputs-grup--product_select'>
                                        <span className='tittleProdSelect'>Nombre producto: </span>
                                        <span className='tittleProdSelectN' id='nombre_producto--select'>{selectedProduct.Nombre_Producto}
                                            <span className='puntoModal'>.</span> </span>
                                    </div>
                                    <div className='inputs-grup--product_select'>
                                        <span className='tittleProdSelect'>Tipo de Producto: </span>
                                        <span className='tittleProdSelectN' id='tipo_producto--select'>{selectedProduct.Nombre_Tipo_Producto}
                                            <span className='puntoModal'>.</span>
                                        </span>
                                    </div>
                                    <div className='inputs-grup--product_select'>
                                        <span className='tittleProdSelect'>Detalle del producto: </span>
                                        <span className='tittleProdSelectN' id='descripcion_producto--select'>{selectedProduct.Descripcion_Producto}
                                            <span className='puntoModal'>.</span>
                                        </span>
                                    </div>
                                    <div className='inputs-grup--product_select'>
                                        <span className='tittleProdSelect'>Precio de venta: </span>
                                        <span className='tittleProdSelectN' id='descripcion_producto--select'>
                                            <span className='puntoModal' style={{ marginRight: '5px' }}>$</span>
                                            {selectedProduct.Precio_Venta}
                                            <span className='puntoModal'>.</span>
                                        </span>
                                    </div>
                                    <div className='inputs-grup--product_select'>
                                        <span className='tittleProdSelect'>Stock Total en el Inventario: </span>
                                        <span className='tittleProdSelectN' id='descripcion_producto--select'>{selectedProduct.Stock_Total}
                                            <span className='puntoModal' style={{ marginLeft: '5px' }}>(unidades).</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="divisorHr2"></div>
                                <div className="bootomInputs">
                                    <div className="candidadProd-Sum">
                                        <div className="tittleCalcProdSelectModal">
                                            <span>Agregar o quitar cantidad del producto seleccionado:</span>
                                        </div>
                                        <div className="buttonsCalcSelectProdModal">
                                            <button className='btnModalSelectProd' onClick={restarCantidad}>-</button>
                                            <span id='mostrarSumatoriaSelect'>{cantidad}</span>
                                            <button className='btnModalSelectProd' onClick={sumarCantidad}>+</button>
                                        </div>
                                    </div>
                                    <div className="divisorHr2"></div>
                                    <div className="accionesBtnsModal">
                                        <button className='btn_f actualizar' type="button" id='actualizar--ModalSelect' onClick={handleActualizarCantidad}>Actualizar</button>
                                        <button className='btn_f cancelarActualizar' type="button" id='cancelar--ModalSelect' onClick={handleQuitarProducto}>Quitar producto de la venta</button>
                                    </div>
                                </div>
                            </fieldset>
                        </div>
                    </div>
                )}
            </ModalComponent>
            {products.map((product) => (
                <div key={product.ID_Producto_PK} className="product-card" onClick={() => handleOpenModal(product)}>
                    <div className="upCardProducto">
                        <div className='product-image'>
                            <img src={product.image} alt={product.title} />
                        </div>
                        <div className="product-details">
                            <h3 className="product-title-ID">#{product.ID_Producto_PK}</h3>
                            <h2 className="product-title">{product.Nombre_Producto}</h2>
                            <p className="product-price">${product.Precio_Venta}</p>
                        </div>
                    </div>
                    <div className="downCardProducto">
                        <div className="dividerCardH"></div>
                        <div className="sumatoriaProductCart">
                            <p className="product-title">Cantidad de Producto: </p>
                            <div className="dividerCardV"></div>
                            <span className='calculoCantidadProd'>{product.cantidad}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCardMaker;
