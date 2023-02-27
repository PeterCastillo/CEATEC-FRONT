"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import { TarjetaDataTable } from "@/components/comercial/mantenimiento/ventas/tarjetas/TarjetaDataTable";
import {
  INewTarjeta,
  ITarjeta,
} from "@/interfaces/comercial/mantenimiento/ventas/tarjetasInterface";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  deleteTarjetaService,
  getListaTarjetaService,
  postTarjetaService,
  putTarjetaService,
} from "@/services/comercial/mantenimiento/ventas/tarjetasServices";
import { NuevaTarjetaForm } from "../../../../components/comercial/mantenimiento/ventas/tarjetas/NuevaTarjetaForm";
import { EditableTarjetaForm } from "@/components/comercial/mantenimiento/ventas/tarjetas/EditableTarjetaForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [editableTarjeta, setEditableTarjeta] = useState<ITarjeta>({
    _id: {
      $oid: "",
    },
    estado: false,
    empresa_id: "",
    descripcion: "",
  });
  const [newTarjeta, setNewTarjeta] = useState<INewTarjeta>({
    empresa_id: getLocalStorageItem("empresa"),
    descripcion: "",
  });
  const [tarjetas, setTarjetas] = useState<ITarjeta[]>([]);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [newEditabletarjeta, setNewEditableTarjeta] =
    useState<ITarjeta>(editableTarjeta);

  useEffect(() => {
    setNewEditableTarjeta(editableTarjeta);
  }, [editableTarjeta]);

  useEffect(() => {
    getTarjetasList();
  }, []);

  const getTarjetasList = async () => {
    setShowLoader(true);
    const cajas = await getListaTarjetaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (cajas) {
      if (cajas.status === 200) {
        setTarjetas(cajas.json.data);
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

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const funcion = (data: ITarjeta) => {
    setEditableTarjeta(data);
    setStep(3);
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

  const resetNewTarjeta = () => {
    setNewTarjeta({
      ...newTarjeta,
      descripcion: "",
    });
  };

  const handleCreateBancos = async () => {
    if (newTarjeta.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postTarjetaService(
      newTarjeta,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getTarjetasList();
      resetNewTarjeta();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Tarjeta creada correctamente",
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

  const handleUpdateTarjeta = async () => {
    if (newEditabletarjeta.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putTarjetaService(
      newEditabletarjeta,
      editableTarjeta._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getTarjetasList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Tarjeta actualizada correctamente",
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

  const handleDeleteTarjeta = async () => {
    setShowLoader(true);
    const response = await deleteTarjetaService(
      editableTarjeta._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getTarjetasList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Tarjeta eliminada correctamente",
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

  const resetNewEditableTarjeta = () => {
    setNewEditableTarjeta({
      ...newEditabletarjeta,
      ...editableTarjeta,
    });
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewTarjeta}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateBancos}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button className={styles.option} onClick={resetNewEditableTarjeta}>
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteTarjeta}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateTarjeta}>
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
            <TarjetaDataTable action={funcion} rows={100} columns={tarjetas} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaTarjetaForm
              newTarjeta={newTarjeta}
              setNewTarjeta={setNewTarjeta}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableTarjetaForm
              setNewEditableTarjeta={setNewEditableTarjeta}
              newEditabletarjeta={newEditabletarjeta}
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
