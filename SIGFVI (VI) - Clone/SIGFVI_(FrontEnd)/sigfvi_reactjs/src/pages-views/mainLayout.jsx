import React, { useState } from 'react';  // Asegúrate de importar useState desde React
import SideMenu from '../components/SideMenu/SideMenu';
import { MyRoutes } from '../routers/routes';

const LayoutMain = () => {
    const [miniBarraLateral, setMiniBarraLateral] = useState(false);

    const toggleMiniBarraLateral = () => {
        setMiniBarraLateral(!miniBarraLateral);
    };

    return (
        <div>
            <SideMenu miniBarraLateral={miniBarraLateral} toggleMiniBarraLateral={toggleMiniBarraLateral} />
            <div className={`main-content ${miniBarraLateral ? 'collapsed' : ''}`}>
                <MyRoutes />
            </div>
        </div>
    );
};

export default LayoutMain; 
