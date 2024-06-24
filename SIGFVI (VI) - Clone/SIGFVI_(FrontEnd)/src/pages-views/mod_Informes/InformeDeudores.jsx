import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function InformeDeudores() {
  const [deudores, setDeudores] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/informes/informeDeudor';
        if (fechaInicio && fechaFin) {
          url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setDeudores(response.data);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [fechaInicio, fechaFin]);

  const handleFechaInicioChange = (event) => {
    setFechaInicio(event.target.value);
  };

  const handleFechaFinChange = (event) => {
    setFechaFin(event.target.value);
  };

  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Deudores'
        descripcion='Este es el módulo encargado de realizar los Informes de los deudores para generar un reporte de quienes están en la lista.'
      />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Informe Deudores</h2>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}><center>
        <label htmlFor="fechaInicio">Fecha de Inicio:</label>
        <input type="date" id="fechaInicio" value={fechaInicio} onChange={handleFechaInicioChange} />
        <label htmlFor="fechaFin">Fecha de Fin:</label>
        <input type="date" id="fechaFin" value={fechaFin} onChange={handleFechaFinChange} />
        </center>
      </div>
      <Link to='/Informes'>
        <button className="bnt1">Volver</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <th>ID</th>
            <th>Nombre y Apellido</th>
            <th>Fecha de Registro</th>
            <th>Total de Deuda</th>
            <th style={{ textAlign: 'center' }}>Estado</th>
          </tr>
        </thead>
        <tbody>
          {deudores.map((deudor, index) => (
            <tr key={index}>
              <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
              <td>{deudor.id}</td>
              <td>{`${deudor.Primer_Nombre} ${deudor.Segundo_Nombre} ${deudor.Primer_Apellido} ${deudor.Segundo_Apellido}`}</td>
              <td>{deudor.Fecha_Cancelacion_Pedido}</td>
              <td>{deudor.saldo}</td>
              <td style={{ textAlign: 'center' }}>{deudor.estado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default InformeDeudores;
