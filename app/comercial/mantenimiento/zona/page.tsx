"use client";

import styles from "@/styles/Header.module.scss";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { ZonaDataTable } from "@/components/comercial/mantenimiento/empresa/zona/ZonaDataTable";
import {
  INewZone,
  IZone,
} from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import {
  deleteZonasService,
  getListaZonasService,
  postZonasService,
  putZonasService,
} from "@/services/comercial/mantenimiento/empresa/zonaService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { NuevaZonaForm } from "@/components/comercial/mantenimiento/empresa/zona/NuevaZonaForm";
import { EditableZonaForm } from "@/components/comercial/mantenimiento/empresa/zona/EditableZonaForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [zonesList, setZonesList] = useState<IZone[]>([]);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [newZone, setNewZone] = useState<INewZone>({
    zona: "",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [editableZone, setEditableZone] = useState<IZone>({
    _id: {
      $oid: "",
    },
    zona: "",
    descripcion: "",
    empresa_id: "",
    estado: false,
  });
  const [newEditableZone, setNewEditableZone] = useState<IZone>(editableZone);

  useEffect(() => {
    setNewEditableZone(editableZone);
  }, [editableZone]);

  useEffect(() => {
    getZonesList();
  }, []);

  const getZonesList = async () => {
    setShowLoader(true);
    const zones = await getListaZonasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (zones) {
      if (zones.status === 200) {
        setZonesList(zones.json.data);
      }
    }
    setShowLoader(false);
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const action = (data: IZone) => {
    setEditableZone(data);
    setStep(3);
  };

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

  const resetNewZoneList = () => {
    setNewZone({
      ...newZone,
      zona: "",
      descripcion: "",
    });
  };

  const handleCreateZone = async () => {
    if (newZone.zona.trim() === "") {
      return errorValidateForm("zona");
    }
    if (newZone.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postZonasService(
      newZone,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getZonesList();
        resetNewZoneList();
        setStep(1);
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La zona fue creada correctamente",
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

  const handleUpdateZone = async () => {
    if (newEditableZone.zona.trim() === "") {
      return errorValidateForm("zona");
    }
    if (newEditableZone.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putZonasService(
      newEditableZone,
      editableZone._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getZonesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La zona fue actualizada correctamente",
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

  const handleDeleteZone = async () => {
    setShowLoader(true);
    const response = await deleteZonasService(
      editableZone._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getZonesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La zona fue eliminada correctamente",
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

  const resetNewEditableZonefields = () => {
    setNewEditableZone({
      ...newEditableZone,
      ...editableZone,
    });
  };

  const renderButton = () => {
    switch (step) {
      case 1:
        return <></>;
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewZoneList}>
              DESHACER
            </button>
            <button className={styles.create} onClick={handleCreateZone}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={resetNewEditableZonefields}
            >
              LIMPIAR
            </button>
            <button className={styles.delete} onClick={handleDeleteZone}>
              ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateZone}>
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
            <ZonaDataTable columns={zonesList} rows={100} action={action} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaZonaForm setNewZone={setNewZone} newZone={newZone} />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableZonaForm
              setNewEditableZone={setNewEditableZone}
              newEditableZone={newEditableZone}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva zona</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de zonas
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva zona
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar zona
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
