import React, { useState, useEffect } from 'react';
import TituloyDesc from '../../../components/Titles/TituloyDesc'
import '../mod_ventas.css';
import './mod_ventas_metodo_pago.css';

// imagenes
import pruebaImagen from "../../../assets/Ventas/Metodo_Pago/otro-1000x1000.png";
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
    const estadoNombres = ['Activo', 'Inactivo', 'otro']

    // DropdawnMenu Tipo de Método de Pago:
    const [dropdownOpenTipo, setDropdownOpenTipo] = useState(false);
    const [selectedOptionTipo, setSelectedOptionTipo] = useState('Tipo Metodo pago');
    const optionsTipo = ['Físico', 'Electrónico'];

    const handleOptionSelectTipo = (option) => {
        setSelectedOptionTipo(option);
        setDropdownOpenTipo(false); //---> Cerrar el menú
    };

    // DropdawnMenu Estado del Método de Pago:
    const [dropdownOpenEstado, setDropdownOpenEstado] = useState(false);
    const [selectedOptionEstado, setSelectedOptionEstado] = useState('Estado');
    const optionsEstado = ['Activo', 'Inactivo'];

    const handleOptionSelectEstado = (option) => {
        setSelectedOptionEstado(option);
        setDropdownOpenEstado(false); //---> Cerrar el menú
    };

    // ----------: Funciones de backend :------->
    // UseState de mi fromulario agregar
    const [aregarMetodoPago, setAregarMetodoPago] = useState({
        ID_Metodo_Pago_PK: '',
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

    const editarMetodoPagoHandler = (metodopago) => {
        setEditarMetodoPago = ({
            ID_Metodo_Pago_PK: metodopago.ID_Metodo_Pago_PK,
            Nombre_Metodo: metodopago.Nombre_Metodo,
            Tipo_Metodo_Pago: metodopago.Tipo_Metodo_Pago,
            Referencia: metodopago.Referencia,
            ID_Estado_FK: metodopago.ID_Estado_FK
        })
    }
    const limpiarCampos = () => {
        setAregarMetodoPago({
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



    /* CONSULTAS Y METODOS PARA EL BACKEDN */
    const [metodosPago, setMetodosPago] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:3005/metodopagos')
            .then(response => {
                setMetodosPago(response.data);
            })
            .catch(error => {
                console.error('Error al obtener métodos de pago:', error);
            });
    }, []);

    
  // BUSCAR PEDIDOS:
  const buscarPedidoNombre = (idPedido) => {
    if (idPedido) {
      axios.get(`http://localhost:3005/pedido/${idPedido}`)
        .then((response) => {
          console.log(`se esta buscando: ${idPedido}`);
          console.log(`Se encontro: `, response.data);
        })
        .catch((error) => {
          console.error('Error al buscar el pedido:', error);
        });
    } else {
    }
  };



    //---> Función para obtener la clase correspondiente al estado
    const obtenerClaseEstado = (ID_Estado_FK) => {
        const estadoClases = [ 'estMD_Activo', 'estMD_Inactivo', 'estMD_Diferente','estMD_None'];
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
                                <button className='btn_buscar'>Buscar</button>
                            </div>
                        </div>
                        <div className='left__b'>
                            <div className='sep_vertical_b--outS'></div>
                            <button className="btn_f cancelar">Limpiar</button>
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
                                <label className='label-Metod_Pago' htmlFor="nom_MetodPago">Nombre Método de Pago:</label>
                                <input className='input-Metod_pago' type="text" name="nombre-MetPago" id="nom_MetodPago" placeholder='Escriba el Nombre del Método de Pago' />
                            </div>
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="tipo_MetodPago">Tipo de Método de Pago:</label>
                                <div className="dropdown">
                                    <div className="selected" onClick={() => setDropdownOpenTipo(prev => !prev)}>
                                        <span id="tipo_MetodPago">{selectedOptionTipo}</span>
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
                                <label className='label-Metod_Pago' htmlFor="tipo_MetodPago">Referencia del Método de Pago:</label>
                                <input className='input-Metod_pago' type="text" name="tipo-MetPago" id="tipo_MetodPago" placeholder='Escriba la Referencia del Método de Pago' />
                            </div>
                            <div className="input-grup_metodpago">
                                <label className='label-Metod_Pago' htmlFor="estado_MetodPago">Estado del Método de Pago:</label>
                                <div className="dropdown" style={{ 'margin-bottom': '80px' }}>
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
                            <div >
                                <div className="separador-metod_pago"></div>
                                <div className="opciones_metodo_pago">
                                    <button className="btn_f abrir">Agregar</button>
                                    <button className="btn_f limpiar">Actualizar</button>
                                    <div className='sep_vertical_b--outS'></div>
                                    <button className="btn_f cancelar">Cancelar</button>
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
                                <div className='container_card-metodopago'>
                                    <div className="img_container_metodopago">
                                        <div className='img_y_etiqueta--metodo_pago'>
                                            <div className={`contenedor-img_metodpago ${imgClases[metodo.ID_Metodo_Pago_PK]}`}key={metodo.ID_Metodo_Pago_PK}>
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
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Main_Metodo_Pago
