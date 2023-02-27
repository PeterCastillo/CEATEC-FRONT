"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import { IGasto } from "@/interfaces/comercial/mantenimiento/gastos/gastosInterface";
import styles from "@/styles/DataTable.module.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IGastosDataTable {
  rows: number;
  columns: IGasto[];
  action: (data: IGasto) => void;
}
export const GastosDataTable: FC<IGastosDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    cuenta_contable: "",
    descripcion: "",
    resumen_automatico: "",
  });

  useEffect(() => {
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchGastos = () => {
    const filterSectors = columns.filter((sector) => {
      if (filtros.cuenta_contable) {
        return sector.cuenta_contable
          .toString()
          .startsWith(filtros.cuenta_contable);
      }
      if (filtros.descripcion) {
        return sector.descripcion.includes(filtros.descripcion);
      }
      if (filtros.resumen_automatico) {
        return sector.resumen_automatico.includes(filtros.resumen_automatico);
      }
      return sector;
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
        cuenta_contable: "",
        resumen_automatico: "",
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
          <td>{column.descripcion}</td>
          <td>{column.cuenta_contable}</td>
          <td>{column.resumen_automatico}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      cuenta_contable: "",
      descripcion: "",
      resumen_automatico: "",
    };
    if (name == "cuenta_contable") {
      return setFiltros({
        ...initialForm,
        cuenta_contable: value.toUpperCase(),
      });
    }
    if (name == "descripcion") {
      return setFiltros({ ...initialForm, descripcion: value.toUpperCase() });
    }
    if (name == "resumen_automatico") {
      return setFiltros({
        ...initialForm,
        resumen_automatico: value.toUpperCase(),
      });
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Cta. Contable</th>
            <th>Resumen Automático</th>
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
                name="cuenta_contable"
                value={filtros.cuenta_contable}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="resumen_automatico"
                value={filtros.resumen_automatico}
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
