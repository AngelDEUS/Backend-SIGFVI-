//import React, { useState } from 'react';
import './App.css';
//import { MyRoutes } from './routers/routes';
//import SideMenu from './components/SideMenu/SideMenu'; 
import React, { useEffect, useState } from 'react';
import LoginMain from './pages-views/Login/LoginMain';
import { BrowserRouter } from 'react-router-dom';
import LayoutMain from './pages-views/mainLayout';





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