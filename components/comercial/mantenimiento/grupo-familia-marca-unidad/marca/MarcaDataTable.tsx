"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IMarcaDataTable {
  rows: number;
  columns: IBrand[];
  action: (data: IBrand) => void;
}
export const MarcaDataTable: FC<IMarcaDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
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
    const filterSectors = columns.filter((marca) => {
      if (filtros.descripcion) {
        return marca.descripcion.includes(filtros.descripcion);
      }
      return marca;
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
            <td colSpan={1}>No tiene datos</td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
          </tr>
          <tr>
            <td colSpan={1}></td>
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
        sector: "",
        descripcion: "",
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
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      descripcion: "",
    };
    if (name == "descripcion") {
      return setFiltros({ ...initialForm, descripcion: value.toUpperCase() });
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripcion</th>
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
