/*
    * Principal moderador de los modales. {Modals}
    * Pruebas del Modal.
*/

//import React from 'react'
import { useModal } from '../../hooks/modal/useModal.js';
import Modal from './Modal.jsx'


const Modals = () => {
    const [isOpenModal1, OpenModal1, closeModal1] = useModal(false); // Desestructuracion del Hook useModal
    const tittleModal = 'Prueba de Modal';
    const descModal = 'Prueba de Descripcion de mi modal';

    return (
        <div>
            <h2>Modal</h2>
            <button onClick={OpenModal1}>Abrir Modal</button>
            <Modal isOpen={isOpenModal1} closeModal={closeModal1} tittleModal={tittleModal} descModal={descModal}>
                <h3>Modal</h3>
                <p>este es mi modal 1</p>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam doloribus corrupti non, totam pariatur sint ratione numquam animi voluptate expedita minima aut id eos exercitationem quos nihil nobis et velit.</p>
            </Modal>
        </div>
    )
}

export default Modals
