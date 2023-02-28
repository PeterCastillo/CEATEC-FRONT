import { clsx } from "@/lib/clsx";
import { useState, useEffect } from "react";
import styles from "./AdministrarPreciosArticulo.module.scss";
import table from "@/styles/DataTable.module.scss";
import { MdClose } from "react-icons/md";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  IArticle,
  IArticlePrecios,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { Precio } from "./Precio";
import { putArticuloService } from "@/services/comercial/mantenimiento/articulo/articulosService";

export const ADMPA = ({
  show,
  setShowNewClientModal,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setShowLoader,
  unidades,
  articuloId,
  articulos,
  getUnitsList,
  index,
  getArticlesList,
  handleChangeUnidad,
  handleCreateSetNewUnidad,
}: {
  show: boolean;
  setShowNewClientModal: (data: boolean) => void;
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setShowLoader: (status: boolean) => void;
  unidades: IUnit[];
  articuloId: string;
  articulos: IArticle[];
  getUnitsList: () => void;
  index: string
  getArticlesList: (handleCreateSetNewUnidad?: () => void) => void
  handleChangeUnidad: (value: string, id: number) => void
  handleCreateSetNewUnidad: (newPrecio: IArticlePrecios) => void
}) => {
  const [articulo, setArticle] = useState<IArticle>({
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
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [precio, setPrecio] = useState<boolean>(false);
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

  useEffect(() => {
    const articleToEdit = articulos.find((item) => item._id.$oid == articuloId);
    if (articleToEdit) {
      setArticle(articleToEdit);
    }
  }, [articuloId]);

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

  const errorValidateForm = (field: string) => {
    setShowAlert({
      ...showAlert,
      icon: "warning",
      title: "Campos incompletos",
      message: "Se necesita el campo " + field,
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleUpdateArticle = async (editableArt: IArticle, handleUpdateArticle = Function()) => {
    if (editableArt.familia.id.length === 0) {
      return errorValidateForm("familia");
    }
    if (editableArt.codigo_barras.length === 0) {
      return errorValidateForm("codigo de barras");
    }
    if (editableArt.marca.id.length === 0) {
      return errorValidateForm("marca");
    }
    if (editableArt.nombre_articulo.length === 0) {
      return errorValidateForm("nombre articulo");
    }
    if (editableArt.estado_articulo.id.length === 0) {
      return errorValidateForm("estado articulo");
    }
    const data = {
      ...editableArt,
      stock_actual: Number(editableArt.stock_actual),
      stock_minimo: Number(editableArt.stock_minimo),
      stock_maximo: Number(editableArt.stock_maximo),
    };
    setShowLoader(true);
    const response = await putArticuloService(
      data,
      articulo._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getArticlesList(()=>handleUpdateArticle())
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

  return (
    <>
      <div className={clsx(styles.modal, !show && styles.hidden)}>
        <div className={styles.container}>
          <div className={styles.header}>
            <div className={styles.title}>Administrar precios</div>
            <button
              onClick={() => setShowNewClientModal(false)}
              className={styles.close}
            >
              <MdClose />
            </button>
          </div>
          <div className={styles.form}>
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
                {articulo.precios &&
                  articulo.precios.map((precio, index) => (
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
          </div>
        </div>
      </div>
      <Precio
        closeAlertTimeOut={closeAlertTimeOut}
        getUnitsList={getUnitsList}
        handleUpdateArticle={handleUpdateArticle}
        newEditableArticulo={articulo}
        precioActual={precioActual}
        precioState={precioState}
        setNewEditableArticulo={setArticle}
        setPrecioActual={setPrecioActual}
        setPrecioState={setPrecioState}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        setShowModal={setPrecio}
        show={precio}
        showAlert={showAlert}
        unidades={unidades}
        handleCreateSetNewUnidad={handleCreateSetNewUnidad}
      />
    </>
  );
};
