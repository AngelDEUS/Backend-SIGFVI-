import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Tabla_Stock_item = (props) => {


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
            <h3>{props.cantidad}</h3>
          </td>
        </tr>
  );
};
