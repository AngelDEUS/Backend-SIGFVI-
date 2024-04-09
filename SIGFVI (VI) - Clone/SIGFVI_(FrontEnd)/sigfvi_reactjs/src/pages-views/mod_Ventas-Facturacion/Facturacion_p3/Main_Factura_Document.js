import React, { useRef } from 'react';
import './Style_Factura.css';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
import html2canvas from 'html2canvas'; 

import LogoFactura from '../../../assets/Logo/Logo-SIGFVI-factura.png';
import LogoFactura2 from '../../../assets/Logo/Logo-Tiendecita_Alemana.jpg';
import TituloyDesc from '../../../components/Titles/TituloyDesc';
import Swal from 'sweetalert2';
import { useLocation, useHistory, useNavigate } from 'react-router-dom'; // Importa useLocation y useHistory

const Main_Factura_Document = () => {
  const location = useLocation(); // Obtiene la location actual
  const { detalleVentaAFactura } = location.state || {};
  console.log('esto me esta llegando desde PagarVenta: ', detalleVentaAFactura);

  const navigate = useNavigate();

  const descipcion = 'En este panel puede realizar la busqueda de todos los productos, tanto las busquedas por nombre o por ID de producto.'
  const tituloVentasControl = 'Factura Generada.'

  /* Generar mis rombos para la factura */
  // Triangulos generados para la factura
  const cantidadTriangulos = 50;
  const triangulos = Array.from({ length: cantidadTriangulos }, (_, index) => (
    <div key={index} className='triangulito__factura'></div>
  ));

  
  // desestructuración de mi objeto padre detalleVentaAFactura
  const {
    ID_Factura,
    Fecha_Factura,
    Hora_Factura,
    Empleado_Encargado: { ID_Empleado, Nombre_Empleado },
    Detalle_Productos_Agregados: {
      Deudor: { Nombre: Nombre_Deudor, Telefono: Telefono_Deudor },
      Productos_Seleccionados,
      Subtotal_Sin_IVA,
      Total_Factura,
      Total_IVA,
    },
    Dinero_Recibido,
    Dinero_Devuelto,
  } = detalleVentaAFactura;


  const pasarAVenta = () => {
    // Redirecciona a la página de ventas
    navigate('/VentasFacturacion/ventas_main')
    // Muestra una alerta indicando que se envió correctamente a la venta
    Swal.fire({
      icon: 'success',
      title: '¡Pasando a otra Venta!',
      text: 'La venta se ha registrado correctamente, y vamos a una nueva.',
      confirmButtonText: 'Aceptar'
    });
  }

  const containerRef = useRef(null); // Ref para el contenedor

  const descargarPDF = () => {
    html2canvas(containerRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      const nombreArchivo = `${Fecha_Factura}-${Hora_Factura}-${Nombre_Empleado}.pdf`;
      pdf.save(nombreArchivo);
    });
  };

  const imprimirRecibo = () => {
    html2canvas(containerRef.current, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
  
      const printWindow = window.open('', '_blank');
      printWindow.document.open();
      printWindow.document.write(`
        <html>
          <head>
            <title>Print Document</title>
            <style>
              body { margin: 0; }
              img { width: 100%; height: auto; }
            </style>
          </head>
          <body>
            <img src="${imgData}" />
            <script>
              setTimeout(() => {
                window.print();
                window.close();
              }, 100);
            </script>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  };
  

  const descargarPDF2 = () => {
    const doc = new jsPDF();
  
    // Agregar contenido al PDF
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
  
    // Datos de la factura
    doc.text(`Factura Generada`, 105, 15, { align: 'center' });
    doc.setFont('Helvetica', 'bold');
    doc.text(`ID Factura: #${ID_Factura}`, 20, 30);
    doc.text(`Fecha Factura: ${Fecha_Factura}`, 20, 40);
    doc.text(`Hora Factura: ${Hora_Factura}`, 20, 50);
  
    // Detalle de los productos
    doc.setFont('Helvetica', 'normal');
    let y = 70;
    const data = Productos_Seleccionados.map(producto => {
      return [producto.Nombre_Producto, producto.cantidad, `$ ${producto.Precio_Venta}`, `$ ${producto.Precio_Venta * producto.cantidad}`];
    });
    doc.autoTable({
      startY: y,
      head: [['Descripción', 'Cantidad', 'Precio', 'Importe']],
      body: data,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2, halign: 'center' },
      columnStyles: { 0: { halign: 'left' }, 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' } },
    });
    y += data.length * 10 + 10;
  
    // Subtotal, Total e IVA
    doc.text(`Subtotal: $ ${Subtotal_Sin_IVA}`, 20, y);
    doc.text(`IVA: $ ${Total_IVA}`, 20, y + 10);
    doc.text(`Total: $ ${Total_Factura}`, 20, y + 20);
  
    // Dinero recibido y devuelto
    doc.text(`Dinero Recibido: $ ${Dinero_Recibido}`, 20, y + 40);
    doc.text(`Dinero Devuelto: $ ${Dinero_Devuelto}`, 20, y + 50);
  
    // Agregar logos con dimensiones específicas
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(LogoFactura, 'PNG', 10, 10, imgWidth, imgHeight);
    doc.addImage(LogoFactura2, 'JPG', 150, 10, imgWidth, imgHeight);
  
    const nombreArchivo = `${Fecha_Factura}-${Hora_Factura}-${Nombre_Empleado}.pdf`;
    doc.save(nombreArchivo);
  };
  
  const imprimirRecibo2 = () => {
    const doc = new jsPDF();
  
    // Agregar contenido al PDF
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(12);
  
    // Datos de la factura
    doc.text(`Factura Generada`, 105, 15, { align: 'center' });
    doc.setFont('Helvetica', 'bold');
    doc.text(`ID Factura: #${ID_Factura}`, 20, 30);
    doc.text(`Fecha Factura: ${Fecha_Factura}`, 20, 40);
    doc.text(`Hora Factura: ${Hora_Factura}`, 20, 50);
  
    // Detalle de los productos
    doc.setFont('Helvetica', 'normal');
    let y = 70;
    const data = Productos_Seleccionados.map(producto => {
      return [producto.Nombre_Producto, producto.cantidad, `$ ${producto.Precio_Venta}`, `$ ${producto.Precio_Venta * producto.cantidad}`];
    });
    doc.autoTable({
      startY: y,
      head: [['Descripción', 'Cantidad', 'Precio', 'Importe']],
      body: data,
      theme: 'plain',
      styles: { fontSize: 10, cellPadding: 2, halign: 'center' },
      columnStyles: { 0: { halign: 'left' }, 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' } },
    });
    y += data.length * 10 + 10;
  
    // Subtotal, Total e IVA
    doc.text(`Subtotal: $ ${Subtotal_Sin_IVA}`, 20, y);
    doc.text(`IVA: $ ${Total_IVA}`, 20, y + 10);
    doc.text(`Total: $ ${Total_Factura}`, 20, y + 20);
  
    // Dinero recibido y devuelto
    doc.text(`Dinero Recibido: $ ${Dinero_Recibido}`, 20, y + 40);
    doc.text(`Dinero Devuelto: $ ${Dinero_Devuelto}`, 20, y + 50);
  
    // Agregar logos con dimensiones específicas
    const imgWidth = 50;
    const imgHeight = 50;
    doc.addImage(LogoFactura, 'PNG', 10, 10, imgWidth, imgHeight);
    doc.addImage(LogoFactura2, 'JPG', 150, 10, imgWidth, imgHeight);
  
    // Imprimir el PDF
    doc.autoPrint();
    window.open(doc.output('bloburl'), '_blank');
  };
  
  
  return (
    <div className='main_content_factura'>
      <div>
        <TituloyDesc titulo={tituloVentasControl} descripcion={descipcion} />
      </div>
      <div className="sub_contenido_factura">
        <div className="content_factura__right">
          <div className="factura_generada_format">
            <div className="titlle_up_factura">
              <span>Factura</span>
              <i className="bi bi-caret-down-fill"></i>
            </div>
            <div className="factura__generada_ms" ref={containerRef}>
              <div className="content_main_factura_gen">
                <div className="triangulos_container_top_factura">
                  {triangulos}
                </div>
                <div className="content_factura_ms">
                  <div className="tittle_factura_gn">
                    <img className='logo__Factura_gn' src={LogoFactura} alt="Logo-factura" />
                    <span className='tittle_factura_format'>La Tiendecita Alemana</span>
                    <span className='tittle_factura_format'>http://www.LaTiendecitaAlemana.com</span>
                    <span className='tittle_factura_format'>-------------------</span>
                    <span className='tittle_factura_format'>Servido por {Nombre_Empleado}</span>
                  </div>
                  <div className="content__factura_gn2" >
                    <div className="factura_formatt_main">
                      <div className="header_factura_gn">
                        <div className="left_factura_gn">
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn'>ID Factura:</span>
                            <span className='cuerpo_fecha__tittle_factura_gn' style={{ marginLeft: '15px' }}>#560500</span>
                          </div>
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn'>Fecha Factura:</span>
                            <span className='cuerpo_fecha__tittle_factura_gn' style={{ marginLeft: '15px' }}>{Fecha_Factura}</span>
                          </div>
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn'>Hora Factura:</span>
                            <span className='cuerpo_fecha__tittle_factura_gn' style={{ marginLeft: '15px' }}>{Hora_Factura}</span>
                          </div>
                        </div>
                        <div className="right_factura_gn">
                          <img className='logo__Factura_gn2' src={LogoFactura2} alt="Logo Factura" />
                          <div className="txtHeader__factura">
                            <span className='tittle_tiendecita'>La Tiendecita</span>
                            <span className='tittle_tiendecita'>Alemana<span className='puntito_factura'>.</span></span>
                          </div>
                        </div>
                      </div>
                      <div className="header_factura_gn">
                        <div className="left_factura_gn">
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn' style={{ marginBottom: '7px' }}>Deudor Asignado</span>
                          </div>
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn' style={{ marginBottom: '7px', fontSize: '20px', width: '200px' }}>{Nombre_Deudor}</span>
                          </div>
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn' style={{ marginBottom: '7px', fontSize: '20px', width: '200px' }}>{Telefono_Deudor}</span>
                          </div>
                        </div>
                        <div className="right_factura_gn__sub">
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn' style={{ marginBottom: '7px' }}>Empleado encargado</span>
                          </div>
                          <div className="tittles_factura_generada">
                            <span className='cuerpo__tittle_factura_gn' style={{ marginBottom: '7px', fontSize: '20px', width: '200px' }}>{Nombre_Empleado}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="factura_format_datos_gn">
                      <table class="tg">
                        <thead>
                          <tr>
                            <th class="tg-lan2">Descripción</th>
                            <th class="tg-lan2">Cantidad</th>
                            <th class="tg-lan2">Precio</th>
                            <th class="tg-lan2">Importe</th>
                          </tr>
                        </thead>
                        <tbody>

                          {Productos_Seleccionados?.map((producto, index) => (
                            <tr key={index}>
                              <td className="tg-iks7">{producto.Nombre_Producto}</td>
                              <td className="tg-gczw">{producto.cantidad}</td>
                              <td className="tg-gczw">$ {producto.Precio_Venta}</td>
                              <td className="tg-gczw">$ {producto.Precio_Venta * producto.cantidad}</td>
                            </tr>
                          ))}

                          <tr>
                            <td class="tg-48gu" rowspan="3"></td>
                            <td class="tg-hpx4" colSpan="2">SUBTOTAL</td>
                            <td class="tg-k5zi">${Subtotal_Sin_IVA}</td>
                          </tr>
                          <tr>
                            <td class="tg-hpx4" colSpan="2">IVA</td>
                            <td class="tg-k5zi">$ {Total_IVA}</td>
                          </tr>
                          <tr>
                            <td class="tg-hpx4" colSpan="2">TOTAL</td>
                            <td class="tg-7s0x">$ {Total_Factura}</td>
                          </tr>
                          <tr>
                            <td class="tg-hpx4" >Dinero Recibido: </td>
                            <td class="tg-hpx4"><span className="puntito_factura"> $ {Dinero_Recibido}</span></td>
                            <td class="tg-hpx4">Dinero Devuelto: </td>
                            <td class="tg-hpx4"><span className="puntito_factura"> $ {Dinero_Devuelto}</span></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="triangulos_container_top_factura invertir_triangulos">
                  {triangulos}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="divisor_vertical_factura"></div>
        <div className="content_factura__left">
          <span className='titulo__factura' style={{ marginTop: '40px' }}><i className="bi bi-check-lg"></i></span>
          <span className='titulo__factura'>Listo.</span>
          <span className='sub_titulo__factura'>Finalizaste tu pago.</span>
          <span className='sub_titulo__factura' style={{ color: '#fc7c00', letterSpacing: '5pt' }}> -------------</span>
          <div className="titlle_up_factura" style={{ marginTop: '20px' }}>
            <span style={{ marginRight: '5px' }}>Opciones</span>
            <i className="bi bi-caret-down-fill"></i>
          </div>
          <div className="misbotons_factura">
            <div className="button_factura_actions" onClick={descargarPDF}>
              <div className="icon_button_factura" >
                <i className="bi bi-file-earmark-arrow-down-fill"></i>
              </div>
              <span className='text_button_factura'>Descargar PDF</span>
            </div>
            <div className="button_factura_actions" onClick={imprimirRecibo}>
              <div className="icon_button_factura">
                <i className="bi bi-printer-fill"></i>
              </div>
              <span className='text_button_factura'>Imprimir Recibo</span>
            </div>
          </div>
        </div>
      </div>
      <div className="content_factura__bottom">
        <div className="divisor_factura"></div>
        <div className="buttons_final_factura">
          <div className='nada__'></div>
          <button className='btn__factura_nextVenta' onClick={pasarAVenta}>Siguiente Venta
            <i className="bi bi-chevron-double-right"></i>
          </button>

        </div>
      </div>
    </div>
  )
}

export default Main_Factura_Document

 {/* <div className="content__factura_gn" style={{ display: 'none' }}>
                    <div className="content_fechas_factura">
                      <div className="fechas_factura" >
                        <span className='cuerpo__tittle_factura_gn'>ID Factura:</span>
                        <span className='cuerpo_fecha__tittle_factura_gn' style={{ marginLeft: '15px' }}>#5464755</span>
                      </div>
                      <div className="fechas_factura">
                        <span className='cuerpo__tittle_factura_gn'>Fecha de la Venta:</span>
                        <span className='cuerpo_fecha__tittle_factura_gn' style={{ marginLeft: '15px' }}>13/08/2022</span>
                      </div>
                      <div className="fechas_factura">
                        <span className='cuerpo__tittle_factura_gn'>Fecha de la Venta:</span>
                        <span className='cuerpo_fecha__tittle_factura_gn' style={{ marginLeft: '15px' }}>18:01:00</span>
                      </div>
                      <div className="sep__factura" style={{ width: '400px', margin: '15px 0px' }}></div>
                    </div>
                    <table className='Table_factura_gn'>
                      <tbody>
                        <tr>
                          <td><span className='title_factura_gn'>Productos</span></td>
                        </tr>
                        {detalleVentaAFactura?.Detalle_Productos_Agregados?.Productos_Seleccionados?.map((producto, index) => (
                          <tr key={index}>
                            <td>{producto.Nombre_Producto} x {producto.Cantidad}</td>
                            <td className='subtotal_prod_factura'>$ {producto.Precio_Venta * producto.Cantidad}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <table className='Table_factura_gn'>
                      <div className="sep__factura" style={{ width: '400px', margin: '15px 0px' }}></div>
                      <tbody>
                        <tr>
                          <td><span className='title_factura_gn'>Venta</span></td>
                        </tr>
                        <tr>
                          <td>Método de Pago: </td>
                          <td className='subtotal_prod_factura'>Efectivo</td>
                        </tr>
                        <tr>
                          <td>Recibido: </td>
                          <td className='subtotal_prod_factura'>$ 15.000</td>
                        </tr>
                        <tr>
                          <td>Cambio: </td>
                          <td className='subtotal_prod_factura'>$ 15.000</td>
                        </tr>
                        <tr>
                          <td><span className='title_factura_gn'>Cálculos</span></td>
                        </tr>
                        <tr>
                          <td>SubTotal: </td>
                          <td className='subtotal_prod_factura'>$ 15.000</td>
                        </tr>
                        <tr>
                          <td>IVA total: </td>
                          <td className='subtotal_prod_factura'>$ 15.000</td>
                        </tr>
                        <tr>
                          <td><span style={{ fontSize: '20px' }}>Total de la factura:</span></td>
                          <td className='subtotal_prod_factura'><span style={{ fontSize: '20px' }}>$ 300</span></td>
                        </tr>
                      </tbody>
                    </table>
                  </div> */}