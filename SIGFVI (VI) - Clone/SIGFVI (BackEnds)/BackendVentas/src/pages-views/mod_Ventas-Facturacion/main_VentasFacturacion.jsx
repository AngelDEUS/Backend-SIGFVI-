import TituloyDesc from '../../components/Titles/TituloyDesc'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import "./estilosListaVentas.css"
import './Tabla.css';
import './mod_ventas.css';


const main_VentasFacturacion = () => {

  const titulo = 'Listado de ventas';
  const descipcion = 'En este panel se mostrarán todas las ventas';

  // -->
  const [pedidos, setPedidos] = useState([]);
  const [idPedido, setIdPedido] = useState('');
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);

  // Para editar mi Pedido.
  const [editarPedido, setEditarPedido] = useState({
    ID_Pedido_PK: '',
    ID_Metodo_Pago_FK: '',
    Fecha_Pedido: '',
    Hora_Pedido: '',
    IVA: '',
    Total_Pedido: '',
    ID_Estado_FK: '',
    ID_Saldo_PK: ''
  });

  useEffect(() => {
    /* 
        Llamar a la función de obtener pedidos al cargar el componente.
    */
    obtenerPedidos();
  }, []);


  const obtenerPedidos = () => {
    Axios.get("http://localhost:3001/pedidos")
      .then((response) => {
        setPedidos(response.data);
        console.log("pedidos encontrados.");
      })
      .catch((error) => {
        console.error('Error al obtener los datos de los pedidos:', error);
      });
  };


  const handleChange = (event) => {
    /*Función para manejar cambios en el campo de entrada */
    setIdPedido(event.target.value);
  };

  const buscarPedido = () => {
    if (idPedido) {
      Axios.get(`http://localhost:3001/pedido/${idPedido}`)
        .then((response) => {
          setPedidoEncontrado(response.data);
          console.log(`se esta buscando: ${idPedido}`);
          console.log(`Se encontro: `, response.data);
        })
        .catch((error) => {
          console.error('Error al buscar el pedido:', error);
          setPedidoEncontrado(null);
        });
    } else {
      setPedidoEncontrado(null);
      obtenerPedidos(); // Aquí volvemos a cargar todos los pedidos cuando el campo de búsqueda está vacío
    }
  };


  const editarPedidoHandler = (pedido) => {
    /* ---- Función para cargar los datos del pedido en los campos de edicion  ---*/
    setEditarPedido({
      ID_Pedido_PK: pedido.ID_Pedido_PK,
      ID_Metodo_Pago_FK: pedido.ID_Metodo_Pago_FK,
      Fecha_Pedido: pedido.Fecha_Pedido,
      Hora_Pedido: pedido.Hora_Pedido,
      IVA: pedido.IVA,
      Total_Pedido: pedido.Total_Pedido,
      ID_Estado_FK: pedido.ID_Estado_FK,
      ID_Saldo_PK: pedido.ID_Saldo_PK
    });
  };

  const limpiarCampos = () => {
    /* ---- Limpiar Campos  ---*/
    setEditarPedido({
      ID_Pedido_PK: '',
      ID_Metodo_Pago_FK: '',
      Fecha_Pedido: '',
      Hora_Pedido: '',
      IVA: '',
      Total_Pedido: '',
      ID_Estado_FK: '',
      ID_Saldo_PK: ''
    });
  };

  // ACTUALIZAR PEDIDO: ----->
  const actualizarPedido = () => {
    Axios.put(`http://localhost:3001/pedidoActualizar/${editarPedido.ID_Pedido_PK}`, editarPedido)
      .then(() => {
        console.log('Pedido actualizado correctamente');
        obtenerPedidos(); // Actualizar lista de pedidos
        limpiarCampos();
      })
      .catch((error) => {
        console.error('Error al actualizar el pedido:', error);
      });
  };

  // ELIMINAR PEDIDO: ----->
  // Función para eliminar el pedido
  const eliminarPedido = (idPedido) => {
    Swal.fire({
      title: '¿Está seguro de eliminar este pedido?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar'
    }).then((result) => {
      if (result.isConfirmed) {
        Axios.delete(`http://localhost:3001/pedidoEliminar/${idPedido}`)
          .then(() => {
            console.log('Pedido eliminado correctamente');
            obtenerPedidos(); // Actualizar lista de pedidos
            Swal.fire(
              'Eliminado',
              'El pedido ha sido eliminado correctamente',
              'success'
            );
          })
          .catch((error) => {
            console.error('Error al eliminar el pedido:', error);
            Swal.fire(
              'Error',
              'No se pudo eliminar el pedido',
              'error'
            );
          });
      }
    });
  };


  return (
    <div>
      <TituloyDesc titulo={titulo} descripcion={descipcion} />

      <div className="editarPedido">
        <div className="inputsGrup">
          <fieldset>
            <legend>Inputs a actualizar</legend>
            <div className="inputs-grup">
              <div className="form-group">
                <label>ID</label>
                <input type="text" id="input0" placeholder="Ingrese valor" disabled value={editarPedido.ID_Pedido_PK} 
                onChange={(e) => setEditarPedido({ ...editarPedido, ID_Pedido_PK: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>Id Metodo de Pago</label>
                <input type="text" id="input1" placeholder="Ingrese valor" value={editarPedido.ID_Metodo_Pago_FK} 
                onChange={(e) => setEditarPedido({ ...editarPedido, ID_Metodo_Pago_FK: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>Fecha Pedido</label>
                <input type="text" id="input2" placeholder="Ingrese valor" value={editarPedido.Fecha_Pedido} 
                onChange={(e) => setEditarPedido({ ...editarPedido, Fecha_Pedido: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>Hora Pedido</label>
                <input type="text" id="input3" placeholder="Ingrese valor" value={editarPedido.Hora_Pedido} 
                onChange={(e) => setEditarPedido({ ...editarPedido, Hora_Pedido: e.target.value })}/>
              </div>
            </div>

            <div className="inputs-grup">
              <div className="form-group">
                <label>IVA</label>
                <input type="text" id="input4" placeholder="Ingrese valor" value={editarPedido.IVA} 
                onChange={(e) => setEditarPedido({ ...editarPedido, IVA: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>Total Pedido</label>
                <input type="text" id="input5" placeholder="Ingrese valor" value={editarPedido.Total_Pedido} 
                onChange={(e) => setEditarPedido({ ...editarPedido, Total_Pedido: e.target.value })}/>
              </div>
              <div className="form-group">
                <label>ID Estado</label>
                <input type="text" id="input6" placeholder="Ingrese valor" value={editarPedido.ID_Estado_FK}  
                onChange={(e) => setEditarPedido({ ...editarPedido, ID_Estado_FK: e.target.value })}/>
              </div>
            </div>

            <div className="inputs-grup">
              <div className="form-group">
                <label>ID Saldo deudor</label>
                <input type="text" id="input7" placeholder="Ingrese valor" disabled value={editarPedido.ID_Saldo_PK}
                onChange={(e) => setEditarPedido({ ...editarPedido, ID_Saldo_PK: e.target.value })}/>
              </div>
            </div>
            <div className="divisorHr2"></div>
            <div className="inputs-grup">
              <button className='btn_f actualizar' type="button" onClick={actualizarPedido}>Actualizar</button>
              <button className='btn_f cancelarActualizar' type="button" onClick={limpiarCampos}>Cancelar</button>
            </div>
          </fieldset>
        </div>
      </div>
      <div className="divisorHr"></div>
      <div className="linstaVentas-Contenedor">
        <div className="lista">
          <div className="busqueda__prod-Light">
            <div className='right__b'>
              <div className="buscar">
                <i className="bi bi-search buscar_i"></i>
                <div className='sep_vertical_b'></div>
                <input
                  type="text"
                  value={idPedido}
                  onChange={handleChange}
                  placeholder="ID del Pedido"
                />
                <button className='btn_buscar' onClick={buscarPedido}>Buscar</button>
              </div>
            </div>
          </div>
          <section className="table__body">
            <table className='table'>
              <thead>
                <tr>
                  <th>ID Pedido</th>
                  <th>Método de Pago</th>
                  <th>Fecha de Pedido</th>
                  <th>Hora de Pedido</th>
                  <th>IVA</th>
                  <th>Total de Pedido</th>
                  <th>Estado</th>
                  <th>Saldo</th>
                  <th className='thAcciones'>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {pedidoEncontrado && pedidoEncontrado.length > 0 ? ( // Verificar si hay coincidencias.
                  pedidoEncontrado.map((pedido) => ( // Caso de pedido encontrado por ID.
                    <tr key={pedido.ID_Pedido_PK}>
                      <td>{pedido.ID_Pedido_PK}</td>
                      <td>{pedido.ID_Metodo_Pago_FK}</td>
                      <td>{pedido.Fecha_Pedido}</td>
                      <td>{pedido.Hora_Pedido}</td>
                      <td>{pedido.IVA}</td>
                      <td>${pedido.Total_Pedido}</td>
                      <td>${pedido.ID_Estado_FK}</td>
                      <td>{pedido.ID_Saldo_PK}</td>
                      <td className='tdAcciones'>
                        <div className="btn-grup">
                          <button className="btn_f limpiar" onClick={() => editarPedidoHandler(pedido)}>Actualizar</button><br />
                          <button className="btn_f cancelar" onClick={() => eliminarPedido(pedido.ID_Pedido_PK)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  pedidos.map((pedido) => ( // Caso de pedidos encontrados.
                    <tr key={pedido.ID_Pedido_PK}>
                      <td>{pedido.ID_Pedido_PK}</td>
                      <td>{pedido.ID_Metodo_Pago_FK}</td>
                      <td>{pedido.Fecha_Pedido}</td>
                      <td>{pedido.Hora_Pedido}</td>
                      <td>${pedido.IVA}</td>
                      <td>${pedido.Total_Pedido}</td>
                      <td>{pedido.ID_Estado_FK}</td>
                      <td>{pedido.ID_Saldo_PK}</td>
                      <td className='tdAcciones'>
                        <div className="btn-grup">
                          <button className="btn_f limpiar" onClick={() => editarPedidoHandler(pedido)}>Actualizar</button><br />
                          <button className="btn_f cancelar" onClick={() => eliminarPedido(pedido.ID_Pedido_PK)}>Eliminar</button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>

            </table>
          </section>
        </div>
      </div>
    </div>
  )
}

export default main_VentasFacturacion;