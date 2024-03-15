import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Register_deudor = ({ isOpen, closeModal, reConsulta }) => {
    const agregarRegistro = () => {
        axios.post("http://localhost:3001/usuario/createdeudor", {
            "id": id,
            "name1": name1,
            "name2": name2,
            "lastname1": lastname1,
            "lastname2": lastname2,
            "address": address,
            "tel": tel,
            "saldo": saldo
        }).then(response => {
            reConsulta();
            Swal.fire({
                icon: 'success',
                text: 'Registro completado. Se ha registrado a: ' + name1,
            }).then(function () {
                closeModal();
            });
        }).catch(error => {
            console.error("Error al agregar deudor:", error);
            Swal.fire({
                icon: 'error',
                title: 'Error al agregar deudor',
                text: 'Hubo un problema al intentar agregar el deudor. Por favor, inténtelo de nuevo.',
            });
        });
    }

    const [id, setId] = useState('');
    const [name1, setName1] = useState('');
    const [name2, setName2] = useState('');
    const [lastname1, setLastname1] = useState('');
    const [lastname2, setLastname2] = useState('');
    const [address, setAddress] = useState('');
    const [tel, setTel] = useState('');
    const [saldo, setSaldo] = useState('');

    if (!isOpen) return null;

    function Verificar_id() {
        const Inidp = document.getElementById('idp').value;

        let con = true;
        let validacionlt = /^[A-Za-z]+$/;

        if (Inidp.trim() === '') {
            document.getElementById('wrongid').innerHTML = 'Este espacio no puede quedar en blanco';
            con = false;
        } else if (validacionlt.test(Inidp)) {
            document.getElementById('wrongid').textContent = 'Digitar solo Numeros';
            con = false;
        } else {
            document.getElementById('wrongid').innerHTML = '';
        }

        return con;
    }
    
    function Verificar_name1(){
        const Inname = document.getElementById('name1').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inname.trim() === ""){
            document.getElementById('wrongname1').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Inname)){
            document.getElementById('wrongname1').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongname1').innerHTML='';
        }
        
        return con;
    }

    function Verificar_name2(){
        const Inname = document.getElementById('name2').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inname.trim() === ""){
            document.getElementById('wrongname2').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Inname)){
            document.getElementById('wrongname2').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wrongname2').innerHTML='';
        }
        
        return con;
    }
    
    function Verificar_lastname1(){
        const Inname = document.getElementById('last1').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inname.trim() === ""){
            document.getElementById('wronglast1').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Inname)){
            document.getElementById('wronglast1').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wronglast1').innerHTML='';
        }
        
        return con;
    }

    function Verificar_lastname2(){
        const Inname = document.getElementById('last2').value;
    
        let con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Inname.trim() === ""){
            document.getElementById('wronglast2').innerHTML='Este espacio no puede quedar en blanco';
            con=false;
            /*Innombre.focus();*/
        }else if(!validacionlt.test(Inname)){
            document.getElementById('wronglast2').innerHTML='Digitar solo letras';
            con=false;
        }else{
            document.getElementById('wronglast2').innerHTML='';
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
    
    function Verificar_registro() {
        let con = true;

        if (!Verificar_id()) {
            con = false;
        }
        if(!Verificar_name1()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_name1()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_name2()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_lastname1()){
            con=false;
            console.log(con);
            /*Innombre.focus();*/
        }
        if(!Verificar_lastname2()){
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
    
        if (con) {
            // Si todas las condiciones son verdaderas, muestra la alerta de éxito y agrega el registro
            Swal.fire({
                icon: 'success',
                text: 'Registro completado. Se ha registrado a: ' + name1,
            }).then(function () {
                agregarRegistro();
                closeModal();
            });
        } else {
            // Si alguna condición falla, muestra una alerta de advertencia
            Swal.fire({
                icon: 'warning',
                title: 'Rellene los campos del formulario para continuar',
                toast: true
            });
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
                        <label for="name">Primer Nombre</label>
                        <input className='input-form' type="text" name="name1" id="name1" placeholder="Nombre"  onBlur={Verificar_name1} onChange={(e) => setName1(e.target.value)} />
                        <p id="wrongname1"></p>
                    </span>
                    <span>
                        <br/><br/>
                        <label for="name">Segundo Nombre</label>
                        <input className='input-form' type="text" name="name2" id="name2" placeholder="Nombre"  onBlur={Verificar_name2} onChange={(e) => setName2(e.target.value)} />
                        <p id="wrongname2"></p>
                    </span>
                    <span>
                        <br/><br/>
                        <label for="name">Primer apellido</label>
                        <input className='input-form' type="text" name="last1" id="last1" placeholder="Nombre"  onBlur={Verificar_lastname1} onChange={(e) => setLastname1(e.target.value)} />
                        <p id="wronglast1"></p>
                    </span>
                    <span>
                        <br/><br/>
                        <label for="name">Segundo apellido</label>
                        <input className='input-form' type="text" name="last2" id="last2" placeholder="Nombre"  onBlur={Verificar_lastname2} onChange={(e) => setLastname2(e.target.value)} />
                        <p id="wronglast2"></p>
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
                    <span>
                        <br/><br/>
                        <label for="saldo">Saldo inicial</label>
                        <input className='input-form' type="text" name="saldo" id="saldo" placeholder="Dirección" onChange={(e) => setSaldo(e.target.value)}/>
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