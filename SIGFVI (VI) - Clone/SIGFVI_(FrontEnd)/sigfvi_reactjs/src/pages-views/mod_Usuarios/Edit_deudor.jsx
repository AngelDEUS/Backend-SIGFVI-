import React from 'react';
import Swal from 'sweetalert2';

const Edit_deudor = ({isOpen, closeModal}) => {

    if(!isOpen) return null ;

    function Verificar_name(){
        const Inname = document.getElementById('name').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inname.trim() === ""){
            document.getElementById('wrongname').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Inname)){
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
            document.getElementById('wrongid').textContent='Digitar solo Numeros';
            con=false;
        }else{
            document.getElementById('wrongcel').innerHTML='';
        }
        
        return con;
    }

    function Verificar_addres(){    
        const Inaddres = document.getElementById('Direccion').value;

        let con=true;

        if(Inaddres.trim() === ""){
            document.getElementById('wrongaddres').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else{
            document.getElementById('wrongaddres').innerHTML='';
        }
        
        return con;
    }

    function Verificar_registro(){

        let con=true;
        console.log(con);

        /*if(!Verificar_id()){
            con=false;
            console.log(con);
            /*Innombre.focus();
        }*/
        if(!Verificar_name()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_cel()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_addres()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }

        if(con){
            Swal.fire({
                icon:'success',
                text:'Registro Actualizado. Se ha Actualizado a: '+document.getElementById('name').value,
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
    <div className='register-container' >
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div class="container__Main-register">
            <h1 className='main-title'>Editar Deudor</h1>
            <form action="" class="datos-contenido">
                <span>
                    <label for="name">Nombre</label>
                    <input className='input-form' type="text" name="name" id="name" placeholder="Francisco Aristizabal" onBlur={Verificar_name} />
                    <p id="wrongname"></p>
                </span>
                
                <span>
                    <label for="cel">Numero de Telefono</label>
                    <input className='input-form' type="number" name="cel" id="cel" placeholder="3112547895" onBlur={Verificar_cel} />
                    <p id="wrongcel"></p>
                </span>
                
                <span>
                    <label for="frecuencia">Dirección</label>
                    <input className='input-form' type="text" name="Direccion" id="Direccion" placeholder="cra 25 sur #48a-70" onBlur={Verificar_addres} />
                    <p id="wrongaddres"></p>
                </span>
                {/*<span>
                <!--<label for="estado">Estado</label>
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
                <br>-->
  </span>*/}
                <br/><br/><br/><br/>
                <button type="button" name="submit" id="submit" class="boton b4" onClick={Verificar_registro}>Guardar Cambios</button>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit_deudor