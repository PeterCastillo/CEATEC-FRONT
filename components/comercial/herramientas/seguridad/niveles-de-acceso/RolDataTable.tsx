"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IRol } from "@/interfaces/autenticacion/usuariosInterface";

interface IRolDataTable {
  rows: number;
  columns: IRol[];
  action: (data: IRol) => void;
}
export const RolDataTable: FC<IRolDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(1);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    descripcion: "",
  });

  useEffect(() => {
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchGastos = () => {
    const filterSectors = columns.filter((rol) => {

      if (filtros.descripcion) {
        return rol.descripcion.includes(filtros.descripcion);
      }
      return rol;
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
          <td>{column.descripcion}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const initialForm = {
      descripcion: "",
    };
    if (name == "descripcion") {
      return setFiltros({ ...initialForm, descripcion: value.toUpperCase() });
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Descripcion</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.buscador}>
          <td>
            <input autoComplete="off"
              type="text"
              name="descripcion"
              value={filtros.descripcion}
              onChange={handleFiltrosChange}
            />
          </td>
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
