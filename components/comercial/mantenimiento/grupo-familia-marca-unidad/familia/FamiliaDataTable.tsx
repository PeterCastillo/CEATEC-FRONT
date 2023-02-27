"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface IFamiliaDataTable {
  rows: number;
  columns: IFamily[];
  action: (data: IFamily) => void;
  grupos: IGroup[];
}
export const FamiliaDataTable: FC<IFamiliaDataTable> = ({
  rows,
  columns,
  action,
  grupos,
}) => {
  const [pagination, setPagination] = useState(0);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    descripcion: "",
    grupo_id: "",
  });

  useEffect(() => {
    if (filtros.grupo_id) {
      return;
    }
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchGastos = () => {
    const filterSectors = columns.filter((item) => {
      if (filtros.descripcion) {
        return item.descripcion.includes(filtros.descripcion);
      }
      return item;
    });
    setData(filterSectors);
  };

  const returnText = (status: boolean) => {
    switch (status) {
      case true:
        return "Si";
      case false:
        return "No";
      default:
        return "Otro";
    }
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
      const emptyObject = {
        _id: {
          $oid: "",
        },
        descripcion: "",
        grupo_id: "",
        cuenta_compra_debe: "",
        cuenta_venta_debe: "",
        cuenta_compra_haber: "",
        cuenta_venta_haber: "",
        cuenta_mercaderia: "",
        cuenta_prod_manufac: "",
        exonerado_igv: false,
        considerar_en_venta: false,
        estado: false,
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
          <td>
            {
              grupos.find((item) => item._id?.$oid == column.grupo_id)
                ?.descripcion
            }
          </td>
          <td>
            {column._id.$oid && <span>{returnText(column.exonerado_igv)}</span>}
          </td>
          <td>
            {column._id.$oid && (
              <span>{returnText(column.considerar_en_venta)}</span>
            )}
          </td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      descripcion: "",
      grupo_id: "",
    };
    if (name == "descripcion") {
      return setFiltros({ ...initialForm, descripcion: value.toUpperCase() });
    }
  };

  const handleSelectGrupoId = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setFiltros({
      descripcion: "",
      grupo_id: value,
    });
    const filter = columns.filter((item) => item.grupo_id == value);
    setData(filter);
  };

  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Descripcion</th>
            <th>Grupo</th>
            <th>Exonerado IGV</th>
            <th>Considerado en venta</th>
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
              <select
                name="sucursal"
                onChange={handleSelectGrupoId}
                value={filtros.grupo_id}
              >
                <option value="" hidden></option>
                <option value="">TODOS</option>
                {grupos.map((grupo) => (
                  <option key={grupo._id.$oid} value={grupo._id.$oid}>
                    {grupo.descripcion}
                  </option>
                ))}
              </select>
            </td>
            <td></td>
            <td></td>
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
