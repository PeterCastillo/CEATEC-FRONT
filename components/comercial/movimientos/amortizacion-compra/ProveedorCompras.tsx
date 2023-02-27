import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { FC, useState } from "react";
import styles from "@/styles/DataTable.module.scss";
import { ICompra } from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { getListaRegistroCompraByProveedorService } from "@/services/comercial/movimientos/comprasServices";
import { getTokenFromLocalStorage } from "@/utils/localStorageControl";

interface IProveedorCompra {
  monedas: IMoneda[];
  tipoDocumento: ITipoDocumentoCompra[];
  proveedores: IClientProvider[];
  handleSetAmortizarCompra: (compra: ICompra) => void;
  setShowLoader: (state: boolean) => void;
}

export const ProveedorCompra: FC<IProveedorCompra> = ({
  proveedores,
  monedas,
  tipoDocumento,
  setShowLoader,
  handleSetAmortizarCompra,
}) => {
  const [proveedorSelected, setProveedorSelected] = useState<string>("");
  const [compraSelected, setCompraSelected] = useState<string>("");

  const [compras, setCompras] = useState<ICompra[]>([]);

  const handleSelectProveedor = async (proveedorId: string) => {
    if (!proveedorId) {
      setProveedorSelected("");
      setCompras([]);
      return;
    }
    setProveedorSelected(proveedorId);
    setCompras([]);
    setShowLoader(true);
    const response = await getListaRegistroCompraByProveedorService(
      proveedorId,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      setProveedorSelected(proveedorId);
      setCompras(response.json.data);
    }
  };

  const renderProveedores = () => {
    // const startIndex = rows * pagination - rows;
    // const endIndex = rows * pagination;
    if (!proveedores.length) {
      return (
        <tr>
          <td>No tiene datos</td>
        </tr>
      );
    }
    return proveedores.map((column, index) => (
      <tr
        className={`${
          column._id.$oid == proveedorSelected && styles.selected_row
        }`}
        key={index}
        onClick={() =>
          proveedorSelected == column._id.$oid
            ? handleSelectProveedor("")
            : handleSelectProveedor(column._id.$oid)
        }
      >
        {column.nombre_natural == "" ? (
          <td>{column.nombre_comercial}</td>
        ) : (
          <td>
            {column.nombre_natural} {column.apellido_paterno_natural}{" "}
            {column.apellido_materno_natural}
          </td>
        )}
        <td>{column.direccion}</td>
        <td>{column.dni_ruc}</td>
        <td>{column.telefono1}</td>
      </tr>
    ));
    //   .slice(startIndex, endIndex);
  };

  const renderCompras = () => {
    // const startIndex = rows * pagination - rows;
    // const endIndex = rows * pagination;
    if (!compras.length) {
      return (
        <tr>
          <td>No tiene datos</td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return compras.map((column, index) => (
      <tr
        key={index}
        className={`${
          column._id.$oid == compraSelected && styles.selected_row
        }`}
        onClick={() => {
          if(column._id.$oid == compraSelected){
            handleSetAmortizarCompra({...column,_id:{$oid: ""}})
            setCompraSelected("")
          }else {
            setCompraSelected(column._id.$oid);
            handleSetAmortizarCompra(column)
          }
        }}
      >
        <td>
          {tipoDocumento.find(
            (tipo) => tipo._id?.$oid == column.documento_compra_id
          )?.descripcion}
        </td>
        <td>{column.documento_compra}</td>
        <td>{column.created_at?.$date.split("T")[0]}</td>
        <td>
          {monedas.find((moneda) => moneda._id?.$oid == column.moneda_id)
            ?.nombre ?? "---"}
        </td>
      </tr>
    ));
    //   .slice(startIndex, endIndex);
  };

  const renderArticulosCompra = () => {
    // const startIndex = rows * pagination - rows;
    // const endIndex = rows * pagination;
    const compra = compras.find((item) => item._id.$oid == compraSelected);
    if (!compra) {
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
    return compra.articulos.map((column, index) => (
      <tr key={index}>
        <td>{column.articulo_id}</td>
        <td>{column.articulo_nombre}</td>
        <td>{column.unidad_abreviatura}</td>
        <td>{column.cantidad}</td>
        <td>{column.costo}</td>
      </tr>
    ));

    //   .slice(startIndex, endIndex);
  };

  return (
    <>
    Lista Proveedores
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Dirección</th>
            <th>DNI/RUC</th>
            <th>Teléfonos</th>
          </tr>
        </thead>
        <tbody>{renderProveedores()}</tbody>
      </table>

      Lista Compras
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Documento</th>
            <th>Nro. Documento</th>
            <th>fecha de compra</th>
            <th>Moneda</th>
          </tr>
        </thead>
        <tbody>{renderCompras()}</tbody>
      </table>

    Detalle Compra
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Codigo</th>
            <th>Articulo</th>
            <th>Unidad</th>
            <th>Cantidad</th>
            <th>Costo</th>
          </tr>
        </thead>
        <tbody>{renderArticulosCompra()}</tbody>
      </table>
    </>
  );
};
