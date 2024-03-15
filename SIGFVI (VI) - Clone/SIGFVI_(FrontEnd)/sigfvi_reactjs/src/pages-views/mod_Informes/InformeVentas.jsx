import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

const InformeVentas = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/informe/informeVenta');
        if (response.status === 200) {
          setProductos(response.data.productos);
        } else {
          console.error('Error fetching data:', response.status);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Ventas'
        descripcion='Este es el módulo encargado de realizar los <s>Informes de las ventas</s> para generar un reporte de las ventas que se hacen.'
      />
      <hr />

      <h2 style={{ textAlign: 'center' }}>Informe de Ventas</h2>
      <Link to='/Informes'>
        <button className="bnt1">Volver</button>
      </Link>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}>ID Pedido</th>
            <th>Método de Pago</th>
            <th>Fecha Pedido</th>
            <th>Hora Pedido</th>
            <th>IVA</th>
            <th>Total Pedido</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((pedido, index) => (
            <tr key={index}>
              <td>{pedido.ID_Pedido_PK}</td>
              <td>{pedido.Nombre_Metodo_Pago}</td> {/* Mostrar el nombre del método de pago en lugar del ID */}
              <td>{pedido.Fecha_Pedido}</td>
              <td>{pedido.Hora_Pedido}</td>
              <td>{pedido.IVA}</td>
              <td>{pedido.Total_Pedido}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default InformeVentas;
