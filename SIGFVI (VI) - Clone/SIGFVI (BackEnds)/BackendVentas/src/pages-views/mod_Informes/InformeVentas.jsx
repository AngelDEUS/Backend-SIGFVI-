import React from 'react';
import {Link} from 'react-router-dom';
import TituloyDesc from '../../components/Titles/TituloyDesc';

const InformeVentas = () => {
  return (
    <main className='contenedor_informe'>
      <TituloyDesc
        titulo='Informe de Ventas'
        descripcion='Este es el módulo encargado de realizar los <s>Informes de las ventas</s> para generar un reporte de las ventas que se hacen.'
      />
      <hr/>

      <h2 style={{ textAlign: 'center' }}>Informe de Ventas</h2>
      <Link to='/Informes'><button className="bnt1" >Volver</button></Link>
      <table>
        <thead>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <th>Fecha</th>
            <th>Producto:
              <select>
                <option value="0">Seleccione el producto</option>
                <option value="1">Cerveza Aguila</option>
                <option value="2">Gaseosa pequeña Coca Cola</option>
                <option value="3">Doritos</option>
                <option value="4">Papas Super Ricas</option>
                <option value="5">Ron</option>
                <option value="6">Aguardiente Antioqueño</option>
              </select>
            </th>
            <th>Cantidad</th>
            <th>Precio Unitario</th>
            <th style={{ textAlign: 'center' }}>Total</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/01</td>
            <td>Cerveza Aguila</td>
            <td>3</td>
            <td>$3.000</td>
            <td style={{ textAlign: 'center' }}>$9.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/05/08</td>
            <td>Ron</td>
            <td>5</td>
            <td>$48.700</td>
            <td style={{ textAlign: 'center' }}>$243.500</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/28</td>
            <td>Papas Super Ricas</td>
            <td>2</td>
            <td>$5.000</td>
            <td style={{ textAlign: 'center' }}>$10.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/01</td>
            <td>Cerveza Aguila</td>
            <td>3</td>
            <td>$3.000</td>
            <td style={{ textAlign: 'center' }}>$9.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/05/08</td>
            <td>Ron</td>
            <td>5</td>
            <td>$48.700</td>
            <td style={{ textAlign: 'center' }}>$243.500</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/28</td>
            <td>Papas Super Ricas</td>
            <td>2</td>
            <td>$5.000</td>
            <td style={{ textAlign: 'center' }}>$10.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/01</td>
            <td>Cerveza Aguila</td>
            <td>3</td>
            <td>$3.000</td>
            <td style={{ textAlign: 'center' }}>$9.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/05/08</td>
            <td>Ron</td>
            <td>5</td>
            <td>$48.700</td>
            <td style={{ textAlign: 'center' }}>$243.500</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/28</td>
            <td>Papas Super Ricas</td>
            <td>2</td>
            <td>$5.000</td>
            <td style={{ textAlign: 'center' }}>$10.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/01</td>
            <td>Cerveza Aguila</td>
            <td>3</td>
            <td>$3.000</td>
            <td style={{ textAlign: 'center' }}>$9.000</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/05/08</td>
            <td>Ron</td>
            <td>5</td>
            <td>$48.700</td>
            <td style={{ textAlign: 'center' }}>$243.500</td>
          </tr>
          <tr>
            <th style={{ textAlign: 'center' }}><input type="checkbox" /></th>
            <td>2023/06/28</td>
            <td>Papas Super Ricas</td>
            <td>2</td>
            <td>$5.000</td>
            <td style={{ textAlign: 'center' }}>$10.000</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
};

export default InformeVentas;
