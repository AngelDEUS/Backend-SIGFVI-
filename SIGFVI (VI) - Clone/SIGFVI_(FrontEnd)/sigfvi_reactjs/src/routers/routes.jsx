import { Routes, Route } from 'react-router-dom';
import LoginMain from '../pages-views/Login/LoginMain';
import MainLayout from '../pages-views/mainLayout';
import Erro404 from '../pages-views/Error_Pages/error404';
import Home from '../pages-views/Home/Home';
import Dashboard from '../pages-views/Dashboard/main_Dashboard';
import Usuarios from '../pages-views/mod_Usuarios/mai_Usuarios';

import Inventario from '../pages-views/mod_inventario/mai_Inventario';

import VentasFacturacion from '../pages-views/mod_Ventas-Facturacion/main_VentasFacturacion';
import Ventas from '../pages-views/mod_Ventas-Facturacion/main_ventas'
import Tabs_ventas from '../pages-views/mod_Ventas-Facturacion/tabs_ventas'

// import Informes from '../pages-views/mod_Informes/main_informes';
import Ayuda from '../pages-views/Ayuda/MainAyuda';
import Informe from '../pages-views/mod_Informes/Informe';

import InformeVentas from '../pages-views/mod_Informes/InformeVentas';
import InformeDeudores from '../pages-views/mod_Informes/InformeDeudores';
import InformeInventario from '../pages-views/mod_Informes/InformeInventario';
import InformeEmpleados from '../pages-views/mod_Informes/InformeEmpleados';


import Tabla_inventario from "../pages-views/mod_inventario/tablaInventario";
import AgregarProducto from "../pages-views/mod_inventario/agregarProducto";

import Tabla_users from '../pages-views/mod_Usuarios/Tabla_users';
import Tabla_proveedores from '../pages-views/mod_Usuarios/Tabla_proveedores';
import Tabla_deudor from '../pages-views/mod_Usuarios/Tabla_deudor';

export function MyRoutes({ onLogin }) {
    return (
        <Routes>
            <Route path='/Layout/*' element={<MainLayout onLogin={onLogin} />} />
            <Route path='/Home' element={<Home />} />
            <Route path='/Dashboard' element={<Dashboard />} />
            {/* <Route path='/GestionUsuarios' element={<Usuarios />} /> */}
            <Route path='/GestionUsuarios/TablaUsuarios' element={<Tabla_users />} />
            <Route path='/GestionUsuarios/TablaProveedores' element={<Tabla_proveedores />} />
            <Route path='/GestionUsuarios/TablaDeudores' element={<Tabla_deudor />} />
            <Route path='/Inventario' element={<Inventario />} />
            <Route path='/Inventario/TablaInventario' element={<Tabla_inventario />} />
            <Route path='/Inventario/AgregarProducto' element={<AgregarProducto />} />

            <Route path='/VentasFacturacion/list' element={<VentasFacturacion />} />
            <Route path='/VentasFacturacion/ventas' element={<Ventas />} />
            <Route path='/VentasFacturacion/tabs' element={<Tabs_ventas />} />

            <Route path='/Informes' element={<Informe />} />
            <Route path='/GestionInformes/InformeVentas' element={<InformeVentas />} />
            <Route path='/GestionInformes/InformeDeudores' element={<InformeDeudores />} />
            <Route path='/GestionInformes/InformeEmpleados' element={<InformeEmpleados />} />
            <Route path='/GestionInformes/InformeInventario' element={<InformeInventario />} />

            <Route path='/Ayuda' element={<Ayuda />} />
            <Route path='*' element={<Erro404 />} />
            <Route path='/' element={<LoginMain onLogin={onLogin} />} />
            <Route path='/Login' element={<LoginMain onLogin={onLogin} />} />
        </Routes>
    );
}
