import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabla_users_item } from "./tabla";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import { Modal, Button, Form } from "react-bootstrap";
import "./Inventario.css";
import "./AllStyle.css";

const Tabla_Inventario = () => {
  const titulo = "Inventario";
  const descripcion =
    "En este panel es el encargado de gestionar los productos, el stock y notificaciones por estado";

  const [datos, setDatos] = useState([]);
  const [searchId, setSearchId] = useState("");

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      axios
        .get(`http://localhost:3001/BuscarDatoPorId/${searchId}`)
        .then((response) => {
          setDatos(response.data.dato ? [response.data.dato] : []);
        })
        .catch((error) => {
          console.error("Error al buscar el dato:", error);
        });
    }
  };

  useEffect(() => {
    console.log("Realizando solicitud...");
    axios
      .get("http://localhost:3001/Datos")
      .then((response) => {
        console.log("Datos recibidos:", response.data.datos);
        setDatos(response.data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  }, []);

  return (
    <>
      <div className="mod__inventario--s">
        <div className="encabezado__titulos">
          <TituloyDesc titulo={titulo} descripcion={descripcion} />
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
                  value={searchId}
                  onChange={(e) => setSearchId(e.target.value)}
                />
              </div>
              <div className="valor1">
                <button className="boton_modal" onClick={handleSearch}>
                  Buscar
                </button>
              </div>
            </div>
          </div>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre</th>
                  <th>Tipo Producto</th>
                  <th>Cantidad</th>
                  <th>Precio Compra</th>
                  <th>Precio Venta</th>
                  <th>foto</th>
                  <th>Estado</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {!datos
                  ? "Loading....."
                  : datos.map((dato) => (
                      <Tabla_users_item
                        key={dato.ID_Producto_PK}
                        id={dato.ID_Producto_PK}
                        nombre={dato.Nombre_Producto}
                        tProducto={dato.ID_Tipo_Producto_FK}
                        cantidad={dato.Cantida_Neto_producto}
                        precioCompra={dato.Precio_Proveedor}
                        precioVenta={dato.Precio_Venta}
                        foto={dato.Foto_Producto}
                        estado={dato.ID_Estado_FK}
                      />
                    ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
};

export default Tabla_Inventario;
