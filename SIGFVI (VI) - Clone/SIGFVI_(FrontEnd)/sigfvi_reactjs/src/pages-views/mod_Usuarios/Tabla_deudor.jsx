import React, { useEffect, useState } from 'react';
import { Tabla_deudor_item } from './Tabla_deudor_item';
import Register_deudor from './Register_deudor';
import './Tabla.css';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function Tabla_deudor() {
  const [datos, setDatos] = useState();
  const [refresh, setRefresh] = useState(false); // State variable to trigger a refresh

  const consulta = () => {
    axios.get("http://localhost:3001/usuario/consdeudor")
      .then((response) => {
        setDatos(response.data);
      });
  }

  useEffect(() => {
    consulta();
  }, [refresh]); // Add 'refresh' as a dependency to re-run the effect when it changes

  const [registerform, setRegisterform] = useState(false);

  const handleRefresh = () => {
    setRefresh((prevRefresh) => !prevRefresh); // Toggle the 'refresh' state
  };

  return (
    <>
      <div>
        <TituloyDesc
          titulo='Deudores'
          descripcion='Esta pestaña muestra los deudores de la tienda los cuales estaran registrados aqui. Tambien se permite su actualizacion y edicion respectiva.'
        />
      </div>
      <div className='main-container'>
        <hr />
        <div className='table-container'>
          <div className="option-container">
            <form className="form">
              <div className='buscar'>
                <input type="search" id="search" name="search" placeholder="buscar" className='barra-buscar' />
                <button type='button' className='boton b7'>Buscar</button>
              </div>
              <div className='teush'>
                <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={() => setRegisterform(true)}>Agregar</button>
              </div>
              <Register_deudor isOpen={registerform} closeModal={() => setRegisterform(false)} reConsulta={handleRefresh} />
            </form>
          </div>

          <section className="table__body">
            <table className='tabla'>
              <thead>
                <tr>
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
                </tr>
              </thead>
              <tbody>
                {
                  !datos ? 'Loading.....' :
                    datos.map((datos, index) => {
                      return (
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
                          consulta={handleRefresh} // Pass the refresh function as a prop
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

export default Tabla_deudor;
