import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inputstyle.css";

export const RegisterProd = ({ isOpen, closeModal, reConsulta }) => {
  const nuevoProducto = async () => {
    try {
      const descripcionCompleta = `${descripcion} ${medida}`;

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
        "http://localhost:3001/producto/AgregarProducto",
        {
          ID_Producto_PK: formatoId,
          Nombre_Producto: nombre,
          ID_Tipo_Producto_FK: tProducto,
          Descripcion: descripcionCompleta,
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
        `http://localhost:3001/producto/VerificarDuplicado/${id}`
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
  const [medida, setMedida] = useState("");
  const [precioCompra, setPrecioCompra] = useState("");
  const [precioVenta, setPrecioVenta] = useState("");
  const [foto, setFoto] = useState("");
  const [estado, setEstado] = useState("");

  if (!isOpen) return null;

  return (
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
              <select
                name=""
                id=""
                type="text"
                onChange={(e) => setTproducto(e.target.value)}
              >
                <option value="" hidden>
                  Elegir Tipo de producto
                </option>
                <option value="1">Botella</option>
                <option value="2">Lata</option>
                <option value="3">Paquete</option>
                <option value="4">Caja</option>
              </select>
            </div>
            <div className="form-group">
              <label>Descripcion</label>
              <div className="descripcion-form">
                <input
                  type="number"
                  name="descripcion"
                  id="descripcion"
                  className="inputDesc"
                  placeholder="Ingrese valor"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <select
                  name="medida"
                  id="medida"
                  onChange={(e) => setMedida(e.target.value)}
                >
                  <option value="" hidden>
                    Medida
                  </option>
                  <option value="Gramos">Gramos</option>
                  <option value="Litro(s)">Litro(s)</option>
                  <option value="Mililitros">Mililitros</option>
                  <option value="Unidades">Unidades</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Precio de Compra</label>
              <input
                type="number"
                name="precioCompra"
                id="precioCompra"
                placeholder="Ingrese valor"
                onChange={(e) => setPrecioCompra(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label>Precio de Venta</label>
              <input
                type="number"
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
              <select name="" id="" onChange={(e) => setEstado(e.target.value)}>
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
              name="submit"
              id="submit"
              onClick={nuevoProducto}
              className="btn_f limpiar btn-registro"
            >
              Registar
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
};
