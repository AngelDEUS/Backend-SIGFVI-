import React from 'react';
import {Link} from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

const InformeInventario = () => {
  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Inventario'
        descripcion='Este es el módulo encargado de realizar los Informes de los empleados para generar un reporte de los productos que se adquieren en el.'
      />
      <hr/>
      <h2 style={{ textAlign: 'center' }}>Informe Inventario</h2>
      <Link to='/Informes'><button className="bnt1" >Volver</button></Link>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <th>Producto:
              <select>
                <option value="0"></option>
                <option value="1">Cerveza Aguila</option>
                <option value="2">Agua en botella pequeña</option>
                <option value="3">Cerveza Canasta</option>
                <option value="4">Papas Super Ricas</option>
                <option value="5">Ron</option>
                <option value="6">Six pack cerveza caja</option>
                <option value="7">Aguardiente Antioqueño</option>
              </select>
            </th>
            <th>Cantidad</th>
            <th>Precio</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Cerveza Canasta</td>
            <td>200</td>
            <td>$630.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Six pack cerveza caja</td>
            <td>200</td>
            <td>$280.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Agua en botella pequeña</td>
            <td>24</td>
            <td>$400.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Agua en botella pequeña</td>
            <td>24</td>
            <td>$400.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Agua en botella pequeña</td>
            <td>24</td>
            <td>$400.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Agua en botella pequeña</td>
            <td>24</td>
            <td>$400.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>Agua en botella pequeña</td>
            <td>24</td>
            <td>$400.000</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default InformeInventario;
