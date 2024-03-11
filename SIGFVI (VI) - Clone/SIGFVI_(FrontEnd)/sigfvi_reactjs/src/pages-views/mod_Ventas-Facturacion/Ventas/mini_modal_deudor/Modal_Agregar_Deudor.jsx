import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import axios from 'axios';
import '../../Ventas/modal_productos/miTablaModal.css'
import './estilo_modala_gregar_deudor.css'

import TituloyDescAgregarDeudor from '../../../../components/Titles/TituloyDesc';

const Modal_Agregar_Deudor = ({ onCloseModalDeudor }) => {
    const descipcionModalAgregarDeudor = 'En este panel puede agregar un deudor a la venta.';
    const tituloModalAgregarDeudor = 'Agregar Deudor a la venta';

    const [deudores, setDeudores] = useState([]);

    // Enlistar mis deudores en la tabla
    useEffect(() => {
        const fetchDeudores = async () => {
            try {
                const response = await axios.get('http://localhost:3001/vyf/buscardeudorventa');
                setDeudores(response.data.deudores_venta);
            } catch (error) {
                console.error('Error fetching deudores:', error);
                // Puedes mostrar un mensaje de error con SweetAlert2 aquí
            }
        };

        fetchDeudores();
    }, []);

    const agregarDeudor = (deudor) => {
        setModalAbierto(false); // Cerrar el modal
        setNombreDeudor(deudor.Nombres); // Actualizar el nombre del deudor en el contenedor
        setDireccionDeudor(deudor.Direccion_Deudor); // Actualizar la dirección del deudor en el contenedor
    };
    

    return (
        <div className='modal__wrapper'>
            <div className="modal__agregar-deudor">
                <div className='HeaderModal--AgregarDeudor'>
                    <TituloyDescAgregarDeudor titulo={tituloModalAgregarDeudor} descripcion={descipcionModalAgregarDeudor} />
                </div>
                <div className="contenido--ModalAgregarDeudor">
                    <table className='tabla2'>
                        <thead>
                            <tr>
                                <th className='esquinaIz-Top'>Código de Deudor</th>
                                <th>Nombres</th>
                                <th>Apellidos</th>
                                <th>Dirección</th>
                                <th>Teléfono</th>
                                <th>Estado</th>
                                <th className='thAcciones esquinaDe-Top'>Seleccionar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deudores.length > 0 && deudores.map(deudor => (
                                <tr key={deudor.ID}>
                                    <td>{deudor.ID}</td>
                                    <td>{deudor.Nombres}</td>
                                    <td>{deudor.Apellidos}</td>
                                    <td>{deudor.Direccion_Deudor}</td>
                                    <td>{deudor.Telefono_Deudor}</td>
                                    <td>{deudor.Nombre_Estado}</td>
                                    <td className='tdAcciones'>
                                        <div className="btn-grup">
                                            <button className="btn_Modal--seleccionar" onClick={() => {/* Función para agregar deudor */ }}>Agregar</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="7" className="tablefooterBg"></td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
                <div className="footer--ModalAgregarDeudor">
                    <button className='btn_f actualizar' type="button" >Actualizar/Agrear</button>
                    <button className='btn_f cancelarActualizar' type="button" onClick={onCloseModalDeudor}>Cancelar</button>
                </div>
            </div>
        </div>
    )
}
export default Modal_Agregar_Deudor;
