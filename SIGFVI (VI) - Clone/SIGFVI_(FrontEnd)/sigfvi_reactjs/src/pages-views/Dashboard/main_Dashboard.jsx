import React from 'react'
// import Modals from '../../components/modal/Modals';
import TituloyDesc from '../../components/Titles/TituloyDesc'
import { GraficasProduc, GraficasMasVendido, GraficaStockBajo } from '../Dashboard/Graficas';



const main_Dashboard = () => {
    const titulo = 'Dashboard';
    const descipcion = 'En este apartado se observa las graficas de los productos en stock, los más vendidos y con stock bajo.';

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
                
                {/* <p className='textodes1'>En esta grafica se puede observar los productos que más ventas han tenido.</p>
                <p className='textodes2'>En esta grafica se puede observar los productos con el menor stock</p> */}

            </div>
        </div>
    )
}

export default main_Dashboard