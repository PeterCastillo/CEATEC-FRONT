import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import React, { FC, useState, useEffect, FormEvent } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface ISucursalDataTable {
  rows: number;
  columns: IBranchOffice[];
  action: (data: IBranchOffice) => void;
}

export const SucursalDataTable: FC<ISucursalDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    ubicacion: "",
    descripcion: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    searchBranches();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const updatePagination = (action: string) => {
    if (action === "next") {
      return setPagination(pagination + 1);
    }
    return setPagination(pagination - 1);
  };

  const searchBranches = () => {
    const filterBranches = columns.filter((branch) => {
      if (filtros.descripcion) {
        return branch.descripcion.includes(filtros.descripcion);
      }
      if (filtros.ubicacion) {
        return branch.ubicacion.includes(filtros.ubicacion);
      }
      return branch;
    });
    setData(filterBranches);
  };

  const renderRows = () => {
    const startIndex = pagination * 10;
    const endIndex = pagination * 10 + 10;
    if (!data.length) {
      return (
        <>
          <tr>
            <td colSpan={2}>No tiene datos</td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
          </tr>
          <tr>
            <td colSpan={2}></td>
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
        descripcion: "",
        ubicacion: "",
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
          <td>{column.descripcion}</td>
          <td>{column.ubicacion}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = { ubicacion: "", descripcion: "" };
    if (name == "ubicacion") {
      setFiltros({
        ...initialForm,
        ubicacion: value.toUpperCase(),
      });
    }
    if (name == "descripcion") {
      setFiltros({
        ...initialForm,
        descripcion: value.toUpperCase(),
      });
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Ubicacion</th>
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
                name="ubicacion"
                value={filtros.ubicacion}
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
