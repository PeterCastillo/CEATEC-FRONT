import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { IVenta } from "@/interfaces/comercial/ventas/ventasInterfaces";
import { clsx } from "@/lib/clsx";
import { FC, useState, FormEvent, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import table from "@/styles/DataTable.module.scss";
import styles from "./ReimprimirVentasDataTable.module.scss";

interface IFiltro {
  tipo_documento_venta_id: string;
  since: string;
  until: string;
  search: string;
}

interface IReimprimirVentasDataTable {
  ventaList: IVenta[];
  filtros: IFiltro;
  setFiltros: (state: IFiltro) => void;
  getVentasList: () => void;
  selectedVenta: IVenta;
  setSelectedVenta: (state: IVenta) => void;
  errorValidateForm: (campo: string) => void;
  tipoDocumentoVenta: ITipoDocumentoVenta[];
}
export const ReimprimirVentasDataTable: FC<IReimprimirVentasDataTable> = ({
  filtros,
  getVentasList,
  setFiltros,
  setSelectedVenta,
  ventaList,
  errorValidateForm,
  selectedVenta,
  tipoDocumentoVenta,
}) => {
  const [data, setData] = useState<IVenta[]>([]);
  const [filtrosTable, setFiltrosTable] = useState({
    proveedor: "",
    dni_ruc: "",
    total: "",
    tipo_documento: "",
    documento: "",
  });

  const handleFiltrosChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      [name]: value,
    });
  };

  const handleFiltrosTableChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFiltrosTable({
      ...filtrosTable,
      proveedor: name == "proveedor" ? value : "",
      dni_ruc: name == "dni_ruc" ? value : "",
      total: name == "total" ? value : "",
      documento: name == "documento" ? value : "",
      tipo_documento: "",
    });
  };

  useEffect(() => {
    if (filtrosTable.tipo_documento) {
      return;
    }
    searchVentas();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrosTable]);

  useEffect(() => {
    setData(ventaList);
  }, [ventaList]);

  const searchVentas = () => {
    const filterUnidad = ventaList.filter((venta) => {
      if (filtrosTable.proveedor) {
        return venta.proveedor_nombre
          .toUpperCase()
          .includes(filtrosTable.proveedor.toUpperCase());
      }
      if (filtrosTable.dni_ruc) {
        return venta.proveedor_ruc
          .toUpperCase()
          .startsWith(filtrosTable.dni_ruc.toUpperCase());
      }
      if (filtrosTable.total) {
        return venta.valor_total
          .toString()
          .toUpperCase()
          .startsWith(filtrosTable.total.toUpperCase());
      }
      if (filtrosTable.documento) {
        return venta.documento_venta
          .toString()
          .toUpperCase()
          .startsWith(filtrosTable.documento.toUpperCase());
      }
      return venta;
    });
    setData(filterUnidad);
  };

  const handleSelectTipoDocumentoId = (e: FormEvent<HTMLSelectElement>) => {
    const { value } = e.currentTarget;
    setFiltrosTable({
      tipo_documento: value,
      dni_ruc: "",
      proveedor: "",
      total: "",
      documento: "",
    });
    const filter = ventaList.filter((item) => item.documento_venta_id == value);
    setData(filter);
  };

  const handleSearchByFiltros = () => {
    if (filtros.since.length == 0) {
      return errorValidateForm("desde");
    }
    if (filtros.until.length == 0) {
      return errorValidateForm("hasta");
    }
    getVentasList();
  };

  const renderVentas = () => {
    if (!data.length) {
      return (
        <tr>
          <td>No tiene datos</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return data
      .map((venta, index) => (
        <tr
          key={venta._id.$oid}
          className={`${
            selectedVenta._id.$oid == venta._id.$oid && table.selected_row
          }`}
          onClick={() => {
            if (selectedVenta._id.$oid == venta._id.$oid) {
              setSelectedVenta({ ...venta, _id: { $oid: "" } });
            } else {
              setSelectedVenta(venta);
            }
          }}
        >
          <td>{venta.proveedor_nombre}</td>
          <td>{venta.proveedor_ruc}</td>
          <td>
            {
              tipoDocumentoVenta.find(
                (item) => item._id.$oid == venta.documento_venta_id
              )?.descripcion
            }
          </td>
          <td>{venta.documento_venta}</td>
          <td>{venta.valor_total}</td>
          <td>{venta.created_at?.$date.split("T")[0]}</td>
        </tr>
      ));
  };

  const renderArticulos = () => {
    if (!selectedVenta._id.$oid) {
      return (
        <tr>
          <td>Seleccione una venta</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return selectedVenta.articulos.map((item, index) => (
      <tr key={item.articulo_id}>
        <td>{item.articulo_nombre}</td>
        <td>{item.unidad_abreviatura}</td>
        <td>{item.cantidad}</td>
        <td>{item.total}</td>
      </tr>
    ));
  };
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_6}></div>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="since">Desde</label>
          <input
            autoComplete="off"
            type="date"
            id="since"
            name="since"
            value={filtros.since}
            onChange={handleFiltrosChange}
          />
        </div>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="until">Hasta</label>
          <input
            autoComplete="off"
            type="date"
            id="until"
            name="until"
            value={filtros.until}
            onChange={handleFiltrosChange}
          />
        </div>
        <div className={clsx(styles.f_b, styles.f_2)}>
          <button onClick={handleSearchByFiltros}>
            <FaSearch /> Buscar
          </button>
        </div>
      </div>
      <table className={table.table}>
        <thead>
          <tr>
            <th>Proveedor</th>
            <th>DNI/RUC</th>
            <th>Tipo de Documento</th>
            <th>Documento</th>
            <th>Total</th>
            <th>Fecha</th>
          </tr>
        </thead>
        <tbody>
          <tr className={table.buscador}>
            <td>
              <input
                autoComplete="off"
                type="text"
                onChange={handleFiltrosTableChange}
                name="proveedor"
                value={filtrosTable.proveedor}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                onChange={handleFiltrosTableChange}
                name="dni_ruc"
                value={filtrosTable.dni_ruc}
              />
            </td>
            <td>
              <select
                id="grupo"
                name="tipo_documento"
                value={filtrosTable.tipo_documento}
                onChange={handleSelectTipoDocumentoId}
              >
                <option value="" hidden></option>
                <option value="">TODOS</option>
                {tipoDocumentoVenta.map((item) => (
                  <option key={item._id.$oid} value={item._id.$oid}>
                    {item.descripcion}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                onChange={handleFiltrosTableChange}
                name="documento"
                value={filtrosTable.documento}
              />
            </td>
            <td>
              <input
                autoComplete="off"
                type="text"
                onChange={handleFiltrosTableChange}
                name="total"
                value={filtrosTable.total}
              />
            </td>
            <td></td>
          </tr>
          {renderVentas()}
        </tbody>
      </table>
      <div className={styles.row_check}>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Canjear documento</label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Imprimir guia remision</label>
        </div>
        <div>
          <input type="checkbox" />
          <label htmlFor="">Inc. Dscto</label>
        </div>
      </div>
      <div className={clsx(styles.row, styles.separator)}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>Detalle de Venta</span>
        <div className={styles.line}></div>
      </div>
      <table className={table.table}>
        <thead>
          <tr>
            <th>Articulo</th>
            <th>Unidad</th>
            <th>Cantidad</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>{renderArticulos()}</tbody>
      </table>
    </>
  );
};
