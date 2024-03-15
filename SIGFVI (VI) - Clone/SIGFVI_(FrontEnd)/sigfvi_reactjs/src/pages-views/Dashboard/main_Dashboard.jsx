import React from 'react'
import TituloyDesc from '../../components/Titles/TituloyDesc'
// import Modals from '../../components/modal/Modals';
import { GraficasProduc, GraficasMasVendido, GraficaStockBajo } from '../Dashboard/Graficas';



const main_Dashboard = () => {
    const titulo = 'Dashboard';
    const descipcion = 'En este apartado se observa las graficas de Administradores y Empleados';

    return (
        <div>
            <div className='encabezado__titulos'>
                <TituloyDesc titulo={titulo} descripcion={descipcion} />
            </div>
            <div className='contenido-dashboard'>
                {/* <Modals /> */}
                <GraficasProduc/>
                <GraficasMasVendido/>
                <GraficaStockBajo/>
            </div>
        </div>
    )
}

export default main_Dashboard