import React from 'react';
import ProductCardMaker from '../Card_Maker/ProductCardMaker';

const ProductCardMakerList = ({ productos }) => {
    console.log(`se reciben los siguiente productos: `, productos);

    return (
        <div className="product-card-list">
            {productos.map((producto, index) => (
                <ProductCardMaker
                    key={index}
                    id_producto={producto.ID_Producto_PK}
                    title={producto.Nombre_Producto}
                    price={producto.Precio_Venta}
                />
            ))}
        </div>
    );
};

export default ProductCardMakerList;
