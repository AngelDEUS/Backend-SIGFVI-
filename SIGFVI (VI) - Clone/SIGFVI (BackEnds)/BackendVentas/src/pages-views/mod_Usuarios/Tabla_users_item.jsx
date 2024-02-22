import React, { useState } from 'react';
import './Tabla.css';
import Edit_user from './Edit_user';
import Swal from 'sweetalert2';

export const Tabla_users_item = (props) => {

    const [editform , setEditform] = useState(false)

    function confirmDelete(){
        Swal.fire({
            icon:'warning',
            title:'<h2 style="color:yellow">¿Desea eliminar este registro?</h2>',
            background:'#252327',
            confirmButtonColor:'#f2bb15',
            confirmButtonText:`Eliminar`,
            showCancelButton: true,
            cancelButtonText:'Cancelar',
            toast:true
        }).then(response => {
            if(response.isConfirmed){
                delit();
            }
        })
    }
    
    function delit(){
        alert('sql a ejecutar')
    }

  return (
    <>
    <tr>
        <td>
            <h3>{props.name +" "+ props.last_name}</h3>
        </td>
        <td>
            <h3>{props.tipoid}</h3>
        </td>
        <td>
            <h3>{props.id}</h3>
        </td>
        <td>
            <h3>{props.tipouser}</h3>
        </td>
        <td>
            <h3>{props.nick}</h3>
        </td>
        <td>
            <h3>{props.password}</h3>
        </td>
        <td>
            <h3>{props.cel}</h3>
        </td>
        <td>
            <h3>{props.email}</h3>
        </td>
        <td>
            <h3>{props.state}</h3>
        </td>
        <td>
            <button type="button" id="edit" name="edit" className="boton b1" onClick={()=> setEditform(true)}>Editar</button>
            <button type="button"id="delete" name="delete" className="boton b2" onClick={confirmDelete}>Borrar</button>
        </td>
    </tr>
    <Edit_user isOpen={editform} closeModal={()=> setEditform(false)}/>
    </>
  )
}
