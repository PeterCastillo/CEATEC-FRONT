import {
  IBox,
  INewBox,
} from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { FC, useState, FormEvent, useEffect, useRef } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

interface ICajaDataTable {
  rows: number;
  columns: IBox[];
  action: (data: IBox) => void;
  branchOfficesList: IBranchOffice[];
  handleSelectCajaBySucursal: (data: string) => void;
  setSucursalId: (id: string) => void;
  sucursalId: string;
}

export const CajaDataTable: FC<ICajaDataTable> = ({
  rows,
  columns,
  action,
  branchOfficesList,
  handleSelectCajaBySucursal,
  setSucursalId,
  sucursalId,
}) => {
  const [pagination, setPagination] = useState(0);
  const [boxes, setBoxes] = useState(columns);
  const [filtros, setFiltros] = useState({
    ubicacion: "",
    descripcion: "",
  });

  useEffect(() => {
    setBoxes(columns);
  }, [columns]);

  useEffect(() => {
    if (sucursalId) {
      handleSelectCajaBySucursal(sucursalId);
    } else {
      setBoxes([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sucursalId]);

  const searchBoxes = (name: string, value: string) => {
    const filterBoxes = columns.filter((box) => {
      if (name == "descripcion") {
        return box.descripcion.includes(value);
      }
      if (name == "ubicacion") {
        return box.ubicacion.includes(value);
      }
      return box;
    });
    setBoxes(filterBoxes);
  };

  const renderRows = () => {
    const startIndex = pagination * 10;
    const endIndex = pagination * 10 + 10;
    if (!boxes.length) {
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
    const newData = [...boxes];
    const empty = boxes.length.toString().split("").at(-1);
    for (let i = 0; i < 10 - Number(empty); i++) {
      const emptyArticle = {
        _id: {
          $oid: "",
        },
        estado: false,
        descripcion: "",
        ubicacion: "",
        usuario_id: "",
        sucursal_id: "",
        codigo_boleta_predeterminada: "",
        codigo_factura_predeterminada: "",
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
          <td>{column.descripcion}</td>
          <td>{column.ubicacion}</td>
          <td>
            {
              branchOfficesList.find(
                (branche) => branche._id.$oid == column.sucursal_id
              )?.descripcion
            }
          </td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setPagination(0);
    const { name, value } = e.currentTarget;
    const initialForm = {
      ubicacion: "",
      descripcion: "",
    };

    if (name == "ubicacion") {
      searchBoxes(name, value.toUpperCase());
      setFiltros({
        ...initialForm,
        ubicacion: value.toUpperCase(),
      });
    }
    if (name == "descripcion") {
      searchBoxes(name, value.toUpperCase());
      setFiltros({
        ...initialForm,
        descripcion: value.toUpperCase(),
      });
    }
  };

  const handleSelectedSucursalId = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setSucursalId(value);
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
                value={sucursalId}
              >
                <option value="">Seleccione sucursal</option>
                {branchOfficesList.map((branch) => (
                  <option key={branch._id.$oid} value={branch.descripcion}>
                    {branch.descripcion}
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
            if (boxes.length == 0) {
              return;
            }
            setPagination(
              pagination === 0
                ? Math.ceil(boxes.length / 10) - 1
                : pagination - 1
            );
          }}
        >
          <IoIosArrowBack />
        </div>
        <span>
          {pagination + 1}/
          {Math.ceil(boxes.length / 10) == 0 ? 1 : Math.ceil(boxes.length / 10)}
        </span>
        <div
          onClick={() => {
            if (boxes.length == 0) {
              return;
            }
            setPagination(
              pagination == Math.ceil(boxes.length / 10) - 1
                ? 0
                : pagination + 1
            );
          }}
        >
          <IoIosArrowForward />
        </div>
      </div>
    </>
  );
};
