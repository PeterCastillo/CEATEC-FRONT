import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import React, { useState, useEffect, FormEvent, FC } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface ISectorDataTable {
  rows: number;
  columns: ISector[];
  action: (data: ISector) => void;
}

export const SectorDataTable: FC<ISectorDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    nombre: "",
    descripcion: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    searchSectors();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const updatePagination = (action: string) => {
    if (action === "next") {
      return setPagination(pagination + 1);
    }
    return setPagination(pagination - 1);
  };

  const searchSectors = () => {
    const filterSectors = columns.filter((sector) => {
      if (filtros.nombre) {
        return sector.sector.startsWith(filtros.nombre);
      }
      if (filtros.descripcion) {
        return sector.descripcion
          .toUpperCase()
          .includes(filtros.descripcion.toUpperCase());
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
          <td>{column.sector}</td>
          <td>{column.descripcion}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      descripcion: name == "descripcion" ? value : "",
      nombre: name == "nombre" ? value : "",
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Sector</th>
            <th>Descripcion</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.buscador}>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="nombre"
                value={filtros.nombre}
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
