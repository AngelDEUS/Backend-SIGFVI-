import React, { useState } from 'react';

const ListaProductosModal = ({ productos, onClose, handleAddToTab }) => {
    const productosPorPagina = 10;
    const [paginaActual, setPaginaActual] = useState(1);

    const indiceInicio = (paginaActual - 1) * productosPorPagina;
    const indiceFin = indiceInicio + productosPorPagina;

    const productosPaginados = productos.slice(indiceInicio, indiceFin);

    const totalPages = Math.ceil(productos.length / productosPorPagina);

    const handlePaginaAnterior = () => {
        if (paginaActual > 1) {
            setPaginaActual(paginaActual - 1);
        }
    };

    const handlePaginaSiguiente = () => {
        if (paginaActual < totalPages) {
            setPaginaActual(paginaActual + 1);
        }
    };

    const addToTab = (productId) => {
        // Llama a la función handleAddToTab pasada como prop desde el componente padre
        handleAddToTab(productId);
        onClose(); // Cierra el modal después de agregar el producto
    };

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button
                    className="modal-close-btn"
                    onClick={onClose}
                    style={{
                        padding: '5px 10px',
                        backgroundColor: '#ff4242',
                        boxShadow: '0px 0px 12px 0px #ff4242',
                        color: '#fff',
                        border: 'none',
                        cursor: 'pointer',
                        borderRadius: '5px',
                    }}
                >
                    Cerrar
                </button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tipo</th>
                            <th>Nombre</th>
                            <th>Precio Venta</th>
                            <th>Stock</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productosPaginados.map((producto) => (
                            <tr key={producto.Id_producto} onClick={() => addToTab(producto.Id_producto)}>
                                <td>{producto.Id_producto}</td>
                                <td>{producto.tipo}</td>
                                <td>{producto.nombre}</td>
                                <td>{producto.precio_venta}</td>
                                <td>{producto.stock}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: '10px',
                    }}
                >
                    <button
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            boxShadow: '0px 0px 12px 0px #007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                        }}
                        onClick={handlePaginaAnterior}
                        disabled={paginaActual === 1}
                    >
                        Anterior
                    </button>
                    <span style={{ fontSize: '14px', color: '#555' }}>
                        Página {paginaActual} de {totalPages}
                    </span>
                    <button
                        style={{
                            padding: '5px 10px',
                            backgroundColor: '#007bff',
                            boxShadow: '0px 0px 12px 0px #007bff',
                            color: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            borderRadius: '5px',
                        }}
                        onClick={handlePaginaSiguiente}
                        disabled={paginaActual === totalPages}
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ListaProductosModal;
