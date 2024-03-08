import React, { useState } from 'react';
import './estilosCardMaker.css';

const ProductCardMaker = ({ products }) => {
    // console.log('Me están llegando estos productos al CardMaker: ', products);

    const [cantidad, setCantidad] = useState(1);

    const sumarCantidad = () => {
        setCantidad((prevCantidad) => prevCantidad + 1);
    };

    const restarCantidad = () => {
        setCantidad((prevCantidad) => (prevCantidad > 1 ? prevCantidad - 1 : 1));
    };

    // // Verificar si products es una matriz antes de iterar sobre ella
    // if (!Array.isArray(products)) {
    //     return null; // O puedes renderizar un mensaje de error o cualquier otro contenido
    // }

    return (
        <div className="containerCards">
            {products.map((product) => (
                <div key={product.ID_Producto_PK} className="product-card">
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
                            {/* <button className='btnCP sumarCantidadProd' onClick={restarCantidad}>-</button> */}
                            <p className="product-title">Cantidad de Producto: </p>
                            <div className="dividerCardV"></div>
                            <span className='calculoCantidadProd'>{product.cantidad}</span>
                            <p className="product-title">     </p>
                            {/* <div className="dividerCardV"></div> */}
                            {/* <button className='btnCP sumarCantidadProd' onClick={sumarCantidad}>+</button> */}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductCardMaker;
