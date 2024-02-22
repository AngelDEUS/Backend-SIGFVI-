import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Informes.css';
import { Link } from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

function Informe() {
  const [fechaInicio, setFechaInicio] = useState('');
  const [fechaFin, setFechaFin] = useState('');
  const [mostrarGrafico, setMostrarGrafico] = useState(false);
  const canvasRef = useRef(null);

  useEffect(() => {
    //grafico
    const datos = {
      labels: ['Inventario', 'Ventas', 'Deudores', 'Empleados'],
      datasets: [
        {
          label: 'Cantidad',
          data: [20, 50, 20, 10], // Valores de cada categoría
          backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#581845'], // Colores de cada categoría
          borderColor: 'rgba(255, 255, 255, 0.7)', // Color del borde
          borderWidth: 1, // Ancho del borde
        },
      ],
    };

    const opciones = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          stacked: true,
        },
        y: {
          stacked: true,
        },
      },
    };

    const canvas = canvasRef.current;

    const grafico = new Chart(canvas, {
      type: 'bar',
      data: datos,
      options: opciones,
    });

    return () => {
      grafico.destroy();
    };
  }, []);

  const mostrarRango = () => {
    alert(`Fecha de inicio: ${fechaInicio}\nFecha de fin: ${fechaFin}`);
  };
  const mostrarAlerta = (mensaje) => {
    alert(mensaje);
  };

  const mostrarGraficoHandler = () => {
    setMostrarGrafico(!mostrarGrafico);
  };

  return (

    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informes'
        descripcion='Este es el módulo encargado de realizar los Informes de los productos y generar los informes de cada reporte.'
      />


      <hr />
      <section className="">
        <div className='mod__Ventas'>
          <div className="venta">
            <div>
              <h2>Escoger Rango de Fechas (Desde/Hasta)</h2><br />
            </div>
            <div>
              <div>
                <label htmlFor="fecha-inicio">Fecha de inicio:</label>
                <input
                  type="date"
                  id="fecha-inicio"
                  name="fecha-inicio"
                  onChange={(e) => setFechaInicio(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="fecha-fin">Fecha de fin:</label>
                <input
                  type="date"
                  id="fecha-fin"
                  name="fecha-fin"
                  onChange={(e) => setFechaFin(e.target.value)}
                />
              </div>
            </div>

            <button onClick={mostrarRango} className='mostrar'>Mostrar</button>
          </div>

          <div className="btones">
            <div className="button-container">
              <Link to='/GestionInformes/InformeVentas' className='prueba'><button className="b1" id="btn" >Reporte de Ventas</button></Link>
              <Link to='/GestionInformes/InformeEmpleados'><button className="b1" id="btn">Reporte de Empleados</button></Link>
              {/* </div>
            <div className="button-container"> */}
              <Link to='/GestionInformes/InformeDeudores'><button className="b1" id="btn" >Reporte de Deudores</button></Link>
              <Link to='/GestionInformes/InformeInventario'><button className="b1" id="btn">Reporte de Inventario</button></Link>
            </div>
            <div className="button-container">
              <button className="b4" onClick={mostrarGraficoHandler}>
                Resumen %</button>

            </div>
          </div>
        </div>
        <div className={`grafico${mostrarGrafico ? '' : ' oculto'}`}>
          <br />
          <canvas ref={canvasRef}></canvas>
        </div>
      </section>

      <table>
        <thead>
          <tr>
            <th>
              <input type="checkbox" />
            </th>
            <th>ID</th>
            <th>Fecha en la que se realizó la facturación</th>
            <th>Total de la venta</th>
            <th>Nombre del empleado que realizó la venta</th>
            <th>Total (-) Menos el costo</th>
            <th>Total (-) Menos el costo</th>
          </tr>
        </thead>
        <tbody>
          {[{
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },
          {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          }, {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },
          {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },
          {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },
          {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },
          {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },
          {
            id: '103061',
            fecha: '19/03/2023',
            totalVenta: '$250.000',
            nombreEmpleado: 'Luicia Martinez',
            totalMenosCosto: '-$37.500',
            totalMenosCosto2: '$212.000',
          },].map((informe, index) => (
            <tr key={index}>
              <td>
                <input type="checkbox" />
              </td>
              <td>{informe.id}</td>
              <td>{informe.fecha}</td>
              <td>{informe.totalVenta}</td>
              <td>{informe.nombreEmpleado}</td>
              <td>{informe.totalMenosCosto}</td>
              <td>{informe.totalMenosCosto2}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <section className="home">
        <div className="button-container">
          <br />
          <button className="b5" id="bttn" onClick={() => mostrarAlerta('Informe Descargado')}>
            Descargar Informe
          </button>
          <button className="b6" id="btton" onClick={() => mostrarAlerta('Generar Vista + Resumen')}>
            Generar Vista + Resumen
          </button>
        </div>
      </section>
    </main>
  );
}

export default Informe;