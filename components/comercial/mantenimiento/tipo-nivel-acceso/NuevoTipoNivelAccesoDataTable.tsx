"use client";

import { FC, useState, FormEvent, useEffect } from "react";
import { ITipoNivelAcceso } from "@/interfaces/comercial/mantenimiento/tipo-nivel-acceso/tipoNivelAcceso";
import styles from "@/styles/DataTable.module.scss";

interface INuevoTipoNivelAccesoDataTable {
  rows: number;
  columns: ITipoNivelAcceso[];
  action: (data: any) => void;
}
export const NuevoTipoNivelAccesoDataTable: FC<
  INuevoTipoNivelAccesoDataTable
> = ({ rows, columns, action }) => {
  const [pagination, setPagination] = useState(1);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    nombre: "",
    estado: "",
    estado_boolean: false,
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const searchGastos = () => {
    const filterSectors = columns.filter((sector) => {
      if (filtros.nombre) {
        return sector.nombre.includes(filtros.nombre);
      }
      if (filtros.estado) {
        return sector.estado == filtros.estado_boolean;
      }
      return sector;
    });
    setData(filterSectors);
  };

  const filterByStatus = (value: string) => {
    const statusActivate = "ACTIVO";
    const statusDesactivate = "DESACTIVADO";
    if (statusActivate.includes(value)) {
      return true;
    } else if (statusDesactivate.includes(value)) {
      return false;
    }
    return true;
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const initialForm = {
      nombre: "",
      estado: "",
      estado_boolean: false,
    };
    if (name == "nombre") {
      return setFiltros({
        ...initialForm,
        nombre: value.toUpperCase(),
      });
    }
    if (name == "estado") {
      setFiltros({
        ...initialForm,
        estado: value.toUpperCase(),
        estado_boolean: filterByStatus(value.toUpperCase()),
      });
    }
  };

  const returnText = (status: boolean | undefined) => {
    switch (status) {
      case false:
        return "Desactivado";
      case true:
        return "Activo";
      default:
        return "Aprobado";
    }
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
          <td>{column.nombre}</td>
          <td>
            <span>{returnText(column.estado)}</span>
          </td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.buscador}>
          <td>
            <input autoComplete="off"
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltrosChange}
            />
          </td>

          <td>
            <input autoComplete="off"
              type="text"
              name="estado"
              value={filtros.estado}
              onChange={handleFiltrosChange}
            />
          </td>
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
