// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import TituloyDesc from '../../components/Titles/TituloyDesc';

// function InformeEmpleados() {
//   const [productos, setProductos] = useState([]);

//   useEffect(() => {
//     const fetchProductos = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/informe/informeInventario');
//         if (response.status !== 200) {
//           throw new Error('Error fetching data from API');
//         }
//         const data = response.data.datos;
//         setProductos(data);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//       }
//     };

//     fetchProductos();
//   }, []);

//   return (
//     <main className='contenedor_informe'>
//       <TituloyDesc
//         titulo='Informe de Empleados'
//         descripcion='Este es el módulo encargado de realizar los Informes de los empleados para generar un reporte o control de ellos.'
//       />
//       <hr />
//       <h2 style={{ textAlign: 'center' }}>Informe Empleados</h2>
//       <Link to='/Informes'><button className="bnt1">Volver</button></Link>
//       <table>
//         <thead>
//           <tr>
//             <th>ID Producto</th>
//             <th>Nombre Producto</th>
//             <th>Nombre Tipo Producto</th>
//             <th>Descripción</th>
//             <th>Precio Proveedor</th>
//             <th>Precio Venta</th>
//             <th>Stock</th>
//           </tr>
//         </thead>
//         <tbody>
//           {productos.map((producto, index) => (
//             <tr key={index}>
//               <td>{producto.ID_Producto_PK}</td>
//               <td>{producto.Nombre_Producto}</td>
//               <td>{producto.Nombre_Tipo_Producto}</td>
//               <td>{producto.Descripcion}</td>
//               <td>{producto.Precio_Proveedor}</td>
//               <td>{producto.Precio_Venta}</td>
//               <td>{producto.Stock}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <br />
//     </main>
//   );
// }

// export default InformeEmpleados;
