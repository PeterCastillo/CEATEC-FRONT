"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  IGasto,
  INewGasto,
} from "@/interfaces/comercial/mantenimiento/gastos/gastosInterface";
import {
  deleteMantenimientoGastoService,
  getListaMantenimientoGastoService,
  postMantenimientoGastoService,
  putMantenimientoGastoService,
} from "@/services/comercial/mantenimiento/gasto/matenimientoGastoServices";
import { GastosDataTable } from "@/components/comercial/mantenimiento/gastos/GastosDataTable";
import { NuevoGastosForm } from "@/components/comercial/mantenimiento/gastos/NuevoGastosForm";
import { EditableGastosForm } from "../../../../components/comercial/mantenimiento/gastos/EditableGastosForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const [editableGasto, setEditableGasto] = useState<IGasto>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    cuenta_contable: "",
    resumen_automatico: "",
    empresa_id: "",
    estado: false,
  });
  const [newGasto, setNewGasto] = useState<INewGasto>({
    descripcion: "",
    cuenta_contable: "",
    resumen_automatico: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [newEditableGasto, setNewEditableGasto] = useState(editableGasto);

  const [gastosList, setGastosList] = useState<IGasto[]>([]);

  useEffect(() => {
    setNewEditableGasto(editableGasto);
  }, [editableGasto]);

  useEffect(() => {
    getGastosList();
  }, []);

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

  const getGastosList = async () => {
    setShowLoader(true);
    const tipoNivelDeAcceso = await getListaMantenimientoGastoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (tipoNivelDeAcceso) {
      if (tipoNivelDeAcceso.status === 200) {
        setGastosList(tipoNivelDeAcceso.json.data);
      }
    }
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewGasto}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateGasto}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableGasto}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteGasto}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateGasto}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
    }
  };

  const funcion = (data: IGasto) => {
    setEditableGasto(data);
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
  const resetNewGasto = () => {
    setNewGasto({
      ...newGasto,
      cuenta_contable: "",
      resumen_automatico: "",
      descripcion: "",
    });
  };

  const handleUpdateGasto = async () => {
    if (newEditableGasto.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableGasto.cuenta_contable.toString().trim() === "") {
      return errorValidateForm("cuenta contable");
    }
    if (newEditableGasto.resumen_automatico.trim() === "") {
      return errorValidateForm("resument automatico");
    }
    setShowLoader(true);
    const response = await putMantenimientoGastoService(
      newEditableGasto,
      editableGasto._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getGastosList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Gasto actualizado correctamente",
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

  const handleDeleteGasto = async () => {
    setShowLoader(true);
    const response = await deleteMantenimientoGastoService(
      editableGasto._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getGastosList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Gasto eliminado correctamente",
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

  const handleResetNewEditableGasto = () => {
    setNewEditableGasto({ ...newEditableGasto, ...editableGasto });
  };

  const handleCreateGasto = async () => {
    if (newGasto.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newGasto.cuenta_contable.toString().trim() === "") {
      return errorValidateForm("cuenta contable");
    }
    if (newGasto.resumen_automatico.trim() === "") {
      return errorValidateForm("resument automatico");
    }
    setShowLoader(true);
    const response = await postMantenimientoGastoService(
      newGasto,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getGastosList();
      resetNewGasto();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Gasto creado correctamente",
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

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <GastosDataTable action={funcion} rows={100} columns={gastosList} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevoGastosForm setNewGasto={setNewGasto} newGasto={newGasto} />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableGastosForm
              newEditableGasto={newEditableGasto}
              setNewEditableGasto={setNewEditableGasto}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Gasto</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de gastos
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva gasto
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar gasto
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
