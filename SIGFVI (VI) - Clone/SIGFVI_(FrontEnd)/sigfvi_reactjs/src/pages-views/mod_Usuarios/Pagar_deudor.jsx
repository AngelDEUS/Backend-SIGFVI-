import axios from 'axios';
import React, { useState } from 'react';
import Swal from 'sweetalert2';

const Pagar_deudor = ({ closeModal, datos}) => {

    //if(!isOpen) return null ;
    const saldo=parseInt(datos.saldo);
    const [quitar,setQuitar] = useState(0);

    const restarSaldo = async (id) =>{
        let resta = (saldo - quitar)
        try {
            const response = await axios.put(`http://localhost:3003/updatesaldo/${id}`,{
                saldo: resta
            })
            console.log(response);
        } catch (error) {
            console.error('no se pudo sumar ',error);
        }
    }

    const consulta=(function (){
        datos.consulta();});

    function Verificar_pago(){
        const Insuma = document.getElementById('suma').value;
    
        var con=true;
        let validacionlt=/^[A-Za-z]+$/;
    
        if(Insuma.trim() === ''){
            document.getElementById('wrong').innerHTML='Digite un valor para pagar en la cuenta';
            con=false;
        }else if(validacionlt.test(Insuma)){
            document.getElementById('wrong').innerHTML='Digite solo numeros';
        }else{
            document.getElementById('wrong').innerHTML='';
        }
        return con;
    }
    
    function pago(){
        let con=true;
    
        if(!Verificar_pago()){
            con=false
        }
    
        if(con){
            Swal.fire({
                icon:'success',
                text:'Adicion exitosa'
            }).then(function(){
                restarSaldo(datos.id)
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
            <h1 className='main-title'>Pagar Deuda</h1>
            <form action="" class="">
                <span>
                    <h2>Monto actual</h2>
                    <input type="text" name="mopnto" id="monto" value={saldo} readOnly />
                    <br />
                    <label for="suma">Cantidad a pagar</label><br />
                    <input type="number" name="suma" id="suma" placeholder="Pago" onChange={(e)=>{setQuitar(parseInt(e.target.value))}} onBlur={Verificar_pago} />
                    <p id="wrong"></p>
                </span>
                <span>
                    <button type="button" name="submit" id="submit" class="boton b5" onClick={pago}>Pagar</button>
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

export default Pagar_deudor




