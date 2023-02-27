import styles from "@/styles/DataTable.module.scss";
import s from "./EditarArticulo.module.scss";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import {
  IArticle,
  IArticlePrecios,
  IArticleStock,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { EAF } from "./EditarArticuloForm";
import { useState } from "react";
import { Stock } from "./Stock";
import { Precio } from "./Precio";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";

export const EditarArticulo = ({
  groupsList,
  familiesList,
  setShowLoader,
  brandsList,
  stateArticlesList,
  newEditableArticulo,
  setNewEditableArticulo,
  almacenes,
  unidades,
  handleUpdateArticle,
  closeAlertTimeOut,
  getGroupsList,
  setShowAlert,
  showAlert,
  getBrandsList,
  getBranchOfficesList,
  getWareHousesList,
  sucursales,
  getUnitsList,
  segmentosList
}: {
  groupsList: IGroup[];
  familiesList: IFamily[];
  setShowLoader: (state: boolean) => void;
  brandsList: IBrand[];
  stateArticlesList: IEstadoArticulo[];
  setNewEditableArticulo: (data: IArticle) => void;
  newEditableArticulo: IArticle;
  almacenes: IWareHouse[];
  unidades: IUnit[];
  handleUpdateArticle: (art: IArticle) => void;
  closeAlertTimeOut: () => void;
  getGroupsList: () => void;
  setShowAlert: (alert: IAlert) => void;
  showAlert: IAlert;
  getBrandsList: () => void;
  getBranchOfficesList: () => void;
  getWareHousesList: () => void;
  sucursales: IBranchOffice[]
  getUnitsList: () => void;
  segmentosList: ISegmentoCodigoSunat[]
}) => {
  const [stock, setStock] = useState<boolean>(false);
  const [precio, setPrecio] = useState<boolean>(false);

  const [stockActual, setStockActual] = useState({
    id: "",
  });
  const [stockState, setStockState] = useState<IArticleStock>({
    almacen_id: "",
    almacen_descripcion: "",
    cantidad: "",
    prioridad: 1,
  });

  const [precioActual, setPrecioActual] = useState({
    id: "",
  });
  const [precioState, setPrecioState] = useState<IArticlePrecios>({
    precio_1: 0,
    precio_2: 0,
    precio_3: 0,
    precio_4: 0,
    precio_5: 0,
    unidad_abreviatura: "",
    unidad_descripcion: "",
    costo: null,
    principal: false,
    unidad_valor: 0,
  });

  const handleEditStock = (stock: IArticleStock, id: number) => {
    setStockState(stock);
    setStockActual({
      id: id.toString(),
    });
    setStock(true);
  };
  const handleCreateStock = () => {
    setStockState({
      almacen_id:
        almacenes.find((almacen) => almacen.descripcion == "PRINCIPAL")?._id
          .$oid ?? almacenes[0]._id.$oid,
      almacen_descripcion:
        almacenes.find((almacen) => almacen.descripcion == "PRINCIPAL")
          ?.descripcion ?? almacenes[0].descripcion,
      cantidad: "",
      prioridad: 1,
    });
    setStock(true);
    setStockActual({
      id: "",
    });
  };

  const handleEditPrecio = (precio: IArticlePrecios, id: number) => {
    setPrecioState(precio);
    setPrecioActual({
      id: id.toString(),
    });
    setPrecio(true);
  };
  const handleCreatePrecio = () => {
    setPrecioState({
      precio_1: 0,
      precio_2: 0,
      precio_3: 0,
      precio_4: 0,
      precio_5: 0,
      unidad_abreviatura: "",
      unidad_descripcion: "",
      unidad_valor: 0,
      principal: false,
      costo: null,
    });
    setPrecio(true);
    setPrecioActual({
      id: "",
    });
  };

  return (
    <>
      <EAF
      segmentosList={segmentosList}
        article={newEditableArticulo}
        setArticle={setNewEditableArticulo}
        brandsList={brandsList}
        familiesList={familiesList}
        groupsList={groupsList}
        setShowLoader={setShowLoader}
        stateArticlesList={stateArticlesList}
        closeAlertTimeOut={closeAlertTimeOut}
        getGroupsList={getGroupsList}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        getBrandsList={getBrandsList}
      />

      <div className={s.separator}>
        <div className={s.line}></div>
        <span className={s.subtitle}>STOCK</span>
        <div className={s.line}></div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>ALMACEN</th>
            <th>STOCK</th>
            <th>PRIORIDAD</th>
          </tr>
        </thead>
        <tbody>
          {newEditableArticulo.stock &&
            newEditableArticulo.stock.map((stock, index) => (
              <tr
                onClick={() => handleEditStock(stock, index)}
                key={stock.almacen_id.concat(stock.cantidad.toString())}
              >
                <td>{stock.almacen_descripcion}</td>
                <td>{stock.cantidad}</td>
                <td>{stock.prioridad}</td>
              </tr>
            ))}
          <tr>
            <td>
              <span onClick={handleCreateStock}>···</span>
            </td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div className={s.separator}>
        <div className={s.line}></div>
        <span className={s.subtitle}>PRECIOS</span>
        <div className={s.line}></div>
      </div>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>UNIDAD</th>
            <th>PRECIO 1</th>
            <th>PRECIO 2</th>
            <th>PRECIO 3</th>
            <th>PRECIO 4</th>
            <th>PRECIO 5</th>
          </tr>
        </thead>
        <tbody>
          {newEditableArticulo.precios &&
            newEditableArticulo.precios.map((precio, index) => (
              <tr
                onClick={() => handleEditPrecio(precio, index)}
                key={precio.unidad_abreviatura.concat(
                  precio.precio_1.toString(),
                  precio.precio_2.toString(),
                  precio.precio_3.toString(),
                  precio.precio_4.toString(),
                  precio.precio_5.toString()
                )}
              >
                <td>{precio.unidad_descripcion}</td>
                <td>{precio.precio_1}</td>
                <td>{precio.precio_2}</td>
                <td>{precio.precio_3}</td>
                <td>{precio.precio_4}</td>
                <td>{precio.precio_5}</td>
              </tr>
            ))}
          <tr>
            <td>
              <span onClick={handleCreatePrecio}>···</span>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <Stock
        stock={stockState}
        setStock={setStockState}
        show={stock}
        setShowModal={setStock}
        almacenes={almacenes}
        stockActual={stockActual}
        setStockActual={setStockActual}
        newEditableArticulo={newEditableArticulo}
        setNewEditableArticulo={setNewEditableArticulo}
        handleUpdateArticle={handleUpdateArticle}
        closeAlertTimeOut={closeAlertTimeOut}
        getBranchOfficesList={getBranchOfficesList}
        getWareHousesList={getWareHousesList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        sucursales={sucursales}
      />

      <Precio
        show={precio}
        setShowModal={setPrecio}
        newEditableArticulo={newEditableArticulo}
        setNewEditableArticulo={setNewEditableArticulo}
        precioActual={precioActual}
        setPrecioActual={setPrecioActual}
        precioState={precioState}
        setPrecioState={setPrecioState}
        unidades={unidades}
        handleUpdateArticle={handleUpdateArticle}
        closeAlertTimeOut={closeAlertTimeOut}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        getUnitsList={getUnitsList}
      />
    </>
  );
};
