// useInventario.js
import { useState } from "react";

const useInventario = () => {
  const [inventario, setInventario] = useState([
    {
        codigo: "PK-103",
        nombre: "Poker",
        tipo: "Botella",
        cantidadNeta: "330 (ml)",
        lote: "2",
        precioProve: "2100",
        precioVenta: "2500",
        fechaCaducidad: "20 dec 2024",
        proveedor: "Bavaria",
      },
      {
        codigo: "AX-201",
        nombre: "Cheese tris",
        tipo: "Empaquetado",
        cantidadNeta: "40 (g)",
        lote: "1",
        precioProve: "1850",
        precioVenta: "2500",
        fechaCaducidad: "14 ene 2024",
        proveedor: "Fritolay",
      },
      {
        codigo: "DT-101",
        nombre: "De Todito",
        tipo: "Empaquetado",
        cantidadNeta: "55 (g)",
        lote: "2",
        precioProve: "2234",
        precioVenta: "2600",
        fechaCaducidad: "22 jun 2024",
        proveedor: "Margarita",
      },
      {
        codigo: "PN-101",
        nombre: "Pony Malta",
        tipo: "Botella",
        cantidadNeta: "250 (ml)",
        lote: "2",
        precioProve: "2780",
        precioVenta: "2300",
        fechaCaducidad: "16 feb 2024",
        proveedor: "Bavaria",
      },
      {
        codigo: "FS-101",
        nombre: "Fesvital",
        tipo: "Empaquetado",
        cantidadNeta: "25 (g)",
        lote: "2",
        precioProve: "680",
        precioVenta: "1000",
        fechaCaducidad: "10 ene 2024",
        proveedor: "Colombiana",
      },
      {
        "codigo": "CJ-301",
        "nombre": "Chocolate Jet",
        "tipo": "Tableta",
        "cantidadNeta": "100 (g)",
        "lote": "3",
        "precioProve": "3200",
        "precioVenta": "4000",
        "fechaCaducidad": "18 mar 2024",
        "proveedor": "Nacional de Chocolates"
    },
    {
      "codigo": "GM-202",
      "nombre": "Galletas Marinela",
      "tipo": "Empaquetado",
      "cantidadNeta": "150 (g)",
      "lote": "2",
      "precioProve": "2500",
      "precioVenta": "3200",
      "fechaCaducidad": "25 abr 2024",
      "proveedor": "Grupo Bimbo"
  },
  {
    "codigo": "JH-105",
    "nombre": "Jugo Hit",
    "tipo": "Botella",
    "cantidadNeta": "500 (ml)",
    "lote": "1",
    "precioProve": "1800",
    "precioVenta": "2300",
    "fechaCaducidad": "12 may 2024",
    "proveedor": "Postobón"
},
{
  "codigo": "PM-155",
  "nombre": "Papas Margarita",
  "tipo": "Empaquetado",
  "cantidadNeta": "75 (g)",
  "lote": "3",
  "precioProve": "1200",
  "precioVenta": "1500",
  "fechaCaducidad": "30 jun 2024",
  "proveedor": "Margarita"
},
{
  "codigo": "RC-401",
  "nombre": "Colombiana",
  "tipo": "Lata",
  "cantidadNeta": "355 (ml)",
  "lote": "4",
  "precioProve": "1700",
  "precioVenta": "2000",
  "fechaCaducidad": "15 jul 2024",
  "proveedor": "Colombiana"
},

  
  ]);

  const [nuevoInventario, setNuevoInventario] = useState({
    codigo: "",
    nombre: "",
    tipo: "",
    cantidadNeta: "",
    lote: "",
    precioProve: "",
    precioVenta: "",
    fechaCaducidad: "",
    proveedor: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevoInventario({ ...nuevoInventario, [name]: value });
  };

  const agregarInventario = (e) => {
    e.preventDefault();

    setInventario([...inventario, nuevoInventario]);

    setNuevoInventario({
        codigo: "",
        nombre: "",
        tipo: "",
        cantidadNeta: "",
        lote: "",
        precioProve: "",
        precioVenta: "",
        fechaCaducidad: "",
        proveedor: "",
    });
  };
  const borrar = (codigo) => {
    const temp = inventario.filter((inv) => inv.codigo !== codigo);
    setInventario(temp);
  };

  return {
    inventario,
    nuevoInventario,
    handleInputChange,
    agregarInventario,
    borrar
  };
};

export default useInventario;
