import React, { useEffect, useState } from 'react';
import './Tabla.css';
import Edit_user from './Edit_user';
import Swal from 'sweetalert2';
import axios from 'axios';


export const Tabla_users_item = (props) => {

    const [textoActivar,setTextoActivar]= useState('');
    const [estado,setEstado] = useState(parseInt(props.idEstado));
    const [mostrarEditForm , setMostrarEditForm] = useState(false);

    const ponerTexto = () =>{
        if(estado === 1){
            setTextoActivar('Desactivar');
        }else if(estado === 0){
            setTextoActivar('Activar');
        }
    }

    useEffect(() => {
        ponerTexto();
    },[]);

    const handleMostrarEdit= () =>{            
        setMostrarEditForm(!mostrarEditForm);          
    }

    function confirmDelete(val){
        Swal.fire({
            icon:'warning',
            title:'<h2 style="color:yellow">¿Desea Cambiar de estado este registro?</h2>',
            background:'#252327',
            confirmButtonColor:'#f2bb15',
            confirmButtonText:textoActivar,
            showCancelButton: true,
            cancelButtonText:'Cancelar',
            toast:true
        }).then(async response => {
            if(response.isConfirmed){
                if(estado===1 || estado==='1'){
                    setEstado(0);
                }else if(estado===0 || estado==='0'){
                    setEstado(1);
                }
                try {
                    //axios.delete(`http://localhost:3001/eliminar/${val.id}`).then(()=>{
                    await axios.put(`http://localhost:3001/cambioestadoempleado/${val.id}`, {
                        "state": estado
                    }).then(()=>{
                        Swal.fire({
                            title: "Actualizado!",
                            text: `Se cambio el estado del Gerente ${val.name1}`,
                            icon: "success"
                          });
                          props.consulta();
                          ponerTexto();
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
        {/*<td>
            <h3>{props.contrasena}</h3>
         </td>*/}
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
            <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
            <button type="button"id="delete" name="delete" className="boton b2" onClick={()=>{confirmDelete(props)}}>{textoActivar}</button>
        </td>
    </tr>
    {mostrarEditForm && <Edit_user closeModal={handleMostrarEdit} datos={props}/>}
    </>
  )
}
