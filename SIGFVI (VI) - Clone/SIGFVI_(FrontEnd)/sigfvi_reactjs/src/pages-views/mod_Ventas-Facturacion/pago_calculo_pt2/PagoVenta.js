import TituloyDescPagoVenta from '../../../components/Titles/TituloyDesc';
import './PagoVenta.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';


/* Modal Para pagar Venta, escoger metodo de pago y proceder a facturacion. */
const PagoVenta = () => {
    const descipcionPagoVenta = 'En este panel puede realizar la validación del pago de la venta, puede ingresar la entrada del dinero suministrado por el cliente, para posteriormente calcular el cambio de dinero que se tiene que devolver al cliente.';
    const tituloPagoVenta = 'Validar Pago';

    const [metodosPago, setMetodosPago] = useState([]);
    const [selectedMethodId, setSelectedMethodId] = useState(null);
    const [entrada, setEntrada] = useState(0);
    const [cambio, setCambio] = useState(0);

    const [metodoPagoSeleccionado, setMetodoPagoSeleccionado] = useState(false);
    const [selectedMethodName, setSelectedMethodName] = useState('');
    let ultimo_id_venta;

    const navigate = useNavigate();


    useEffect(() => {
        const fetchMetodosPago = async () => {
            try {
                const response = await axios.get('http://localhost:3001/pagoventa/metodospagoactivo');
                setMetodosPago(response.data.metodos_pago_activos);
            } catch (error) {
                console.error('Error al obtener los métodos de pago activos:', error);
            }
        };

        fetchMetodosPago();
        ultimo_id_venta = consultarUltimoIDVenta();
    }, []);

    const location = useLocation();
    const detalleVenta = location.state ? location.state.detalleVenta : null;

    useEffect(() => {
        // console.log('Detalle de la venta:', detalleVenta);
    }, [detalleVenta]);

    if (!detalleVenta) {
        return <div className='containerNoData--PagoVenta'>
            <div className="subcontainerNoData--PagoVenta">

                <span className='mensajeNo--pagoVenta'> No se ha proporcionado
                    <Link to='/VentasFacturacion/ventas_main'>
                        <span className='underNoData--PagoVenta'>detalle de la venta</span>
                    </Link>
                    <span className='puntitoNoData'>.</span></span>
            </div>
        </div >;
    }

    // console.log('Esto tiene mi detalleventa (estoy en PagoVenta): ', detalleVenta);

    const handleMetodoPagoClick = (metodo) => {
        setSelectedMethodId(selectedMethodId === metodo.ID_Metodo_Pago_PK ? null : metodo.ID_Metodo_Pago_PK);
        setSelectedMethodName(selectedMethodId === metodo.ID_Metodo_Pago_PK ? '' : metodo.Nombre_Metodo);
        console.log('Metodo de pago seleccionado (Nombre_Metodo): ', metodo.Nombre_Metodo);
        console.log('Metodo de pago seleccionado (ID): ', metodo.ID_Metodo_Pago_PK);
        setMetodoPagoSeleccionado(selectedMethodId === metodo.ID_Metodo_Pago_PK ? false : true);
    };


    // ---> Formateo de numeros a formato espa;ol Colombia.
    const formatNumber = (number) => {
        return number.toLocaleString('es-CO');
    };


    const calcularCambio = () => {
        const entradaNumber = parseFloat(entrada);
        if (isNaN(entradaNumber) || entrada.trim() === '') {
            document.getElementById('mensajePV').innerText = "No se pueden ingresar valores no numéricos o estar vacío.";
            setCambio(0);
            return;
        } else if (entradaNumber < 0) {
            document.getElementById('mensajePV').innerText = "No se pueden ingresar valores negativos.";
            setCambio(0);
            return;
        } else {
            const total = detalleVenta && detalleVenta.totalFactura ? detalleVenta.totalFactura : 0;
            const cambioCalculado = entradaNumber - total;
            setCambio(formatNumber(cambioCalculado));
            document.getElementById('mensajePV').innerText = "";
            return;
        }
    };

    const handleRegistrarVenta = () => {
        // if (!selectedMethodId) {
        //     Swal.fire('Error', 'Por favor selecciona un método de pago.', 'error');
        //     return;
        // }

        Swal.fire({
            title: '¿Estás seguro?',
            text: '¿Quieres registrar la venta?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí',
            cancelButtonText: 'No',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Registrando venta...',
                    text: 'Por favor espera un momento.',
                    icon: 'info',
                    showConfirmButton: false,
                    timer: 2000, // Tiempo en milisegundos (en este caso, 2 segundos)
                });

                // Aquí llamas a tu función para registrar la venta
                registrarVenta();
            }
        });
    };


    console.log('Esto tiene el detalle: ', detalleVenta);

    // console.log(`Mensaje con la venta: 
    //         ID_Metodo_Pago_FK: ${selectedMethodId},
    //         IVA: ${detalleVenta.IVA},
    //         SubTotal_Venta: ${detalleVenta.subtotal},
    //         Total_Pedido: ${detalleVenta.total},
    //         ID_Saldo_PK: ${null},
    //         ID_Estado_FK: ${1},`);

    const consultarUltimoIDVenta = async () => {
        try {
            const response = await axios.get('http://localhost:3001/pagoventa/ultimoidventa');
            const { ultimo_id_venta } = response.data;
            console.log('Último ID de venta:', ultimo_id_venta);
            return ultimo_id_venta;
        } catch (error) {
            console.error('Error al consultar el último ID de venta:', error);
            return null;
        }
    };




    const { totalIVA, subtotalSinIVA, totalFactura, deudor } = detalleVenta;
    const { productosSeleccionados } = detalleVenta;

    if (productosSeleccionados && productosSeleccionados.length > 0) {
        productosSeleccionados.forEach((producto) => {
            console.log(`Producto seleccionado: 
                Cantidad: ${producto.cantidad},
                SubTotal_detalle: ${producto.Precio_Venta * producto.cantidad},
                ID_Inventario_FK: ${producto.ID_Producto_PK}`);
        });
    } else {
        console.log('No hay productos seleccionados.');
    }

    console.log('Último ID de venta:', ultimo_id_venta);

    const registrarVenta = async () => {
        try {
            // Registra la nueva venta
            const ventaResponse = await axios.post('http://localhost:3001/pagoventa/crearventa', {
                ID_Metodo_Pago_FK: selectedMethodId,
                IVA: totalIVA,
                SubTotal_Venta: subtotalSinIVA,
                Total_Pedido: totalFactura,
                ID_Saldo_PK: null,
                ID_Estado_FK: 1,
            });

            // Consulta el último ID de venta
            const ultimo_id_venta = await consultarUltimoIDVenta(); // Esperar aquí
            console.log('Último ID de venta:', ultimo_id_venta);

            // Asocia los detalles de venta con el ID de la nueva venta
            for (const producto of productosSeleccionados) {
                if (!producto.cantidad || isNaN(producto.cantidad)) {
                    console.error('Error: Cantidad de producto no válida:', producto.cantidad);
                    continue; // O maneja el error de otra manera según tu lógica
                }

                await axios.post('http://localhost:3001/pagoventa/creardetalleventa', {
                    ID_Venta_FK: ultimo_id_venta,
                    Cantidad_Producto: producto.cantidad,
                    SubTotal_detalle: producto.Precio_Venta * producto.cantidad,
                    ID_Inventario_FK: producto.Inventario_ID,
                });

                console.log(`Se inserta detalle de venta:
                    ID_Venta_FK: ${ultimo_id_venta},
                    Cantidad_Producto: ${producto.cantidad},
                    SubTotal_detalle: ${producto.Precio_Venta * producto.cantidad},
                    ID_Inventario_FK: ${producto.Inventario_ID}`);

                await axios.put(`http://localhost:3001/pagoventa/restarstockinventario/${producto.Inventario_ID}`, {
                    cantidad: producto.cantidad
                });
                console.log(`--> Se resto en el inventario con ID: [${producto.Inventario_ID}], La cantidad de: [${producto.cantidad}] en el "stock".`);
            }

            // Timer o delay para mostrar el mensaje de éxito!
            let timerInterval;
            Swal.fire({
                title: "Espera hasta que termine.",
                text: "Se está registrado la venta, esto puede tardar unos segundos.",
                html: "Esperando: <b></b> milliseconds.",
                timer: 1000,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                    const timer = Swal.getPopup().querySelector("b");
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
                willClose: () => {
                    clearInterval(timerInterval);
                }
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("Se cierra el timer y se registra con exito, cambia de ventana a Main Venta.");

                    // Mostrar mensaje de éxito después de 1 segundo
                    setTimeout(() => {
                        Swal.fire('¡Venta registrada!', 'La venta se ha registrado correctamente.', 'success');
                        console.log('Redirigiendo a Ventas Main...');
                        navigate('/VentasFacturacion/ventas_main');
                    }, 500);
                }
            });
        } catch (error) {
            // Mostrar mensaje de error
            Swal.fire('Error', 'No se pudo registrar la venta.', 'error');
        }
    };





    return (
        <div className='PagoVentaContainer'>
            <div className="header-PagoVentas">
                <div>
                    <TituloyDescPagoVenta titulo={tituloPagoVenta} descripcion={descipcionPagoVenta} />
                </div>
            </div>
            <div className="cuerpoPagoVenta">
                <div className="leftPagoOptions--PagoVentas">
                    <div className="headerLeftPagoOptions">
                        <div className={`calculoPorEfectivo ${metodoPagoSeleccionado ? 'quitarHeader--ClicMP' : ''}`} id='sleccionarOPPagar'>
                            <span className='totalVentaAPagar' id='total--pagar'>${formatNumber(detalleVenta ? detalleVenta.totalFactura : 0)}</span>
                            <span className='subtitulo--VentaApagar'>Por favor seleccione un método de pago.</span>
                        </div>
                        <div className={`calculoPorEfectivo--MPEfectivo ${metodoPagoSeleccionado ? '' : 'quitarHeader--ClicMP'}`} id='sleccionarOPPagar--MPEfectivo'>
                            <div className="tablaCancelarYCalcular">
                                <ul className='totalesYcalculo--Titulos'>
                                    <li className='inputTitulo'>Total</li>
                                    <div className="miniSeparador--MPEfectivo"></div>
                                    <li className='inputTitulo'>Entrada</li>
                                    <div className="miniSeparador--MPEfectivo"></div>
                                    <li className='inputTitulo'>Cambio</li>
                                    <div className="miniSeparador--MPEfectivo"></div>
                                    <li className='inputTitulo'>Método</li>
                                    <div className="miniSeparador--MPEfectivo"></div>
                                    <li className='inputTitulo'></li>
                                </ul>
                                <ul className='totalesYcalculo--Calcular'>
                                    <li className='inputMostrar--Calcular' id='totalSelected'>${detalleVenta ? detalleVenta.totalFactura : 0}</li>
                                    <div className="miniSeparador--MPEfectivo2"></div>
                                    <div className='inputMostrar--Calcular--entradaSelected'>
                                        <span className='pesosSignoLeft'>$</span>
                                        <input type="text" id='entradaSelected' onChange={(e) => setEntrada(e.target.value)} onKeyUp={calcularCambio} />
                                        {/* <input type="text" id='entradaSelected' value={entrada} onChange={(e) => {setEntrada(e.target.value);calcularCambio();}}/> */}
                                    </div>
                                    <div className="miniSeparador--MPEfectivo2"></div>
                                    <li className='inputMostrar--Calcular' id='CambioDSelected' style={{ overflow: 'hidden' }}>${cambio}</li>
                                    <div className="miniSeparador--MPEfectivo2"></div>
                                    <li className='inputMostrar--Calcular' id='metodoSelected'>{selectedMethodName}</li>
                                    <div className="miniSeparador--MPEfectivo2"></div>
                                    <li className='inputMostrar--Calcular' id='borrarSelected'>
                                        <div className='quitarENtrada'>
                                            <i className="bi bi-x-circle-fill"></i>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            <div className="mostrarResultado--MPEfectivo">
                                <span className="totalCalculado--MPEfectivo" id='cambioCalculado'>${cambio}</span>
                                <span className="mensajes de error--MPEfectivo" id='mensajePV' style={{ color: '#ffbf6e', fontStyle: 'italic' }}></span>
                            </div>
                        </div>
                    </div>
                    <div className="subOpciones--PagoVentas">
                        <div className="calculadoraOPciones" style={{ display: 'none' }}>
                            <div className="tituloPagoVenta">
                                <span style={{ marginRight: '5px' }}>Calculadora</span>
                                <i className="bi bi-caret-down-fill"></i>
                            </div>
                            <div className="calculadoraOPciones">
                                <div className='Calculadora_PagoVentas'>
                                    <div className='tableColumn--Calculadora'>
                                        <button className='cajabtn--Calculadora'>1</button>
                                        <button className='cajabtn--Calculadora'>2</button>
                                        <button className='cajabtn--Calculadora'>3</button>
                                        <button className='cajabtn--Calculadora'>+1mil</button>
                                    </div>
                                    <div className='tableColumn--Calculadora'>
                                        <button className='cajabtn--Calculadora'>4</button>
                                        <button className='cajabtn--Calculadora'>5</button>
                                        <button className='cajabtn--Calculadora'>6</button>
                                        <button className='cajabtn--Calculadora'>+2mil</button>
                                    </div>
                                    <div className='tableColumn--Calculadora'>
                                        <button className='cajabtn--Calculadora'>7</button>
                                        <button className='cajabtn--Calculadora'>8</button>
                                        <button className='cajabtn--Calculadora'>9</button>
                                        <button className='cajabtn--Calculadora'>+5mil</button>
                                    </div>
                                    <div className='tableColumn--Calculadora'>
                                        <button className='cajabtn--Calculadora'>+</button>
                                        <button className='cajabtn--Calculadora'>0</button>
                                        <button className='cajabtn--Calculadora'>-</button>
                                        <button className='cajabtn--Calculadora'><i className="bi bi-backspace"></i></button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="agregarymostarDeudor_Empleado">
                            <div className="deudorContenNN" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                                <div className="tituloPagoVenta">
                                    <span style={{ marginRight: '5px' }}>Escoger Deudor</span>
                                    <i className="bi bi-caret-down-fill"></i>
                                </div>
                                <div className="info-Pago__Deudor">
                                    <div className="iconoinfo--Pagar">
                                        <i className="bi bi-star-fill"></i>
                                    </div>
                                    <div className="datosPagar--Deudor">
                                        <span className='tittleNombre--Deudor_pago' id='nombre_DeudorVenta'><span className='spanStrong'>Nombre:</span> {detalleVenta.deudor.nombre}</span>
                                        <span className='tittleNombre--Deudor_pago' id='telefono_DeudorVenta'><span className='spanStrong'>Celular:</span> {detalleVenta.deudor.telefono}</span>
                                    </div>
                                </div>
                            </div>
                            <div style={{ display: 'none' }}>
                                <div className="tituloPagoVenta">
                                    <span style={{ marginRight: '5px' }}>Empleado Activo</span>
                                    <i className="bi bi-caret-down-fill"></i>
                                </div>
                                <div className="info-Pago__Deudor">
                                    <div className="iconoinfo--Pagar">
                                        <i className="bi bi-person-circle"></i>
                                    </div>
                                    <div className="datosPagar--Empleado">
                                        <span className='tittleNombre--Deudor_pago' id='id_EmpleadoVenta'>#ID Empleado</span>
                                        <span className='tittleNombre--Deudor_pago' id='nombre_EmpleadoVenta'>Nombre Empleado</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="dividerPagoventa--Vertical"></div>
                <div className="rightPagoOptions--PagoVentas">
                    <div className="listaMetodoPago--Cards">
                        <div className="tituloPagoVenta">
                            <span style={{ marginRight: '5px' }}>Escoger Metodo de Pago</span>
                            <i className="bi bi-caret-down-fill"></i>
                        </div>
                        {metodosPago.map((metodo) => (
                            <div key={metodo.ID} className={`containerSelectMetodoPago ${selectedMethodId === metodo.ID ? '--SelecteMP_Container' : ''}`} onClick={() => handleMetodoPagoClick(metodo)}>

                                <div className="bolita_imgProd--selected">
                                    <i className="bi bi-wallet-fill"></i>
                                </div>                                <div className="tittle_Prod--Selected">
                                    <div className="right-selected">
                                        <span className='CantidadProd--selected'>{metodo.Nombre_Metodo}</span>
                                    </div>
                                    <div className="left-selected">
                                        <button className='quitarProd--selected' id={`slectedMP_${metodo.ID}`}>
                                            <div className={`slectedMP_Venta ${metodoPagoSeleccionado ? '--SelectedMP' : ''}`}></div>
                                        </button>
                                    </div>
                                </div>
                                <div className="sub-tittle_Prod--Selected">
                                    <span className='sub-TitleProd--ID'>Referencia:</span>
                                    <span className='sub-TitleProd'>{metodo.Referencia}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="asignarComprobantePago" style={{ marginTop: '20px', display: 'none' }}>
                        <div className="tituloPagoVenta">
                            <span style={{ marginRight: '5px' }}>Comprobante de Pago</span>
                            <i className="bi bi-caret-down-fill"></i>
                        </div>
                        <div className="contentAsignarComprobante">
                            <div className="subirCapturaOcomprobante">
                                <div className="bolita_imgProd--Comprobante">
                                    <i className="bi bi-file-earmark-code-fill"></i>
                                </div>
                                <div className="textComprobantePago">
                                    <span className='tittleComprobantePago'>Nombre del Archivo:</span>
                                    <span className='sub-tittleComprobantePago'>Subir Archivo</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-Options--PagoVentas">
                <div className="dividerPagoVenta"></div>
                <div className="btns--PagoVenta">
                    <button className="btn_pagoVenta cancelarPagoVenta">
                        <i className="bi bi-chevron-double-left"></i>
                        <i className="bi bi-chevron-double-left"></i>
                        Volver
                    </button>
                    <button className="btn_pagoVenta ValidarPagoVenta" onClick={handleRegistrarVenta}>
                        Registrar Venta
                        <i className="bi bi-chevron-double-right"></i>
                        <i className="bi bi-chevron-double-right"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default PagoVenta;
