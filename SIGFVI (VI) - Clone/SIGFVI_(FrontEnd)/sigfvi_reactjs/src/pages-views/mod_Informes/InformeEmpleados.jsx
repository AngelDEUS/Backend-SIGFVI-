// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';
// import TituloyDesc from '../../components/Titles/TituloyDesc';

// function InformeEmpleados() {
//   const [empleados, setEmpleados] = useState([]);

//   useEffect(() => {
//     const obtenerUsuarios = async () => {
//       try {
//         const response = await axios.get('http://localhost:3001/informes/informeEmpleado');
//         if (response.status !== 200) {
//           throw new Error('Error al obtener los datos de la API');
//         }
//         const data = response.data;
//         setEmpleados(data);
//       } catch (error) {
//         console.error('Error al obtener usuarios:', error);
//       }
//     };

//     obtenerUsuarios();
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
//             <th>ID</th>
//             <th>Tipo de Identificación</th>
//             <th>Nombre</th>
//             <th>Apellido</th>
//             <th>Teléfono</th>
//             <th>Email</th>
//             <th>Cargo</th>
//             <th>Estado</th>
//           </tr>
//         </thead>
//         <tbody>
//           {empleados.map((empleado, index) => (
//             <tr key={index}>
//               <td>{empleado.id}</td>
//               <td>{empleado.tipoId}</td>
//               <td>{empleado.Nombre_Usuario}</td>
//               <td>{empleado.Apellido_Usuario}</td>
//               <td>{empleado.telefono}</td>
//               <td>{empleado.Email_Usuario}</td>
//               <td>{empleado.cargo}</td>
//               <td>{empleado.estado}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <br />
//     </main>
//   );
// }

// export default InformeEmpleados;
