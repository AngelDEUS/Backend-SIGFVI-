import React, { useEffect, useState } from "react";
import axios from "axios";
import { Tabla_users_item } from "./tabla";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import { RegisterProd } from "./agregarProducto";
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
        .get(`http://localhost:3004/BuscarDatoPorId/${searchId}`)
        .then((response) => {
          setDatos(response.data.dato ? [response.data.dato] : []);
        })
        .catch((error) => {
          console.error("Error al buscar el dato:", error);
        });
    }
  };


  const consulta = () => {
    axios
      .get("http://localhost:3004/Datos")
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

  const [registerform, setRegisterform] = useState(false)

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
            <div className="buscar">
                <i className="bi bi-search buscar_i"></i>
                <div className='sep_vertical_b'></div>
                <input
                  type="text"
                  id="search"
                  name="search"
                  className="barra-buscar"
                  placeholder="ID del Pedido"
                  onChange={(e) => setSearchId(e.target.value)}
                />
                <button className='btn_buscar' onClick={handleSearch}>Buscar</button>
              </div>
            <div className="valores">

              <div>
                <div className="teush">
                <button type="button" className="boton b4" id="lanzar-modal" name="agregar" onClick={()=> setRegisterform(true)}>Agregar</button>

                  <button
                    type="button"
                    className="boton b4"
                    id="lanzar-modal2"
                    name="Reporte"
                  >
                    Reporte
                  </button>
                </div>
                <RegisterProd isOpen={registerform} closeModal={()=> setRegisterform(false)}/>
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
