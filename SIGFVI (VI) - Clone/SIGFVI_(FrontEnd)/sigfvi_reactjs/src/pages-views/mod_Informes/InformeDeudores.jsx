import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';
import axios from 'axios';

function InformeDeudores() {
  const [deudores, setDeudores] = useState([]);

  useEffect(() => {
    const obtenerDatosDeudores = async () => {
      try {
        const response = await axios.get('http://localhost:3001/informes/informeDeudor');
        setDeudores(response.data);
      } catch (error) {
        console.error('Error al obtener los deudores:', error);
      }
    };

    obtenerDatosDeudores();
  }, []);

  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Deudores'
        descripcion='Este es el módulo encargado de realizar los Informes de los deudores para generar un reporte de quienes están en la lista.'
      />
      <hr />
      <h2 style={{ textAlign: 'center' }}>Informe Deudores</h2>
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
            <FilaDeudor
              key={index}
              id={deudor.id}
              nombre={`${deudor.Primer_Nombre} ${deudor.Segundo_Nombre} ${deudor.Primer_Apellido} ${deudor.Segundo_Apellido}`}
              fechaRegistro={deudor.Fecha_Cancelacion_Pedido}
              totalDeuda={deudor.saldo}
              estado={deudor.estado}
            />
          ))}
        </tbody>
      </table>
    </main>
  );
}

function FilaDeudor({ id, nombre, fechaRegistro, totalDeuda, estado }) {
  return (
    <tr>
      <td style={{ textAlign: 'center' }}><input type="checkbox" /></td>
      <td>{id}</td>
      <td>{nombre}</td>
      <td>{fechaRegistro}</td>
      <td>{totalDeuda}</td>
      <td style={{ textAlign: 'center' }}>{estado}</td>
    </tr>
  );
}

export default InformeDeudores;
