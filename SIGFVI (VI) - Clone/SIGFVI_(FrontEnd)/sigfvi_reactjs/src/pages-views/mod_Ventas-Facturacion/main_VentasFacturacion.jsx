import TituloyDesc from '../../components/Titles/TituloyDesc'
import { useState, useEffect } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';

import "./estilosListaVentas.css"
import './Tabla.css';
import './mod_ventas.css';

// Modal
import { useModal } from '../../hooks/modal/useModal.js';
import Modal from '../../components/modal/Modal.jsx'


const Main_VentasFacturacion = () => {

  // Modal de Actualizar
  const [isOpenModal1, OpenModal1, closeModal1] = useModal(false); // Desestructuracion del Hook useModal
  const tittleModal = 'Actualizar Pedido';
  const descModal = `Esta venta funciona para actualizar los datos de un pedido, tenga en cuenta que no se puede editar el ID, además rectifique antes de actualizar por favor.
  Siempre puede volver a actualizar, si así lo desee.`;

  //Modal De Agregar
  const [isOpenModalAgregar, OpenModalAgregar, closeModalAgregar] = useModal(false); // Desestructuracion del Hook useModal
  const tittleModalAgregar = 'Agregar Pedido';
  const descModalAgregar = `Esta venta funciona para agregar un nuevo pedido a la tabla, tenga en cuenta que no se puede agregar un ID que ya exista, además rectifique antes de agregar por favor.`;

  const titulo = 'Listado de ventas';
  var fechaActual = new Date();
  var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  var fechaFormateada = fechaActual.toLocaleDateString('es-ES', options);
  const descipcion = `En este panel se mostrarán todos los pedidos registrados hasta la fecha (${fechaFormateada}).`;

  // -->
  const [pedidos, setPedidos] = useState([]);
  const [idPedido, setIdPedido] = useState('');
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);

  // Para agragar mi Pedido.
  const [agregarPedido, setAgregarPedido] = useState({
    ID_Pedido_PK: '',
    ID_Metodo_Pago_FK: '',
    Fecha_Pedido: '',
    Hora_Pedido: '',
    IVA: '',
    Total_Pedido: '',
    ID_Estado_FK: '',
    ID_Saldo_PK: ''
  });

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

  // BUSCAR PEDIDOS:
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

  // CREAR PEDIDOS:
  const agregarNuevoPedido = () => {
    Axios.post('http://localhost:3001/pedido', agregarPedido)
      .then(response => {
        console.log('Pedido agregado correctamente:', response.data);
        // Actualizar la lista de pedidos después de agregar uno nuevo
        obtenerPedidos();
        // Limpiar los campos del formulario
        setAgregarPedido({
          ID_Metodo_Pago_FK: '',
          Fecha_Pedido: '',
          Hora_Pedido: '',
          IVA: '',
          Total_Pedido: '',
          ID_Estado_FK: '',
          ID_Saldo_PK: ''
        });
        // Cerrar el modal de agregar pedido
        closeModalAgregar();
        Swal.fire({
          icon: 'success',
          title: 'Pedido agregado correctamente',
          showConfirmButton: false,
          timer: 1500
        });
      })
      .catch(error => {
        console.error('Error al agregar pedido:', error);
        Swal.fire({
          icon: 'error',
          title: 'Error al agregar pedido',
          text: 'Por favor, intenta de nuevo más tarde',
          showConfirmButton: false,
          timer: 1500
        });
      });
  };



  const editarPedidoHandler = (pedido) => {
    OpenModal1(); // Abrimos el modal
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
    setAgregarPedido({
      ID_Pedido_PK: '',
      ID_Metodo_Pago_FK: '',
      Fecha_Pedido: '',
      Hora_Pedido: '',
      IVA: '',
      Total_Pedido: '',
      ID_Estado_FK: '',
      ID_Saldo_PK: ''
    });
    closeModal1();
    closeModalAgregar();
  };

  // ACTUALIZAR PEDIDO: ----->
  const actualizarPedido = () => {
    const ID_Pedido_PK = editarPedido.ID_Pedido_PK;
    Swal.fire({
      title: "¿Estas seguro de Actualizar?",
      text: "Recuerda, que siempre puedes cancelar la accion.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, Actualiza!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Actualizado con Exito.",
          text: `Tu pedido con id: (${ID_Pedido_PK}), ha sido actualizado.`,
          icon: "success"
        });
        Axios.put(`http://localhost:3001/pedidoActualizar/${editarPedido.ID_Pedido_PK}`, editarPedido)
          .then(() => {
            console.log('Pedido actualizado correctamente');
            obtenerPedidos(); // Actualizar lista de pedidos
            limpiarCampos();
          })
          .catch((error) => {
            console.error('Error al actualizar el pedido:', error);
          });
      }
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
      {/* Modal para Ingresar un pedido */}
      <Modal isOpen={isOpenModalAgregar} closeModal={closeModalAgregar} tittleModal={tittleModalAgregar} descModal={descModalAgregar}>
        <div className="editarPedido">
          <div className="inputsGrup">
            <fieldset>
              <legend>Entradas para agregar un pedido</legend>
              <div className="inputs-grup">
                <div className="form-group">
                  <label>Id Metodo de Pago</label>
                  <input type="text" placeholder="Ingrese el ID del método de pago" value={agregarPedido.ID_Metodo_Pago_FK} onChange={(e) => setAgregarPedido({ ...agregarPedido, ID_Metodo_Pago_FK: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Fecha Pedido</label>
                  <input type="text" placeholder="Ingrese la fecha del pedido" value={agregarPedido.Fecha_Pedido} onChange={(e) => setAgregarPedido({ ...agregarPedido, Fecha_Pedido: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Hora Pedido</label>
                  <input type="text" placeholder="Ingrese la hora del pedido" value={agregarPedido.Hora_Pedido} onChange={(e) => setAgregarPedido({ ...agregarPedido, Hora_Pedido: e.target.value })} />
                </div>
              </div>
              <div className="inputs-grup">
                <div className="form-group">
                  <label>IVA</label>
                  <input type="text" placeholder="Ingrese el valor del IVA" value={agregarPedido.IVA} onChange={(e) => setAgregarPedido({ ...agregarPedido, IVA: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Total Pedido</label>
                  <input type="text" placeholder="Ingrese el total del pedido" value={agregarPedido.Total_Pedido} onChange={(e) => setAgregarPedido({ ...agregarPedido, Total_Pedido: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>ID Estado</label>
                  <input type="text" placeholder="Ingrese el ID del estado" value={agregarPedido.ID_Estado_FK} onChange={(e) => setAgregarPedido({ ...agregarPedido, ID_Estado_FK: e.target.value })} />
                </div>
              </div>
              <div className="inputs-grup">
                <div className="form-group">
                  <label>ID Saldo deudor</label>
                  <input type="text" placeholder="Ingrese el ID del saldo deudor" value={agregarPedido.ID_Saldo_PK} onChange={(e) => setAgregarPedido({ ...agregarPedido, ID_Saldo_PK: e.target.value })} />
                </div>
              </div>
              <div className="divisorHr2"></div>
              <div className="inputs-grup">
                <button className='btn_f actualizar' type="button" onClick={agregarNuevoPedido}>Agregar Pedido</button>
                <button className='btn_f cancelarActualizar' type="button" onClick={limpiarCampos}>Cancelar</button>
              </div>
            </fieldset>
          </div>
        </div>
      </Modal>

      {/* Se aplica el MODAL */}
      <Modal isOpen={isOpenModal1} closeModal={closeModal1} tittleModal={tittleModal} descModal={descModal}>
        <div className="editarPedido">
          <div className="inputsGrup">
            <fieldset>
              <legend>Inputs a actualizar</legend>
              <div className="inputs-grup">
                <div className="form-group">
                  <label>ID</label>
                  <input type="text" id="input0" placeholder="Ingrese valor" disabled value={editarPedido.ID_Pedido_PK}
                    onChange={(e) => setEditarPedido({ ...editarPedido, ID_Pedido_PK: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Id Metodo de Pago</label>
                  <input type="text" id="input1" placeholder="Ingrese valor" value={editarPedido.ID_Metodo_Pago_FK}
                    onChange={(e) => setEditarPedido({ ...editarPedido, ID_Metodo_Pago_FK: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Fecha Pedido</label>
                  <input type="text" id="input2" placeholder="Ingrese valor" value={editarPedido.Fecha_Pedido}
                    onChange={(e) => setEditarPedido({ ...editarPedido, Fecha_Pedido: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Hora Pedido</label>
                  <input type="text" id="input3" placeholder="Ingrese valor" value={editarPedido.Hora_Pedido}
                    onChange={(e) => setEditarPedido({ ...editarPedido, Hora_Pedido: e.target.value })} />
                </div>
              </div>

              <div className="inputs-grup">
                <div className="form-group">
                  <label>IVA</label>
                  <input type="text" id="input4" placeholder="Ingrese valor" value={editarPedido.IVA}
                    onChange={(e) => setEditarPedido({ ...editarPedido, IVA: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>Total Pedido</label>
                  <input type="text" id="input5" placeholder="Ingrese valor" value={editarPedido.Total_Pedido}
                    onChange={(e) => setEditarPedido({ ...editarPedido, Total_Pedido: e.target.value })} />
                </div>
                <div className="form-group">
                  <label>ID Estado</label>
                  <input type="text" id="input6" placeholder="Ingrese valor" value={editarPedido.ID_Estado_FK}
                    onChange={(e) => setEditarPedido({ ...editarPedido, ID_Estado_FK: e.target.value })} />
                </div>
              </div>

              <div className="inputs-grup">
                <div className="form-group">
                  <label>ID Saldo deudor</label>
                  <input type="text" id="input7" placeholder="Ingrese valor" disabled value={editarPedido.ID_Saldo_PK}
                    onChange={(e) => setEditarPedido({ ...editarPedido, ID_Saldo_PK: e.target.value })} />
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
      </Modal>
      {/* Finaliza el MODAL */}

      {/* <div className="divisorHr"></div> */}
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
              <button className='btn_f nuevoP' onClick={OpenModalAgregar}>Nuevo Pedido</button>
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

export default Main_VentasFacturacion;