import React, { useState } from 'react';
import '../Tabla.css';
import EditAdmin from './EditAdmin';
import Swal from 'sweetalert2';
import axios from 'axios';

export const TablaAdminItem = (props) => {

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
                axios.delete(`http://localhost:3002/Delete/${val.id}`).then(()=>{
                    Swal.fire({
                        title: "Eliminado!",
                        text: `El empleado ${val.name1}, se ha eliminado`,
                        icon: "success"
                      });
                    props.consulta();
                })
            }
        })
    }
    //console.log(props);

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
            <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
            <button type="button"id="delete" name="delete" className="boton b2" onClick={()=>{confirmDelete(props)}}>Borrar</button>
        </td>
    </tr>
    {mostrarEditForm && <EditAdmin closeModal={handleMostrarEdit} datos={props}/>}
    
    </>
  )
}
