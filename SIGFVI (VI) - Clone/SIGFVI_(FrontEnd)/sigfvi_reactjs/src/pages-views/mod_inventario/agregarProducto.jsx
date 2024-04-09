import React, { useEffect, useState } from "react";
import axios from "axios";
import "./inputstyle.css";

export const RegisterProd = ({ isOpen, closeModal, reConsulta }) => {
  function Mayus(caracteres) {
    let palabras = caracteres.toLowerCase().split(" ");
    for (let i = 0; i < palabras.length; i++) {
      palabras[i] =
        palabras[i].charAt(0).toUpperCase() + palabras[i].substring(1);
    }
    return palabras.join(" ");
  }

  const nuevoProducto = async () => {
    try {
      const descripcionCompleta = `${descripcion} ${medida}`;
      const nombreMayus = Mayus(nombre);


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

      const formData = new FormData();
      formData.append('ID_Producto_PK', formatoId); // Este campo debe manejarse en el backend
      formData.append('Nombre_Producto', nombreMayus);
      formData.append('ID_Tipo_Producto_FK', tProducto);
      formData.append('Descripcion', descripcionCompleta);
      formData.append('Precio_Proveedor', precioCompra);
      formData.append('Precio_Venta', precioVenta);
      formData.append('Foto_Producto', foto[0]); // Aquí se adjunta el archivo de imagen
      formData.append('ID_Estado_FK', estado);

      const response = await axios.post(
        "http://localhost:3001/producto/AgregarProducto",
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
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
                required
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
                required
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
                <option value="5">Vaso</option>
              </select>
            </div>
            <div className="form-group">
              <label>Descripcion</label>
              <div className="descripcion-form">
                <input
                  required
                  type="text"
                  name="descripcion"
                  id="descripcion"
                  className="inputDesc"
                  placeholder="Ingrese valor"
                  onChange={(e) => setDescripcion(e.target.value)}
                />
                <select
                  required
                  name="medida"
                  id="medida"
                  onChange={(e) => setMedida(e.target.value)}
                >
                  <option value="" hidden>
                    Medida
                  </option>
                  <option value="Gramos">Gramos</option>
                  <option value="Libra(s)">Libra(s)</option>
                  <option value="Kilo(s)">Kilo(s)</option>
                  <option value="Litro(s)">Litro(s)</option>
                  <option value="Mililitros">Mililitros</option>
                  <option value="Unidades">Unidades</option>
                </select>
              </div>
            </div>
            <div className="form-group">
              <label>Precio de Compra</label>
              <input
                required
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
                required
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
                required
                type="file"
                name="foto"
                id="foto"
                placeholder="Ingrese valor"
                onChange={(e) => setFoto(e.target.files)}
              />
            </div>
            <div className="form-group">
              <label>Estado</label>
              <select
                required
                name=""
                id=""
                onChange={(e) => setEstado(e.target.value)}
              >
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
