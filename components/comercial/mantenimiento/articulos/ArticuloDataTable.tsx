"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IMarcaDataTable {
  rows: number;
  columns: IArticle[];
  action: (data: IArticle) => void;
}
export const ArticleDataTable: FC<IMarcaDataTable> = ({
  rows,
  columns,
  action,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    codigo: "",
    nombre: "",
    utilidad: "",
    barras: "",
    sunat: "",
  });

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchArticles = (name: string, value: string) => {
    const filterSectors = columns.filter((articulo) => {
      if (name == "codigo") {
        return articulo.codigo_articulo.startsWith(value);
      }
      if (name == "nombre") {
        return articulo.nombre_articulo.includes(value);
      }
      if (name == "barras") {
        return articulo.codigo_barras.includes(value);
      }
      if (name == "sunat") {
        return articulo.codigo_sunat.includes(value);
      }
      return articulo;
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
            <td colSpan={4}>No tiene datos</td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
        </>
      );
    }
    const newData = [...data];
    const empty = data.length.toString().split("").at(-1);
    for (let i = 0; i < 10 - Number(empty); i++) {
      const emptyArticle = {
        _id: {
          $oid: "",
        },
        grupo: {
          id: "",
          descripcion: "",
        },
        familia: {
          id: "",
          descripcion: "",
        },
        marca: {
          id: "",
          descripcion: "",
        },
        codigo_barras: "",
        codigo_articulo: "",
        codigo_sunat: "",
        nombre_articulo: "",
        nombre_corto: "",
        estado_articulo: {
          id: "",
          descripcion: "",
        },
        exonerado_igv: false,
        formula_derivado: false,
        inafec: "",
        isc: "",
        stock_maximo: "",
        stock_minimo: "",
        ubicacion: "",
        calidad: "",
        descripcion_utilidad: "",
        estado: false,
        expira: "",
        precios: [],
        stock: [],
        stock_actual: "",
        empresa_id: "",
      };
      newData.push(emptyArticle);
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
          <td>{column.codigo_articulo}</td>
          <td>{column.nombre_articulo}</td>
          <td>{column.codigo_barras}</td>
          <td>{column.codigo_sunat}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      codigo: "",
      nombre: "",
      utilidad: "",
      barras: "",
      sunat: "",
    };
    if (name == "codigo") {
      searchArticles(name, value);
      return setFiltros({ ...initialForm, codigo: value });
    }
    if (name == "nombre") {
      searchArticles(name, value.toUpperCase());
      return setFiltros({ ...initialForm, nombre: value.toUpperCase() });
    }
    if (name == "barras") {
      searchArticles(name, value);
      return setFiltros({ ...initialForm, barras: value });
    }
    if (name == "sunat") {
      searchArticles(name, value);
      return setFiltros({ ...initialForm, sunat: value });
    }
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Nombre</th>
            <th>Codigo barras</th>
            <th>Codigo SUNAT</th>
          </tr>
        </thead>
        <tbody>
          <tr className={styles.buscador}>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="codigo"
                value={filtros.codigo}
                onChange={handleFiltrosChange}
              />
            </td>
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
                name="barras"
                value={filtros.barras}
                onChange={handleFiltrosChange}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                name="sunat"
                value={filtros.sunat}
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
