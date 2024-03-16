import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const RegisterProveedor = ({ isOpen, closeModal, reConsulta }) => {
  const [idProveedor, setidProveedor] = useState('');
  const [nombreEmpresa, setNombreEmpresa] = useState('');
  const [diaVisita, setDiaVisita] = useState('');
  const [telefonoContacto, setTelefonoContacto] = useState('');

  if (!isOpen) return null;

  const agregarRegistro = () => {
    axios.post('http://localhost:3001/usuario/proveedor', {
      ID_Registro_Proveedor_PK: idProveedor,
      Nombre_Empresa: nombreEmpresa,
      Dia_Visita: diaVisita,
      Telefono_Contacto: telefonoContacto,
    })
    .then(response => {
      if (response.status === 200) {
        Swal.fire({
          icon: 'success',
          text: `Registro completado para: ${nombreEmpresa}`,
        }).then(() => {
          reConsulta();
          closeModal();
        });
      } else {
        mostrarError('Error al registrar proveedor', response.data.error || 'Ha ocurrido un error inesperado.');
      }
    })
    .catch(error => {
      mostrarError('Error al registrar proveedor', 'Ha ocurrido un error inesperado.');
    });
  };

  const verificarNombreEmpresa = () => {
    const inputNombreEmpresa = nombreEmpresa.trim();
    if (!inputNombreEmpresa) {
      mostrarErrorCampo('wrongNombreEmpresa', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongNombreEmpresa');
    return true;
  };

  const verificarDiaVisita = () => {
    const inputDiaVisita = diaVisita.trim();
    if (!inputDiaVisita) {
      mostrarErrorCampo('wrongDiaVisita', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongDiaVisita');
    return true;
  };

  const verificarTelefonoContacto = () => {
    const inputTelefonoContacto = telefonoContacto.trim();
    if (!inputTelefonoContacto) {
      mostrarErrorCampo('wrongTelefonoContacto', 'Este espacio no puede quedar en blanco');
      return false;
    }
    ocultarErrorCampo('wrongTelefonoContacto');
    return true;
  };

  const verificarRegistro = () => {
    if (verificarNombreEmpresa() && verificarDiaVisita() && verificarTelefonoContacto()) {
      verificarTelefonoExistente();
    } else {
      mostrarAlerta('warning', 'Rellene los campos del formulario para continuar');
    }
  };
  
  const verificarTelefonoExistente = () => {
    const telefono = telefonoContacto.trim();
    axios.post('http://localhost:3001/usuario/verificar-telefono', { telefono })
      .then(response => {
        if (response.status === 200) {
          if (response.data.exists) {
            mostrarAlerta('warning', 'Número de teléfono duplicado', 'El número de teléfono ya existe en la base de datos.');
          } else {
            agregarRegistro();
          }
        } else {
          mostrarError('Error al verificar el número de teléfono', 'Ha ocurrido un error inesperado.');
        }
      })
      .catch(error => {
        mostrarError('Error al verificar el número de teléfono', 'Ha ocurrido un error al intentar verificar el número de teléfono.');
      });
  };

  const mostrarAlerta = (icon, title, text = '', toast = true) => {
    Swal.fire({
      icon,
      title,
      text,
      toast,
    });
  };

  const mostrarError = (title, text) => {
    console.error(title + ': ' + text);
    mostrarAlerta('error', title, text);
  };

  const mostrarErrorCampo = (campo, mensaje) => {
    document.getElementById(campo).textContent = mensaje;
  };

  const ocultarErrorCampo = (campo) => {
    document.getElementById(campo).textContent = '';
  };

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
                placeholder="idProveedor generado automaticamente"
                readOnly
              />
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
