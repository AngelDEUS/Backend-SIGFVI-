import React, { useState } from 'react';
import './estilosCardMaker.css';

const ProductCardMaker = ({ product }) => {
    const [cantidad, setCantidad] = useState(1);

    const sumarCantidad = () => {
        setCantidad((prevCantidad) => prevCantidad + 1);
    };

    const restarCantidad = () => {
        setCantidad((prevCantidad) => (prevCantidad > 1 ? prevCantidad - 1 : 1));
    };

    return (
        <div className="product-card">
            <div className="upCardProducto">
                <img className="product-image" src={product.image} alt={product.title} />
                <div className="product-details">
                    <h3 className="product-title-ID">#{product.id_producto}</h3>
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">${product.price}</p>
                </div>
            </div>
            <div className="downCardProducto">
                <div className="dividerCardH"></div>
                <div className="sumatoriaProductCart">
                    <button className='btnCP sumarCantidadProd' onClick={restarCantidad}>-</button>
                    <div className="dividerCardV"></div>
                    <span className='calculoCantidadProd'>{cantidad}</span>
                    <div className="dividerCardV"></div>
                    <button className='btnCP sumarCantidadProd' onClick={sumarCantidad}>+</button>
                </div>
            </div>
        </div>
    );
};

export default ProductCardMaker;
