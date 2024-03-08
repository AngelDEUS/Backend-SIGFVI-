import React, { useState } from 'react';
import './TabsMainGenerator.css';
import Swal from 'sweetalert2';
import ProductCardMaker from '../Card_Maker/ProductCardMaker';
import urlimg from '../../../assets/Productos/Envasado/imagen-01.png'

const TabsMainGenerator = () => {
  const [tabs, setTabs] = useState([{ id: 1, title: `Ticket (1)`, content: 'Contenido de la pestaña 1', product: { id_producto: 'ASRO-001', image: urlimg, title: 'Absolute Vodka', description: 'Descripción del producto', price: 30000 } }]);
  const [activeTab, setActiveTab] = useState(0);
  const [nextId, setNextId] = useState(2);

  const addTab = () => {
    const newTab = { id: nextId, title: `Ticket (${nextId})`, content: `Contenido de la pestaña ${nextId}`, product: { id_producto: 'ASRO-001', image: urlimg, title: 'Absolute Vodka', description: 'Descripción del producto', price: 30000 } };
    setTabs([...tabs, newTab]);
    setActiveTab(nextId - 1);
    setNextId(nextId + 1);
  };

  const removeTab = (idToRemove) => {
    if (tabs.length === 1) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Debe haber al menos una pestaña.',
      });
      return;
    }

    Swal.fire({
      title: '¿Estás seguro?',
      text: '¿Quieres eliminar esta pestaña?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        const newTabs = tabs.filter((tab) => tab.id !== idToRemove);
        let newActiveTab = activeTab;
        if (activeTab >= newTabs.length) {
          newActiveTab = newTabs.length - 1;
        }
        setTabs(newTabs);
        setActiveTab(newActiveTab);
      }
    });
  };

  const changeTabName = (id) => {
    Swal.fire({
      title: 'Cambiar nombre de tab',
      input: 'text',
      inputLabel: 'Nuevo nombre',
      inputValue: tabs[activeTab].title,
      showCancelButton: true,
      confirmButtonText: 'Guardar',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes ingresar un nombre';
        }
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const newTabs = tabs.map((tab) => {
          if (tab.id === id) {
            return { ...tab, title: result.value };
          }
          return tab;
        });
        setTabs(newTabs);
      }
    });
  };

  return (
    <div className="tabs-container">
      <div className="tabs">
        <div className="tabs_tittle">
          {tabs.map((tab) => (
            <div
              key={tab.id}
              className={`tab ${tab.id === tabs[activeTab]?.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tabs.findIndex((t) => t.id === tab.id))}
            >
              <span className='tittle_tab--Gen'>{tab.title}</span>
              <button className='botonBorrarTab' onClick={() => removeTab(tab.id)}>-</button>
            </div>
          ))}
        </div>
        <button className='btnTop_agregar_tab' onClick={addTab}>+</button>
      </div>
      <div className="tab-content">
        {tabs.length > 0 && tabs[activeTab] && (
          <div className="tab-info-content">
            <div className="infoTopSep">
            <div className='inforRapidaTab'>
              <p><span className='resaltarPTab'>ID ticket:</span> {tabs[activeTab].id}.</p>
              <p>   ||   </p>
              <p><span className='resaltarPTab'>Nombre de ticket:</span> {tabs[activeTab].title}.</p>
            </div>
              <button className='cambiarNombreTab' onClick={() => changeTabName(tabs[activeTab].id)}>Nombre de tab</button>
            </div>
            <div className="divisorTab"></div>
            <div className="subContentGenerator" id='contenidoSubTab_Main'>
              
            </div>
          </div>
        )}
      </div>
      <div className="footer__tabV"></div>
    </div>
  );
};

export default TabsMainGenerator;