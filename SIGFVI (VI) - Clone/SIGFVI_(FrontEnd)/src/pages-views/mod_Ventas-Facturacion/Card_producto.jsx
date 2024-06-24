import React, { useState } from 'react';
import './CardProducto.css';
import All_image from './../../assets/Productos/Producto_p.png';

const CardProducto = ({ producto, onAgregarProductoVenta}) => {
    const [cantidad, setCantidad] = useState(0);

    if (!producto) {
        return null;
    }

    const { Id_producto, nombre, precio_venta, stock } = producto;

    const handleRestar = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    const handleSumar = () => {
        if (cantidad < stock) {
            setCantidad(cantidad + 1);
        }
    };
    const handleAgregarProducto = () => {
        // Llamar a la función proporcionada por el padre para agregar el producto a la lista de productosVenta
        onAgregarProductoVenta(producto);
    };

    return (
        <div className="card-producto">
            <div className="imagen-container">
                <img src={All_image} alt='imagen producto ' />
            </div>
            <div className="detalle-container">
                <div className="detalle-info">
                    <p>#{Id_producto}</p>
                    <p>{nombre}</p>
                    <p>${precio_venta}</p>
                </div>
                <div className="contador-container">
                    <div className='flex-card'>
                        <button onClick={handleRestar}>-</button>
                        <div className='sep_h_cardbott'></div>
                        <p>{cantidad}</p>
                        <div className='sep_h_cardbott'></div>
                        <button onClick={handleSumar}>+</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardProducto;
