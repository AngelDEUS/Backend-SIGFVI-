import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

const InformeVentas = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/informes/informeVenta');
        if (response.status === 200) {
          setProductos(response.data.ventas); // Aquí cambiamos productos por ventas
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
            <th style={{ textAlign: 'center' }}>ID Venta</th> {/* Cambiado de ID Pedido a ID Venta */}
            <th>Método de Pago</th>
            <th>IVA</th>
            <th>Total Pedido</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((venta, index) => ( // Cambiado de pedido a venta
            <tr key={index}>
              <td>{venta.ID_Venta_PK}</td> {/* Cambiado de ID_Pedido_PK a ID_Venta_PK */}
              <td>{venta.Nombre_Metodo_Pago}</td> {/* Mantenido Nombre_Metodo_Pago */}
              <td>{venta.IVA}</td> {/* Mantenido IVA */}
              <td>{venta.Total_Pedido}</td> {/* Mantenido Total_Pedido */}
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
};

export default InformeVentas;
