"use client";

import { EditableGrupoForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/grupo/EditableGrupoForm";
import { GrupoDataTable } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/grupo/GrupoDataTable";
import { NuevaGrupoForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/grupo/NuevaGrupoForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  IGroup,
  INewGroup,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  deleteGrupoService,
  getListaGrupoService,
  postGrupoService,
  putGrupoService,
} from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/grupoServices";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableGroup, setEditableGroup] = useState<IGroup>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    empresa_id: "",
    estado: false,
  });
  const [newGroup, setNewGroup] = useState<INewGroup>({
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [newEditableGroup, setNewEditableGroup] = useState<IGroup>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    empresa_id: "",
    estado: false,
  });

  const [groupsList, setGroupsList] = useState<IGroup[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

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

  useEffect(() => {
    getGroupsList();
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

  const handleCreateMarca = async () => {
    if (newGroup.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postGrupoService(
      newGroup,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getGroupsList();
      resetNewMarca();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Grupo creado correctamente",
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

  const handleUpdateMarca = async () => {
    if (newEditableGroup.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putGrupoService(
      newEditableGroup,
      editableGroup._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getGroupsList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Grupo actualizado correctamente",
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

  const handleDeleteMarca = async () => {
    setShowLoader(true);
    const response = await deleteGrupoService(
      editableGroup._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getGroupsList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Grupo eliminado correctamente",
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

  const resetNewMarca = () => {
    setNewGroup({
      ...newGroup,
      descripcion: "",
    });
  };

  const handleResetNewEditableMarca = () => {
    setNewEditableGroup(editableGroup);
  };

  const funcion = (data: IGroup) => {
    setEditableGroup(data);
    setNewEditableGroup(data);
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
            <button className={styles.option} onClick={resetNewMarca}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateMarca}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableMarca}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteMarca}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateMarca}>
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
            <GrupoDataTable action={funcion} rows={100} columns={groupsList} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaGrupoForm newGroup={newGroup} setNewGroup={setNewGroup} />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableGrupoForm
              newEditableGrupo={newEditableGroup}
              setNewEditableGrupo={setNewEditableGroup}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo grupo</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de grupos
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva grupo
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar grupo
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
