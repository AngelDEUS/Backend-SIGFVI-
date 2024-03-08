import React, { useState } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import EditProd from './EditProducto';
import "./Inventario.css";

export const Tabla_Prod_item = (props) => {

  const [mostrarEditForm , setMostrarEditForm] = useState(false);

  const handleMostrarEdit= () =>{
    setMostrarEditForm(!mostrarEditForm);
}



  const confirmDelete = () => {
    Swal.fire({
      icon: 'warning',
      title: '<h2 style="color:yellow">¿Desea eliminar este registro?</h2>',
      background: '#252327',
      confirmButtonColor: '#f2bb15',
      confirmButtonText: 'Eliminar',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      toast: true,
    }).then((response) => {
      if (response.isConfirmed) {
        axios
<<<<<<< HEAD:SIGFVI (VI) - Clone/SIGFVI_(FrontEnd)/sigfvi_reactjs/src/pages-views/mod_inventario/tabla.jsx
          .delete(`http://localhost:3004/BorrarDato/${props.id}`)
=======
          .delete(`http://localhost:3001/BorrarInventario/${props.id}`)
>>>>>>> 881f8ae262aae192c2e398f16e903e1f8d4751fa:SIGFVI (VI) - Clone/SIGFVI_(FrontEnd)/sigfvi_reactjs/src/pages-views/mod_inventario/tablaProductoitems.jsx
          .then(() => {
            axios.delete(`http://localhost:3001/BorrarDato/${props.id}`)
              .then(() => {
                console.log("Dato eliminado correctamente");
                props.consulta();
              })
              .catch((error) => {
                console.error("Error al borrar el inventario:", error);
              });
          })
          .catch((error) => {
            console.error("Error al borrar el dato:", error);
          });
      }
    });
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
            <h3>{props.precioCompra}</h3>
          </td>
          <td>
            <h3>{props.precioVenta}</h3>
          </td>
          <td>
            <h3>{props.foto}</h3>
          </td>
          <td>
            <h3>{props.estado}</h3>
          </td>
          <td>
          <button
          type="button"
          id="edit"
          name="edit"
          className="btn_f limpiar"
          onClick={handleMostrarEdit}
        >
          Editar
        </button>
            <button
          type="button"
          id="delete"
          name="delete"
          className="btn_f cancelar"
          onClick={confirmDelete}
        >
          Borrar
        </button>
          </td>
          {mostrarEditForm && <EditProd closeModal={handleMostrarEdit} datos={props}/>}
        </tr>

      )
      }