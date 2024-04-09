import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const Sumar_deudor = ({ closeModal, datos }) => {

    const saldo = parseInt(datos.saldo);
    const [adicional, setAdicional] = useState(0);

    useEffect(() => {
        consulta();
    }, []);

    const consulta = () => {
        axios.get("http://localhost:3001/usuario/consdeudor")
            .then((response) => {
                datos.consulta(response.data);
            });
    }

    const sumarSaldo = async (id) => {
        let adicion = saldo + adicional;
        try {
            const response = await axios.put(`http://localhost:3001/usuario/updatesaldo/${id}`, {
                saldo: adicion
            })
            console.log(response);
            consulta(); 
        } catch (error) {
            console.error('no se pudo sumar ', error);
        }
    }

    function Verificar_suma() {
        const Insuma = document.getElementById('suma').value;

        let con = true;
        let validacionlt = /^[A-Za-z]+$/;

        if (Insuma.trim() === '') {
            document.getElementById('wrong').innerHTML = 'Digite un valor para añadir a la cuenta';
            con = false;
        } else if (validacionlt.test(Insuma)) {
            document.getElementById('wrong').innerHTML = 'Digite solo numeros';
        } else {
            document.getElementById('wrong').innerHTML = '';
        }

        return con;
    }

    function suma() {
        let con = true;

        if (!Verificar_suma()) {
            con = false
        }

        if (con) {
            Swal.fire({
                icon: 'success',
                text: 'Adición exitosa'
            }).then(function () {
                sumarSaldo(datos.id);
                closeModal();
            })
            return true;

        } else {
            Swal.fire({
                icon: 'warning',
                title: 'Rellene los campos del formulario para continuar',
                toast: true
            })
            return false;
        }
    }

    return (
        <div className='register-container'>
            <div className='fondo-register'>
                <div>
                    <p onClick={closeModal} >X</p>
                </div>
                <div className="container__Main-register">
                    <h1 className='main-title'>Añadir monto</h1>
                    <form action="" className="">
                        <span>
                            <h2>Monto actual</h2>
                            <input type="text" name="monto" id="monto" value={saldo} readOnly />
                            <br />
                            <label htmlFor="suma">Sumar</label><br />
                            <input type="number" name="suma" id="suma" placeholder="Añadir" onChange={(e) => { setAdicional(parseInt(e.target.value)) }} onBlur={Verificar_suma} />
                            <p id="wrong"></p>
                        </span>
                        <span>
                            <button type="button" name="submit" id="submit" className="boton b5" onClick={suma}>Añadir</button>
                        </span>
                        <span>
                            <a href="./Deudores"><button type="button" className="boton b2">Regresar</button></a>
                        </span>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Sumar_deudor;
