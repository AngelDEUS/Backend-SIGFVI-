import React from 'react';
import Swal from 'sweetalert2';

const Edit_proveedor = ({isOpen, closeModal}) => {

  if(!isOpen) return null ;

  function Verificar_nombre(){
    const Innombre1 = document.getElementById('name1').value;
    
    let con=true;
    let validacionlt=/^[A-Za-z]+$/;

    
    if(Innombre1.trim() === ""){
        document.getElementById('wrongname').innerHTML='Este espacio no puede quedar en blanco';
        con=false;
        /*Innombre.focus();*/
    }else if(!validacionlt.test(Innombre1)){
        document.getElementById('wrongname').innerHTML='Digitar solo letras';
        con=false;
    }else{
        document.getElementById('wrongname').innerHTML='';
    }
    
    return con;
}

function Verificar_cel(){
    const Incel = document.getElementById('cel').value;
    
    let con=true;
    let validacionlt=/^[A-Za-z]+$/;
    
    if(Incel.trim() === ""){
        document.getElementById('wrongcel').innerHTML='Este espacio no puede quedar en blanco';
        con=false;
        /*Innombre.focus();*/
    }else if(validacionlt.test(Incel)){
        document.getElementById('wrongcel').innerHTML='Digitar solo Numeros';
        con=false;
    }else{
        document.getElementById('wrongcel').innerHTML='';
    }
    
    return con;
}

function Verificar_dias(){
    const Indias = document.getElementById('frecuencia').value;

    let con=true;

    if(Indias==="0"){
        document.getElementById('wrongfrec').innerHTML='Seleccione el dia que frecuenta';
        con=false;
    }else{
        document.getElementById('wrongfrec').innerHTML='';
    }

    return con;
}

function Verificar_registro(){

    let con=true;
    console.log(con);

    if(!Verificar_nombre()){
        con=false;
        console.log(con);
        /*Innombre.focus();*/
    }
    if(!Verificar_cel()){
        con=false;
        console.log(con);
        /*Innombre.focus();*/
    }
    if(!Verificar_dias()){
        con=false;
        console.log(con);
        /*Innombre.focus();*/
    }

    if(con){
        Swal.fire({
            icon:'success',
            text:'Registro completado para: '+document.getElementById('name1').value,
        }).then(function(){
            closeModal();
        })
        return true;
        
    }else{
        Swal.fire({
            icon:'warning',
            title:'Rellene los campos del formulario para continuar',
            toast:true
        })
        return false;
    }
}
  
  return (
    <div className='register-container'>
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div class="container__Main-register">
            <h1 className='main-title'>Editar Proveedor</h1>
            <form action="" className="datos-contenido">
                <span>
                    <label for="name1">Nombre</label>
                    <input className='input-form' type="text" name="name1" id="name1" placeholder="Bavaria" onBlur={Verificar_nombre} />
                    <p id="wrongname"></p>
                </span>
                <span>
                    <label for="cel">Numero de Telefono</label>
                    <input className='input-form' type="number" name="cel" id="cel" placeholder="3112547895" onBlur={Verificar_cel} />
                    <p id="wrongcel"></p>
                </span>
                <span>
                    <label for="frecuencia">Días que frecuenta:</label>
                    <select className='input-form' name="frecuencia" id="frecuencia" onBlur={Verificar_dias}>
                        <option value="0">Seleccionar</option>
                        <option value="1">Lunes</option>
                        <option value="2">Martes</option>
                        <option value="3">Miercoles</option>
                        <option value="4">Jueves</option>
                        <option value="5">Viernes</option>
                        <option value="6">Sabado</option>
                        <option value="7">Domingo</option>
                    </select>
                    <p id="wrongfrec"></p>
                </span>
                {/*<span>
                <label for="estado">Estado</label>
                <table class="casillaedit">
                    <tr>
                        <td>Activo</td>
                    </tr>
                </table>
                <select name="estado" id="estado">
                    <option value="0">Seleccionar</option>
                    <option value="1">Activo</option>
                    <option value="2">Inactivo</option>
                </select>
  <br>
                <br/>
                </span>*/}
                
                    <br/>
                    <button type="button" name="submit" id="submit" class="boton b4" onClick={Verificar_registro}>Guardar Cambios</button>
                
            </form>
        </div>
        </div>
    </div>
  )
}

export default Edit_proveedor