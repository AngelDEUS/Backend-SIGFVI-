import React, { useState } from 'react';
import {Link} from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

function InformeEmpleados() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  const mostrarRango = () => {
    alert(`Fecha de inicio: ${fechaInicio}\nFecha de fin: ${fechaFin}`);
  };

  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Empleados'
        descripcion='Este es el módulo encargado de realizar los Informes de los empleados para generar un reporte o control de ellos.'
      />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Informe Empleados</h2>
      <Link to='/Informes'><button className="bnt1" >Volver</button></Link>
      <table>
        <thead>
          <tr>
            <th><center><input type="checkbox" /></center></th>
            <th>Nombres y Apellidos</th>
            <th>Ventas Realizadas</th>
            <th>
              Días trabajados:
              <br />
              <label htmlFor="fecha-inicio">Fecha de inicio:</label>
              <input
                type="date"
                id="fecha-inicio"
                name="fecha-inicio"
                onChange={(e) => setFechaInicio(e.target.value)}
              />
              <br />
              <label htmlFor="fecha-fin">Fecha de fin:</label>
              <input
                type="date"
                id="fecha-fin"
                name="fecha-fin"
                onChange={(e) => setFechaFin(e.target.value)}
              />
              <button onClick={mostrarRango}>Enter</button>
            </th>
            <th>Total de ventas realizadas en el día</th>
          </tr>
        </thead>
        <tbody>
          {[
            { nombre: 'Jean Beltran', ventasRealizadas: 14, diasTrabajados: 3, totalVentas: '$50.000' },
            { nombre: 'Natalia Suarez', ventasRealizadas: 10, diasTrabajados: 2, totalVentas: '$70.000' },
            { nombre: 'Jose Marquez', ventasRealizadas: 22, diasTrabajados: 4, totalVentas: '$100.000' },
            { nombre: 'Jose Marquez', ventasRealizadas: 22, diasTrabajados: 4, totalVentas: '$100.000' },
            { nombre: 'Jose Marquez', ventasRealizadas: 22, diasTrabajados: 4, totalVentas: '$100.000' },
            { nombre: 'Jose Marquez', ventasRealizadas: 22, diasTrabajados: 4, totalVentas: '$100.000' },
            { nombre: 'Jose Marquez', ventasRealizadas: 22, diasTrabajados: 4, totalVentas: '$100.000' },
            { nombre: 'Jose Marquez', ventasRealizadas: 22, diasTrabajados: 4, totalVentas: '$100.000' },
          ].map((empleado, index) => (
            <tr key={index}>
              <th><center><input type="checkbox" /></center></th>
              <td>{empleado.nombre}</td>
              <td>{empleado.ventasRealizadas}</td>
              <td>{empleado.diasTrabajados}</td>
              <td>{empleado.totalVentas}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
    </main>
  );
}

export default InformeEmpleados;
