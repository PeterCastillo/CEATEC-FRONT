"use client";

import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { NuevoArticulo } from "@/components/comercial/mantenimiento/articulos/NuevoArticulo";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  IArticle,
  INewArticle,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import styles from "@/styles/Header.module.scss";
import { Alert } from "@/components/commons/alert/Alert";
import { getListaMarcaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/marcaServices";
import { getListaEstadoArticuloService } from "@/services/comercial/extras/estadoArticuloServices";
import { getListaGrupoService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/grupoServices";
import {
  deleteArticuloService,
  getListaArticulosService,
  postArticuloService,
  putArticuloService,
} from "@/services/comercial/mantenimiento/articulo/articulosService";
import { getListaFamiliaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/familiaServices";
import { EditarArticulo } from "@/components/comercial/mantenimiento/articulos/EditarArticulo";
import { ArticleDataTable } from "@/components/comercial/mantenimiento/articulos/ArticuloDataTable";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { getListaAlmacenesService } from "@/services/comercial/mantenimiento/empresa/almacenService";
import { getListaUnidadService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/unidadServices";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { getListaSucursalService } from "@/services/comercial/mantenimiento/empresa/sucursalService";
import { getSegmentosListService } from "@/services/comercial/mantenimiento/codigo-sunat/codigoSunatServices";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";

export default function Home() {
  const [step, setStep] = useState(1);

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
  const [editableArticle, setEditableArticulo] = useState<IArticle>({
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
  const [newEditableArticulo, setNewEditableArticulo] = useState<IArticle>({
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

  const [segmentosList, setSegmentoList] = useState<ISegmentoCodigoSunat[]>([]);
  const [articlesList, setArticlesList] = useState<IArticle[]>([]);
  const [brandsList, setBrandsList] = useState<IBrand[]>([]);
  const [familiesList, setFamiliesList] = useState<IFamily[]>([]);
  const [groupsList, setGroupsList] = useState<IGroup[]>([]);
  const [almacenesList, setAlmacenesList] = useState<IWareHouse[]>([]);
  const [stateArticlesList, setStateArticlesList] = useState<IEstadoArticulo[]>(
    []
  );
  const [unidadesList, setUnidadesList] = useState<IUnit[]>([]);
  const [sucursales, setSucursales] = useState<IBranchOffice[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getArticlesList = async () => {
    setShowLoader(true);
    const articles = await getListaArticulosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (articles) {
      if (articles.status === 200) {
        setArticlesList(articles.json.data);
      }
    }
    setShowLoader(false);
  };

  const getSegmentoList = async () => {
    setShowLoader(true);
    const segmentos = await getSegmentosListService();
    if (segmentos) {
      if (segmentos.status === 200) {
        console.log(segmentos);
        setSegmentoList(segmentos.json.data);
      }
    }
    setShowLoader(false);
  };

  const getSucursalesList = async () => {
    setShowLoader(true);
    const response = await getListaSucursalService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setSucursales(response.json.data);
      }
    }
    setShowLoader(false);
  };

  const getGroupsList = async () => {
    setShowLoader(true);
    const groups = await getListaGrupoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (groups) {
      if (groups.status === 200) {
        setGroupsList(groups.json.data);
      }
    }
    setShowLoader(false);
  };

  const getStateArticles = async () => {
    setShowLoader(true);
    const stateArticles = await getListaEstadoArticuloService(
      getTokenFromLocalStorage()
    );
    if (stateArticles) {
      if (stateArticles.status === 200) {
        setStateArticlesList(stateArticles.json.data);
      }
    }
    setShowLoader(false);
  };

  const getBrandsList = async () => {
    setShowLoader(true);
    const response = await getListaMarcaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setBrandsList(response.json.data);
      }
    }
    setShowLoader(false);
  };

  const getFamiliesList = async () => {
    setShowLoader(true);
    const response = await getListaFamiliaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setFamiliesList(response.json.data);
      }
    }
    setShowLoader(false);
  };
  const getAlmacenesList = async () => {
    setShowLoader(true);
    const response = await getListaAlmacenesService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setAlmacenesList(response.json.data);
      }
    }
    setShowLoader(false);
  };

  const getUnidadesList = async () => {
    setShowLoader(true);
    const response = await getListaUnidadService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setUnidadesList(response.json.data);
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getArticlesList();
    getGroupsList();
    getStateArticles();
    getBrandsList();
    getFamiliesList();
    getAlmacenesList();
    getUnidadesList();
    getSucursalesList();
    getSegmentoList();
  }, []);

  const closeAlertTimeOut = () => {
    setTimeout(() => {
      setShowAlert({
        ...showAlert,
        icon: "info",
        message: "",
        title: "",
        show: false,
      });
    }, 4000);
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
        handleResetNewArticulo();
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

  const handleUpdateArticle = async (editableArt: IArticle) => {
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
      editableArticle._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getArticlesList();
        setEditableArticulo(response.json.data);
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

  const handleDeleteArticle = async () => {
    setShowLoader(true);
    const response = await deleteArticuloService(
      editableArticle._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getArticlesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El artículo fue eliminado correctamente",
          show: true,
        });
        closeAlertTimeOut();
        return setStep(1);
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

  const handleEditarArticle = (article: IArticle) => {
    setEditableArticulo(article);
    setNewEditableArticulo(article);
    setStep(3);
  };

  const handleResetNewArticulo = () => {
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
  };

  const handleResetEditableArticulo = () => {
    setNewEditableArticulo(editableArticle);
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={handleResetNewArticulo}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateArticulo}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetEditableArticulo}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteArticle}>
              <FaTrash /> ELIMINAR
            </button>
            <button
              className={styles.create}
              onClick={() => handleUpdateArticle(newEditableArticulo)}
            >
              <FaPlus /> GUARDAR
            </button>
          </>
        );
    }
  };

  const renderSteps = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <ArticleDataTable
              columns={articlesList}
              action={handleEditarArticle}
              rows={100}
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.form}>
            <NuevoArticulo
              segmentosList={segmentosList}
              newArticle={newArticle}
              setNewArticle={setNewArticle}
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
              articulosList={articlesList}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditarArticulo
              segmentosList={segmentosList}
              almacenes={almacenesList}
              brandsList={brandsList}
              familiesList={familiesList}
              groupsList={groupsList}
              setShowLoader={setShowLoader}
              stateArticlesList={stateArticlesList}
              setNewEditableArticulo={setNewEditableArticulo}
              newEditableArticulo={newEditableArticulo}
              unidades={unidadesList}
              handleUpdateArticle={handleUpdateArticle}
              closeAlertTimeOut={closeAlertTimeOut}
              getGroupsList={getGroupsList}
              setShowAlert={setShowAlert}
              showAlert={showAlert}
              getBrandsList={getBrandsList}
              getBranchOfficesList={getSucursalesList}
              getWareHousesList={getAlmacenesList}
              sucursales={sucursales}
              getUnitsList={getUnidadesList}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Artículo</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button onClick={() => setStep(1)} className={isStepActive(1)}>
            Lista de artículos
          </button>
          <button onClick={() => setStep(2)} className={isStepActive(2)}>
            Crear artículo
          </button>
          <button disabled className={isStepActive(3)}>
            Editar Articulos
          </button>
        </div>
      </div>
      <div className={styles.contenedor}>{renderSteps()}</div>

      <Alert
        icon={showAlert.icon}
        show={showAlert.show}
        message={showAlert.message}
        title={showAlert.title}
      />

      <Loader show={showLoader} />
    </>
  );
}
