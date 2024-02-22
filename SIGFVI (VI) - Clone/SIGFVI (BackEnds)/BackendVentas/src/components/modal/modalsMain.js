/*
    * Principal moderador de los modales. {Modals}
*/
import ModalAcMain from "./modalAcMain";

const ModalsMain = () => {
    const titulo = 'Dashbard';
    const childrenDesc = `<p>asdsadads</p>`;

    return (
        <div>
            <h2>Modals</h2>
            <button className="btnModal">Modal 1 btn</button>
            <ModalAcMain titulo={titulo} children={childrenDesc}/>
            <button className="btnModal">Modal 2 btn</button>
        </div>
    )
}

export default ModalsMain;
