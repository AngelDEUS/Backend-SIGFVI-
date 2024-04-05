import React, { useEffect, useState } from 'react';
import { TablaAdminItem } from './TablaAdminItem';
import '../Tabla.css';
import { RegisterAdmin } from './RegisterAdmin';
import TituloyDesc from '../../../components/Titles/TituloyDesc';
import axios from 'axios';

function TablaAdmins() {

  const [datos, setDatos] = useState([]);
  const [registerform, setRegisterform] = useState(false);

  useEffect(() => {
    consulta();
  }, []);

  const consulta = () => {
    axios.get("http://localhost:3001/usuario/read")
      .then((response) => {
        setDatos(response.data);
      })
      .catch(error => {
        console.error("Error al consultar los datos:", error);
      });
  }

  const actualizarTabla = () => {
    consulta();
  };

  const handleRegisterFormClose = () => {
    setRegisterform(false);
    actualizarTabla(); 
  }

  return (
    <>
      <div>
        <TituloyDesc
          titulo='Administradores'
          descripcion='Muestra los Usuarios que hacen parte del sistema y permite su respectivo registro y actualizacion.'
        />
      </div>
      <div className='main-container'>
        <hr />
        <div className='table-container'>
          <div className="option-container">
            <form className="form">
              <div className='buscar'>
                <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
                <button className='boton b7'>Buscar</button>
              </div>
              <div className='teush'>
                <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={() => setRegisterform(true)}>Agregar</button>
              </div>
              <RegisterAdmin isOpen={registerform} closeModal={handleRegisterFormClose} reConsulta={actualizarTabla} />
            </form>
          </div>

          <section className="table__body">
            <table className='tabla'>
              <thead>
                <tr>
                  <td>Nombre</td>
                  <td>Tipo Id</td>
                  <td>Id</td>
                  <td>Tipo de Usuario</td>
                  <td>Telefono</td>
                  <td>Correo</td>
                  <td>Estado</td>
                  <td>Acciones</td>
                </tr>
              </thead>
              <tbody>
                {
                  !datos ? 'Loading.....' :
                    datos.map((usuario, index) => {
                      return (
                        <TablaAdminItem
                          key={usuario.id}
                          id={usuario.id}
                          tipoId={usuario.tipoId}
                          name1={usuario.Nombre_Usuario}
                          name2={usuario.Segundo_Nombre_Usuario}
                          lastname1={usuario.Apellido_Usuario}
                          lastname2={usuario.Segundo_Apellido_Usuario}
                          tel={usuario.telefono}
                          email={usuario.Email_Usuario}
                          contrasena={usuario.contrasena}
                          cargo={usuario.cargo}
                          estado={usuario.estado}
                          idEstado={usuario.ID_Estado_FK}
                          consulta={actualizarTabla}
                        />
                      )
                    })
                }
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  )
}

export default TablaAdmins;
