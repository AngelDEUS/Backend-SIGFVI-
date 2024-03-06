import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ModalProductosVenta.css';
import TituloyDesc from '../../../../components/Titles/TituloyDesc';
import Swal from 'sweetalert2';
import './miTablaModal.css'

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

    const [busqueda, setBusqueda] = useState('');
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        obtenerProductosVenta();
    }, []);

    const obtenerProductosVenta = () => {
        axios.get('http://localhost:3001/vyf/productosparaventas')
            .then(response => {
                setProductos(response.data.productos);
            })
            .catch(error => {
                console.error('Error al obtener productos:', error);
            });
    };

    // Funcion para buscar producto por nombre o ID y si esta vacio muestra todos los resultados.
    const handleBuscar = () => {
        if (!busqueda.trim()) {
            obtenerProductosVenta();
        } else {
            if (/^[a-zA-Z0-9]+$/.test(busqueda)) {
                // Verifica si la entrada es un ID válido.
                buscarPorID();
            } else {
                buscarPorNombre();
            }
        }
    };

    // Función para buscar productos por ID
    const buscarPorID = () => {
        axios.get(`http://localhost:3001/vyf/buscarporidparaventas/${busqueda}`)
            .then(response => {
                if (response.data && response.data.producto) {
                    setProductos([response.data.producto]);
                } else {
                    // No se encontraron productos con el ID proporcionado
                    setProductos([]);
                }
            })
            .catch(error => {
                console.error('Error al buscar producto por ID:', error);
            });
    };


    // Función para buscar productos por nombre
    const buscarPorNombre = () => {
        axios.get(`http://localhost:3001/vyf/buscarpornombreparaventas/${busqueda}`)
            .then(response => {
                setProductos(response.data.productos);
            })
            .catch(error => {
                console.error('Error al buscar productos por nombre:', error);
            });
    };

    // Función para manejar cambios en el input de búsqueda
    const handleInputChange = (event) => {
        setBusqueda(event.target.value);
    };

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
                setModalAbierto(false);
            }
        });
    };

    const sumarProducSelect = () => {
        setCalcularCantProd(parseInt(calcularCantProd) + 1);
    };

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
    };


    /* Parte para seleccionar un producto de la tabla. */
    const [productosSeleccionados, setProductosSeleccionados] = useState([]);

    // Función para agregar un producto seleccionado
    const agregarProductoSeleccionado = (producto) => {
        // Verificar si el producto ya ha sido agregado
        const productoExistente = productosSeleccionados.find(p => p.ID_Producto_PK === producto.ID_Producto_PK);
        if (productoExistente) {
            Swal.fire({
                icon: 'warning',
                title: 'Producto ya agregado',
                text: 'Ya has agregado este producto a la lista.'
            });
            return;
        }

        // Agregar el producto a la lista de productos seleccionados
        setProductosSeleccionados([...productosSeleccionados, producto]);
    };

    /* Parte para quitar la plantilla agregada. */
    const quitarProductoSeleccionado = (producto) => {
        const nuevosProductos = productosSeleccionados.filter(p => p.ID_Producto_PK !== producto.ID_Producto_PK);
        setProductosSeleccionados(nuevosProductos);
        console.log(`Producto "${producto.Nombre_Producto}" con ID "${producto.ID_Producto_PK}" eliminado.`);
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
                                    value={busqueda}
                                    onChange={handleInputChange}
                                />
                                <button className='btn_buscar' onClick={handleBuscar}>Buscar</button>
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
                            <table className='tabla2'>
                                <thead>
                                    <tr>
                                        <th className='esquinaIz-Top'>Código de Producto</th>
                                        <th>Nombre de producto</th>
                                        <th>Tipo Producto</th>
                                        <th>Descripción</th>
                                        <th>Precio Venta</th>
                                        <th>Cantidad (Stock) Inventario</th>
                                        <th className='thAcciones esquinaDe-Top'>Seleccionar</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {productos.length > 0 && productos.map(producto => (
                                        <tr key={producto.ID_Producto_PK}>
                                            <td>{producto.ID_Producto_PK}</td>
                                            <td>{producto.Nombre_Producto}</td>
                                            <td>{producto.Nombre_Tipo_Producto}</td>
                                            <td>{producto.Descripcion_Producto}</td>
                                            <td>{producto.Precio_Venta}</td>
                                            <td>{producto.Stock_Total}</td>
                                            <td className='tdAcciones'>
                                                <div className="btn-grup">
                                                    <button className="btn_Modal--seleccionar" onClick={() => agregarProductoSeleccionado(producto)}>Agregar</button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>

                                <tfoot>
                                    <tr>
                                        <td colSpan="7" className="tablefooterBg"></td>
                                    </tr>
                                </tfoot>
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
                                    {productosSeleccionados.map(producto => (
                                        <div className='productoSelect-Container' key={producto.ID_Producto_PK}>
                                            <div className="bolita_imgProd--selected">
                                                <i className="bi bi-bag-plus-fill"></i>
                                            </div>
                                            <div className="tittle_Prod--Selected">
                                                <div className="right-selected">
                                                    <span className='CantidadProd--selected'>{producto.Nombre_Producto}</span>
                                                    <span className='CantidadProd--selected' id='calCantidadProd'>x{calcularCantProd}</span>
                                                </div>
                                                <div className="left-selected" onClick={() => quitarProductoSeleccionado(producto)}>
                                                    <button className='quitarProd--selected'>
                                                        <i className="bi bi-x-lg"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="sub-tittle_Prod--Selected">
                                                <span className='sub-TitleProd--ID'>ID Producto:</span>
                                                <span className='sub-TitleProd'>{producto.ID_Producto_PK}</span>
                                            </div>
                                        </div>
                                    ))}
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
                                    <button className="btnCantidadModal" id='opModal_Resta' onClick={restarProductSelect}><span className='txtbtn'><i className="bi bi-dash"></i></span></button>
                                    <span className="totalSumatoria-CantProd" id='opModal_Resultado' >{calcularCantProd}</span>
                                    {/*<input type="number" className='noneInputClass' id='opModal_Resultado' value={calcularCantProd} onChange={(e) => setCalcularCantProd(parseInt(e.target.value))} />*/}
                                    <button className="btnCantidadModal" id='opModal_Suma' onClick={sumarProducSelect}><span className='txtbtn'><i className="bi bi-plus"></i></span></button>
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
