import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inputstyle.css";

export const RegisterProd = ({ isOpen, closeModal, reConsulta }) => {
  const nuevoProducto = async () => {
    try {
      const generarId = async (pre) => {
        let num = 1;
        let formatoId = `${pre}-${num.toString().padStart(3, "0")}`;

        while (await idDuplicado(formatoId)) {
          num++;
          formatoId = `${pre}-${num.toString().padStart(3, "0")}`;
        }

        return formatoId;
      };

      const idPre = nombre.slice(0, 3).toUpperCase();

      const formatoId = await generarId(idPre);

      const response = await axios.post(
        "http://localhost:3001/AgregarProducto",
        {
          ID_Producto_PK: formatoId,
          Nombre_Producto: nombre,
          ID_Tipo_Producto_FK: tProducto,
          Descripcion: descripcion,
          Precio_Proveedor: precioCompra,
          Precio_Venta: precioVenta,
          Foto_Producto: foto,
          ID_Estado_FK: estado,
        }
      );

      reConsulta();
      closeModal();
      console.log(response.data);
    } catch (error) {
      console.error("Error al agregar el producto:", error);
    }
  };

  const idDuplicado = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3001/VerificarDuplicado/${id}`
      );
      return response.data.duplicate;
    } catch (error) {
      console.error("Error id Duplicado:", error);
      return false;
    }
  };

  const [id, setId] = useState("");
  const [nombre, setNombre] = useState("");
  const [tProducto, setTproducto] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [foto, setFoto] = useState("");
  const [estado, setEstado] = useState("");

  if (!isOpen) return null;

  return (
    {
      /*
    <div className="register-container">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div class="container__Main-register">
          <div class="titulo">
            <h1 className="main-title">Registar Producto</h1>
          </div>
          <form className="datos-contenido">
            <span>
              <label for="nombre">Nombre producto</label>
              <input
                className="input-form"
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Nombre Producto"
                onChange={(e) => setNombre(e.target.value)}
              />
            </span>
            <span>
              <label for="tProducto">Tipo Producto</label>
              <input
                className="input-form"
                type="text"
                name="tProducto"
                id="tProducto"
                placeholder="Tipo Producto"
                onChange={(e) => setTproducto(e.target.value)}
              />
            </span>
            <span>
              <label for="descripcion">Descripcion</label>
              <input
                className="input-form"
                type="text"
                name="descripcion"
                id="descripcion"
                placeholder="Descripcion"
                onChange={(e) => setDescripcion(e.target.value)}
              />
            </span>
            <span>
              <label for="precioCompra">Precio Compra</label>
              <input
                className="input-form"
                type="text"
                name="precioCompra"
                id="precioCompra"
                placeholder="precio Compra"
                onChange={(e) => setprecioCompra(e.target.value)}
              />
            </span>

            <span>
              <label for="precioVenta">Precio Venta</label>
              <input
                className="input-form"
                type="text"
                name="precioVenta"
                id="precioVenta"
                placeholder="precio Venta"
                onChange={(e) => setPrecioVenta(e.target.value)}
              />
            </span>

            <span>
              <label for="foto">Foto</label>
              <input
                className="input-form"
                type="text"
                name="foto"
                id="foto"
                placeholder="foto"
                onChange={(e) => setFoto(e.target.value)}
              />
            </span>

            <span>
              <label for="estado">Estado</label>
              <input
                className="input-form"
                type="number"
                name="estado"
                id="estado"
                placeholder="estado"
                onChange={(e) => setEstado(e.target.value)}
              />
            </span>
            <span class="bloc">
              <br />
              <input
                type="button"
                value="Registar"
                class="boton b4"
                name="submit"
                id="submit"
                onClick={nuevoProducto}
              />
            </span>
          </form>
        </div>
      </div>
    </div>
    */
    },
    (
      <div className="editarPedido register-container">
        <div className="inputsGrup fondo-register">
          <div>
            <p onClick={closeModal}>X</p>
          </div>
          <fieldset>
            <legend>Agregar Producto</legend>
            <div className="inputs-grup">
              <div className="form-group">
                <label>Nombre Producto</label>
                <input
                  type="text"
                  name="nombre"
                  id="nombre"
                  placeholder="Ingrese valor"
                  onChange={(e) => setNombre(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Tipo de Producto</label>
                <input
                  type="text"
                  name="tProducto"
                  id="tProducto"
                  placeholder="Ingrese valor"
                  onChange={(e) => setTproducto(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Descripcion</label>
                <input
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  placeholder="Ingrese valor"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio de Compra</label>
                <input
                  type="text"
                  name="precioCompra"
                  id="precioCompra"
                  placeholder="Ingrese valor"
                  onChange={(e) => setPrecioCompra(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Precio de Venta</label>
                <input
                  type="text"
                  name="precioVenta"
                  id="precioVenta"
                  placeholder="Ingrese valor"
                  onChange={(e) => setPrecioVenta(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Foto</label>
                <input
                  type="text"
                  name="foto"
                  id="foto"
                  placeholder="Ingrese valor"
                  onChange={(e) => setFoto(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label>Estado</label>
                <input
                  type="text"
                  name="estado"
                  id="estado"
                  placeholder="Ingrese valor"
                  onChange={(e) => setEstado(e.target.value)}
                />
              </div>
            </div>
            <div className="form-btn">
              <button
                name="submit"
                id="submit"
                onSubmit={nuevoProducto}
                className="btn_f limpiar btn-registro"
              >
                Registar
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    )
  );
};
