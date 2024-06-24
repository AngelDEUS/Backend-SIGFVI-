import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./inputstyle.css";

const EditProducto = ({ closeModal, datos }) => {
  const [nombre, setNombre] = useState(datos.nombre || "");
  const [descripcion, setDescripcion] = useState(datos.descripcion || "");
  const [precioCompra, setPrecioC] = useState(datos.precioCompra || "");
  const [precioVenta, setPrecioV] = useState(datos.precioVenta || "");
  const [estado, setEstado] = useState("");
  const [con, setCon] = useState(true);

  const editarRegistro = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:3001/producto/ActualizarProducto/${id}`,
        {
          Nombre_Producto: nombre,
          Descripcion: descripcion,
          Precio_Proveedor: precioCompra,
          Precio_Venta: precioVenta,
          ID_Estado_FK: estado,
        }
      );
      setCon(true);
      consulta();
      console.log(response.data);
    } catch (err) {
      console.error("No se pudo hacer la petición put", err);
      setCon(false);
    }
  };

  const consulta = function () {
    datos.consulta();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleClick();
  };

  const handleClick = () => {
    if (con) {
      Swal.fire({
        icon: "success",
        text: "Datos Actualizados para: " + nombre,
      }).then(() => {

        editarRegistro(datos.id);
        closeModal();
      });
    } else {
      Swal.fire({
        icon: "warning",
        title: "Rellene los campos del formulario para continuar",
        toast: true,
      });
    }
  };

  return (
    <div className="editarPedido register-container">
      <div className="inputsGrup fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <fieldset>
          <legend>Editar Producto</legend>
          <div className="inputs-grup">
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Ingrese el valor"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>descripcion</label>
              <input
                type="text"
                name="descripcion"
                id="cantiad"
                placeholder="Ingrese el valor"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Precio Compra</label>
              <input
                type="text"
                name="precioCompra"
                id="precioCompra"
                value={precioCompra}
                placeholder="Ingrese el valor"
                onChange={(e) => {
                  setPrecioC(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Precio de Venta</label>
              <input
                type="text"
                name="tipoid"
                id="tipoid"
                placeholder="Ingrese el valor"
                value={precioVenta}
                onChange={(e) => {
                  setPrecioV(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select name="" id="" value={estado} onChange={(e) => setEstado(e.target.value)}>
                <option value="" hidden>
                  Elegir Estado
                </option>
                <option value="0">Inactivo</option>
                <option value="1">Activo</option>
              </select>
            </div>
          </div>
          <div className="form-btn">
            <button
              type="submit"
              name="submit"
              id="submit"
              className="btn_f limpiar btn-registro"
              onClick={handleSubmit}
            >
              Guardar Cambios
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};

export default EditProducto;
