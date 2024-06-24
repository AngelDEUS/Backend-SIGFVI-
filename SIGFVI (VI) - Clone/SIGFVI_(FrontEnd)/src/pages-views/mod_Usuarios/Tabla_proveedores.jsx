import React, { useEffect, useState } from 'react';
import './Tabla.css';
import { Tabla_proveedor_item } from './Tabla_proveedor_item';
import Register_proveedor from './Register_proveedor';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function Tabla_proveedores() {
  const [proveedores, setProveedores] = useState([]);
  const [registerform, setRegisterform] = useState(false);

  const consultarProveedores = () => {
    axios.get("http://localhost:3001/usuario/proveedores")
      .then((response)=>{
        setProveedores(response.data);
      })
      .catch((error) => {
        console.error('Error al obtener datos:', error);
      });
  };

  useEffect(()=>{
    consultarProveedores();
  },[]);

  const actualizarTabla = () => {
    consultarProveedores();
  };

  const abrirFormularioRegistro = () => {
    setRegisterform(true);
  };

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
                <button className='boton b7'>Buscar</button>
              </div>
              <div className='teush'>
                <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={abrirFormularioRegistro}>Agregar</button>
              </div>
            </form>
            <Register_proveedor isOpen={registerform} closeModal={()=> setRegisterform(false)} reConsulta={actualizarTabla}/>
          </div>

          <section className="table__body">
            <table className='tabla'>
              <thead>
                <tr>
                  <th><h2>id</h2></th>
                  <th><h2>Nombre</h2></th>
                  <th><h2>Número</h2></th>
                  <th><h2>Frecuencia</h2></th>
                  <th><h2>Estado</h2></th>
                  <th className='acciones_General_Tittle'><h2>Acciones</h2></th>
                </tr>
              </thead>
              <tbody>
                {
                  !proveedores ? 'Loading.....' :
                  proveedores.map((proveedor, index) => {
                    return(
                      <Tabla_proveedor_item 
                        key={proveedor.ID_Registro_Proveedor_PK}
                        id={proveedor.ID_Registro_Proveedor_PK}
                        name={proveedor.Nombre_Empresa}
                        frecuency={proveedor.Dia_Visita}
                        cel={proveedor.Telefono_Contacto}
                        state={proveedor.Nombre_Estado}
                        idEstado={proveedor.Estado_ID_Estado_PK}
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

export default Tabla_proveedores;
