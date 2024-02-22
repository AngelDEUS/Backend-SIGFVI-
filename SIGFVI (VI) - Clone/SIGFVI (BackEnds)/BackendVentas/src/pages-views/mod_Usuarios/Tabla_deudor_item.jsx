import React, { useState } from 'react'
import Edit_deudor from './Edit_deudor'
import Sumar_deudor from './Sumar_deudor';
import Pagar_deudor from './Pagar_deudor';
import Swal from 'sweetalert2';

export const Tabla_deudor_item = (props) => {
    
    const [editform , setEditform] = useState(false);
    const [sumarform , setSumarform] = useState(false);
    const [pagarform , setPagarform] = useState(false);

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
            <h3>{props.id}</h3>
        </td>
        <td>
            <h3>{props.name}</h3>
        </td>
        <td>
            <h3>{props.direccion}</h3>
        </td>
        <td>
            <h3>{props.cel}</h3>
        </td>
        <td>
            <h2>${props.deuda}</h2>
        </td>
        <td>
            <h3>{props.state}</h3>
        </td>
        <td>
            <button type="button" id="edit" name="edit" className="boton b1" onClick={()=> setEditform(true)} >Editar</button>
            <button type="button"id="sumar" name="sumar" className="boton b1" onClick={()=> setSumarform(true)} >Sumar</button>
            <button type="button" id="pay" name="pay" className="boton b4" onClick={()=> setPagarform(true)} >Pagar</button>
            <button type="button" id="edit" name="edit" className="boton b2" onClick={confirmDelete}>Eliminar</button>
        </td>
    </tr>
    <Edit_deudor isOpen={editform} closeModal={()=> setEditform(false)} />
    <Sumar_deudor isOpen={sumarform} closeModal={()=> setSumarform(false)} />
    <Pagar_deudor isOpen={pagarform} closeModal={()=> setPagarform(false)} />
    </>
  )
}
