"use client";

import styles from "@/styles/Header.module.scss";
import { SucursalDataTable } from "@/components/comercial/mantenimiento/empresa/sucursal/SucursalDataTable";
import { SucursalEditableForm } from "@/components/comercial/mantenimiento/empresa/sucursal/SucursalEditableForm";
import { SucursalForm } from "@/components/comercial/mantenimiento/empresa/sucursal/SucursalForm";
import {
  IBranchOffice,
  INewBranchOffice,
} from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  deleteSucursalService,
  getListaSucursalService,
  postSucursalService,
  putSucursalService,
} from "@/services/comercial/mantenimiento/empresa/sucursalService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [newBranchOffice, setNewBranchOffice] = useState<INewBranchOffice>({
    descripcion: "",
    ubicacion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [editableBranchOffice, setEditableBranchOffice] =
    useState<IBranchOffice>({
      _id: {
        $oid: "",
      },
      estado: false,
      descripcion: "",
      ubicacion: "",
      empresa_id: getLocalStorageItem("empresa"),
    });
  const [newEditableBranchOffice, setNewEditableBranchOffice] =
    useState<IBranchOffice>(editableBranchOffice);

  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [branchOfficesList, setBranchOfficesList] = useState<IBranchOffice[]>(
    []
  );

  useEffect(() => {
    getBranchOfficesList();
  }, []);

  useEffect(() => {
    setNewEditableBranchOffice(editableBranchOffice);
  }, [editableBranchOffice]);

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
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

  const getBranchOfficesList = async () => {
    setShowLoader(true);
    const branchOffices = await getListaSucursalService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (branchOffices) {
      if (branchOffices.status === 200) {
        setBranchOfficesList(branchOffices.json.data);
      }
    }
    setShowLoader(false);
  };

  const action = (data: IBranchOffice) => {
    setEditableBranchOffice(data);
    setStep(3);
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option}>LIMPIAR</button>
            <button
              className={styles.create}
              onClick={handleCreateBranchOffice}
            >
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button className={styles.option} onClick={resetNewEditableBranchOffice}>DESHACER</button>
            <button
              className={styles.delete}
              onClick={handleDeleteBranchOffice}
            >
              <FaTrash /> ELIMINAR
            </button>
            <button
              className={styles.create}
              onClick={handleUpdateBranchOffice}
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
            <SucursalDataTable
              columns={branchOfficesList}
              rows={100}
              action={action}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <SucursalForm
              setNewBranchOffice={setNewBranchOffice}
              newBranchOffice={newBranchOffice}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <SucursalEditableForm
              setNewEditableBranchOffice={setNewEditableBranchOffice}
              editableBranchOffice={editableBranchOffice}
              newEditableBranchOffice={newEditableBranchOffice}
            />
          </div>
        );
    }
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

  const resetNewBranchOfficeFields = () => {
    setNewBranchOffice({
      ...newBranchOffice,
      descripcion: "",
      ubicacion: "",
    });
  };

  const handleUpdateBranchOffice = async () => {
    if (newEditableBranchOffice.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableBranchOffice.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    if (newEditableBranchOffice.empresa_id.trim() === "") {
      return errorValidateForm("empresa");
    }
    const response = await putSucursalService(
      newEditableBranchOffice,
      editableBranchOffice._id.$oid,
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 201) {
        getBranchOfficesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La sucursal fue actualizada correctamente",
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

  const handleDeleteBranchOffice = async () => {
    const response = await deleteSucursalService(
      editableBranchOffice._id.$oid,
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status == 200) {
        getBranchOfficesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La sucursal fue eliminada correctamente",
          show: true,
        });
        closeAlertTimeOut();
        return setStep(1);
      }
    }
  };

  const resetNewEditableBranchOffice = () => {
    setNewEditableBranchOffice({
      ...newEditableBranchOffice,
      ...editableBranchOffice,
    });
  };

  const handleCreateBranchOffice = async () => {
    if (newBranchOffice.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newBranchOffice.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    if (newBranchOffice.empresa_id.trim() === "") {
      return errorValidateForm("empresa");
    }
    setShowLoader(true)
    const response = await postSucursalService(
      newBranchOffice,
      getTokenFromLocalStorage()
    );
    setShowLoader(false)
    if (response) {
      if (response.status === 201) {
        getBranchOfficesList();
        resetNewBranchOfficeFields();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La sucursal fue creada correctamente",
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente mas tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva sucursal</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de sucursales
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva sucursal
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar sucursal
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
