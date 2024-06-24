/*
    * Hook: Funcionalidad que vamos a abstraer de Modal.jsx en Components 
    * Lo usamos para abrir y cerrar el modal.
*/
import { useState } from "react";

export const useModal = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    // Retornamos como arreglo.
    return[isOpen,openModal,closeModal]
}
