import React, { useState } from 'react';
import EditProveedor from './Edit_proveedor';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Tabla_proveedor_item = (props) => {

    const [mostrarEditForm , setMostrarEditForm] = useState(false);

    const handleMostrarEdit= () =>{            
        setMostrarEditForm(!mostrarEditForm);          
    }

    function confirmDelete(val){
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
                axios.delete(`http://localhost:3000/eliminar/${val.id}`).then(()=>{
                    Swal.fire({
                        title: "Eliminado!",
                        text: `El empleado ${val.name}, se ha eliminado`,
                        icon: "success"
                      });
                      props.consulta();
                })
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
            <button type="button"id="delete" name="delete" className="boton b2" onClick={()=>{confirmDelete(props)}}>Eliminar</button>
        </td>
    </tr>
    {mostrarEditForm && <EditProveedor closeModal={handleMostrarEdit} datos={props}/>}
    </>
    )
}
