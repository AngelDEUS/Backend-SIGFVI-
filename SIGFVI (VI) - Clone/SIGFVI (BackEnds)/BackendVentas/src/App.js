//import React, { useState } from 'react';
import './App.css';
//import { MyRoutes } from './routers/routes';
//import SideMenu from './components/SideMenu/SideMenu'; 
import React, { useState } from 'react';
import LoginMain from './pages-views/Login/LoginMain';
import Layout from './pages-views/mainLayout';



function App() {
  const [loggedInUser, setLoggedInUser] = useState(null);

  const handleLogin = (userInfo) => {
    setLoggedInUser(userInfo);
  };
  return (
    <div className="App">
      {loggedInUser ? (<Layout user={loggedInUser} />) : (<LoginMain onLogin={handleLogin} />)}
    </div>
  );
}

export default App;