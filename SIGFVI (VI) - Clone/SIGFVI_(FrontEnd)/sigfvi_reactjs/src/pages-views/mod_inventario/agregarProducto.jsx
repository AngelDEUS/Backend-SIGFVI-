import React, { useEffect, useState } from "react";

export const RegisterProd = ({isOpen, closeModal,reConsulta}) => {

  const nuevoProducto = () =>{
    axios.post("http://localhost:3001/Create",{
      "id" : id,
      "nombre" :nombre,
      "tProducto" : tProducto,
      "cantidad" : cantidad,
      "precioCompra" : precioCompra,
      "precioVenta" : precioVenta,
      "foto" : foto,
      "estado" : estado,
    })
}

const [id,setId] = useState('');
const [nombre,setNombre] = useState('');
const [tProducto,setTproducto] = useState('');
const [cantidad,setCantidad] = useState('');
const [precioCompra,setprecioCompra] = useState('');
const [precioVenta,setPrecioVenta] = useState('');
const [foto,setFoto] = useState('');
const [estado,setEstado] = useState('');

if(!isOpen) return null ;





return (
  <div className='register-container' >
      <div className='fondo-register'>
          <div>
              <p onClick={closeModal} >X</p>
          </div>
          <div class="container__Main-register">
              <div class="titulo"><h1 className='main-title'>Registar Producto</h1></div>
              <form className="datos-contenido">
                  <span>
                      <label for="nombre">Nombre producto</label>
                      <input className='input-form' type="text" name="nombre" id="nombre" placeholder="Nombre Producto" onChange={(e) => setNombre(e.target.value)} />
                  </span>
                  <span>
                      <label for="tProducto">Tipo Producto</label>
                      <input className='input-form' type="text" name="tProducto" id="tProducto" placeholder="Tipo Producto" onChange={(e) => setTproducto(e.target.value)} />
                  </span>
                  <span>
                      <label for="cantidad">Cantidad</label>
                      <input className='input-form' type="text" name="cantidad" id="cantidad" placeholder="Cantidad"  onChange={(e) => setCantidad(e.target.value)} />
                  </span>
                  <span>
                      <label for="precioCompra">Precio Compra</label>
                      <input className='input-form' type="text" name="precioCompra" id="precioCompra" placeholder="precio Compra"  onChange={(e) => setprecioCompra(e.target.value)} />
                  </span>
                  
                  <span>
                      <label for="precioVenta">Precio Venta</label>
                      <input className='input-form' type="text" name="precioVenta" id="precioVenta" placeholder="precio Venta"  onChange={(e) => setPrecioVenta(e.target.value)} />
                  </span>

                  <span>
                      <label for="foto">Foto</label>
                      <input className='input-form' type="text" name="foto" id="foto" placeholder="foto"  onChange={(e) => setFoto(e.target.value)} />
                  </span>
                  
                  <span>
                      <label for="estado">Estado</label>
                      <input className='input-form' type="number" name="estado" id="estado" placeholder="estado"  onChange={(e)=> setEstado(e.target.value)}/>
                  </span>
                  <span class="bloc">
                      <br/>
                      <input type="button" value="Registar" class="boton b4" name="submit" id="submit" />
                  </span>
              </form>
          </div>
      </div>
  </div>
)

}



