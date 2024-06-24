import React from 'react';

const TituloyDesc = ({ titulo, descripcion }) => {

    const separadorStyle = {
        margin: '20px 0',
        width: '100%',
        height: '1px',
        backgroundColor: '#a2a1a650',
    };

    const titulo__Comp = {
        fontSize: '40px',
        fontWeight: '900',
        textTransform: 'uppercase',
        color: '#e5e4eb',
        margin: '40px 10px',
    };

    const descripcion__Comp = {
        fontSize: '15px',
        color: '#a2a1a6',
        marginLeft: '10px',
        fontWeight: '500',
    };

    const encabezado__content = {
        marginTop: '10px',
    }

    return (
        <div className='encabezado__content' style={encabezado__content}>
            <span className='titulo_encabezado' style={titulo__Comp}>
                {titulo}
            </span>
            <div style={separadorStyle}></div>
            <p className='_encabezado' style={descripcion__Comp}>
                {descripcion}
            </p>
            <div style={separadorStyle}></div>
        </div>
    );
};

export default TituloyDesc;
