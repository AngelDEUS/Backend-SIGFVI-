import React, { useState, useEffect } from 'react';
import './TabsMainGenerator.css';
import Swal from 'sweetalert2';
import ProductCardMaker from '../Card_Maker/ProductCardMaker';

const TabsMainGenerator = ({ modalAbierto, onCloseModal, agregarProductosAPestana, handleSetActiveTab }) => {
  const [tabs, setTabs] = useState([
    {
      id: 1,
      title: `Ticket (1)`,
      content: 'Contenido de la pestaña 1',
      productos: [] // Array para almacenar los productos asociados a esta pestaña
    }
  ]);


  const [activeTab, setActiveTab] = useState(0);
  const [nextId, setNextId] = useState(2);

  // Función para agregar una nueva pestaña
  const addTab = () => {
    const newTab = {
      id: nextId,
      title: `Ticket (${nextId})`,
      content: `Contenido de la pestaña ${nextId}`,
      productos: [] // Inicialmente vacío, ya que aún no hay productos asociados
    };
    setTabs([...tabs, newTab]);
    setActiveTab(nextId - 1);
    setNextId(nextId + 1);
  };

  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
    handleSetActiveTab(tabIndex); // Llamamos a la función pasada desde el padre para cambiar activeTab
  };

  // Función para eliminar una pestaña
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
        console.log("Se elimino la tab con id: ", );
      }
    });
  };

  // Función para cambiar el nombre de una pestaña
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



  const handleAgregarProductos = (productos) => {
    const productosArray = Array.isArray(productos) ? productos : [productos];
    console.log('Valor de tabId:', tabs[activeTab].id);
    agregarProductosAPestana(productosArray, tabs[activeTab].id); // Pasar el ID de la pestaña activa
    onCloseModal();
    console.log('Tenemos esto en (handleAgregarProductos): ', agregarProductosAPestana(productosArray, tabs[activeTab].id));
};


  console.log('(TabsGen_Comp) Estamos en la pestaña con ID:', tabs[activeTab]?.id);
  console.log('(TabsGen_Comp) Valor de activeTab dentro de TabsMainGenerator:', activeTab);

  return (
    <div className="tabs-container">
      {/* Renderizado de las pestañas */}
      <div className="tabs">
        <div className="tabs_tittle">
          {tabs.map((tab, index) => (
            <div
              key={tab.id}
              className={`tab ${tab.id === tabs[activeTab]?.id ? 'active' : ''}`}
              onClick={() => handleTabClick(index)}
            >
              <span className='tittle_tab--Gen'>{tab.title}</span>
              <button className='botonBorrarTab' onClick={() => removeTab(tab.id)}>-</button>
            </div>
          ))}

        </div>
        <button className='btnTop_agregar_tab' onClick={addTab}>+</button>
      </div>
      {/* Contenido de la pestaña activa */}
      <div className="tab-content">
        {tabs.length > 0 && tabs[activeTab] && (
          <div className="tab-info-content">
            {/* Información de la pestaña */}
            <div className="infoTopSep">
              <div className='inforRapidaTab'>
                <p><span className='resaltarPTab'>ID ticket:</span> {tabs[activeTab].id}.</p>
                <p>   ||   </p>
                <p><span className='resaltarPTab'>Nombre de ticket:</span> {tabs[activeTab].title}.</p>
              </div>
              <button className='cambiarNombreTab' onClick={() => changeTabName(tabs[activeTab].id)}>Nombre de tab</button>
            </div>
            <div className="divisorTab"></div>
            {/* Renderizado de las tarjetas de producto asociadas a la pestaña */}
            <div className="subContentGenerator" id='contenidoSubTab_Main'>
              {tabs[activeTab]?.productos && (
                <ProductCardMaker products={tabs[activeTab].productos} />
              )}
            </div>
          </div>
        )}
      </div>
      <div className="footer__tabV"></div>
    </div>
  );
};

export default TabsMainGenerator;
