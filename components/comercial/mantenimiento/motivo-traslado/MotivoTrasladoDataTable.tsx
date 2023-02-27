"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IMotivoTrasladoDataTable {
  rows: number;
  columns: IMotivoTraslado[];
  action: (data: IMotivoTraslado) => void;
}
export const MotivoTrasladoDataTable: FC<IMotivoTrasladoDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState<IMotivoTraslado[]>(columns);
  const [filtros, setFiltros] = useState({
    notas_credito: "",
    motivo_traslado: "",
    codigo_opcional: "",
  });

  useEffect(() => {
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchGastos = () => {
    const filterSectors = columns.filter((motivoTraslado) => {
      if (filtros.notas_credito) {
        return motivoTraslado.notas_credito
          .toUpperCase()
          .includes(filtros.notas_credito.toUpperCase());
      }
      if (filtros.motivo_traslado) {
        return motivoTraslado.motivo_traslado
          .toUpperCase()
          .includes(filtros.motivo_traslado.toUpperCase());
      }
      if (filtros.codigo_opcional && motivoTraslado.codigo_opcional) {
        return motivoTraslado.codigo_opcional
          .toString()
          .startsWith(filtros.codigo_opcional);
      }
      return motivoTraslado;
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
        codigo_opcional: null,
        motivo_traslado: "",
        notas_credito: "",
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
          <td>{column.notas_credito}</td>
          <td>{column.motivo_traslado}</td>
          <td>{column.codigo_opcional}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      notas_credito: name == "notas_credito" ? value.toUpperCase() : "",
      motivo_traslado: name == "motivo_traslado" ? value.toUpperCase() : "",
      codigo_opcional: name == "codigo_opcional" ? value : "",
    });
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Notas de cretido</th>
            <th>Motivo de traslado</th>
            <th>Codigo</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.buscador}>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="notas_credito"
                value={filtros.notas_credito}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="motivo_traslado"
                value={filtros.motivo_traslado}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="codigo_opcional"
                value={filtros.codigo_opcional}
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
