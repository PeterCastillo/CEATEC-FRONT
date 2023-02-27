"use client";

import { IReceivedArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";

interface IArt {
  articulo: {
    id: string | undefined;
    nombre_articulo: string;
    marca: string;
  };
  _id: {
    $oid: string;
  };
  selected?: boolean;
}

interface IArticulosSaveDataTable {
  rows: number;
  columns: IArt[];
  action: (data: string) => void;
}

export const ArticulosSaveDataTable: FC<IArticulosSaveDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(1);
  const [articlesList, setArticlesList] = useState<IArt[]>(columns);

  useEffect(() => {
    setArticlesList(columns);
  }, [columns]);

  const renderRows = () => {
    const startIndex = rows * pagination - rows;
    const endIndex = rows * pagination;
    if (!articlesList.length) {
      return (
        <tr>
          <td>No tiene datos</td>
        </tr>
      );
    }
    return articlesList
      .map((column, index) => (
        <tr key={index}>
          <td>{column.articulo.nombre_articulo}</td>
          <td onClick={() => action(column._id?.$oid)}>Eliminar</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Nombre</th>
          <th>Eliminar</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr className={styles.buscador}>
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
    </tr> */}
        {renderRows()}
      </tbody>
    </table>
  );
};
