//import React, { useState } from 'react';
import './App.css';
//import { MyRoutes } from './routers/routes';
//import SideMenu from './components/SideMenu/SideMenu'; 
import React, { useEffect, useState } from 'react';
import LoginMain from './pages-views/Login/LoginMain';
import Layout from './pages-views/mainLayout';
import { BrowserRouter,Routes,Route, Navigate } from 'react-router-dom';
import Main_Dashboard from './pages-views/Dashboard/main_Dashboard';
import TablaAdmins from './pages-views/mod_Usuarios/Admins/TablaAdmin';
import LayoutMain from './pages-views/mainLayout';

import SideMenu from './components/SideMenu/SideMenu';
import { ProtectedRoute } from './routers/RutaProtegida';
import Tabla_users from './pages-views/mod_Usuarios/Tabla_users';
import Tabla_proveedores from './pages-views/mod_Usuarios/Tabla_proveedores';
import Tabla_deudor from './pages-views/mod_Usuarios/Tabla_deudor';
import Vacio from './routers/Vacio';



function App() {

  const [user,setUser] = useState(null);

  const hayUser =()=>{

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    setUser(usuario != null)
  }


  useEffect(()=>{
    hayUser();      
  },[]);

  // const [fixed,setFixed]=useState('');

  // const quieto = () => {
  //   // Obtener la ubicación actual
  //   const currentLocation = window.location.pathname;

  //   // Verificar si la ruta actual es '/login'
  //   if (currentLocation === '/') {
  //     return 'inicio__p';
  //   }
  //   if (currentLocation !== '/'){
  //     return '';
  //   }
  // };

  // useEffect(()=>{
  //   setFixed(quieto())
  // },[])


  return (
    <div className=''>
      <BrowserRouter>
          
        {
          !user ? <LoginMain />: <LayoutMain />
        }
        
      </BrowserRouter>
    </div>    
  );
}

export default App;