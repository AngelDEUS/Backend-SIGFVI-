import React from 'react'
import TituloyDescPagoVenta from '../../../components/Titles/TituloyDesc';
import './PagoVenta.css'

/* Modal Para pagar Venta, escoger metodo de pago y proceder a facturacion. */
const PagoVenta = () => {
    const descipcionPagoVenta = 'En este panel puede realizar la busqueda de todos los productos, tanto las busquedas por nombre o por ID de producto.';
    const tituloPagoVenta = 'Validar Pago';

    return (
        <div className='PagoVentaContainer'>
            <div className="header-PagoVentas">
                <div>
                    <TituloyDescPagoVenta titulo={tituloPagoVenta} descripcion={descipcionPagoVenta} />
                </div>
            </div>
            <div className="cuerpoPagoVenta">
                <div className="leftPagoOptions--PagoVentas">
                    <div className="calculoPorEfectivo casiselect" id='sleccionarOPPagar'>
                        <span className='totalVentaAPagar' id='total--pagar'>$6.720</span>
                        <span className='subtitulo--VentaApagar'>Por favor seleccione un método de pago.</span>
                    </div>
                    <div className="calculoPorEfectivo" id='sleccionarOPPagar'>
                        <span className='totalVentaAPagar' id='total--pagar'>$6.720</span>
                        <span className='subtitulo--VentaApagar'>Por favor seleccione un método de pago.</span>
                    </div>
                </div>
                <div className="rightPagoOptions--PagoVentas">
                    <div className="tituloPagoVenta">
                        <span>Escoger Metodo de Pago</span>
                        <i class="bi bi-caret-down-fill"></i>
                    </div>
                    <div className="listaMetodoPago--Cards">

                    </div>
                </div>
            </div>
            <div className="footer-Options--PagoVentas">
                <div className="dividerPagoVenta"></div>
                <div className="btns--PagoVenta">
                    <button className="btn_pagoVenta cancelarPagoVenta">
                        <i class="bi bi-chevron-double-left"></i>
                        <i class="bi bi-chevron-double-left"></i>
                        Volver
                    </button>
                    <button className="btn_pagoVenta ValidarPagoVenta">
                        Registrar Venta
                        <i class="bi bi-chevron-double-right"></i>
                        <i class="bi bi-chevron-double-right"></i>
                    </button>
                </div>

            </div>
        </div>
    )
}

export default PagoVenta;
