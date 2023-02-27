"use client";

import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";

interface IProveedorDataTabe {
  rows: number;
  columns: IClientProvider[];
  action: (data: IClientProvider) => void;
}
export const ProveedorDataTabe: FC<IProveedorDataTabe> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(1);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    dni_ruc: "",
    nombre_razon_social: "",
    direccion: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchProveedor = (name: string, value: string) => {
    const filterSectors = columns.filter((sector) => {
      if (name == "dni_ruc") {
        return sector.dni_ruc.toString().includes(value);
      }
      if (name == "nombre_razon_social") {
        const name =
          sector.nombre_comercial.length > 0
            ? sector.nombre_comercial
            : sector.nombre_natural +
              " " +
              sector.apellido_paterno_natural +
              " " +
              sector.apellido_materno_natural;
        return name.includes(value);
      }
      if (name == "direccion") {
        return sector.direccion.includes(value);
      }
      return sector;
    });
    setData(filterSectors);
  };

  const renderRows = () => {
    const startIndex = rows * pagination - rows;
    const endIndex = rows * pagination;
    if (!data.length) {
      return (
        <tr>
          <td>No tiene datos</td>
        </tr>
      );
    }
    return data
      .map((column, index) => (
        <tr key={index} onClick={() => action(column)}>
          <td>{column.dni_ruc}</td>
          <td>
            {column.nombre_comercial.length > 0
              ? column.nombre_comercial
              : column.nombre_natural +
                " " +
                column.apellido_paterno_natural +
                " " +
                column.apellido_materno_natural}
          </td>
          <td>{column.direccion}</td>{" "}
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const initialForm = {
      dni_ruc: "",
      nombre_razon_social: "",
      direccion: "",
    };
    if (name == "dni_ruc") {
      searchProveedor(name, value.toUpperCase());
      return setFiltros({
        ...initialForm,
        dni_ruc: value.toUpperCase(),
      });
    }
    if (name == "nombre_razon_social") {
      searchProveedor(name, value.toUpperCase());
      return setFiltros({
        ...initialForm,
        nombre_razon_social: value.toUpperCase(),
      });
    }
    if (name == "direccion") {
      searchProveedor(name, value.toUpperCase());
      return setFiltros({
        ...initialForm,
        direccion: value.toUpperCase(),
      });
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>DNI/RUC</th>
          <th>Nombre/Razón Social</th>
          <th>Dirección</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.buscador}>
          <td>
            <input autoComplete="off"
              type="text"
              name="dni_ruc"
              value={filtros.dni_ruc}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="nombre_razon_social"
              value={filtros.nombre_razon_social}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="direccion"
              value={filtros.direccion}
              onChange={handleFiltrosChange}
            />
          </td>
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
