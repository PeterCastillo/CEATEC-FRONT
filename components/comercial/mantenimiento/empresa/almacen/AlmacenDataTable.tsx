"use client";

import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IAlmacenDataTable {
  rows: number;
  columns: IWareHouse[];
  action: (data: IWareHouse) => void;
  sucursales: IBranchOffice[];
}
export const AlmacenDataTable: FC<IAlmacenDataTable> = ({
  rows,
  columns,
  action,
  sucursales,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    descripcion: "",
    ubicacion: "",
    sucursal_id: "",
  });

  useEffect(() => {
    if (filtros.sucursal_id) {
      return;
    }
    searchAlmacenes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchAlmacenes = () => {
    const filterSectors = columns.filter((almacen) => {
      if (filtros.descripcion) {
        return almacen.descripcion
          .toUpperCase()
          .includes(filtros.descripcion.toUpperCase());
      }
      if (filtros.ubicacion) {
        return almacen.ubicacion
          .toUpperCase()
          .includes(filtros.ubicacion.toUpperCase());
      }
      return almacen;
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
        estado: false,
        descripcion: "",
        ubicacion: "",
        sucursal_id: "",
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
          <td>
            {
              sucursales.find((item) => item._id.$oid == column.sucursal_id)
                ?.descripcion
            }
          </td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      descripcion: name == "descripcion" ? value.toUpperCase() : "",
      ubicacion: name == "ubicacion" ? value.toUpperCase() : "",
      sucursal_id: "",
    });
  };

  const handleSelectedSucursalId = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setFiltros({
      descripcion: "",
      ubicacion: "",
      sucursal_id: value,
    });
    const filter = columns.filter((item) => item.sucursal_id == value);
    setData(filter);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Ubicacion</th>
            <th>Sucursal</th>
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
            <td>
              <select
                name="sucursal"
                onChange={handleSelectedSucursalId}
                value={filtros.sucursal_id}
              >
                <option value="" hidden></option>
                <option value="">TODAS</option>
                {sucursales.map((sucursal) => (
                  <option key={sucursal._id.$oid} value={sucursal._id.$oid}>
                    {sucursal.descripcion}
                  </option>
                ))}
              </select>
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
