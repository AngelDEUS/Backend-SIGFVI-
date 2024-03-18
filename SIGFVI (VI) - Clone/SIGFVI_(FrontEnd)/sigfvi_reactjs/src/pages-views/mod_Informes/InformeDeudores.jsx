import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function InformeDeudores() {
  const [deudores, setDeudores] = useState([]);
  const [fechaFiltro, setFechaFiltro] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/informes/informeDeudor';
        if (fechaFiltro) {
          url += `?fechaRegistro=${fechaFiltro}`;
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
  }, [fechaFiltro]);

  const handleFechaChange = (event) => {
    setFechaFiltro(event.target.value);
  };

  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Deudores'
        descripcion='Este es el módulo encargado de realizar los Informes de los deudores para generar un reporte de quienes están en la lista.'
      />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Informe Deudores</h2>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <label htmlFor="fecha">Fecha de Registro:</label>
        <input type="date" id="fecha" value={fechaFiltro} onChange={handleFechaChange} />
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
