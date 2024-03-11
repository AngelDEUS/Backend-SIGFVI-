import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterProveedor = ({ isOpen, closeModal, reConsulta }) => {

  const agregarRegistro = () => {
    axios.post('http://localhost:3005/crear', {
      ID_Registro_Proveedor_PK : idProveedor,
      Nombre_Empresa: nombreEmpresa,
      Dia_Visita: diaVisita,
      Telefono_Contacto: telefonoContacto,
    });
  };
  const [idProveedor, setidProveedor] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [diaVisita, setDiaVisita] = useState('');
  const [telefonoContacto, setTelefonoContacto] = useState('');

  if (!isOpen) return null;

  function verificarNombreEmpresa() {
    const inputNombreEmpresa = document.getElementById('nombreEmpresa').value;
    let isValid = true;

    if (inputNombreEmpresa.trim() === '') {
      document.getElementById('wrongNombreEmpresa').textContent = 'Este espacio no puede quedar en blanco';
      isValid = false;
    } else {
      document.getElementById('wrongNombreEmpresa').innerHTML = '';
    }

    return isValid;
  }

  function verificarDiaVisita() {
    const inputDiaVisita = document.getElementById('diaVisita').value;
    let isValid = true;

    if (inputDiaVisita.trim() === '') {
      document.getElementById('wrongDiaVisita').textContent = 'Este espacio no puede quedar en blanco';
      isValid = false;
    } else {
      document.getElementById('wrongDiaVisita').innerHTML = '';
    }

    return isValid;
  }

  function verificarTelefonoContacto() {
    const inputTelefonoContacto = document.getElementById('telefonoContacto').value;
    let isValid = true;

    if (inputTelefonoContacto.trim() === '') {
      document.getElementById('wrongTelefonoContacto').textContent = 'Este espacio no puede quedar en blanco';
      isValid = false;
    } else {
      document.getElementById('wrongTelefonoContacto').innerHTML = '';
    }

    return isValid;
  }

  function verificarRegistro() {
    let isValid = true;

    if (!verificarNombreEmpresa()) {
      isValid = false;
    }
    if (!verificarDiaVisita()) {
      isValid = false;
    }
    if (!verificarTelefonoContacto()) {
      isValid = false;
    }

    if (isValid) {
      Swal.fire({
        icon: 'success',
        text: `Registro completado para: ${nombreEmpresa}`,
      }).then(function () {
        agregarRegistro();
        reConsulta();
        closeModal();
      });
      return true;
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Rellene los campos del formulario para continuar',
        toast: true,
      });
      return false;
    }
  }

  return (
    <div className="register-container">
      <div className="fondo-register">
        <div>
          <p onClick={closeModal}>X</p>
        </div>
        <div className="container__Main-register">
          <h1 className="main-title">Registrar Proveedor</h1>
          <form action="" className="datos-contenido">
            <span>
              <label htmlFor="idProveedor">Id Proveedor</label>
              <input
                className="input-form"
                type="text"
                name="idProveedor"
                id="idProveedor"
                placeholder="idProveedor"
                onChange={(e) => setidProveedor(e.target.value)}
              />
              <p id="wrongNombreEmpresa"></p>
            </span>
            <span>
              <label htmlFor="nombreEmpresa">Nombre de la Empresa</label>
              <input
                className="input-form"
                type="text"
                name="nombreEmpresa"
                id="nombreEmpresa"
                placeholder="Nombre de la Empresa"
                onBlur={verificarNombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
              />
              <p id="wrongNombreEmpresa"></p>
            </span>
            <span>
              <label htmlFor="diaVisita">Día de Visita</label>
              <input
                className="input-form"
                type="text"
                name="diaVisita"
                id="diaVisita"
                placeholder="Día de Visita"
                onBlur={verificarDiaVisita}
                onChange={(e) => setDiaVisita(e.target.value)}
              />
              <p id="wrongDiaVisita"></p>
            </span>
            <span>
              <label htmlFor="telefonoContacto">Teléfono de Contacto</label>
              <input
                className="input-form"
                type="text"
                name="telefonoContacto"
                id="telefonoContacto"
                placeholder="Teléfono de Contacto"
                onBlur={verificarTelefonoContacto}
                onChange={(e) => setTelefonoContacto(e.target.value)}
              />
              <p id="wrongTelefonoContacto"></p>
            </span>
            <span>
              <br />
              <button
                type="button"
                name="submit"
                id="submit"
                className="boton b4"
                onClick={verificarRegistro}
              >
                Registrar
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterProveedor;
