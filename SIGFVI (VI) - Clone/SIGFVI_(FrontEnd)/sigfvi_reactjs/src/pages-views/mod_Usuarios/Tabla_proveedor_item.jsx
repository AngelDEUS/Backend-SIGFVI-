import React, { useEffect, useState } from 'react';
import EditProveedor from './Edit_proveedor';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Tabla_proveedor_item = ({ consulta, ...props }) => {

    const [estado, setEstado] = useState(parseInt(props.idEstado));
    const [textoActivar, setTextoActivar] = useState('');
    const [mostrarEditForm, setMostrarEditForm] = useState(false); 

    useEffect(() => {
        ponerTexto();
    }, [estado]);

    const ponerTexto = () => {
        if (estado === 1) {
            setTextoActivar('Desactivar');
        } else if (estado === 0) {
            setTextoActivar('Activar');
        }
    }

    const handleMostrarEdit = () => {
        setMostrarEditForm(!mostrarEditForm);
    }

    function confirmDelete(val) {
        let newEstado;
        if (estado === 1 || estado === '1') {
            newEstado = 0;
        } else if (estado === 0 || estado === '0') {
            newEstado = 1;
        }

        Swal.fire({
            icon: 'warning',
            title: '<h2 style="color:yellow">¿Desea Cambiar de estado este registro?</h2>',
            background: '#252327',
            confirmButtonColor: '#f2bb15',
            confirmButtonText: textoActivar, 
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            toast: true
        }).then(async response => {
            if (response.isConfirmed) {
                try {
                    await axios.put(`http://localhost:3001/usuario/cambioestadoprovee/${val.id}`, {
                        "state": newEstado
                    }).then(() => {
                        setEstado(newEstado); // Mover la actualización del estado aquí
                        ponerTexto(); // Actualizar el texto del botón
                        Swal.fire({
                            title: "Actualizado!",
                            text: `Se cambio el estado del Gerente ${val.name1}`,
                            icon: "success"
                        });
                        consulta(); 
                    })
                } catch (error) {
                    console.error('no se pudo cambiar de estado en la funcion confirmdelete', error);
                }
            }
        })
    }

    return (
        <>
            <tr>
                <td>
                    <h3>{props.id}</h3>
                </td>
                <td>
                    <h3>{props.name}</h3>
                </td>
                <td>
                    <h3>{props.cel}</h3>
                </td>
                <td>
                    <h3>{props.frecuency}</h3>
                </td>
                <td>
                    <h3>{props.state}</h3>
                </td>
                <td>
                    <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
                    <button type="button" id="delete" name="delete" className="boton b2" onClick={() => { confirmDelete(props) }}>{textoActivar}</button>
                </td>
            </tr>
            {mostrarEditForm && <EditProveedor closeModal={handleMostrarEdit} datos={props} consulta={consulta} />}
        </>
    )
}
