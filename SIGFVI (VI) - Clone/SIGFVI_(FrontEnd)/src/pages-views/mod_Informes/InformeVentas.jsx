import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

const InformeVentas = () => {
  const [ventas, setVentas] = useState([]);
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        let url = 'http://localhost:3001/informes/informeVenta';
        if (fechaInicio && fechaFin) {
          url += `?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`;
        }
        const response = await axios.get(url);
        if (response.status === 200) {
          setVentas(response.data.ventas);
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
        titulo='Informe de Ventas'
        descripcion='Este es el módulo encargado de realizar los Informes de las ventas para generar un reporte de las ventas que se hacen.'
      />
      <hr />

      <h2 style={{ textAlign: 'center' }}>Informe de Ventas</h2>
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <center>
          <label htmlFor="fechaInicio">Fecha de Inicio:</label>
          <input type="date" id="fechaInicio" value={fechaInicio} onChange={handleFechaInicioChange} />
          <label htmlFor="fechaFin">Fecha de Fin:</label>
          <input type="date" id="fechaFin" value={fechaFin} onChange={handleFechaFinChange} />
        </center>
      </div>
      <center>
      <Link to='/Informes'>
        <button className="bnt1">Volver</button>
      </Link></center>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>ID Venta</th>
            <th>Fecha Factura</th>
            <th>Método de Pago</th>
            <th>IVA</th>
            <th>Total Pedido</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map((venta, index) => (
            <tr key={index}>
              <td>{venta.ID_Venta_PK}</td>
              <td>{venta.Fecha_Factura}</td>
              <td>{venta.Nombre_Metodo_Pago}</td>
              <td>{venta.IVA}</td>
              <td>{venta.Total_Pedido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default InformeVentas;
