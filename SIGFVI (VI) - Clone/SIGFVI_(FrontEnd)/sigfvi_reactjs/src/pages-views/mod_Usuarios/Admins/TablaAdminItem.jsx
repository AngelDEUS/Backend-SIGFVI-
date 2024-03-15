import React, { useEffect, useState } from 'react';
import '../Tabla.css';
import EditAdmin from './EditAdmin';
import Swal from 'sweetalert2';
import axios from 'axios';

export const TablaAdminItem = (props) => {
  const [textoActivar, setTextoActivar] = useState('');
  const [mostrarEditForm, setMostrarEditForm] = useState(false);
  const [estado, setEstado] = useState(parseInt(props.idEstado));

  const ponerTexto = () => {
    setTextoActivar(estado === 1 ? 'Desactivar' : 'Activar');
  };

  useEffect(() => {
    ponerTexto();
  }, [estado]);

  const handleMostrarEdit = () => {
    setMostrarEditForm(!mostrarEditForm);
  };

  const confirmDelete = async (val) => {
    const newEstado = estado === 1 ? 0 : 1;

    try {
      await axios.put(`http://localhost:3001/usuario/cambioestadoadmin/${val.id}`, {
        state: newEstado,
      });

      setEstado(newEstado);

      Swal.fire({
        title: 'Actualizado!',
        text: `Se cambió el estado del Gerente ${val.name1}`,
        icon: 'success',
      });

      // Actualizar solo los datos necesarios después de cambiar el estado
      props.consulta();

    } catch (error) {
      console.error('No se pudo cambiar de estado en la función confirmDelete', error);
    }
  };

  return (
    <>
    <tr>
        <td>
            <h3>{props.name1 +" "+ props.lastname1}</h3>
        </td>
        <td>
            <h3>{props.tipoId}</h3>
        </td>
        <td>
            <h3>{props.id}</h3>
        </td>
        <td>
            <h3>{props.cargo}</h3>
        </td>
        <td>
            <h3>{props.tel}</h3>
        </td>
        <td>
            <h3>{props.email}</h3>
        </td>
        <td>
            <h3>{props.estado}</h3>
        </td>
        <td>
          <button
            type="button"
            id="edit"
            name="edit"
            className="boton b1"
            onClick={handleMostrarEdit}
          >
            Editar
          </button>
          <button
            type="button"
            id="delete"
            name="delete"
            className="boton b2"
            onClick={() => {
              confirmDelete(props);
            }}
          >
            {textoActivar}
          </button>
        </td>
    </tr>
    {mostrarEditForm && <EditAdmin closeModal={handleMostrarEdit} datos={props} />}
    
    </>
  )
}
