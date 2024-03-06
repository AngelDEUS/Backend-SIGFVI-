import React, { useEffect, useState } from 'react';
import { Tabla_deudor_item } from './Tabla_deudor_item';
// import datos from './data/DatosDeudor.json';
import Register_deudor from './Register_deudor';
import './Tabla.css';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function Tabla_deudor() {

  const [datos, setDatos] = useState()

  const consulta = () => {
    axios.get("http://localhost:3001/consdeudor")
        .then((response)=>{
          setDatos(response.data);   
            //console.log(setDatos);
        });
  }

    useEffect(()=>{
        consulta();
    },[])

  const [registerform, setRegisterform] = useState(false)
  
  return (
    <>
    <div>
      <TituloyDesc 
        titulo='Deudores'
        descripcion='Esta pestaña muestra los deudores de la tienda los cuales estaran registrados aqui. Tambien se permite su actualizacion y edicion respectiva.'
      />
    </div>
    <div className='main-container'>
      <hr/>
      <div className='table-container'>
        <div className="option-container">
          <form className="form">
            <div className='buscar'>
              <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
              <button type='button' className='boton b1'>Buscar</button>
            </div>
            <div className='teush'>
            <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={()=> setRegisterform(true)}>Agregar</button>
            </div>
            <Register_deudor isOpen={registerform} closeModal={()=> setRegisterform(false)} reConsulta={consulta} />
          </form>
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
                    <h2>Dirección</h2>
                </th>
                <th>
                    <h2>Telefono</h2>
                </th>
                <th>
                    <h2>Deuda</h2>
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
                    <Tabla_deudor_item
                      key={datos.id}
                      id={datos.id}
                      name1={datos.Primer_Nombre}
                      name2={datos.Segundo_Nombre}
                      lastname1={datos.Primer_Apellido}
                      lastname2={datos.Segundo_Apellido}
                      address={datos.Direccion_Deudor}
                      tel={datos.Telefono_Deudor}
                      saldo={datos.saldo}
                      state={datos.estado}
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

export default Tabla_deudor