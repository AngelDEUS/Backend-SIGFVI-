import React, { useEffect, useState } from 'react';  // Asegúrate de importar useState desde React
import SideMenu from '../components/SideMenu/SideMenu';
import { MyRoutes } from '../routers/routes';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginMain from './Login/LoginMain';
import { ProtectedRoute } from '../routers/RutaProtegida';
import TablaAdmins from './mod_Usuarios/Admins/TablaAdmin';
import Tabla_users from './mod_Usuarios/Tabla_users';
import Tabla_proveedores from './mod_Usuarios/Tabla_proveedores';
import Tabla_deudor from './mod_Usuarios/Tabla_deudor';
import Main_Dashboard from './Dashboard/main_Dashboard';
import Main_Inventario from './mod_inventario/mai_Inventario';
import Tabla_Producto from './mod_inventario/tablaProducto';
import Gestion_Inventario from './mod_inventario/tablaInventario';

// Ventas y facturación.
import Main_VentasFacturacion from './mod_Ventas-Facturacion/main_VentasFacturacion';
import VentasControl_Main from './mod_Ventas-Facturacion/Ventas/VentasControl_Main';
import PagoVenta from './mod_Ventas-Facturacion/pago_calculo_pt2/PagoVenta';
import FacturaMain from './mod_Ventas-Facturacion/Facturacion_p3/Main_Factura_Document';
import TabsMainGenerator from './mod_Ventas-Facturacion/Tabs/TabsMainGenerator';
import MainVentas from './mod_Ventas-Facturacion/main_ventas';
import Main_Metodo_Pago from './mod_Ventas-Facturacion/Metodos_Pago/main_Metodo_Pago';

import Informe from './mod_Informes/Informe';
import InformeVentas from './mod_Informes/InformeVentas';
import InformeDeudores from './mod_Informes/InformeDeudores';
import InformeEmpleados from './mod_Informes/InformeEmpleados';
import InformeInventario from './mod_Informes/InformeInventario';
import MainAyuda from './Ayuda/MainAyuda';
import Error404 from './Error_Pages/error404';
import EntragaProducto from './mod_inventario/entregaProducto';

const LayoutMain = () => {
    const [user,setUser] = useState(null);

  const hayUser =()=>{

    const usuario = JSON.parse(localStorage.getItem("usuario"));

    setUser(usuario)
  }


  useEffect(()=>{
    hayUser();   
  },[]);

    const [miniBarraLateral, setMiniBarraLateral] = useState(false);

    const toggleMiniBarraLateral = () => {
        setMiniBarraLateral(!miniBarraLateral);
    };

    return (
        <div>
            
            <SideMenu miniBarraLateral={miniBarraLateral} toggleMiniBarraLateral={toggleMiniBarraLateral} />
            <div className={`main-content ${miniBarraLateral ? 'collapsed' : ''}`}>
                {/* <MyRoutes /> */}
                <Routes>
                    {/* <Route index element={<LoginMain />} /> */}
                    {
                        user ?(
                            <Route path='/' element={<Main_Dashboard />} />
                        ) : (
                            <Route path='/' element={<LoginMain />} />
                        )
                    }
                    
                    <Route path='/login' element={<LoginMain />} />
                    <Route element={<ProtectedRoute isAllowed={!!user} />}>
                        {/* <Route path='/layout/*' element={<LayoutMain />} /> */}
                        <Route path='/dashboard' element={<Main_Dashboard />} />
                        
                    </Route>
                    <Route element={<ProtectedRoute isAllowed={!!user && user.rol === 2} redirectTo='/dashboard'/>}>
                        <Route path='/GestionUsuarios/Admins/TablaAdmin' element={<TablaAdmins />} />
                        <Route path='/GestionUsuarios/TablaUsuarios' element={<Tabla_users />} />

                        <Route path='/VentasFacturacion/metodo_pago' element={<Main_Metodo_Pago />} />
                    </Route>
                    <Route element={<ProtectedRoute isAllowed={!!user && (user.rol === 2 || user.rol === 3)} redirectTo='/dashboard'/>}>
                        <Route path='/GestionUsuarios/TablaProveedores' element={<Tabla_proveedores />} />
                        <Route path='/GestionUsuarios/TablaDeudores' element={<Tabla_deudor />} /> 
                        <Route path='/Inventario' element={<Main_Inventario />} />
                        <Route path='/Inventario/Producto' element={<Tabla_Producto />} />
                        <Route path='/Inventario/GestionInventario' element={<Gestion_Inventario />} />
                        <Route path='/Inventario/EntregaProducto' element={<EntragaProducto />} />
                        <Route path='/VentasFacturacion/list' element={<Main_VentasFacturacion />} />
                        <Route path='/VentasFacturacion/ventas_main' element={<VentasControl_Main />} />
                        <Route path='/VentasFacturacion/venta_pagar' element={<PagoVenta />} />
                        <Route path='/VentasFacturacion/factura_generada' element={<FacturaMain />} />
                        <Route path='/VentasFacturacion/tabs' element={<TabsMainGenerator/>} />
                        <Route path='/VentasFacturacion/ventas' element={<MainVentas />} />
                        <Route path='/Informes' element={<Informe />} />
                        <Route path='/GestionInformes/InformeVentas' element={<InformeVentas />} />
                        <Route path='/GestionInformes/InformeDeudores' element={<InformeDeudores />} />
                        {/* <Route path='/GestionInformes/InformeEmpleados' element={<InformeEmpleados />} /> */}
                        {/* <Route path='/GestionInformes/InformeInventario' element={<InformeInventario />} /> */}
                        <Route path='/Ayuda' element={<MainAyuda />} />
                        <Route path='*' element={<Error404 />} />
                    </Route>


            

            



                </Routes>
            </div>
        </div>
    );
};

export default LayoutMain; 
