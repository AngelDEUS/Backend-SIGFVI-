import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Sumar_deudor = ( {closeModal,datos}) => {

    //if(!isOpen) return null ;
    const saldo=parseInt(datos.saldo);
    const [adicional,setAdicional]=useState(0);

    // function sumar(num1,num2){
    //     let result = parseInt(num1)+parseInt(num2);
    //     setSaldo(result);
    //     sumarSaldo(datos.id);
    // }

    const sumarSaldo = async (id) =>{
        let adicion = (saldo + adicional)
        try {
            const response = await axios.put(`http://localhost:3001/updatesaldo/${id}`,{
                saldo: adicion
            })
            console.log(response);
        } catch (error) {
            console.error('no se pudo sumar ',error);
        }
    }

    const consulta=(function (){
        datos.consulta();});

    function Verificar_suma(){
        const Insuma = document.getElementById('suma').value;
    
        var con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Insuma.trim() === ''){
            document.getElementById('wrong').innerHTML='Digite un valor para añadir a la cuenta';
            con=false;
        }else if(validacionlt.test(Insuma)){
            document.getElementById('wrong').innerHTML='Digite solo numeros';
        }else{
            document.getElementById('wrong').innerHTML='';
        }

        return con;
    }
    
    function suma(){
        let con=true;
    
        if(!Verificar_suma()){
            con=false
        }
    
        if(con){
            Swal.fire({
                icon:'success',
                text:'Adicion exitosa'
            }).then(function(){
                sumarSaldo(datos.id);
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
    <div className='register-container'>
        <div className='fondo-register'>
            <div>
                <p onClick={closeModal} >X</p>
            </div>
            <div class="container__Main-register">
            <h1 className='main-title'>Añadir monto</h1>
            <form action="" class="">
                <span>
                    <h2>Monto actual</h2>
                    <input type="text" name="mopnto" id="monto" value={saldo} readOnly />
                    <br />
                    <label for="suma">Sumar</label><br/>
                    <input type="number" name="suma" id="suma" placeholder="Añadir" onChange={(e)=>{setAdicional(parseInt(e.target.value))}} onBlur={Verificar_suma} />
                    <p id="wrong"></p>
                </span>
                <span>
                    <button type="button" name="submit" id="submit" class="boton b5" onClick={suma}>Añadir</button>
                </span>
                <span>
                    <a href="./Deudores"><button type="button" class="boton b2">Regresar</button></a>
                </span>
            </form>       
        </div>
        </div>
    </div>
  )
}

export default Sumar_deudor