"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert, ISignInUserData } from "@/interfaces/componentsInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";

import { ProveedorDataTabe } from "@/components/comercial/mantenimiento/articulo-por-proveedor/ProveedorDataTabe";
import { ArticulosXProveedorForm } from "../../../../components/comercial/mantenimiento/articulo-por-proveedor/ArticulosXProveedorForm";
import {
  deleteArticuloProveedorService,
  getListaArticulosProveedorService,
  postArticuloProveedorService,
} from "@/services/comercial/mantenimiento/articulosProveedorServices";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { getListaClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import { getListaArticulosService } from "@/services/comercial/mantenimiento/articulo/articulosService";

interface IArticulosSelected {
  articulo: {
    id: string | undefined;
    nombre_articulo: string;
    marca: string;
  };
  _id: {
    $oid: string;
  };
}

interface ISelectedArticle {
  articulo_id: string;
}

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [articulosList, setArticulosList] = useState<IArticle[]>([]);
  const [proveedoresList, setProveedoresList] = useState<IClientProvider[]>([]);
  const [articulosProveedor, setArticulosProveedor] = useState<
    IArticulosSelected[]
  >([]);
  const [selectedArticles, setSelectedArticles] = useState<ISelectedArticle[]>(
    []
  );
  const [proveedorSelected, setProveedorSelected] = useState<IClientProvider>({
    _id: {
      $oid: "",
    },
    tipo_cliente_proveedor_id: "",
    empresa_id: "",
    clasificacion: "",
    dni_ruc: "",
    // # personaJuridica
    nombre_comercial: "",
    // # personaNatura
    nombre_natural: "",
    apellido_paterno_natural: "",
    apellido_materno_natural: "",
    fecha_nacimiento_natural: "",

    codigo_ubigeo: "",
    sector_id: "",
    zona_id: "",
    direccion: "",
    email: "",
    telefono1: "",
    telefono2: "",
    // # otroDatos
    nombre_contacto_otro: "",
    telefono_contacto_otro: "",
    descripcion_contacto_otro: "",
    precio_credito: null,
    estado: false,
  });

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const getClientProvidersList = async () => {
    setShowLoader(true);
    const response = await getListaClienteProveedorService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      setProveedoresList(response.json.data);
    }
    setShowLoader(false);
  };

  const getArticulosList = async () => {
    setShowLoader(true);
    const response = await getListaArticulosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      setArticulosList(response.json.data);
    }
    setShowLoader(false);
  };

  const getArticlesProvidersForId = async () => {
    setShowLoader(true);
    const articlesProviders = await getListaArticulosProveedorService(
      proveedorSelected._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (articlesProviders) {
      if (articlesProviders.status == 200) {
        setArticulosProveedor(articlesProviders.json.data);
      }
    }
  };

  useEffect(() => {
    if (proveedorSelected._id.$oid) {
      getArticlesProvidersForId();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [proveedorSelected]);

  useEffect(() => {
    getClientProvidersList();
    getArticulosList();
  }, []);

  const handleResetNewArticuloProveedor = () => {
    getArticlesProvidersForId();
  };

  const handleCreateArticuloProvedor = async () => {
    const formatedData = {
      articulos: selectedArticles,
      proveedor_id: proveedorSelected._id.$oid,
    };
    setShowLoader(true);
    const articleProviderResponse = await postArticuloProveedorService(
      formatedData,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (articleProviderResponse) {
      if (articleProviderResponse.status === 201) {
        getArticlesProvidersForId();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Articulos por Proveedor actualizados correctamente",
          show: true,
        });
        setSelectedArticles([]);
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

  const handleDeleteSaveArticle = async (id: string) => {
    setShowLoader(true);
    const deleteResponse = await deleteArticuloProveedorService(
      id,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (deleteResponse) {
      if (deleteResponse.status === 200) {
        getArticlesProvidersForId();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Articulos borrado exitosamente",
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

  const closeAlertTimeOut = () => {
    setTimeout(() => {
      setShowAlert({
        ...showAlert,
        icon: "",
        message: "",
        title: "",
        show: false,
      });
    }, 4000);
  };

  const handleProviderData = (data: IClientProvider) => {
    setProveedorSelected(data);
    setStep(2);
  };

  const handleSelectedArticles = (data: ISelectedArticle[]) => {
    setSelectedArticles(data);
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button
              className={styles.create}
              onClick={handleCreateArticuloProvedor}
            >
              <FaPlus /> GUARDAR
            </button>
          </>
        );
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <ProveedorDataTabe
              action={handleProviderData}
              rows={100}
              columns={proveedoresList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <ArticulosXProveedorForm
              proveedorSelected={proveedorSelected}
              articles={articulosList}
              handleSelectedArticles={handleSelectedArticles}
              handleDeleteSaveArticle={handleDeleteSaveArticle}
              setSelectedArticles={setSelectedArticles}
              articulosProveedor={articulosProveedor}
              selectedArticles={selectedArticles}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva articulo proveedor</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de proveedores
          </button>
          <button
            className={isStepActive(2)}
            onClick={() => setStep(2)}
            disabled
          >
            Articulos des proveedor
          </button>
        </div>
      </div>
      <div className={styles.contenedor}>{renderComponent()}</div>
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
