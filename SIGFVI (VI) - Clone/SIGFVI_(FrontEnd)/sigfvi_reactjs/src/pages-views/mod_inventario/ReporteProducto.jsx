import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import "./inputstyle.css";

const ReporteProducto = ({ closeModal, datos }) => {
  const titulo = "Reporte de Producto";
  const descripciontext =
    "Se hace un reporte para saber la razon de su salidad del Stock";

  const [id, setID] = useState(datos.id || "");
  const [nombre, setNombre] = useState(datos.nombre || "");
  const [tProducto, setTProducto] = useState(datos.tProducto
    || "");
  const [descripcion, setDescripcion] = useState(datos.descripcion || "");

  console.log(id);
  console.log(tProducto);
  console.log(setDescripcion);

  return (
    <div className="editarPedido register-container">
      <div className="inputsGrup fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <TituloyDesc titulo={titulo} descripcion={descripciontext} />
        <fieldset>
          <legend>Formulario</legend>
          <div className="inputs-grup">
            <div className="form-group">
              <label>Codigo</label>
              <input
                type="text"
                name="id"
                id="id"
                value={id}
                readOnly
                onChange={(e) => {
                  setID(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Nombre</label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                value={nombre}
                readOnly
                onChange={(e) => {
                  setNombre(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>Tipo Producto</label>
              <input
                type="text"
                name="tproducto"
                id="tproducto"
                value={tProducto}
                readOnly
                onChange={(e) => {
                  setTProducto(e.target.value);
                }}
              />
            </div>
            <div className="form-group">
              <label>descripcion</label>
              <input
                type="text"
                name="descripcion"
                id="cantiad"
                readOnly
                value={descripcion}
                onChange={(e) => {
                  setDescripcion(e.target.value);
                }}
              />
            </div>
          </div>
        </fieldset>
        <fieldset>
          <legend>descripcion</legend>
          <div className="inputs-grup">
            <div className="form-group form-desc">
              <label>descripcion</label>
              <input type="text" name="dReporte" id="dReporte" />
            </div>
            <div className="form-group">
              <label>Cantidad Reportada</label>
              <input type="text" name="dReporte" id="dReporte" />
            </div>
          </div>
          <div className="form-btn">
            <button
                type="submit"
                name="submit"
                id="submit"
                className="btn_f limpiar btn-registro"
              >
                Guardar Cambios
              </button>
            </div>
        </fieldset>
      </div>
    </div>
  );
};

export default ReporteProducto;
