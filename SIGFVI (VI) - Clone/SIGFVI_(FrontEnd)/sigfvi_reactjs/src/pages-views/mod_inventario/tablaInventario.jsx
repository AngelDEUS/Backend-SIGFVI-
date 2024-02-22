import React, { useState } from "react";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import useInventario from "./InventarioDates";
import Modal from "react-modal"; //npm install --save react-modal
import "./Inventario.css";
import "./AllStyle.css";

const Tabla_Inventario = () => {
  const titulo = "Inventario";
  const descipcion =
    "En este panel es el encargado de gestionar los productos, elstock y notificaciones por estado";

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const { inventario, nuevoInventario, handleInputChange, agregarInventario, borrar } =
    useInventario();


  return (
    <div className="mod__inventario--s">
      <div className="encabezado__titulos">
        <TituloyDesc titulo={titulo} descripcion={descipcion} />
      </div>
      <div className="mod__inventario">
        <div className="inventario">
          <div className="subtitulo">
            <h3>Inventario de Productos</h3>
          </div>
          <div className="valores">
            <div>
              <input
                type="text"
                className="buscar"
                placeholder="Buscar en el inventario"
              />
            </div>
            <div className="valor1">
              <button onClick={openModal} className="boton_modal">
                Agregar
              </button>
            </div>
          </div>
        </div>
        <section className="table__body">
          <table>
            <thead>
              <tr>
                <th>Codigo de producto</th>
                <th>Nombre del producto</th>
                <th>Tipo de producto</th>
                <th>Cantidad Neta de Producto</th>
                <th>Cantidad de unidades</th>
                <th>Precio de proveedor</th>
                <th>Precio de Venta</th>
                <th>Fecha de Caducidad</th>
                <th>Nombre del proveedor</th>
                <th>Borrar</th>
              </tr>
            </thead>
            <tbody>
              {inventario.map((inv) => {
                return (
                  <tr key={inv.id}>
                    <td>{inv.codigo}</td>
                    <td>{inv.nombre}</td>
                    <td>{inv.tipo}</td>
                    <td>{inv.cantidadNeta}</td>
                    <td>{inv.lote}</td>
                    <td>{inv.precioProve}</td>
                    <td>{inv.precioVenta}</td>
                    <td>{inv.fechaCaducidad}</td>
                    <td>{inv.proveedor}</td>
                    <td>
                      <button className="botonBorrar" onClick={() => borrar(inv.codigo)}>Borrar</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Agregar Producto"
      >
        <div class="mainModal">
          <div class="mainTitulo">
            <h1>Producto</h1>
            <div className="MainBoton">
              {" "}
              <button onClick={closeModal} className="boton_modal2">
                X
              </button>
            </div>
          </div>
          <form className="modalForm" onSubmit={agregarInventario}>
            <div class="mainIzquierda">
              <input
                type="text"
                placeholder="Nombre del Producto"
                name="nombre"
                value={nuevoInventario.nombre}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Cantidad Neto"
                name="cantidadNeta"
                value={nuevoInventario.cantidadNeta}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Precio de Compra"
                name="precioProve"
                value={nuevoInventario.precioProve}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Empresa Proveedor"
                name="proveedor"
                value={nuevoInventario.proveedor}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Fecha de Caducidad"
                name="fechaCaducidad"
                value={nuevoInventario.fechaCaducidad}
                onChange={handleInputChange}
              />

            </div>
            <div class="mainDerecha">
              <input
                type="text"
                placeholder="Tipo de Producto"
                name="tipo"
                value={nuevoInventario.tipo}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Codigo"
                name="codigo"
                value={nuevoInventario.codigo}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Precio de Venta"
                name="precioVenta"
                value={nuevoInventario.precioVenta}
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Cantiad en Inidades"
                name="lote"
                value={nuevoInventario.lote}
                onChange={handleInputChange}
              />
              <div className="MainBoton2">
                <button className="botonForm" type="submit">
                  Agregar
                </button>
              </div>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default Tabla_Inventario;
