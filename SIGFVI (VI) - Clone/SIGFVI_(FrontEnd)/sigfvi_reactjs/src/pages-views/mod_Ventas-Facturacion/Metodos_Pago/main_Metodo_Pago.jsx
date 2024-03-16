import React, { useState, useEffect } from 'react';
import TituloyDesc from '../../../components/Titles/TituloyDesc'
import '../mod_ventas.css';
import './mod_ventas_metodo_pago.css';
import Swal from 'sweetalert2';

// imagenes
import noneImagen from "../../../assets/Ventas/Metodo_Pago/otro-1000x1000.png";
import efectivoImagen from "../../../assets/Ventas/Metodo_Pago/efectivo-1000x1000.png";
import nequiImagen from "../../../assets/Ventas/Metodo_Pago/n-nequi-colombia-logo.png";
import daviplataImagen from "../../../assets/Ventas/Metodo_Pago/daviplata-icono-1000x991.png";
import tarjetaImagen from "../../../assets/Ventas/Metodo_Pago/tarjeta-de-credito-1000x1000.png";

//Mi card:
//import miCardPnatilla from './plantillaCard'

import axios from 'axios';



const Main_Metodo_Pago = () => {
    const titulo = 'Gestión de Metodos de Pago';
    const descipcion = 'En este panel se mostrarán todas las ventas';

    // Arreglos:
    const imgClases = ['--otro__MP', '--Efectivo__MP', '--Nequi__MP', '--Daviplata__MP', '--Tarjeta__MP'];
    const estadoNombres = ['Inactivo', 'Activo', 'otro']

    //Activar y desactivar botones
    const [isUpdating, setIsUpdating] = useState(false);
    const [isAdding, setIsAdding] = useState(true);

    // DropdawnMenu Tipo de Método de Pago:
    const [dropdownOpenTipo, setDropdownOpenTipo] = useState(false);
    const [selectedOptionTipo, setSelectedOptionTipo] = useState('Tipo Metodo pago');
    const optionsTipo = ['Físico', 'Electrónico'];

    // DropdawnMenu Estado del Método de Pago:
    const [dropdownOpenEstado, setDropdownOpenEstado] = useState(false);
    const [selectedOptionEstado, setSelectedOptionEstado] = useState('Estado');
    const optionsEstado = ['Activo', 'Inactivo'];

    // USE STATES PARA FUNCIONES
    const [isUpdatingCard, setIsUpdatingCard] = useState(false);

    // Funcion para el dropdown
    const handleOptionSelectTipo = (option) => {
        setSelectedOptionTipo(option);
        setAgregarMetodoPago(prevState => ({
            ...prevState,
            Tipo_Metodo_Pago: option // Actualiza el valor del tipo de método de pago en el estado
        }));
        setDropdownOpenTipo(false); //---> Cerrar el menú
    };

    const handleOptionSelectEstado = (option) => {
        setSelectedOptionEstado(option);
        //Asignar 0 para 'Activo' y 1 para 'Inactivo'
        const idEstado = option === 'Activo' ? 1 : 0;
        setAgregarMetodoPago(prevState => ({
            ...prevState,
            ID_Estado_FK: idEstado
        }));
        setDropdownOpenEstado(false); //Cerrar el menú Dropdown
    };

    // ----------: Funciones de backend :------->
    /* CONSULTAS Y METODOS PARA EL BACKEDN */
    const [metodosPago, setMetodosPago] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3001/metodopagos')
            .then(response => {
                setMetodosPago(response.data);
            })
            .catch(error => {
                console.error('Error al obtener métodos de pago:', error);
            });
    }, []);

    // ---> Función para buscar método de pago por nombre o por ID
    const buscarMetodoPago = () => {
        const input = document.getElementById('buscarMetodoPago');
        const valor = input.value.trim(); // Eliminar espacios en blanco al principio y al final

        // Verificar si el campo de búsqueda está vacío
        if (valor === '') {
            // Si está vacío, recuperar todos los métodos de pago
            axios.get('http://localhost:3001/metodopagos')
                .then(response => {
                    setMetodosPago(response.data);
                    console.log("Todos los Métodos de Pago recuperados.");
                })
                .catch(error => {
                    console.error('Error al buscar métodos de pago:', error);
                });
        } else {
            let endpoint;

            // Verificar si el valor es un número (para buscar por ID) o una cadena (para buscar por nombre)
            if (!isNaN(valor)) {
                // Si es un número, buscar por ID
                endpoint = `http://localhost:3001/metodopago/${valor}`;
            } else {
                // Si es una cadena, buscar por nombre
                endpoint = `http://localhost:3001/metodopagoNombre/${valor}`;
            }

            axios.get(endpoint)
                .then(response => {
                    setMetodosPago(response.data);
                    console.log("Métodos de Pago encontrados.");
                })
                .catch(error => {
                    console.error('Error al buscar métodos de pago:', error);
                });
        }
    };

    // Función para manejar la búsqueda al hacer clic en el botón de búsqueda
    const handleBuscarMetodoPago = () => {
        buscarMetodoPago();
    };


    // UseState de mi fromulario agregar
    const [agregarMetodoPago, setAgregarMetodoPago] = useState({
        Nombre_Metodo: '',
        Tipo_Metodo_Pago: '',
        Referencia: '',
        ID_Estado_FK: ''
    });

    // UseState de mi fromulario Actualizar-Editar
    const [editarMetodoPago, setEditarMetodoPago] = useState({
        ID_Metodo_Pago_PK: '',
        Nombre_Metodo: '',
        Tipo_Metodo_Pago: '',
        Referencia: '',
        ID_Estado_FK: ''
    });

    const [isEditing, setIsEditing] = useState(false);

    const editarMetodoPagoHandler = (metodoPago) => {
        setEditarMetodoPago({
            ID_Metodo_Pago_PK: metodoPago.ID_Metodo_Pago_PK,
            Nombre_Metodo: metodoPago.Nombre_Metodo,
            Tipo_Metodo_Pago: metodoPago.Tipo_Metodo_Pago,
            Referencia: metodoPago.Referencia,
            ID_Estado_FK: metodoPago.ID_Estado_FK
        });

        // Actualizar los estados de los dropdowns seleccionados
        setSelectedOptionTipo(metodoPago.Tipo_Metodo_Pago);
        setSelectedOptionEstado(metodoPago.ID_Estado_FK === 0 ? 'Inactivo' : 'Activo');

        // Llenar los campos del formulario
        setAgregarMetodoPago({
            ...metodoPago
        });

        // Mostrar el formulario de edición
        setIsEditing(true);

        setIsAdding(false);
        setIsUpdating(true);
    };



    const limpiarCampos = () => {
        setAgregarMetodoPago({
            ID_Metodo_Pago_PK: '',
            Nombre_Metodo: '',
            Tipo_Metodo_Pago: '',
            Referencia: '',
            ID_Estado_FK: ''
        })
        setEditarMetodoPago({
            ID_Metodo_Pago_PK: '',
            Nombre_Metodo: '',
            Tipo_Metodo_Pago: '',
            Referencia: '',
            ID_Estado_FK: ''
        })
        console.log('Datos limpiados con exito');
    }

    const cancelarAccionMetodPago = () => {
        Swal.fire({
            title: "¿Esta seguro de cancelar la acción?",
            text: "Si desea continuar editando, pulse el boton de Volver Atrás.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            cancelButtonText: "Volver Atrás",
            confirmButtonText: "Si, Cancela la operación"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "¡Acción Cancelada!",
                    text: "Se ha cancelado la operación.",
                    icon: "success"
                });
                limpiarCampos();

                setIsAdding(true);
                setIsUpdating(false);
            }
        });
    }

    // Función para manejar cambios en los campos del formulario
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAgregarMetodoPago(prevState => ({
            ...prevState,
            [name]: value
        }));
    };


    // -- Consulta general a la tabla de METODOS DE PAGO: --------->
    const obtenerMetodosPago = () => {
        axios.get("http://localhost:3001/metodopagos")
            .then((response) => {
                setMetodosPago(response.data);
                console.log("Metodos de Pagos encontrados.");
            })
            .catch((error) => {
                console.error('Error al obtener los datos de los Metodos de pago:', error);
            });
    };


    // -- Crear Nuevo METODO DE PAGO: --------->
    const agregarNuevoMetodoPago = () => {
        // Validar si algún campo está vacío
        if (
            agregarMetodoPago.Nombre_Metodo.trim() === '' ||
            agregarMetodoPago.Tipo_Metodo_Pago.trim() === '' ||
            agregarMetodoPago.Referencia.trim() === ''
        ) {
            // Mostrar mensaje de error si algún campo está vacío
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar Método de Pago',
                text: 'Por favor complete todos los campos, No puede registrar un campo vacío.',
                showConfirmButton: false,
                timer: 1500
            });
            return; 
        }
    
        axios.post('http://localhost:3001/metodopago', agregarMetodoPago)
            .then(response => {
                console.log('Método de Pago agregado correctamente:', response.data);
                obtenerMetodosPago();
                limpiarCampos();
                setAgregarMetodoPago({
                    ID_Metodo_Pago_PK: '',
                    Nombre_Metodo: '',
                    Tipo_Metodo_Pago: '',
                    Referencia: '',
                    ID_Estado_FK: ''
                });
                Swal.fire({
                    icon: 'success',
                    title: 'Método de Pago agregado correctamente',
                    showConfirmButton: false,
                    timer: 1500
                });
            })
            .catch(error => {
                console.error('Error al agregar Método de Pago:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al agregar Método de Pago',
                    text: 'Por favor, intenta de nuevo más tarde',
                    showConfirmButton: false,
                    timer: 1500
                });
            });
    };
    
    // -- ACTUALIZAR METODO DE PAGO : --------->
    const actualizarMetodoPago = () => {
        const ID_Metodo_Pago_PK = editarMetodoPago.ID_Metodo_Pago_PK;
        const Nombre_Metodo = editarMetodoPago.Nombre_Metodo;

        // Actualizar editarMetodoPago con los valores de agregarMetodoPago
        const nuevoEditarMetodoPago = {
            ...editarMetodoPago,
            Nombre_Metodo: agregarMetodoPago.Nombre_Metodo,
            Tipo_Metodo_Pago: agregarMetodoPago.Tipo_Metodo_Pago,
            Referencia: agregarMetodoPago.Referencia,
            ID_Estado_FK: agregarMetodoPago.ID_Estado_FK
        };

        console.log('Datos antes de editar: ', editarMetodoPago);
        console.log('Datos Después de editar: ', nuevoEditarMetodoPago);

        Swal.fire({
            title: "¿Estás seguro de Actualizar?",
            text: "Recuerda, que siempre puedes cancelar la acción.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Actualiza!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Actualizado con Éxito.",
                    text: `Tu Método de pago con id: (${ID_Metodo_Pago_PK}) y Nombre: (${Nombre_Metodo}), ha sido actualizado.`,
                    icon: "success"
                });
                axios.put(`http://localhost:3001/metodopagoActualizar/${ID_Metodo_Pago_PK}`, nuevoEditarMetodoPago) // Utiliza ID_Metodo_Pago_PK en la URL
                    .then(() => {
                        console.log('Método de pago actualizado correctamente.');
                        obtenerMetodosPago(); // Actualizar lista de métodos de pago
                        limpiarCampos();
                    })
                    .catch((error) => {
                        console.error('Error al actualizar el método de pago:', error);
                        Swal.fire({
                            icon: 'error',
                            title: 'Error al actualizar el método de pago',
                            text: 'Por favor, intenta de nuevo más tarde',
                            showConfirmButton: false,
                            timer: 1500
                        });
                    });
            }
        });
    };



    // ELIMINAR PEDIDO: ----->
    // Función para eliminar el pedido
    const eliminarMetodoPago = (idMetodoPago) => {
        Swal.fire({
            title: '¿Está seguro de eliminar este método de pago?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:3001/metodopagoEliminar/${idMetodoPago}`)
                    .then(() => {
                        console.log('Pedido eliminado correctamente');
                        obtenerMetodosPago(); // Actualizar lista de pedidos
                        Swal.fire(
                            'Eliminado',
                            'El método de pago ha sido eliminado correctamente',
                            'success'
                        );
                    })
                    .catch((error) => {
                        console.error('Error al eliminar el método de pago:', error);
                        Swal.fire(
                            'Error',
                            'No se pudo eliminar el método de pago',
                            'error'
                        );
                    });
            }
        });
    };

    const handleActualizarCard = () => {
        setIsUpdatingCard(true);
    };

    // Función para deshabilitar el botón de actualizar y habilitar el de agregar
    const handleCancelarActualizar = () => {
        setIsUpdatingCard(false);
    };


    // Funciones Visuales.
    //---> Función para obtener la clase correspondiente al estado
    const obtenerClaseEstado = (ID_Estado_FK) => {
        const estadoClases = ['estMD_Inactivo', 'estMD_Activo', 'estMD_Diferente', 'estMD_None'];
        return estadoClases[ID_Estado_FK] || estadoClases[0];
    };

    //---> Función para obtener la imagen correspondiente al método de pago
    const obtenerImagenMetodoPago = (ID_Metodo_Pago_PK) => {
        const imagenesCards = [noneImagen, efectivoImagen, nequiImagen, daviplataImagen, tarjetaImagen];
        return imagenesCards[ID_Metodo_Pago_PK] || noneImagen;
    };

    //---> Función para obtener la clase y la imagen correspondientes según el estado y el método de pago
    const obtenerClaseEImagen = (ID_Estado_FK, ID_Metodo_Pago_PK) => {
        return {
            claseEstado: obtenerClaseEstado(ID_Estado_FK),
            imagenMetodoPago: obtenerImagenMetodoPago(ID_Metodo_Pago_PK)
        };
    };
    //Hover card:
    const [hoverStates, setHoverStates] = useState({});

    const handleHover = (ID_Metodo_Pago_PK, isHovered) => {
        setHoverStates(prevState => ({
            ...prevState,
            [ID_Metodo_Pago_PK]: isHovered
        }));
    };


    return (
        <div className='metodo_pago'>
            <TituloyDesc titulo={titulo} descripcion={descipcion} />
            <div>
                <div className="busqueda__prod">
                    <div className='buscar_productos'>
                        <div className='right__b'>
                            <div className="buscar">
                                <i className="bi bi-search buscar_i"></i>
                                <div className='sep_vertical_b'></div>
                                <input
                                    type="text"
                                    placeholder='Buscar ID Método de pago'
                                    id='buscarMetodoPago'
                                />
                                <button className='btn_buscar' onClick={handleBuscarMetodoPago}>Buscar</button>
                            </div>
                        </div>
                        <div className='left__b'>
                            <div className='sep_vertical_b--outS'></div>
                            <button className="btn_f cancelar" onClick={limpiarCampos}>Limpiar</button>
                        </div>
                    </div>
                </div>
                <div className="container-principal_MetodoPago">
                    <div className="container-inputs-metodo_pago">
                        <div className="cabecera-metodopago">
                            <h3 className='title-metodopago'>Formulario Método de Pago</h3>
                        </div>
                        <div className="subContainer-metodopago">
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="Nombre_Metodo">Id del Metodo Pago:</label>
                                <input className='input-Metod_pago' type="text" name="ID_Metodo_Pago_PK" id="ID_Metodo_Pago_PK"
                                    placeholder='ID Metodo Pago' readOnly disabled
                                    value={agregarMetodoPago.ID_Metodo_Pago_PK} onChange={handleInputChange} />
                            </div>
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="Nombre_Metodo">Nombre Método de Pago:</label>
                                <input className='input-Metod_pago' type="text" name="Nombre_Metodo" id="Nombre_Metodo"
                                    placeholder='Escriba el Nombre del Método de Pago'
                                    value={agregarMetodoPago.Nombre_Metodo} onChange={handleInputChange} />
                            </div>
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="tipo_MetodPago">Tipo de Método de Pago:</label>
                                <div className="dropdown">
                                    <div className="selected" onClick={() => setDropdownOpenTipo(prev => !prev)}>
                                        <span id="tipo_MetodPago">{selectedOptionTipo || editarMetodoPago.Tipo_Metodo_Pago}</span>
                                        <div className={`caret ${dropdownOpenTipo ? 'caret-rotate' : ''}`}></div>
                                    </div>
                                    {dropdownOpenTipo && (
                                        <ul className="menu_dropdown">
                                            {optionsTipo.map((option, index) => (
                                                <li key={index} onClick={() => handleOptionSelectTipo(option)}>{option}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="Referencia">Referencia del Método de Pago:</label>
                                <input className='input-Metod_pago' type="text" name="Referencia" id="Referencia" placeholder='Escriba la Referencia del Método de Pago'
                                    value={agregarMetodoPago.Referencia} onChange={handleInputChange} />
                            </div>
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="estado_MetodPago">Estado del Método de Pago:</label>
                                <div className="dropdown" style={{ 'marginBottom': '80px' }}>
                                    <div className="selected" onClick={() => setDropdownOpenEstado(prev => !prev)}>
                                        <span>{selectedOptionEstado}</span>
                                        <div className={`caret ${dropdownOpenEstado ? 'caret-rotate' : ''}`}></div>
                                    </div>
                                    {dropdownOpenEstado && (
                                        <ul className="menu_dropdown">
                                            {optionsEstado.map((option, index) => (
                                                <li key={index} onClick={() => handleOptionSelectEstado(option)}>{option}</li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                            <div className='buttonsContainer'>
                                <div className="separador-metod_pago"></div>
                                <div className="opciones_metodo_pago">
                                    <button className="btn_f abrir desactivarMetodoPago" id='agregarInputsMP' onClick={agregarNuevoMetodoPago} disabled={!isAdding}>Agregar</button>
                                    <button className="btn_f limpiar desactivarMetodoPago" id='actualizarInputsMP' onClick={actualizarMetodoPago} disabled={!isUpdating}>Actualizar</button>
                                    <div className='sep_vertical_b--outS'></div>
                                    <button className="btn_f cancelar" onClick={cancelarAccionMetodPago}>Cancelar</button>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="container-lista-metodo_pago">
                        <div className="cabecera-metodopago">
                            <h3 className='title-metodopago'>Métodos de Pago</h3>
                        </div>
                        <div className="subContainer-metodopagoCards">
                            {metodosPago.map(metodo => (
                                <div className='container_card-metodopago' key={metodo.ID_Metodo_Pago_PK}
                                    onMouseEnter={() => handleHover(metodo.ID_Metodo_Pago_PK, true)}
                                    onMouseLeave={() => handleHover(metodo.ID_Metodo_Pago_PK, false)}>
                                    <div className={`card_Contenido-Hover ${hoverStates[metodo.ID_Metodo_Pago_PK] ? 'show-card_hover' : ''}`}>
                                        <div className="card-hover-subcontent">
                                            <div className="opciones_btn-Hover">
                                                <span className='title-hover-card'>Opciones para Metodo de pago</span>
                                                <div className="separador-metod_pago--Card" style={{ marginBootom: '10px', }}></div>
                                            </div>
                                            <div className="card_Hover-Options">
                                                <button className="btn_f abrir" id='carActualizarBtnMP' onClick={() => editarMetodoPagoHandler(metodo)}>Actualizar</button>
                                                <div className='sep_vertical_b--outS'></div>
                                                <button className="btn_f cancelar" onClick={() => eliminarMetodoPago(metodo.ID_Metodo_Pago_PK)}>Eliminar</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card--_Main">
                                        <div className="img_container_metodopago">
                                            <div className='img_y_etiqueta--metodo_pago'>
                                                <div className={`contenedor-img_metodpago ${imgClases[metodo.ID_Metodo_Pago_PK]}`} key={metodo.ID_Metodo_Pago_PK}>
                                                    <img className='img--metodpago' src={obtenerImagenMetodoPago(metodo.ID_Metodo_Pago_PK)} alt="Método de pago" />
                                                </div>
                                                <div className="etiqueta-estado_medotopago">
                                                    <span className={`etiqueta-MP ${obtenerClaseEstado(metodo.ID_Estado_FK)}`} id='estadoMetodoPago'>
                                                        {estadoNombres[metodo.ID_Estado_FK]}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="descripcion-metodo_pago">
                                            <div className="contenedor--IDcard">
                                                <div className="idMetodoPago_S">
                                                    <span id='idMetodoPago'>{metodo.ID_Metodo_Pago_PK}</span>
                                                </div>
                                            </div>
                                            <div className="desc--metodopago">
                                                <span className='desc_MP--Tittle'>Método de pago: </span>
                                                <span className='desc_MP--Result' id='nomMetodoPago'>{metodo.Nombre_Metodo}</span>
                                                <div className="separador-metod_pago--Card"></div>
                                            </div>
                                            <div className="desc--metodopago">
                                                <span className='desc_MP--Tittle'>Tipo de Método de pago: </span>
                                                <span className='desc_MP--Result' id='tipoMetodoPago'>{metodo.Tipo_Metodo_Pago}</span>
                                                <div className="separador-metod_pago--Card"></div>
                                            </div>
                                            <div className="desc--metodopago">
                                                <span className='desc_MP--Tittle'>Referencia Método de pago: </span>
                                                <span className='desc_MP--Result' id='referenciaMetodoPago'>{metodo.Referencia}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main_Metodo_Pago
