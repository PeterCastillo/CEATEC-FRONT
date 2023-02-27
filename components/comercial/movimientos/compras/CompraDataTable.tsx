import { FC, FormEvent } from "react";
import table from "@/app/comercial/movimientos/compras/page.module.scss";
import { ICompra } from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { useEffect, useState } from "react";
import { clsx } from "@/lib/clsx";
import { FaSearch } from "react-icons/fa";
import styles from "./ComprasDataTable.module.scss";

interface ICompraDataTable {
  filtros: {
    since: string;
    until: string;
    search: string;
  };
  setFiltros: (filtros: {
    since: string;
    until: string;
    search: string;
  }) => void;
  comprasList: ICompra[];
  tipoDocumentos: ITipoDocumentoCompra[];
  errorValidateForm: (text: string) => void;
  getComprasList: () => void;
  selectedCompra: string;
  setSelectedCompra: (ventaId: string) => void;
  funcion: (compra: ICompra) => void;
}

export const CompraDataTable: FC<ICompraDataTable> = ({
  tipoDocumentos,
  comprasList,
  filtros,
  setFiltros,
  errorValidateForm,
  getComprasList,
  selectedCompra,
  setSelectedCompra,
  funcion,
}) => {
  const [data, setData] = useState<ICompra[]>([]);
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
    searchCompras();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtrosTable]);

  useEffect(() => {
    setData(comprasList);
  }, [comprasList]);

  const searchCompras = () => {
    const filterUnidad = comprasList.filter((venta) => {
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
        return venta.total
          .toString()
          .toUpperCase()
          .startsWith(filtrosTable.total.toUpperCase());
      }
      if (filtrosTable.documento) {
        return venta.documento_compra
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
    const filter = comprasList.filter(
      (item) => item.documento_compra_id == value
    );
    setData(filter);
  };

  const handleSearchByFiltros = () => {
    if (filtros.since.length == 0) {
      return errorValidateForm("desde");
    }
    if (filtros.until.length == 0) {
      return errorValidateForm("hasta");
    }
    getComprasList();
  };

  const renderCompras = () => {
    if (!data.length) {
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
    return data.map((compra, index) => (
      <tr
        key={compra._id.$oid}
        className={`${selectedCompra == compra._id.$oid && table.selected_row}`}
        onClick={() => {
          if (compra._id.$oid == selectedCompra) {
            setSelectedCompra("");
            funcion({ ...compra, _id: { $oid: "" } });
          } else {
            funcion(compra);
            setSelectedCompra(compra._id.$oid);
          }
        }}
      >
        <td>{compra.proveedor_nombre}</td>
        <td>{compra.proveedor_ruc}</td>
        <td>
          {
            tipoDocumentos.find(
              (item) => item._id.$oid == compra.documento_compra_id
            )?.descripcion
          }
        </td>
        <td>{compra.documento_compra}</td>
        <td>{compra.total}</td>
        <td>{compra.created_at?.$date.split("T")[0]}</td>
      </tr>
    ));
  };

  const renderArticulos = () => {
    const compra = comprasList.find((item) => item._id.$oid == selectedCompra);
    if (!compra) {
      return (
        <tr>
          <td>Seleccione una compra</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return compra.articulos.map((item, index) => (
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
              <th>Tipo Documento</th>
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
                  {tipoDocumentos.map((item) => (
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
            {renderCompras()}
          </tbody>
        </table>
      </div>
      <div className={styles.separator}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>Detalle de Compra</span>
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
