import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabla_Prod_item } from "./tablaProductoitems";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import { RegisterProd } from "./agregarProducto";
import "./Inventario.css";
import "./AllStyle.css";

const Tabla_Producto = () => {
  const titulo = "Producto";
  const descripcion =
    "En este panel es el encargado de gestionar los productos.";

  const [datos, setDatos] = useState([]);
  const [searchId, setSearchId] = useState("");

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      axios
        .get(`http://localhost:3001/BuscarDatoPorId/${searchId}`)
        .then((response) => {
          setDatos(response.data.datos ? response.data.datos : []);
        })
        .catch((error) => {
          console.error("Error al buscar el dato:", error);
        });
    } else {
      consulta();
    }
  };

  const consulta = () => {
    axios
      .get("http://localhost:3001/Datos")
      .then((response) => {
        console.log("Datos recibidos:", response.data.datos);
        setDatos(response.data.datos);
      })
      .catch((error) => {
        console.error("Error al obtener datos:", error);
      });
  };

  useEffect(() => {
    console.log("Realizando solicitud...");
    consulta();
  }, []);

  const [registerform, setRegisterform] = useState(false);
  console.log(datos, "holaaa")
  return (
    <>
      <div className="mod__inventario--s">
        <div className="encabezado__titulos">
          <TituloyDesc titulo={titulo} descripcion={descripcion} />
        </div>
        <div className="mod__inventario">
          <div className="inventario">
            <div className="subtitulo">
              <h3 className="subtitulo__h3">Gestion Productos</h3>
            </div>
            {/*
            <div className="botones_arriba">
              <div className="buscar">
                <i className="bi bi-search buscar_i"></i>
                <div className="sep_vertical_b"></div>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="barra-buscar"
                  placeholder="ID del Pedido"
                  onChange={(e) => setSearchId(e.target.value)}
                />
                <button className="btn_buscar" onClick={handleSearch}>
                  Buscar
                </button>
              </div>
              <div className="valores">
                <div>
                  <div className="teush">
                    <button
                      type="button"
                      className="btn_f limpiar"
                      id="lanzar-modal"
                      name="agregar"
                      onClick={() => setRegisterform(true)}
                    >
                      Agregar
                    </button>

                    <button
                      type="button"
                      className="btn_f limpiar"
                      id="lanzar-modal2"
                      name="Reporte"
                    >
                      Reporte
                    </button>
                  </div>
                </div>
                <RegisterProd
                  isOpen={registerform}
                  closeModal={() => setRegisterform(false)}
                  reConsulta={consulta}
                />
              </div>
            </div>
  */}
            <div className="busqueda__prod">
              <div className="buscar_productos">
                <div className="right__b">
                  <div className="buscar">
                    <i className="bi bi-search buscar_i"></i>
                    <div className="sep_vertical_b"></div>
                    <input
                      type="text"
                      placeholder="Buscar productos"
                      id="search"
                      name="search"
                      onChange={(e) => setSearchId(e.target.value)}
                    />
                    <button className="btn_buscar" onClick={handleSearch}>
                      Buscar
                    </button>
                  </div>
                  <div className="sep_vertical_b--outS"></div>
                </div>
                <div className="left__b">
                  <button
                    className="btn_f limpiar"
                    id="lanzar-modal"
                    name="agregar"
                    onClick={() => setRegisterform(true)}
                  >
                    +Agregar
                  </button>
                </div>
                <RegisterProd
                  isOpen={registerform}
                  closeModal={() => setRegisterform(false)}
                  reConsulta={consulta}
                />
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
                  <th>Descripcion</th>
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
                      <Tabla_Prod_item
                        key={dato.ID_Producto_PK}
                        id={dato.ID_Producto_PK}
                        nombre={dato.Nombre_Producto}
                        tProducto={dato.Tipo_Producto}
                        descripcion={dato.Descripcion}
                        precioCompra={dato.Precio_Proveedor}
                        precioVenta={dato.Precio_Venta}
                        foto={dato.Foto_Producto}
                        estado={dato.Estado}
                        consulta={consulta}
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

export default Tabla_Producto;
