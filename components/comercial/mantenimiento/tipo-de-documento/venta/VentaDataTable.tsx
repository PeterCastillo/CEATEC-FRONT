"use client";

import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";

interface IVentaDataTable {
  rows: number;
  columns: ITipoDocumentoVenta[];
  action: (data: ITipoDocumentoVenta) => void;
  cajas: IBox[];
}

export const VentaDataTable: FC<IVentaDataTable> = ({
  rows,
  columns,
  action,
  cajas,
}) => {
  const [pagination, setPagination] = useState(1);
  const [tipoDocumentoVentaList, setTipoDocumentoVentaList] = useState(columns);
  const [filtros, setFiltros] = useState({
    descripcion: "",
    abreviatura: "",
    serie: "",
    correlativo: "",
    caja_id: "",
  });

  useEffect(() => {
    setTipoDocumentoVentaList(columns);
  }, [columns]);

  useEffect(() => {
    searchVentas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const searchVentas = () => {
    const filterVentas = columns.filter((venta) => {
      if (filtros.descripcion) {
        return venta.descripcion.includes(filtros.descripcion);
      }
      if (filtros.abreviatura) {
        return venta.abreviatura.includes(filtros.abreviatura);
      }
      if (filtros.serie) {
        return venta.serie.toString().startsWith(filtros.serie);
      }
      if (filtros.correlativo) {
        return venta.correlativo.toString().startsWith(filtros.correlativo);
      }
      if (filtros.caja_id) {
        return venta.caja_id.toString().includes(filtros.caja_id);
      }
      return venta;
    });
    setTipoDocumentoVentaList(filterVentas);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    const initialForm = {
      descripcion: "",
      abreviatura: "",
      serie: "",
      correlativo: "",
      caja_id: "",
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
    if (name == "caja_id") {
      setFiltros({
        ...initialForm,
        caja_id: value,
      });
    }
  };

  const renderRows = () => {
    const startIndex = rows * pagination - rows;
    const endIndex = rows * pagination;
    if (!tipoDocumentoVentaList.length) {
      return (
        <tr>
          <td>No tiene datos</td>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return tipoDocumentoVentaList
      .map((column, index) => (
        <tr key={index} onClick={() => action(column)}>
          <td>{column.descripcion}</td>
          <td>{column.abreviatura}</td>
          <td>{column.serie}</td>
          <td>{column.correlativo}</td>
          <td>
            {
              cajas.find((item) => item._id?.$oid == column.caja_id)
                ?.descripcion
            }
          </td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Descripcion</th>
          <th>Abreviatura</th>
          <th>Serie</th>
          <th>Correlativo</th>
          <th>Caja</th>
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
          <td>
            <select
              name="caja_id"
              value={filtros.caja_id}
              onChange={handleFiltrosChange}
            >
              <option value="">TODAS</option>
              {cajas.map((item) => (
                <option value={item._id.$oid} key={item._id.$oid}>
                  {item.descripcion}
                </option>
              ))}
            </select>
          </td>
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
