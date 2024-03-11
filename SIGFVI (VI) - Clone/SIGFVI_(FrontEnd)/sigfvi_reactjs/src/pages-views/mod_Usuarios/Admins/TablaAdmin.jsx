import React, {  useEffect, useState } from 'react';
// import datos from '../Login/DatosPrueba.json';
import { TablaAdminItem} from './TablaAdminItem';
import '../Tabla.css';
import { RegisterAdmin } from './RegisterAdmin';
import TituloyDesc from '../../../components/Titles/TituloyDesc';
import axios from 'axios';

function TablaAdmins() {

  const [datos, setDatos] = useState([]);

  const consulta = () => {
    axios.get("http://localhost:3003/read")
        .then((response)=>{
          setDatos(response.data);   
            //console.log(setDatos);
        });
  }
    useEffect(()=>{
        consulta();
    },[]);

  const [registerform, setRegisterform] = useState(false)
  
  return (
    <>
    <div>
      <TituloyDesc 
        titulo='Administradores'
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
            <RegisterAdmin isOpen={registerform} closeModal={()=> setRegisterform(false)} reConsulta={consulta}/>

          </form>
        </div>

        <section className="table__body">
          <table className='tabla'>
            <thead>
                    <td>Nombre</td>
                    <td>Tipo Id</td>
                    <td>Id</td>
                    <td>Tipo de Usuario</td>
                    <td>Telefono</td>
                    <td>Correo</td>
                    <td>Estado</td>
                    <td>Acciones</td>
            </thead>
            <tbody>
              {
                !datos ? 'Loading.....' :
                datos.map((datos, index) => {
                  return(
                    <TablaAdminItem 
                      key={datos.id}
                      id={datos.id}
                      tipoId={datos.tipoId}
                      name1={datos.Nombre_Usuario}
                      name2={datos.Segundo_Nombre_Usuario}
                      lastname1={datos.Apellido_Usuario}
                      lastname2={datos.Segundo_Apellido_Usuario}
                      tel={datos.telefono}
                      email={datos.Email_Usuario}
                      contrasena={datos.contrasena}
                      cargo={datos.cargo}
                      estado={datos.estado}
                      idEstado={datos.ID_Estado_FK}
                      consulta={consulta}
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

export default TablaAdmins