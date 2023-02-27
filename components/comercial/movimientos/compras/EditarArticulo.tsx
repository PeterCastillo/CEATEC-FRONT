import { clsx } from "@/lib/clsx";
import { useState } from "react";
import styles from "./EditarArticulo.module.scss";
import table from "@/styles/DataTable.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { getTokenFromLocalStorage } from "@/utils/localStorageControl";
import {
  IArticle,
  IArticlePrecios,
  IArticleStock,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import { putArticuloService } from "@/services/comercial/mantenimiento/articulo/articulosService";
import { EAF } from "../../mantenimiento/articulos/EditarArticuloForm";
import { Precio } from "../../mantenimiento/articulos/Precio";
import { Stock } from "../../mantenimiento/articulos/Stock";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";

export const EditarArticulo = ({
  show,
  setShowNewClientModal,
  groupsList,
  familiesList,
  setShowLoader,
  brandsList,
  stateArticlesList,
  closeAlertTimeOut,
  getArticlesList,
  setShowAlert,
  showAlert,
  getBrandsList,
  getGroupsList,
  article,
  setArticle,
  unidades,
  almacenes,
  getUnitsList,
  sucursales,
  getBranchOfficesList,
  getWareHousesList,
  segmentosList
}: {
  article: IArticle;
  setArticle: (state: IArticle) => void;
  show: boolean;
  setShowNewClientModal: (data: boolean) => void;
  groupsList: IGroup[];
  familiesList: IFamily[];
  brandsList: IBrand[];
  stateArticlesList: IEstadoArticulo[];
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setShowLoader: (status: boolean) => void;
  getArticlesList: () => void;
  getBrandsList: () => void;
  getGroupsList: () => void;
  unidades: IUnit[];
  almacenes: IWareHouse[];
  getUnitsList: () => void;
  sucursales: IBranchOffice[]
  getWareHousesList: () => void;
  getBranchOfficesList: () => void;
  segmentosList: ISegmentoCodigoSunat[]
}) => {
  const errorValidateForm = (field: string) => {
    setShowAlert({
      ...showAlert,
      icon: "warning",
      title: "Campos incompletos",
      message: "Se necesita seleccionar " + field,
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleUpdateArticle = async (art: IArticle) => {
    if (art.grupo.id.length === 0) {
      return errorValidateForm("grupo");
    }
    if (art.familia.id.length === 0) {
      return errorValidateForm("familia");
    }
    if (art.codigo_barras.length === 0) {
      return errorValidateForm("codigo de barras");
    }
    if (art.marca.id.length === 0) {
      return errorValidateForm("marca");
    }
    if (art.nombre_articulo.length === 0) {
      return errorValidateForm("nombre articulo");
    }
    if (art.estado_articulo.id.length === 0) {
      return errorValidateForm("estado articulo");
    }
    const data = {
      ...art,
      stock_actual: Number(art.stock_actual),
      stock_minimo: Number(art.stock_minimo),
      stock_maximo: Number(art.stock_maximo),
    };
    setShowLoader(true);
    const response = await putArticuloService(
      data,
      article._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getArticlesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El artículo fue actualizado correctamente",
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };

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
      unidad_abreviatura: unidades[0].abreviatura,
      unidad_descripcion: unidades[0].descripcion,
      unidad_valor: Number(unidades[0].valor),
      principal: false,
      costo: null,
    });
    setPrecio(true);
    setPrecioActual({
      id: "",
    });
  };

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Editar Articulo</span>
          <button
            onClick={() => setShowNewClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button
            className={styles.add}
            onClick={() => handleUpdateArticle(article)}
          >
            <FaPlus /> Actualizar
          </button>
        </div>
        <div className={styles.form}>
          <EAF
          segmentosList={segmentosList}
            brandsList={brandsList}
            familiesList={familiesList}
            groupsList={groupsList}
            article={article}
            setArticle={setArticle}
            setShowLoader={setShowLoader}
            stateArticlesList={stateArticlesList}
            closeAlertTimeOut={closeAlertTimeOut}
            getBrandsList={getBrandsList}
            getGroupsList={getGroupsList}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
          />
          <div className={styles.separator}>
            <div className={styles.line}></div>
            <span className={styles.subtitle}>STOCK</span>
            <div className={styles.line}></div>
          </div>

          <table className={table.table}>
            <thead>
              <tr>
                <th>ALMACEN</th>
                <th>STOCK</th>
                <th>PRIORIDAD</th>
              </tr>
            </thead>
            <tbody>
              {article.stock &&
                article.stock.map((stock, index) => (
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

          <div className={styles.separator}>
            <div className={styles.line}></div>
            <span className={styles.subtitle}>PRECIOS</span>
            <div className={styles.line}></div>
          </div>

          <table className={table.table}>
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
              {article.precios &&
                article.precios.map((precio, index) => (
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
            newEditableArticulo={article}
            setNewEditableArticulo={setArticle}
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
            newEditableArticulo={article}
            setNewEditableArticulo={setArticle}
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
        </div>
      </div>
    </div>
  );
};
