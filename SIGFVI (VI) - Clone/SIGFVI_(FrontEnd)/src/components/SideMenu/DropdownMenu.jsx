import './DropdownMenu.css'
import Swal from 'sweetalert2';

const DropdownMenu = () => {

    const handleLogout = () => {
        Swal.fire({
            title: 'Cerrar Sesión',
            text: '¿Desea cerrar sesión?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, cerrar sesión',
            cancelButtonText: 'No, mantener sesión',
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Sesión cerrada con éxito',
                    icon: 'success',
                    confirmButtonColor: '#3085d6',
                    confirmButtonText: 'Aceptar',
                }).then(() => {
                    localStorage.removeItem("usuario");
                    window.location.reload();
                });
            }
        });
    };
    // const nada = () => {
    //     window.location.reload();
    // }
    return (
        <div>
            <ul className="DropdawnMenu">
                {/* <li className='liOpcion'>Perfil de Usuario</li>
                <li className='liOpcion'>Configuración</li> */}                
                <li className='liOpcion'>Gracias por usar el sistema</li>
                <div className='separador'></div>
                <li className='liOpcion cerrarS' onClick={handleLogout}>Cerrar Sesión<span>.</span></li>
            </ul>
        </div>
    )
}

export default DropdownMenu