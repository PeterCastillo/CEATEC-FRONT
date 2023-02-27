"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  deleteSectorService,
  getListaSectoresService,
  postSectorService,
  putSectorService,
} from "@/services/comercial/mantenimiento/empresa/sectorService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  INewSector,
  ISector,
} from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { SectorDataTable } from "@/components/comercial/mantenimiento/empresa/sector/SectorDataTable";
import { NuevoSectorForm } from "../../../../components/comercial/mantenimiento/empresa/sector/NuevoSectorForm";
import { EditableSectorForm } from "@/components/comercial/mantenimiento/empresa/sector/EditableSectorForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [sectorsList, setSectorsList] = useState<ISector[]>([]);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [newSector, setNewSector] = useState<INewSector>({
    sector: "",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [editableSector, setEditableSector] = useState<ISector>({
    _id: {
      $oid: "",
    },
    sector: "",
    descripcion: "",
    empresa_id: "",
    estado: false,
  });
  const [newEditableSector, setNewEditableSector] =
    useState<ISector>(editableSector);

  useEffect(() => {
    getSectorsList();
  }, []);

  useEffect(() => {
    setNewEditableSector(editableSector);
  }, [editableSector]);

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const getSectorsList = async () => {
    setShowLoader(true);
    const sectors = await getListaSectoresService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (sectors) {
      if (sectors.status === 200) {
        setSectorsList(sectors.json.data);
      }
    }
  };

  const action = (data: ISector) => {
    setEditableSector(data);

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

  const resetNewSectorFields = () => {
    setNewSector({
      ...newSector,
      sector: "",
      descripcion: "",
    });
  };

  const handleCreateSector = async () => {
    if (newSector.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newSector.sector.trim() === "") {
      return errorValidateForm("sector");
    }
    setShowLoader(true);
    const response = await postSectorService(
      newSector,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getSectorsList();
        resetNewSectorFields();
        setStep(1);
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El sector fue creado correctamente",
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

  const handleUpdateSector = async () => {
    if (newEditableSector.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableSector.sector.trim() === "") {
      return errorValidateForm("sector");
    }
    setShowLoader(true);
    const response = await putSectorService(
      newEditableSector,
      editableSector._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getSectorsList();
        setStep(1);
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El sector fue actualizado correctamente",
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

  const handleDeleteSector = async () => {
    setShowLoader(true);
    const response = await deleteSectorService(
      editableSector._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getSectorsList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El sector fue eliminado correctamente",
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

  const resetNewEditableSector = () => {
    setNewEditableSector({
      ...newEditableSector,
      ...editableSector,
    });
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewSectorFields}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateSector}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button className={styles.option} onClick={resetNewEditableSector}>
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteSector}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateSector}>
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
            <SectorDataTable columns={sectorsList} rows={100} action={action} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevoSectorForm
              setNewSector={setNewSector}
              newSector={newSector}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableSectorForm
              setNewEditableSector={setNewEditableSector}
              newEditableSector={newEditableSector}
            />
          </div>
        );
    }
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Sector</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de sectores
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva sector
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar sector
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
