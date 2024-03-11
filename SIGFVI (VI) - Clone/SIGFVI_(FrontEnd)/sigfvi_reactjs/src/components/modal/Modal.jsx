/*
    * Acciones del los modales.
*/
import './modal.css'

const Modal = ({ tittleModal, descModal, children, isOpen, closeModal }) => {
  // Evita la propagación del clic closeModal en el cuerpo del Modal y Modal-Content.
  const handleModalContainerClick = e => e.stopPropagation(); 

  return (
    <article className={`modalCom ${isOpen && "is-open"}`}
      onClick={closeModal}> {/* Muestra el Modal si isOpen es Verdadero*/}
      <div className="modalCom-content" onClick={handleModalContainerClick}>
        <div className="modalCom-cabecera">
          <div className="modalCom-t"><span className='modalCom-tittle'>{tittleModal}</span></div>
          <div className="modalCom-b"><button className='close-button__modalCom' onClick={closeModal}>X</button></div>
        </div>
        <div className="cuerpo-modalCom">
          <div className='modalCom-separador'></div>
          <div className="modalCom-d"><span className='modalCom-descripcion'>{descModal}</span></div>
          <div className='modalCom-separador'></div>
          <div>
            {children}
          </div>
        </div>
      </div>
    </article>
  )
}

export default Modal;
