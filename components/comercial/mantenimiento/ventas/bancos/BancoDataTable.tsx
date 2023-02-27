import styles from "@/styles/DataTable.module.scss";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IBanco } from "@/interfaces/comercial/mantenimiento/ventas/bancosInterface";
import React, { useState, useEffect, FC, FormEvent } from "react";

interface IBancoDataTable {
  rows: number;
  columns: IBanco[];
  action: (data: IBanco) => void;
  monedas: IMoneda[];
}

export const BancoDataTable: FC<IBancoDataTable> = ({
  rows,
  columns,
  action,
  monedas,
}) => {
  const [pagination, setPagination] = useState(1);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState<any>({
    nombre: "",
    cuenta_bancaria: "",
    cuenta_contable: "",
    moneda: "",
    moneda_id: [],
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  useEffect(() => {
    searchBancos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  const searchBancos = () => {
    const filterBancos = columns.filter((banco) => {
      if (filtros.nombre) {
        return banco.nombre.includes(filtros.nombre);
      }
      if (filtros.cuenta_bancaria) {
        return banco.cuenta_bancaria.includes(filtros.cuenta_bancaria);
      }
      if (filtros.cuenta_contable) {
        return banco.cuenta_contable.includes(filtros.cuenta_contable);
      }
      if (filtros.moneda) {
        return banco.moneda_id.includes(filtros.moneda_id[0]?._id.$oid);
      }
      return banco;
    });
    setData(filterBancos);
  };

  const renderRows = () => {
    const startIndex = rows * pagination - rows;
    const endIndex = rows * pagination;
    if (!data.length) {
      return (
        <tr>
          <td>No tiene datos</td>
        </tr>
      );
    }
    return data
      .map((column, index) => (
        <tr key={index} onClick={() => action(column)}>
          <td>{column.nombre}</td>
          <td>{column.cuenta_bancaria}</td>
          <td>{column.cuenta_contable}</td>
          <td>
            {monedas.find((item) => item._id?.$oid == column.moneda_id)?.nombre}
          </td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const initialForm = {
      nombre: "",
      cuenta_bancaria: "",
      cuenta_contable: "",
      moneda: "",
      moneda_id: [],
    };
    if (name == "nombre") {
      setFiltros({
        ...initialForm,
        [name]: value.toUpperCase(),
      });
    }
    if (name == "cuenta_bancaria") {
      setFiltros({
        ...initialForm,
        [name]: value.toUpperCase(),
      });
    }
    if (name == "cuenta_contable") {
      setFiltros({
        ...initialForm,
        [name]: value.toUpperCase(),
      });
    }
    if (name == "moneda") {
      setFiltros({
        ...initialForm,
        moneda: value.toUpperCase(),
        moneda_id: monedas.filter((moneda) =>
          moneda.nombre.includes(value.toUpperCase())
        ),
      });
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Cuenta bancaria</th>
          <th>Cuenta contable</th>
          <th>Moneda</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.buscador}>
          <td>
            <input autoComplete="off"
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="cuenta_bancaria"
              value={filtros.cuenta_bancaria}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="cuenta_contable"
              value={filtros.cuenta_contable}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="moneda"
              value={filtros.moneda}
              onChange={handleFiltrosChange}
            />
          </td>
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
