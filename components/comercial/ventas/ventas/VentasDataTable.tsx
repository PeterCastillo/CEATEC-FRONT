import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { IVenta } from "@/interfaces/comercial/ventas/ventasInterfaces";
import { FC, FormEvent, useState, useEffect } from "react";
import table from "@/app/comercial/ventas/ventas/page.module.scss";
import styles from "./VentasDataTable.module.scss";
import { clsx } from "@/lib/clsx";
import { FaSearch } from "react-icons/fa";

interface IVentasDataTable {
  ventas: IVenta[];
  filtros: {
    tipo_documento_venta_id: string;
    since: string;
    until: string;
    search: string;
  };
  setFiltros: (filtros: {
    tipo_documento_venta_id: string;
    since: string;
    until: string;
    search: string;
  }) => void;
  tipoDocumentoVenta: ITipoDocumentoVenta[];
  getVentasList: () => void;
  funcion: (venta: IVenta) => void;
  selectedVenta: string;
  setSelectedVenta: (ventaId: string) => void;
  errorValidateForm: (text: string) => void;
}

export const VentasDataTable: FC<IVentasDataTable> = ({
  filtros,
  funcion,
  getVentasList,
  setFiltros,
  tipoDocumentoVenta,
  ventas,
  selectedVenta,
  setSelectedVenta,
  errorValidateForm,
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
    setData(ventas);
  }, [ventas]);

  const searchVentas = () => {
    const filterUnidad = ventas.filter((venta) => {
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
    const filter = ventas.filter((item) => item.documento_venta_id == value);
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
    return data.map((venta, index) => (
      <tr
        key={venta._id.$oid}
        className={`${selectedVenta == venta._id.$oid && table.selected_row}`}
        onClick={() => {
          if (venta._id.$oid == selectedVenta) {
            setSelectedVenta("");
            funcion({ ...venta, _id: { $oid: "" } });
          } else {
            funcion(venta);
            setSelectedVenta(venta._id.$oid);
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
    const data = ventas.find((item) => item._id.$oid == selectedVenta);
    if (!data) {
      return (
        <tr>
          <td>Seleccione una venta</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return data.articulos.map((item, index) => (
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
      <div className={table.table}>
        <table>
          <thead>
            <tr className={table.buscador}>
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
      </div>
      <div className={styles.separator}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>Detalle de Venta</span>
        <div className={styles.line}></div>
      </div>
      <div className={table.table}>
        <table>
          <thead>
            <tr className={table.buscador}>
              <th>Articulo</th>
              <th>Unidad</th>
              <th>Cantidad</th>
              <th>Costo</th>
            </tr>
          </thead>
          <tbody>{renderArticulos()}</tbody>
        </table>
      </div>
    </>
  );
};
