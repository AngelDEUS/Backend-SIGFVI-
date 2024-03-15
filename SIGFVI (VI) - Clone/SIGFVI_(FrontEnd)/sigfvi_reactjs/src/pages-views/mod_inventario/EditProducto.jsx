import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./inputstyle.css";

const EditProducto = ({ closeModal, datos }) => {
  const [nombre, setNombre] = useState(datos.nombre || "");
  const [descripcion, setDescripcion] = useState(datos.descripcion || "");
  const [precioCompra, setPrecioC] = useState(datos.precioCompra || "");
  const [precioVenta, setPrecioV] = useState(datos.precioVenta || "");
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
    {
      /* 
    <div className="register-container">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
          <h1 className="main-title">Editar Producto</h1>
          <form  className="datos-contenido">
            <span>
              <label htmlFor="nombre">Nombre</label>
              <input
                className="input-form"
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </span>
            <span>
              <label htmlFor="descripcion">descripcion</label>
              <input
                className="input-form"
                type="text"
                name="descripcion"
                id="cantiad"
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
            </span>
            <span>
              <label htmlFor="precioCompra">Precio de Compra</label>
              <input
                className="input-form"
                type="text"
                name="precioCompra"
                id="precioCompra"
                value={precioCompra}
                onChange={(e) => {
                  setPrecioC(e.target.value);
                }}
              />
            </span>
            <span>
              <label htmlFor="tipoid">Precio de Venta</label>
              <input
                className="input-form"
                type="text"
                name="tipoid"
                id="tipoid"
                value={precioVenta}
                onChange={(e) => {
                  setPrecioV(e.target.value);
                }}
              />
            </span>
            <span>
              <br />
              <button
                type="submit"
                name="submit"
                id="submit"
                className="boton b4"
                onClick={handleSubmit}
              >
                Guardar Cambios
              </button>
            </span>
          </form>
        </div>
      </div>
    </div> */
    },
    (
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
                <label>descripcion</label>
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
    )
  );
};

export default EditProducto;
