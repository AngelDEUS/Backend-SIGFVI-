import React from 'react'

import './mod_ventas_metodo_pago.css';

const plantillaCard = () => {
    
    // CARD: --->
    const extraClass = '';
    const imagenesCard = '';
    const estadoNombre = '';
    const idMetodoPago = '';
    const nomMetodoPago = '';
    const tipoMetodoPago = '';
    const referenciaMetodoPago = '';
    const plantillaCard = `
    <div class="container_card-metodopago">
        <div class="img_container_metodopago">
            <div class='img_y_etiqueta--metodo_pago'>
                <div class="${extraClass ? 'contenedor-img_metodpago ' + extraClass : 'contenedor-img_metodpago'}">
                    <img class='img--metodpago' src="${imagenesCard}" alt="Daviplata" />
                </div>
                <div class="etiqueta-estado_medotopago">
                    <span class='etiqueta-MP estMD_None' id='estadoMetodoPago'>${estadoNombre}</span>
                </div>
            </div>
        </div>
        <div class="descripcion-metodo_pago">
            <div class="contenedor--IDcard">
                <div class="idMetodoPago_S">
                    <span id='idMetodoPago'>${idMetodoPago}</span>
                </div>
            </div>
            <div class="desc--metodopago">
                <span class='desc_MP--Tittle'>Método de pago: </span>
                <span class='desc_MP--Result' id='nomMetodoPago'>${nomMetodoPago}</span>
                <div class="separador-metod_pago--Card"></div>
            </div>
            <div class="desc--metodopago">
                <span class='desc_MP--Tittle'>Tipo de Método de pago: </span>
                <span class='desc_MP--Result' id='tipoMetodoPago'>${tipoMetodoPago}</span>
                <div class="separador-metod_pago--Card"></div>
            </div>
            <div class="desc--metodopago">
                <span class='desc_MP--Tittle'>Referencia Método de pago: </span>
                <span class='desc_MP--Result' id='referenciaMetodoPago'>${referenciaMetodoPago}</span>
            </div>
        </div>
    </div>
`;
    return (
        <div className="container_card-metodopago">
            <div className="img_container_metodopago">
                <div className='img_y_etiqueta--metodo_pago'>
                    <div className={'contenedor-img_metodpago' && { extraClass }}>
                        <img className='img--metodpago' src={imagenesCards} alt="Daviplata" />
                    </div>
                    <div className="etiqueta-estado_medotopago">
                        <span className='etiqueta-MP estMD_None' id='estadoMetodoPago'>{estadoNombre}</span>
                    </div>
                </div>
            </div>
            <div className="descripcion-metodo_pago">
                <div className="contenedor--IDcard">
                    <div className="idMetodoPago_S">
                        <span id='idMetodoPago'>{idMetodoPago}</span>
                    </div>
                </div>
                <div className="desc--metodopago">
                    <span className='desc_MP--Tittle'>Método de pago: </span>
                    <span className='desc_MP--Result' id='nomMetodoPago'>{nomMetodoPago}</span>
                    <div className="separador-metod_pago--Card"></div>
                </div>
                <div className="desc--metodopago">
                    <span className='desc_MP--Tittle'>Tipo de Método de pago: </span>
                    <span className='desc_MP--Result' id='tipoMetodoPago'>{tipoMetodoPago}</span>
                    <div className="separador-metod_pago--Card"></div>
                </div>
                <div className="desc--metodopago">
                    <span className='desc_MP--Tittle'>Referencia Método de pago: </span>
                    <span className='desc_MP--Result' id='referenciaMetodoPago'>{referenciaMetodoPago}</span>
                </div>
            </div>
        </div>
    )
}

export default plantillaCard
