"use client";

import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface ICompraDataTable {
  rows: number;
  columns: ITipoDocumentoCompra[];
  action: (data: ITipoDocumentoCompra) => void;
}

export const CompraDataTable: FC<ICompraDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    descripcion: "",
    abreviatura: "",
    serie: "",
    correlativo: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    searchCompras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const searchCompras = () => {
    const filterCompras = columns.filter((compra) => {
      if (filtros.descripcion) {
        return compra.descripcion.includes(filtros.descripcion);
      }
      if (filtros.abreviatura) {
        return compra.abreviatura.includes(filtros.abreviatura);
      }
      if (filtros.serie) {
        return compra.serie.toString().startsWith(filtros.serie);
      }
      if (filtros.correlativo) {
        return compra.correlativo.toString().startsWith(filtros.correlativo);
      }
      return compra;
    });
    setData(filterCompras);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      descripcion: "",
      abreviatura: "",
      serie: "",
      correlativo: "",
    };
    if (name == "descripcion") {
      setFiltros({
        ...initialForm,
        descripcion: value.toUpperCase(),
      });
    }
    if (name == "abreviatura") {
      setFiltros({
        ...initialForm,
        abreviatura: value.toUpperCase(),
      });
    }
    if (name == "serie") {
      setFiltros({
        ...initialForm,
        serie: value.toUpperCase(),
      });
    }
    if (name == "correlativo") {
      setFiltros({
        ...initialForm,
        correlativo: value.toUpperCase(),
      });
    }
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
        abreviatura: "",
        descripcion: "",
        serie: "",
        correlativo: "",
        empresa_id: "",
        estado: false,
      };
      newData.push(emptyObject);
    }
    return newData
      .map((column, index) => (
        <tr key={index} onClick={() => action(column)}>
          <td>{column.descripcion}</td>
          <td>{column.abreviatura}</td>
          <td>{column.serie}</td>
          <td>{column.correlativo}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Abreviatura</th>
            <th>Serie</th>
            <th>Correlativo</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.buscador}>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="descripcion"
                value={filtros.descripcion}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="abreviatura"
                value={filtros.abreviatura}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="serie"
                value={filtros.serie}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="correlativo"
                value={filtros.correlativo}
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
