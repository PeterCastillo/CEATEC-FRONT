"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { FaPlus } from "react-icons/fa";
import {
  INewTipoNivelAcceso,
  ITipoNivelAcceso,
} from "@/interfaces/comercial/mantenimiento/tipo-nivel-acceso/tipoNivelAcceso";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  getListaTipoNivelAccesoService,
  postTipoNivelAccesoService,
  putTipoNivelAccesoService,
} from "@/services/comercial/mantenimiento/tipo-nivel-acceso/tipoNivelAccesoServices";
import { NuevoTipoNivelAccesoDataTable } from "@/components/comercial/mantenimiento/tipo-nivel-acceso/NuevoTipoNivelAccesoDataTable";
import { NuevoTipoNivelAccesoForm } from "@/components/comercial/mantenimiento/tipo-nivel-acceso/NuevoTipoNivelAccesoForm";
import { EditableTipoNivelAccesoForm } from "../../../../components/comercial/mantenimiento/tipo-nivel-acceso/EditableTipoNivelAccesoForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [editableTipoNivelDeAcceso, setEditableTipoNivelDeAcceso] =
    useState<ITipoNivelAcceso>({
      _id: {
        $oid: "",
      },
      nombre: "",
      empresa_id: "",
      estado: false,
    });
  const [newTipoNivelDeAcceso, setNewTipoNivelDeAcceso] =
    useState<INewTipoNivelAcceso>({
      nombre: "",
      estado: false,
      empresa_id: getLocalStorageItem("empresa"),
    });
  const [tipoNivelDeAccesoList, setTipoNivelDeAccesoList] = useState<
    ITipoNivelAcceso[]
  >([]);
  const [newEditableTipoNivelDeAcceso, setNewEditableTipoNivelDeAcceso] =
    useState(editableTipoNivelDeAcceso);

  useEffect(() => {
    getTipoNivelDeAccesoList();
  }, []);

  useEffect(() => {
    setNewEditableTipoNivelDeAcceso(editableTipoNivelDeAcceso);
  }, [editableTipoNivelDeAcceso]);

  const getTipoNivelDeAccesoList = async () => {
    setShowLoader(true);
    const tipoNivelDeAcceso = await getListaTipoNivelAccesoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (tipoNivelDeAcceso) {
      if (tipoNivelDeAcceso.status === 200) {
        setTipoNivelDeAccesoList(tipoNivelDeAcceso.json.data);
      }
    }
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
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

  const resetNewTipoAccesoDeNivel = () => {
    setNewTipoNivelDeAcceso({
      ...newTipoNivelDeAcceso,
      nombre: "",
      estado: false,
    });
  };

  const handleCreateTipoNivelAcceso = async () => {
    if (newTipoNivelDeAcceso.nombre.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postTipoNivelAccesoService(
      newTipoNivelDeAcceso,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getTipoNivelDeAccesoList();
      resetNewTipoAccesoDeNivel();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Tipo Nivel de Acceso fue creado correctamente",
        show: true,
      });
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

  const funcion = (data: ITipoNivelAcceso) => {
    setEditableTipoNivelDeAcceso(data);
    setStep(3);
  };

  const handleUpdateTipoNivelDeAcceso = async () => {
    if (newEditableTipoNivelDeAcceso.nombre.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putTipoNivelAccesoService(
      newEditableTipoNivelDeAcceso,
      editableTipoNivelDeAcceso._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getTipoNivelDeAccesoList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Tipo Nivel de acceso fue actualizado correctamente",
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

  const handleResetTipoNivelDeAcceso = () => {
    setNewEditableTipoNivelDeAcceso({
      ...newEditableTipoNivelDeAcceso,
      ...editableTipoNivelDeAcceso,
    });
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button
              className={styles.option}
              onClick={resetNewTipoAccesoDeNivel}
            >
              LIMPIAR
            </button>
            <button
              className={styles.create}
              onClick={handleCreateTipoNivelAcceso}
            >
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetTipoNivelDeAcceso}
            >
              DESHACER
            </button>
            {/* <button className={styles.delete} onClick={handleDeleteBanco}>
              <FaTrash /> ELIMINAR
            </button> */}
            <button
              className={styles.create}
              onClick={handleUpdateTipoNivelDeAcceso}
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
            <NuevoTipoNivelAccesoDataTable
              action={funcion}
              rows={100}
              columns={tipoNivelDeAccesoList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevoTipoNivelAccesoForm
              setNewTipoNivelDeAcceso={setNewTipoNivelDeAcceso}
              newTipoNivelDeAcceso={newTipoNivelDeAcceso}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableTipoNivelAccesoForm
              setNewEditableTipoNivelDeAcceso={setNewEditableTipoNivelDeAcceso}
              newEditableTipoNivelDeAcceso={newEditableTipoNivelDeAcceso}
            />
          </div>
        );
    }
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Banco</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de bancos
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo banco
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar banco
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
