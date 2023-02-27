import React, { useState, useEffect, FormEvent, FC } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IClienteProveedorDataTable {
  rows: number;
  columns: IClientProvider[];
  action: (data: IClientProvider) => void;
}

export const ClienteProveedorDataTable: FC<IClienteProveedorDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    nombre: "",
    direccion: "",
    dni_ruc: "",
    telefono: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const updatePagination = (action: string) => {
    if (action === "next") {
      return setPagination(pagination + 1);
    }
    return setPagination(pagination - 1);
  };

  const searchProveedores = (name: string, value: string) => {
    const filterSectors = columns.filter((proveedor) => {
      if (name == "nombre") {
        const nombre = proveedor.nombre_comercial
          ? proveedor.nombre_comercial
          : proveedor.nombre_natural.concat(
              " ",
              proveedor.apellido_paterno_natural,
              " ",
              proveedor.apellido_materno_natural
            );
        return nombre.toUpperCase().includes(value);
      }
      if (name == "direccion") {
        return proveedor.direccion.includes(value);
      }
      if (name == "dni_ruc") {
        return proveedor.dni_ruc.includes(value);
      }
      if (name == "telefono") {
        return proveedor.telefono1.includes(value);
      }
      return proveedor;
    });
    setData(filterSectors);
  };

  const renderRows = () => {
    const startIndex = pagination * 10;
    const endIndex = pagination * 10 + 10;
    if (!data.length) {
      return (
        <>
          <tr>
            <td colSpan={4}>No tiene datos</td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
        </>
      );
    }
    const newData = [...data];
    const empty = data.length.toString().split("").at(-1);
    for (let i = 0; i < 10 - Number(empty); i++) {
      const emptyObject = {
        _id: {
          $oid: "",
        },
        estado: false,
        tipo_cliente_proveedor_id: "",
        clasificacion: "",
        dni_ruc: "",
        nombre_comercial: "",
        nombre_natural: "",
        apellido_paterno_natural: "",
        apellido_materno_natural: "",
        fecha_nacimiento_natural: "",
        codigo_ubigeo: "",
        sector_id: "",
        zona_id: "",
        direccion: "",
        email: "",
        telefono1: "",
        telefono2: "",
        nombre_contacto_otro: "",
        telefono_contacto_otro: "",
        descripcion_contacto_otro: "",
        precio_credito: null,
        empresa_id: "",
      };
      newData.push(emptyObject);
    }
    return newData
      .map((column, index) => (
        <tr
          key={index}
          onClick={() => {
            if (column._id.$oid) {
              action(column);
            }
          }}
        >
          {column.nombre_natural == "" ? (
            <td>{column.nombre_comercial}</td>
          ) : (
            <td>
              {column.nombre_natural} {column.apellido_paterno_natural}{" "}
              {column.apellido_materno_natural}
            </td>
          )}
          <td>{column.direccion}</td>
          <td>{column.dni_ruc}</td>
          <td>{column.telefono1}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      nombre: "",
      direccion: "",
      dni_ruc: "",
      telefono: "",
    };
    if (name == "nombre") {
      searchProveedores(name, value.toUpperCase());
      setFiltros({
        ...initialForm,
        nombre: value.toUpperCase(),
      });
    }
    if (name == "direccion") {
      searchProveedores(name, value.toUpperCase());
      setFiltros({
        ...initialForm,
        direccion: value.toUpperCase(),
      });
    }
    if (name == "dni_ruc") {
      searchProveedores(name, value.toUpperCase());
      setFiltros({
        ...initialForm,
        dni_ruc: value.toUpperCase(),
      });
    }
    if (name == "telefono") {
      searchProveedores(name, value.toUpperCase());
      setFiltros({
        ...initialForm,
        telefono: value.toUpperCase(),
      });
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>DNI/RUC</th>
            <th>Teléfonos</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.buscador}>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="nombre"
                value={filtros.nombre}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="direccion"
                value={filtros.direccion}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="dni_ruc"
                value={filtros.dni_ruc}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="telefono"
                value={filtros.telefono}
                onChange={handleFiltrosChange}
              />
            </td>
          </tr>
          {renderRows()}
        </tbody>
      </table>
      <div className={styles.pag}>
        <div
          onClick={() => {
            if (data.length == 0) {
              return;
            }
            setPagination(
              pagination === 0
                ? Math.ceil(data.length / 10) - 1
                : pagination - 1
            );
          }}
        >
          <IoIosArrowBack />
        </div>
        <span>
          {pagination + 1}/
          {Math.ceil(data.length / 10) == 0 ? 1 : Math.ceil(data.length / 10)}
        </span>
        <div
          onClick={() => {
            if (data.length == 0) {
              return;
            }
            setPagination(
              pagination == Math.ceil(data.length / 10) - 1 ? 0 : pagination + 1
            );
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </>
  );
};
