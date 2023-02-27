import { clsx } from "@/lib/clsx";
import { useState } from "react";
import styles from "./NuevoArticulo.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { IArticle, INewArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import { NAF } from "../../mantenimiento/articulos/NuevoArticuloForm";
import { postArticuloService } from "@/services/comercial/mantenimiento/articulo/articulosService";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";

export const NuevoArticulo = ({
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
  articulosList,
  segmentosList
}: {
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
  articulosList: IArticle[]
  segmentosList: ISegmentoCodigoSunat[]
}) => {
  const [newArticle, setNewArticle] = useState<INewArticle>({
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
    empresa_id: getLocalStorageItem("empresa"),
    expira: "",
    precios: [{
      unidad_descripcion: "UNIDAD",
      unidad_abreviatura: "UND",
      unidad_valor: 1,
      costo: 0,
      precio_1: 0,
      precio_2: 0,
      precio_3: 0,
      precio_4: 0,
      precio_5: 0,
      principal: true
    }],
    stock: [],
    stock_actual: "",
    estado: true,
  });

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

  const handleCreateArticulo = async () => {
    if (newArticle.grupo.id.length === 0) {
      return errorValidateForm("grupo");
    }
    if (newArticle.familia.id.length === 0) {
      return errorValidateForm("familia");
    }
    if (newArticle.codigo_barras.length === 0) {
      return errorValidateForm("codigo de barras");
    }
    if (newArticle.marca.id.length === 0) {
      return errorValidateForm("marca");
    }
    if (newArticle.nombre_articulo.length === 0) {
      return errorValidateForm("nombre articulo");
    }
    if (newArticle.estado_articulo.id.length === 0) {
      return errorValidateForm("estado articulo");
    }
    const data = {
      ...newArticle,
      stock_actual: Number(newArticle.stock_actual),
      stock_minimo: Number(newArticle.stock_minimo),
      stock_maximo: Number(newArticle.stock_maximo),
    };
    setShowLoader(true);
    const response = await postArticuloService(
      data,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getArticlesList();
        setNewArticle({
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
          empresa_id: getLocalStorageItem("empresa"),
          expira: "",
          precios: [],
          stock: [],
          stock_actual: "",
          estado: true,
        });
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El artículo fue creado correctamente",
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
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear Articulo</span>
          <button
            onClick={() => setShowNewClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateArticulo}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <NAF
            articulosList={articulosList}
            brandsList={brandsList}
            familiesList={familiesList}
            groupsList={groupsList}
            newArticle={newArticle}
            setNewArticle={setNewArticle}
            setShowLoader={setShowLoader}
            stateArticlesList={stateArticlesList}
            closeAlertTimeOut={closeAlertTimeOut}
            getBrandsList={getBrandsList}
            getGroupsList={getGroupsList}
            setShowAlert={setShowAlert}
            showAlert={showAlert}
            segmentosList={segmentosList}
          />
        </div>
      </div>
    </div>
  );
};
