import React, {  useEffect, useState } from 'react';
// import datos from '../Login/DatosPrueba.json';
import { Tabla_users_item } from './Tabla_users_item';
import './Tabla.css';
import { Register_user } from './Register_user';
import TituloyDesc from '../../components/Titles/TituloyDesc'

function Tabla_users() {

  const url = 'http://localhost:3001/Usuarios'

  const [datos, setDatos] = useState([])

  const fetchApi = async () => {
      const respuesta = await fetch(url); 
      const respuestaJSON = await respuesta.json();
      setDatos(respuestaJSON)
  }

    useEffect(()=>{
        fetchApi();
    },[]);

    const handleAddUser = (id,tipoid/*,tipouser*/,nombre1,nombre2,apel1,apel2,email,pass) => {
      
      const newUser = {
        "id": id,
        "tipoIdentificacion": tipoid,
        "tipoUsuario": "Empleado",
        "nombres": nombre1+" "+nombre2,
        "apellidos": apel1+" "+apel2,
        "numeroContacto": "12345678901",
        "apodo": "Admon",
        "email": email,
        "contrasena": pass,
        "estado": "Activo"
      }
      setDatos([...datos, newUser])
    }

  const [registerform, setRegisterform] = useState(false)
  
  return (
    <>
    <div>
      <TituloyDesc 
        titulo='Usuarios'
        descripcion='Muestra los Usuarios que hacen parte del sistema y permite su respectivo registro y actualizacion.'
      />
    </div>
    <div className='main-container'>
      <hr/>
      <div className='table-container'>
        <div className="option-container">
          <form className="form">
            <div className='buscar'>
              <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
              <button className='boton b1'>Buscar</button>
            </div>
            <div className='teush'>
              <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={()=> setRegisterform(true)}>Agregar</button>
            </div>
            <Register_user isOpen={registerform} closeModal={()=> setRegisterform(false)} funcion={handleAddUser}/>

          </form>
        </div>

        <section className="table__body">
          <table className='tabla'>
            <thead>
                <th>
                    <h2>Nombre</h2>
                </th>
                <th>
                    <h2>Tipo Id</h2>
                </th>
                <th>
                    <h2>Id</h2>
                </th>
                <th>
                    <h2>Tipo de Usuario</h2>
                </th>
                <th>
                    <h2>Apodo</h2>
                </th>
                <th>
                    <h2>Contraseña</h2>
                </th>
                <th>
                    <h2>Telefono</h2>
                </th>
                <th>
                    <h2>Correo</h2>
                </th>
                <th>
                    <h2>Estado</h2>
                </th>
                <th>
                    <h2>Acciones</h2>
                </th>
            </thead>
            <tbody>
              {
                !datos ? 'Loading.....' :
                datos.map((datos, index) => {
                  return(
                    <Tabla_users_item 
                      key={datos.id}
                      id={datos.id}
                      tipoid={datos.tipoIdentificacion}
                      tipouser={datos.tipoUsuario}
                      name={datos.nombres}
                      last_name={datos.apellidos}
                      nick={datos.apodo}
                      password={datos.contrasena}
                      cel={datos.numeroContacto}
                      email={datos.email}
                      state={datos.estado}
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

export default Tabla_users