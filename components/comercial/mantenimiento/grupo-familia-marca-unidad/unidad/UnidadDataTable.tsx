"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IUnidadDataTable {
  rows: number;
  columns: IUnit[];
  action: (data: IUnit) => void;
}
export const UnidadDataTable: FC<IUnidadDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    abreviatura: "",
    descripcion: "",
    valor: "",
  });

  useEffect(() => {
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchGastos = () => {
    const filterUnidad = columns.filter((unidad) => {
      if (filtros.descripcion) {
        return unidad.descripcion
          .toUpperCase()
          .includes(filtros.descripcion.toUpperCase());
      }
      if (filtros.abreviatura) {
        return unidad.abreviatura
          .toUpperCase()
          .includes(filtros.abreviatura.toUpperCase());
      }
      if (filtros.valor) {
        return unidad.valor.toString().startsWith(filtros.valor);
      }
      return unidad;
    });
    setData(filterUnidad);
  };

  const renderRows = () => {
    const startIndex = pagination * 10;
    const endIndex = pagination * 10 + 10;
    if (!data.length) {
      return (
        <>
          <tr>
            <td colSpan={3}>No tiene datos</td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
          </tr>
          <tr>
            <td colSpan={3}></td>
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
        descripcion: "",
        abreviatura: "",
        valor: "",
        empresa_id: "",
        estado: false,
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
          <td>{column.abreviatura}</td>
          <td>{column.descripcion}</td>
          <td>{column.valor}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "valor") {
        return;
      }
    }
    setFiltros({
      abreviatura: name == "abreviatura" ? value.toUpperCase() : "",
      descripcion: name == "descripcion" ? value.toUpperCase() : "",
      valor: name == "valor" ? value : "",
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Abreviatura</th>
            <th>Descripcion</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.buscador}>
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
                name="descripcion"
                value={filtros.descripcion}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="valor"
                name="valor"
                value={filtros.valor}
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
