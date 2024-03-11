import React, { useState } from 'react';
import Swal from 'sweetalert2';
import './TabsVentas.css';
import CardProducto from './Card_producto';

const TabsVentas = ({ productos, productosVenta,setProductosVenta }) => {
    const [tabs, setTabs] = useState([
        { id: 1, title: 'Ticket (1)', content: 'Contenido de Ticket (1)' },
    ]);
    const [activeTab, setActiveTab] = useState(1);

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };

    const addNewTab = async () => {
        const { value: ticketTitle } = await Swal.fire({
            title: 'Ingrese el nombre del ticket:',
            input: 'text',
            showCancelButton: true,
            inputPlaceholder: 'Nombre del Ticket',
            preConfirm: (title) => {
                if (!title) {
                    const defaultTitle = `Ticket (${tabs.length + 1})`;
                    const isDuplicate = tabs.some((tab) => tab.title === defaultTitle);
                    return isDuplicate ? null : defaultTitle;
                }
                const isDuplicate = tabs.some((tab) => tab.title === title);
                if (isDuplicate) {
                    Swal.showValidationMessage('Este nombre de ticket ya está en uso');
                }
                return !isDuplicate ? title : null;
            },
        });

        if (ticketTitle) {
            const newTab = {
                id: tabs.length + 1,
                title: ticketTitle,
                content: `Contenido de ${ticketTitle}`,
            };

            setTabs([...tabs, newTab]);
            setActiveTab(newTab.id);
        }
    };

    const deleteTab = (tabId) => {
        if (tabs.length > 1) {
            const updatedTabs = tabs.filter((tab) => tab.id !== tabId);
            setTabs(updatedTabs);
            const newActiveTab = updatedTabs[updatedTabs.length - 1].id;
            setActiveTab(newActiveTab);
        } else {
            Swal.fire('No se puede eliminar la última pestaña', '', 'warning');
        }
    };

    const renameTab = async (tabId) => {
        const { value: newTitle } = await Swal.fire({
            title: 'Cambiar nombre de la pestaña:',
            input: 'text',
            inputValue: tabs.find((tab) => tab.id === tabId).title,
            showCancelButton: true,
            inputPlaceholder: 'Nuevo nombre',
            preConfirm: (title) => {
                if (!title) {
                    const defaultTitle = `Ticket (${tabId})`;
                    const isDuplicate = tabs.some((tab) => tab.title === defaultTitle);
                    return isDuplicate ? null : defaultTitle;
                }
                const isDuplicate = tabs.some((tab) => tab.title === title && tab.id !== tabId);
                if (isDuplicate) {
                    Swal.showValidationMessage('Este nombre de ticket ya está en uso');
                }
                return !isDuplicate ? title : null;
            },
        });

        if (newTitle) {
            const updatedTabs = tabs.map((tab) =>
                tab.id === tabId
                    ? { ...tab, title: newTitle, content: `Contenido de ${newTitle}` }
                    : tab
            );
            setTabs(updatedTabs);
        }
    };

    const handleAgregarProductoVenta = (producto) => {
        setProductosVenta((prevProductosVenta) => [...prevProductosVenta, producto]);
    };
   
    

    // Combina los productos y productosVenta para mostrarlos juntos
    const mergedProducts = Array.isArray(productosVenta) ? [...productos, ...productosVenta] : [...productos];

    return (
        <div className="tabs-container">
            <div className="tabs">
                {tabs.map((tab) => (
                    <TabButton
                        key={tab.id}
                        tabId={tab.id}
                        activeTab={activeTab}
                        onClick={handleTabClick}
                    >
                        {tab.title}
                    </TabButton>
                ))}
                <button className="add-tab-button" onClick={addNewTab}>
                    +
                </button>
            </div>
            <div className="tab-content">
                <div className="tab-panel">
                    <div className="card-container">
                        {mergedProducts.slice(0, 4).map((producto) => (
                            <CardProducto 
                            key={producto.Id_producto} 
                            producto={producto} 
                            onAgregarProductoVenta={handleAgregarProductoVenta} 
                        />
                        ))}
                    </div>
                </div>
            </div>
            <div className='tab-footer'></div>
            <div className="tab-menu">
                <button onClick={() => deleteTab(activeTab)}>Eliminar</button>
                <button onClick={() => renameTab(activeTab)}>Renombrar</button>
            </div>
        </div>
    );
};

const TabButton = ({ tabId, activeTab, onClick, children }) => {
    const isActive = tabId === activeTab;

    return (
        <button
            className={`tab-button ${isActive ? 'active' : ''}`}
            onClick={() => onClick(tabId)}
        >
            {children}
        </button>
    );
};
export default TabsVentas;
