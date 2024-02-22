import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Register_deudor = ({isOpen, closeModal, funcion}) => {

    const [id,setId] = useState('');
    const [name,setName] = useState('');
    const [address,setAddress] = useState('');
    const [tel,setTel] = useState('');
    
    if(!isOpen) return null ;

    function Verificar_id(){
        const Inidp = document.getElementById('idp').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inidp.trim() ===''){
            document.getElementById('wrongid').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }else if(validacionlt.test(Inidp)){
            document.getElementById('wrongid').textContent='Digitar solo Numeros';
            con=false;
        }else{
            document.getElementById('wrongid').innerHTML='';
        }
        
        return con;
    }
    
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
    
        if(!Verificar_id()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
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
                text:'Registro completado. Se ha registrado a: '+document.getElementById('name').value,
            }).then(function(){
                closeModal();
                funcion(id,name,address,tel)
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
                <div class="titulo"><h1 className='main-title'>Registar Deudor</h1></div>
                <div class="datos-contenido">
                    <span>
                        <br/><br/>
                        <label for="idp">identificacion</label>
                        <input className='input-form' type="text" name="id" id="idp" placeholder="id" onBlur={Verificar_id} onChange={(e) => setId(e.target.value)} />
                        <p id="wrongid"></p>
                    </span>
                    <span>
                        <br/><br/>
                        <label for="name">Nombre</label>
                        <input className='input-form' type="text" name="name" id="name" placeholder="Nombre"  onBlur={Verificar_name} onChange={(e) => setName(e.target.value)} />
                        <p id="wrongname"></p>
                    </span>
                    <span>
                        <br/><br/>
                        <label for="cel">Numero de Telefono</label>
                        <input className='input-form' type="number" name="cel" id="cel" placeholder="Numero"  onBlur={Verificar_cel} onChange={(e) => setTel(e.target.value)} />
                        <p id="wrongcel"></p>
                    </span>
                    <span>
                        <br/><br/>
                        <label for="frecuencia">Dirección</label>
                        <input className='input-form' type="text" name="Direccion" id="Direccion" placeholder="Dirección" onBlur={Verificar_addres} onChange={(e) => setAddress(e.target.value)}/>
                        <p id="wrongaddres"></p>
                    </span>
                    <span class="bloc">
                        <br/><br/>
                        <button type="button" name="submit" id="submit" class="boton b4" onClick={Verificar_registro}>Registar</button>
                    </span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Register_deudor