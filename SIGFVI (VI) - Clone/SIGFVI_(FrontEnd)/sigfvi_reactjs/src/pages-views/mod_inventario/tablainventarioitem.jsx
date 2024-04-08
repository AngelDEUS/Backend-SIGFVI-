import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import ReporteProducto from "./ReporteProducto";

export const Tabla_Stock_item = (props) => {
  const [mostrarReporte, setMostrarReporte] = useState(false);

  const handleMostrarReporte = () => {
    setMostrarReporte(!mostrarReporte);
  };

  return (
    <tr>
      <td>
        <img
          src={props.foto}
          alt="Producto"
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "5px",
            border: "3px solid #fc7c02",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        />
      </td>
      <td>
        <h3>{props.id}</h3>
      </td>
      <td>
        <h3>{props.nombre}</h3>
      </td>
      <td>
        <h3>{props.tProducto}</h3>
      </td>
      <td>
        <h3>{props.descripcion}</h3>
      </td>
      <td>
        <h3>{props.cantidad}</h3>
      </td>
      <td>
        <button className="btn_f cancelar" onClick={handleMostrarReporte}>
          Reporte
        </button>
      </td>
      {mostrarReporte && (
        <ReporteProducto
          closeModal={handleMostrarReporte}
          datos={props}
          consulta={props.consulta}
        />
      )}
    </tr>
  );
};
