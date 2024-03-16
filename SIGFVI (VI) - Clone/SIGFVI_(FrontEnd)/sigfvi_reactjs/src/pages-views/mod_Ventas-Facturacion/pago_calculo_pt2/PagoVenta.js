import TituloyDescPagoVenta from '../../../components/Titles/TituloyDesc';
import './PagoVenta.css'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useLocation } from 'react-router-dom';

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
        setSelectedMethodId(selectedMethodId === metodo.ID ? null : metodo.ID);
        setSelectedMethodName(metodo.Nombre_Metodo);
        console.log('Metodo de pago seleccionado: ', metodo);
        setMetodoPagoSeleccionado(true);
    };


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
                    <div className="asignarComprobantePago" style={{ marginTop: '20px' }}>
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
                    <button className="btn_pagoVenta ValidarPagoVenta">
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
