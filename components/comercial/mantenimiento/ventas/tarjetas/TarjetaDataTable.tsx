import { ITarjeta } from "@/interfaces/comercial/mantenimiento/ventas/tarjetasInterface";
import styles from "@/styles/DataTable.module.scss";
import React, { useState, useEffect, FC, FormEvent } from "react";

interface ITarjetaDataTable {
  rows: number;
  columns: ITarjeta[];
  action: (data: ITarjeta) => void;
}

export const TarjetaDataTable: FC<ITarjetaDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(1);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState<any>({
    nombre: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      [name]: value.toUpperCase(),
    });
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
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
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
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
