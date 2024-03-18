import React, { useEffect, useState } from 'react'
import Edit_deudor from './Edit_deudor'
import Sumar_deudor from './Sumar_deudor';
import Pagar_deudor from './Pagar_deudor';
import Swal from 'sweetalert2';
import axios from 'axios';

export const Tabla_deudor_item = (props) => {
    
    const [textoActivar, setTextoActivar] = useState('');
    const [mostrarSumarform , setMostrarSumarform] = useState(false);
    const [mostrarPagarform , setMostrarPagarform] = useState(false);
    const [mostrarEditForm , setMostrarEditForm] = useState(false);
    const [estado, setEstado] = useState(parseInt(props.idEstado));

    useEffect(() => {
        ponerTexto();
    }, [estado]);

    const ponerTexto = () => {
        if(estado === 1){
            setTextoActivar('Desactivar');
        } else if(estado === 0){
            setTextoActivar('Activar');
        }
    }

    const handleMostrarEdit = () => {            
        setMostrarEditForm(!mostrarEditForm);          
    }
    
    const handleMostrarSumar = () => {
        setMostrarSumarform(!mostrarSumarform);
    }

    const handleMostrarPagar = () => {
        setMostrarPagarform(!mostrarPagarform);
    }

    function confirmDelete(val) {
        let newEstado;
        if(estado === 1 || estado === '1'){
            newEstado = 0;
        } else if(estado === 0 || estado === '0'){
            newEstado = 1;
        }
        setEstado(newEstado);
        Swal.fire({
            icon: 'warning',
            title: '<h2 style="color:yellow">¿Desea Cambiar el estado de este registro?</h2>',
            background: '#252327',
            confirmButtonColor: '#f2bb15',
            confirmButtonText: textoActivar,
            showCancelButton: true,
            cancelButtonText: 'Cancelar',
            toast: true
        }).then(async response => {
            if (response.isConfirmed) {
                try {
                    await axios.put(`http://localhost:3001/usuario/cambiarestado/${val.id}`, {
                        "state": newEstado
                    }).then(() => {
                        Swal.fire({
                            title: "Actualizado!",
                            text: `Los datos de ${val.name1}, se han actualizado`,
                            icon: "success"
                        });
                        props.consulta();
                    });
                } catch (error) {
                    console.error('No se pudo cambiar de estado en la función confirmDelete', error);
                }
            }
        });
    }

    return (
        <>
            <tr>
                <td>
                    <h3>{props.id}</h3>
                </td>
                <td>
                    <h3>{props.name1 + " " + props.lastname1}</h3>
                </td>
                <td>
                    <h3>{props.address}</h3>
                </td>
                <td>
                    <h3>{props.tel}</h3>
                </td>
                <td>
                    <h2>${props.saldo}</h2>
                </td>
                <td>
                    <h3>{props.state}</h3>
                </td>
                <td>
                    <button type="button" id="edit" name="edit" className="boton b1" onClick={handleMostrarEdit}>Editar</button>
                    <button type="button" id="sumar" name="sumar" className="boton b1" onClick={handleMostrarSumar}>Sumar</button>
                    <button type="button" id="pay" name="pay" className="boton b4" onClick={handleMostrarPagar}>Pagar</button>
                    <button type="button" id="edit" name="edit" className="boton b2" onClick={() => { confirmDelete(props) }}>{textoActivar}</button>
                </td>
            </tr>
            {mostrarEditForm && <Edit_deudor closeModal={handleMostrarEdit} datos={props}/>}
            {mostrarSumarform && <Sumar_deudor closeModal={handleMostrarSumar} datos={props} />}
            {mostrarPagarform && <Pagar_deudor closeModal={handleMostrarPagar} datos={props} />}
        </>
    )
}
