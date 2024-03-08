import React, { useEffect, useState } from 'react';
import './Tabla.css';
// import datos from './data/DatosProveedor.json';
import { Tabla_proveedor_item } from './Tabla_proveedor_item';
import Register_proveedor from './Register_proveedor';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function Tabla_proveedores() {

  const [datos, setDatos] = useState([])

  const consulta = () => {
    axios.get("http://localhost:3003/")
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
        titulo='Proveedores'
        descripcion='Muestra los Proveedores que hacen parte del sistema y permite su respectivo registro y actualizacion.'
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
          </form>
          <Register_proveedor isOpen={registerform} closeModal={()=> setRegisterform(false)} reConsulta={consulta}/>
        </div>

        <section className="table__body">
          <table className='tabla'>
            <thead>
                <th>
                    <h2>id</h2>
                </th>
                <th>
                    <h2>Nombre</h2>
                </th>
                <th>
                    <h2>Número</h2>
                </th>
                <th>
                    <h2>Frecuencia</h2>
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
                    <Tabla_proveedor_item 
                      key={datos.ID_Registro_Proveedor_PK}
                      id={datos.ID_Registro_Proveedor_PK}
                      name={datos.Nombre_Empresa}
                      frecuency={datos.Dia_Visita}
                      cel={datos.Telefono_Contacto}
                      state={datos.Estado_ID_Estado_PK}
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

export default Tabla_proveedores