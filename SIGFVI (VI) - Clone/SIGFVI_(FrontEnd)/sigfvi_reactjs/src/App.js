//import React, { useState } from 'react';
import './App.css';
//import { MyRoutes } from './routers/routes';
//import SideMenu from './components/SideMenu/SideMenu'; 
import React, { useEffect, useState } from 'react';
import LoginMain from './pages-views/Login/LoginMain';
import Layout from './pages-views/mainLayout';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Main_Dashboard from './pages-views/Dashboard/main_Dashboard';
import TablaAdmins from './pages-views/mod_Usuarios/Admins/TablaAdmin';
import LayoutMain from './pages-views/mainLayout';

import SideMenu from './components/SideMenu/SideMenu';



function App() {

  const [fixed,setFixed]=useState('');

  const quieto = () => {
    // Obtener la ubicación actual
    const currentLocation = window.location.pathname;

    // Verificar si la ruta actual es '/login'
    if (currentLocation === '/') {
      return 'inicio__p';
    }
    if (currentLocation !== '/'){
      return '';
    }
  };

  useEffect(()=>{
    setFixed(quieto())
  },[])
  return (
    <div className={fixed}>
      <BrowserRouter>
        <Routes>
          <Route index element={<LoginMain />} />
          <Route path='/login' element={<LoginMain />} />
          <Route path='/layout/*' element={<LayoutMain />} /> //privada
        </Routes>
        <LayoutMain />
        {/* <Routes>
          <Route path='/dashboard' element={<Main_Dashboard />}/>
          {/* <Route path='/tablaAdmin' element={<TablaAdmins />} /> 
        </Routes> */}
      </BrowserRouter>
    </div>    
  );
}

export default App;