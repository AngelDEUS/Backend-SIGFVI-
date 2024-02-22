import React, { useState } from "react";
import axios from "axios";

function AgregarProducto() {
  const [producto, setProducto] = useState({
    Nombre_Producto: "",
    ID_Tipo_Producto_FK: 0,
    Cantida_Neto_producto: 0,
    Precio_Proveedor: 0,
    Precio_Venta: 0,
    Foto_Producto: "",
    ID_Estado_FK: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProducto({
      ...producto,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:3001/AgregarProducto", producto)
      .then((response) => {
        console.log("Producto agregado correctamente");
      })
      .catch((error) => {
        console.error("Error al agregar el producto:", error);
      });
  };

  return (
    <div>
      <h2>Agregar Nuevo Producto</h2>
      <form onSubmit={handleSubmit}>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          name="Nombre_Producto"
          value={producto.Nombre_Producto}
          onChange={handleInputChange}
        />

        <label>Tipo de Producto:</label>
        <input
          type="number"
          name="ID_Tipo_Producto_FK"
          value={producto.ID_Tipo_Producto_FK}
          onChange={handleInputChange}
        />

        <label>Cantidad Neta del Producto:</label>
        <input
          type="number"
          name="Cantida_Neto_producto"
          value={producto.Cantida_Neto_producto}
          onChange={handleInputChange}
        />

        <label>Precio Proveedor:</label>
        <input
          type="number"
          name="Precio_Proveedor"
          value={producto.Precio_Proveedor}
          onChange={handleInputChange}
        />

        <label>Precio Venta:</label>
        <input
          type="number"
          name="Precio_Venta"
          value={producto.Precio_Venta}
          onChange={handleInputChange}
        />
        
        <label>Foto del Producto:</label>
        <input
          type="text"
          name="Foto_Producto"
          value={producto.Foto_Producto}
          onChange={handleInputChange}
        />

        <label>Estado:</label>
        <input
          type="number"
          name="ID_Estado_FK"
          value={producto.ID_Estado_FK}
          onChange={handleInputChange}
        />

        <button type="submit">Agregar Producto</button>
      </form>
    </div>
  );
}

export default AgregarProducto;
