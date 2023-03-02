"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { FaPen } from "react-icons/fa";

interface IArticleSelected {
  articulo_id: string;
}

import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import {
  getListaAticuloEliminadoService,
  putAticuloEliminadoService,
} from "@/services/comercial/mantenimiento/otros/RestaurarArticuloService";
import { RestaurarDataTable } from "@/components/comercial/mantenimiento/otros/restaurar-articulos-eliminados/RestaurarDataTable";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [articulos, setArticulos] = useState<IArticle[]>([]);
  const [selectedArticles, setSelectedArticles] = useState<IArticleSelected[]>(
    []
  );

  useEffect(() => {
    getListaArticulosEliminados();
  }, []);

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const handleSelectedArticles = (data: IArticleSelected[]) => {
    setSelectedArticles(data);
  };

  const restartArticle = async () => {
    if (selectedArticles.length < 1) {
      setShowAlert({
        ...showAlert,
        icon: "warning",
        title: "Advertencia",
        message: "Seleccione un articulo",
        show: true,
      });
      return closeAlertTimeOut();
    }
    const data = {
      articulos: selectedArticles,
    };
    const response = await putAticuloEliminadoService(
      data,
      getTokenFromLocalStorage()
    );
    if (response) {
      getListaArticulosEliminados();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Articulos restaurados exitosamente",
        show: true,
      });
      setSelectedArticles([]);
      return closeAlertTimeOut();
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

  const getListaArticulosEliminados = async () => {
    setShowLoader(true);
    const articulosEliminados = await getListaAticuloEliminadoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (articulosEliminados) {
      if (articulosEliminados.status === 200) {
        setArticulos(articulosEliminados.json.data);
      }
    }
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

  const renderButton = () => {
    switch (step) {
      case 1:
        return (
          <>
            <button
              type="button"
              onClick={handleRestartArticulosDeleted}
              className={styles.create}
            >
              <FaPen /> Restaurar articulos
            </button>
          </>
        );
    }
  };

  const handleRestartArticulosDeleted = () => {
    restartArticle();
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <RestaurarDataTable
              rows={100}
              columns={articulos}
              action={handleSelectedArticles}
              restartArticle={restartArticle}
            />
          </div>
        );
    }
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Restaurar articulo eliminado</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de articulos
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
