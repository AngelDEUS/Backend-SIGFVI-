import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import { Tabla_Entrega_item } from "./entregaItem";
import "./Inventario.css";
import "./AllStyle.css";
import "./pruebastyle.css";

function EntregaProducto() {
  const titulo = "Entrega de Productos";
  const descripcion =
    "En este panel es el encargado de gestionar las Cantidades Entrantes al Inventario.";

  const [datos, setDatos] = useState([]);
  const [productosAgregados, setProductosAgregados] = useState([]);
  const [searchId, setSearchId] = useState("");

  const consulta = () => {
    axios
      .get("http://localhost:3001/producto/Datos")
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

  const handleAgregarProducto = (producto) => {
    setProductosAgregados([...productosAgregados, producto]);
  };

  const handleSearch = () => {
    if (searchId.trim() !== "") {
      axios
        .get(`http://localhost:3001/producto/BuscarDatoPorId/${searchId}`)
        .then((response) => {
          setDatos(response.data.dato ? [response.data.dato] : []);
        })
        .catch((error) => {
          console.error("Error al buscar el dato:", error);
        });
    }
  };

  const handleIngresarProductos = async () => {
    if (productosAgregados.length > 0) {
      const { value: proveedorId } = await Swal.fire({
        title: "Selecciona un proveedor",
        input: "select",
        inputOptions: {
          1: "Bavaria",
          2: "Fritolay",
          3: "Alpina",
          4: "Margarita",
        },
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      });
  
      if (proveedorId) {
        const productosData = productosAgregados.map(producto => ({
          id: producto.id,
          cantidad: producto.cantidad
        }));

        try {
          const response = await axios.post("http://localhost:3001/inventario/registrarEntrada", {
            productos: productosData,
            proveedorId: proveedorId
          });
          
          Swal.fire({
            icon: "success",
            title: "Productos ingresados correctamente",
            text: "Los productos han sido ingresados correctamente al inventario."
          });
          
          setProductosAgregados([]);
        } catch (error) {
          console.error("Error al ingresar productos", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text: "Error al ingresar los productos. Por favor, intenta de nuevo."
          });
        }
      }
    } else {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "No hay productos agregados para ingresar"
      });
    }
  };
  
  
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
                    onChange={(e) => setSearchId(e.target.value)}
                  />
                  <button className="btn_buscar" onClick={handleSearch}>Buscar</button>
                </div>
                <div className="sep_vertical_b--outS"></div>
              </div>
              <div className="left__b"></div>
            </div>
          </div>
          <div className="conteiner_body conteiner_body2">
            <section className="table__body table__body2">
              <table>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Tipo Producto</th>
                    <th>Descripcion</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {!datos
                    ? "Loading....."
                    : datos.map((dato) => (
                        <Tabla_Entrega_item
                          key={dato.ID_Producto_PK}
                          id={dato.ID_Producto_PK}
                          nombre={dato.Nombre_Producto}
                          tProducto={dato.Tipo_Producto}
                          descripcion={dato.Descripcion}
                          onAgregar={handleAgregarProducto}
                        />
                      ))}
                </tbody>
              </table>
            </section>
            <div className="table__body contador_body">
              <table>
                <thead>
                  <tr>
                    <th>Codigo</th>
                    <th>Nombre</th>
                    <th>Cantidad</th>
                  </tr>
                </thead>
                <tbody>
                  {productosAgregados.map((producto, index) => (
                    <tr key={index}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.cantidad}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="boton_table">
              <button
                className="btn_f limpiar"
                onClick={handleIngresarProductos}
              >
                Ingresar Productos
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EntregaProducto;
