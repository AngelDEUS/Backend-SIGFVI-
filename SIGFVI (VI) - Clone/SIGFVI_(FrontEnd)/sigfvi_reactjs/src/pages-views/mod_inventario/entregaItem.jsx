import React, { useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import "./Inventario.css";

export const Tabla_Entrega_item = (props) => {
  const [cantidad, setCantidad] = useState(0);

  const handleAgregar = () => {
    if (cantidad > 0) {
      // Aquí deberías enviar el ID, nombre y cantidad al componente padre para agregarlo a la segunda tabla
      props.onAgregar({
        id: props.id,
        nombre: props.nombre,
        cantidad: cantidad,
      });
      // También podrías mostrar una notificación o realizar alguna acción adicional si lo deseas
      Swal.fire({
        icon: "success",
        title: "Agregado correctamente",
        text: `Se agregó ${cantidad} ${props.nombre}(s) a la segunda tabla.`,
      });
      // Limpia el input de cantidad después de agregar
      setCantidad(0);
    } else {
      // Muestra una notificación o mensaje de error si la cantidad es 0 o menor
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "La cantidad debe ser mayor que 0",
      });
    }
  };

  return (
    <tr>
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
        <div className="entregabtn">
        <input
          className="entregaInput"
          type="number"
          value={cantidad}
          onChange={(e) => setCantidad(e.target.value)}
        />
        <button
          type="button"
          id="agregar"
          name="agregar"
          className="btn_f limpiar entregaBoton"
          onClick={handleAgregar}
        >
          +Agregar
        </button>
        </div>
      </td>
    </tr>
  );
};
