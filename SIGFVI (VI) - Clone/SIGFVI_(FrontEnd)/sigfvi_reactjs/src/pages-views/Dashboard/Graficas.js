import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Graficas.css';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const GraficasProduc = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3001/grafica/productosstock');
        console.log('Datos de la productos:', response.data); 
        setData(response.data);
      } catch (error) {
        console.error('Error al obtener datos de la API:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <div className='Graficaproductos'>
        <h1 className='graficoTitulo'>Cantidad de productos en stock</h1>
        <ResponsiveContainer width="auto%" aspect={2}>
          <BarChart
            data={data}
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4" />
            <XAxis dataKey="Nombre" />
            <YAxis />
            <Tooltip />
            {/* <Legend /> */}
            <Bar dataKey="Stock" fill='#000000' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};


const GraficasMasVendido = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/grafica/prodvendido');
          console.log('Datos de los mas vendidos: ',response.data)
          setData(response.data);
        } catch (error) {
          console.error('Error al obtener los productos más vendidos:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div>
        <div className='GraficasMasVendido'>
          <h1 className='graficoTitulo'>Productos más vendidos</h1>
          <ResponsiveContainer width="auto%" aspect={2}>
            <BarChart 
              data={data} 
              width={500} 
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5
              }}
            >
              <CartesianGrid strokeDasharray="4" />
              <XAxis dataKey="Nombre"/>
              <YAxis />
              <Tooltip />
              {/* <Legend /> */}
              <Bar dataKey="Cantidad_Vendida" fill='#000000' />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const GraficaStockBajo = () => {
    const [data, setData] = useState([]);
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:3001/grafica/stockbajo');
          console.log('Datos del stock bajo: ',response.data)
          setData(response.data);
        } catch (error) {
          console.error('Error al obtener los productos con stock bajo:', error);
        }
      };
  
      fetchData();
    }, []);
  
    return (
      <div className='GraficaStockBajo'>
        <h1 className='graficoTitulo'>Productos con stock bajo</h1>
        <ResponsiveContainer width="100%" aspect={2}>
          <BarChart 
            data={data} 
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="4" />
            <XAxis dataKey="Nombre" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Stock" fill='#E74C3C' />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  };

  
export { GraficasProduc, GraficasMasVendido, GraficaStockBajo };

