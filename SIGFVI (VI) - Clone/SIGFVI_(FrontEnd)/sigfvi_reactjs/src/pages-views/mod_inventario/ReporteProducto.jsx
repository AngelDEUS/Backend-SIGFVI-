import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import "./inputstyle.css";

const ReporteProducto = ({ closeModal, datos, consulta }) => {
  const titulo = "Reporte de Producto";
  const descripciontext =
    "Se hace un reporte para saber la razon de su salidad del Stock";

  const [id, setID] = useState(datos.id || "");
  const [nombre, setNombre] = useState(datos.nombre || "");
  const [tProducto, setTProducto] = useState(datos.tProducto || "");
  const [descripcion, setDescripcion] = useState(datos.descripcion || "");
  const [cantidadReporte, setCantidadReporte] = useState("");

  const handleGuardarCambios = async () => {
    try {
      const descripcionReporte = document.getElementById("dReporte").value;

      // Validar que la cantidadReporte sea un número antes de enviar la solicitud
      const cantidadReporteNum = parseInt(cantidadReporte);
      if (isNaN(cantidadReporteNum) || cantidadReporteNum <= 0) {
        throw new Error(
          "La cantidad reportada debe ser un número mayor que cero."
        );
      }

      await axios.post("http://localhost:3001/inventario/reportarProducto", {
        ID_Producto_PK: id,
        Descripcion_Salida: descripcionReporte,
        Cantidad_Reportada: cantidadReporteNum, // Enviar la cantidad reportada al servidor
        ID_Inventario_PK: datos.id_inventario,
      });

      // Llamar a la función consulta() para actualizar la tabla
      consulta();

      closeModal();
    } catch (error) {
      console.error("Error al guardar cambios", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Hubo un problema al guardar los cambios. Verifica la cantidad reportada.",
      });
    }
  };

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
                id="descripcion"
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
              <input
                type="text"
                name="cantidadReporte"
                id="cantidadReporte"
                value={cantidadReporte}
                onChange={(e) => setCantidadReporte(e.target.value)}
              />
            </div>
          </div>
          <div className="form-btn">
            <button
              type="submit"
              name="submit"
              id="submit"
              className="btn_f limpiar btn-registro"
              onClick={handleGuardarCambios}
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
