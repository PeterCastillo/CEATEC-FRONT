"use client";

import { EditableUnidadForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/unidad/EditableUnidadForm";
import { NuevaUnidadForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/unidad/NuevaUnidadForm";
import { UnidadDataTable } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/unidad/UnidadDataTable";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  INewUnit,
  IUnit,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { deleteMarcaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/marcaServices";
import { getListaUnidadService, postUnidadService, putUnidadService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/unidadServices";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableUnidad, setEditableUnidad] = useState<IUnit>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    abreviatura: "",
    valor: "",
    empresa_id: "",
    estado: false,
  });
  const [newUnidad, setNewUnidad] = useState<INewUnit>({
    abreviatura: "",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
    valor: "",
  });
  const [newEditableUnidad, setNewEditableUnidad] = useState<IUnit>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    abreviatura: "",
    valor: "",
    empresa_id: "",
    estado: false,
  });

  const [unidadesList, setUnidadesList] = useState<IUnit[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getUnitsList = async () => {
    setShowLoader(true);
    const units = await getListaUnidadService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (units) {
      if (units.status === 200) {
        setUnidadesList(units.json.data);
      }
    }
  };

  useEffect(() => {
    getUnitsList();
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

  const handleCreateUnidad = async () => {
    if (newUnidad.abreviatura.trim() === "") {
      return errorValidateForm("abreviatura");
    }
    if (newUnidad.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newUnidad.valor.toString().trim() === "") {
      return errorValidateForm("valor");
    }
    const data = {
      ...newUnidad,
      valor: Number(newUnidad.valor.toString()),
    };
    setShowLoader(true);
    const response = await postUnidadService(
      newUnidad,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getUnitsList();
      resetNewUnidad();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Unidad creado correctamente",
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

  const handleUpdateUnidad = async () => {
    if (newEditableUnidad.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putUnidadService(
      newEditableUnidad,
      editableUnidad._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getUnitsList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Unidad actualizado correctamente",
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

  const handleDeleteUnidad = async () => {
    setShowLoader(true);
    const response = await deleteMarcaService(
      editableUnidad._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getUnitsList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Unidad eliminado correctamente",
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

  const resetNewUnidad = () => {
    setNewUnidad({
      ...newUnidad,
      descripcion: "",
      abreviatura: "",
      valor: ""
    });
  };

  const handleResetNewEditableUnidad = () => {
    setNewEditableUnidad(editableUnidad);
  };

  const funcion = (data: IUnit) => {
    setEditableUnidad(data);
    setNewEditableUnidad(data);
    setStep(3);
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
            <button className={styles.option} onClick={resetNewUnidad}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateUnidad}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableUnidad}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteUnidad}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateUnidad}>
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
            <UnidadDataTable action={funcion} rows={100} columns={unidadesList} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaUnidadForm new={newUnidad} setNew={setNewUnidad} />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableUnidadForm
              newEditable={newEditableUnidad}
              setNewEditable={setNewEditableUnidad}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva unidad</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de unidads
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva unidad
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar unidad
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
