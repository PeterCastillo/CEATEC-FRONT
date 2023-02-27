"use client";
import styles from "@/styles/DataTable.module.scss";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { FC, FormEvent, useState, useEffect } from "react";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IZonaDataTable {
  rows: number;
  columns: IZone[];
  action: (data: IZone) => void;
}

export const ZonaDataTable: FC<IZonaDataTable> = ({
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
    seachZones();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const seachZones = () => {
    const filterZones = columns.filter((zone) => {
      if (filtros.nombre) {
        return zone.zona.includes(filtros.nombre);
      }
      if (filtros.descripcion) {
        return zone.descripcion.includes(filtros.descripcion);
      }
      return zone;
    });
    setData(filterZones);
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
        zona: "",
        descripcion: "",
        empresa_id: "",
        estado: false,
      };
      newData.push(emptyObject);
    }
    return newData
      .map((column, index) => {
        return (
          <tr
            key={index}
            onClick={() => {
              if (column._id.$oid) {
                action(column);
              }
            }}
          >
            <td>{column.zona}</td>
            <td>{column.descripcion}</td>
          </tr>
        );
      })
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      descripcion: name == "descripcion" ? value.toUpperCase() : "",
      nombre: name == "nombre" ? value.toUpperCase() : "",
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Zona</th>
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
