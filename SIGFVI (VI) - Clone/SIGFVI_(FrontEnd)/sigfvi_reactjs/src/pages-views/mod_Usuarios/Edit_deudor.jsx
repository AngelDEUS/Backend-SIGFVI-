import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Edit_deudor = ({closeModal, datos}) => {

    const [name1,setName1] = useState(datos.name1);
    const [name2,setName2] = useState(datos.name2);
    const [lastname1,setLastname1] = useState(datos.lastname1);
    const [lastname2,setLastname2] = useState(datos.lastname2);
    const [address,setAddress] = useState(datos.address);
    const [tel,setTel] = useState(datos.tel);

    const editarRegistro = async (x) =>{
        try {
            console.log(datos.idEstado);
            const response = await axios.put(`http://localhost:3003/updatedeudor/${x}`,{
                name1:name1,
                name2:name2,
                lastname1:lastname1,
                lastname2:lastname2,
                address:address,
                tel:tel,
            });
            console.log(response.data);
        } catch (error) {
            console.error(`no se pudo hacer la actualizacion ${error}`);
        }
    }
    //if(!isOpen) return null ;
    const consulta=(function (){
        datos.consulta();});

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

    function Verificar_registro(){

        let con=true;
        console.log(con);

        /*if(!Verificar_id()){
            con=false;
            console.log(con);
            /*Innombre.focus();
        }*/
        if(!Verificar_name1()){
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
                text:'Registro Actualizado. Se ha Actualizado a: '+document.getElementById('name1').value,
            }).then(function(){
                editarRegistro(datos.id);
                consulta();
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
                    <label htmlFor="name1">Nombre</label>
                    <input className='input-form' type="text" name="name1" id="name1" value={name1} onChange={(e) => {setName1(e.target.value)}} onBlur={Verificar_name1} />
                    <p id="wrongname1"></p>
                </span>

                <span>
                    <label for="name">Segundo Nombre</label>
                    <input className='input-form' type="text" name="name2" id="name2" value={name2} onChange={(e) => {setName2(e.target.value)}} onBlur={Verificar_name2} />
                    <p id="wrongname2"></p>
                </span>

                <span>
                    <label for="name">Apellido</label>
                    <input className='input-form' type="text" name="last1" id="last1" value={lastname1} onChange={(e) => {setLastname1(e.target.value)}} onBlur={Verificar_lastname1} />
                    <p id="wronglast1"></p>
                </span>

                <span>
                    <label for="name">Segundo Apellido</label>
                    <input className='input-form' type="text" name="last2" id="last2" value={lastname2} onChange={(e) => {setLastname2(e.target.value)}} onBlur={Verificar_lastname2} />
                    <p id="wronglast2"></p>
                </span>
                
                <span>
                    <label for="cel">Numero de Telefono</label>
                    <input className='input-form' type="number" name="cel" id="cel" value={tel} onChange={(e)=>{setTel(e.target.value)}} onBlur={Verificar_cel} />
                    <p id="wrongcel"></p>
                </span>
                
                <span>
                    <label for="Direccion">Dirección</label>
                    <input className='input-form' type="text" name="Direccion" id="Direccion" value={address} onChange={(e)=>{setAddress(e.target.value)}} onBlur={Verificar_addres} />
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
                <span>
                    <button type="button" name="submit" id="submit" class="boton b4" onClick={Verificar_registro}>Guardar Cambios</button>
                </span>
                </form>
            </div>
        </div>
    </div>
  )
}

export default Edit_deudor