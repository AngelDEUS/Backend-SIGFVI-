import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const EditProveedor = ({ closeModal, datos }) => {
  console.log('ID del Proveedor:', datos.id);

  const [nombreEmpresa, setNombreEmpresa] = useState(datos.name);
  const [diaVisita, setDiaVisita] = useState(datos.frecuency);
  const [telefonoContacto, setTelefonoContacto] = useState(datos.cel);

  const editarProveedor = async (idProveedor) => {
    try {
      const response = await axios.put(`http://localhost:3005/actualizar/${idProveedor}`, {
        Nombre_Empresa: nombreEmpresa,
        Dia_Visita: diaVisita,
        Telefono_Contacto: telefonoContacto,
      });
      console.log(response.data);
    } catch (error) {
      console.error('No se pudo realizar la petición PUT:', error);
    }
  };
  const consulta=(function (){
    datos.consulta();});

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
        text: `Datos actualizados para: ${nombreEmpresa}`,
      }).then(function () {
        editarProveedor(datos.id);
        consulta();
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
          <h1 className="main-title">Editar Proveedor</h1>
          <form action="" className="datos-contenido">
          <span>
              <label htmlFor="idProveedor">Id Proveedor</label>
              <input
                className="input-form"
                type="text"
                name="idProveedor"
                id="idProveedor"
                value={datos.id}
                readOnly  
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
                value={nombreEmpresa}
                onChange={(e) => setNombreEmpresa(e.target.value)}
                onBlur={verificarNombreEmpresa}
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
                value={diaVisita}
                onChange={(e) => setDiaVisita(e.target.value)}
                onBlur={verificarDiaVisita}
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
                value={telefonoContacto}
                onChange={(e) => setTelefonoContacto(e.target.value)}
                onBlur={verificarTelefonoContacto}
              />
              <p id="wrongTelefonoContacto"></p>
            </span>
            <span>
              <br />
              <button type="button" name="submit" id="submit" className="boton b4" onClick={verificarRegistro}>
                Guardar Cambios
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProveedor;
