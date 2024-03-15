import React, { useEffect, useState } from "react";
import axios from "axios";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import "./Inventario.css";
import "./AllStyle.css";
import "./pruebastyle.css";

<<<<<<< HEAD
function entragaProducto() {
=======
function EntragaProducto() {
>>>>>>> origin/Login
  const titulo = "Entrega de Productos";
  const descripcion =
    "En este panel es el encargado de gestionar las Cantidades Entrantes al Inventario.";


  return (
<>
      <div className="mod__inventario--s">
        <div className="encabezado__titulos">
          <TituloyDesc titulo={titulo} descripcion={descripcion} />
        </div>
        <div className="mod__inventario">
          <div className="inventario">
            <div className="subtitulo">
              <h3 className="subtitulo__h3">Productos</h3>
            </div>
          </div>
          <div className="busqueda__prod">
            <div className="buscar_productos">
              <div className="right__b">
                <div className="buscar">
                  <i className="bi bi-search buscar_i"></i>
                  <div className="sep_vertical_b"></div>
                  <input
                    type="text"
                    placeholder="Buscar productos"
                    id="buscarProducto"
                  />
                  <button className="btn_buscar">Buscar</button>
                </div>
                <div className="sep_vertical_b--outS"></div>
              </div>
              <div className="left__b">
              </div>
            </div>
          </div>
          <section className="table__body">

          </section>
        </div>
      </div>
    </>
  )
}

<<<<<<< HEAD
export default entragaProducto
=======
export default EntragaProducto
>>>>>>> origin/Login
