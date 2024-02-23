import axios from 'axios';
import React, { useEffect, useState } from "react";
import Swal from 'sweetalert2';


const EditProducto = ({closeModal, datos}) => {

    const [nombre,setNombre]=useState(datos.nombre);
    const [cantidad,setCantidad]=useState(datos.cantidad);
    const [precioCompra,setPrecioC]=useState(datos.precioCompra);
    const [precioVenta,setPrecioV]=useState(datos.precioVenta);
    const [con, setCon] = useState(true);


    

    const editarRegistro = async (id) => {
        try {
          const response = await axios.put(`http://localhost:3001/ActualizarProducto/${id}`, {
            nombre: nombre,
            cantidad: cantidad,
            precioCompra: precioCompra,
            precioVenta: precioVenta,
          });
          setCon(true);
          console.log(response.data);
        } catch (err) {
          console.error('No se pudo hacer la petición put', err);
          setCon(false);
        }
      };
    const consulta=(function (){
        datos.consulta();});

        const handleClick = () => {
            if (con) {
              Swal.fire({
                icon: 'success',
                text: 'Datos Actualizados para: ' + document.getElementById('nombre').value,
              }).then(function () {
                editarRegistro(datos.id);
                consulta();
                closeModal();
              });
            } else {
              Swal.fire({
                icon: 'warning',
                title: 'Rellene los campos del formulario para continuar',
                toast: true,
              });
            }
          };

  return (
    <div className='register-container' >
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div className="container__Main-register">
            <h1 className='main-title'>Editar Producto</h1>
            <form action="" className="datos-contenido">
                <span>
                    <label for="nombre">Nombre</label>
                    <input className='input-form' type="text" name="nombre" id="nombre" value={nombre} onChange={(e) => {setNombre(e.target.value)}} />
                </span>
                <span>
                    <label for="cantidad">Cantidad</label>
                    <input className='input-form' type="text" name="cantidad" id="cantiad" value={cantidad} onChange={(e) => {setCantidad(e.target.value)}} />
                </span>
                <span>
                    <label for="precioCompra">Precio de Compra</label>
                    <input className='input-form' type="text" name="precioCompra" id="precioCompra" value={precioCompra} onChange={(e) => {setPrecioC(e.target.value)}} />
                </span>
                <span>
                    <label for="tipoid">Precio de Venta</label>
                    <input readOnly className='input-form' type="text" name="tipoid" id="tipoid" value={precioVenta} onChange={(e) => {setPrecioV(e.target.value)}}/>
                </span>
                <span>
                    <br/>
                    <button type="button" name="submit" id="submit" class="boton b4" onClick={handleClick}>Guardar Cambios</button>
                </span>
            </form>
        </div>
        </div>
    </div>
  )
}

export default EditProducto;
