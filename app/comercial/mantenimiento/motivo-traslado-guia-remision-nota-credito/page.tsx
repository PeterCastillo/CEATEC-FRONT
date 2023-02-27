"use client";

import { EditableMotivoTrasladoForm } from "@/components/comercial/mantenimiento/motivo-traslado/EditableMotivoTrasladoForm";
import { MotivoTrasladoDataTable } from "@/components/comercial/mantenimiento/motivo-traslado/MotivoTrasladoDataTable";
import { NuevaMotivoTrasladoForm } from "@/components/comercial/mantenimiento/motivo-traslado/NuevoMotivoTrasladoForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  IMotivoTraslado,
  INewMotivoTraslado,
} from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { deleteMotivoTrasladoService, getListMotivoTrasladoService, postMotivoTrasladoService, putMotivoTrasladoService } from "@/services/comercial/mantenimiento/motivo-traslado/motivoTrasladoServices";
import styles from "@/styles/Header.module.scss";
import {
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableMotivoTraslado, setEditableMotivoTraslado] =
    useState<IMotivoTraslado>({
      _id: {
        $oid: "",
      },
      codigo_opcional: null,
      motivo_traslado: "",
      notas_credito: "",
      estado: false,
    });
  const [newMotivoTraslado, setNewMotivoTraslado] =
    useState<INewMotivoTraslado>({
      codigo_opcional: null,
      motivo_traslado: "",
      notas_credito: "",
    });
  const [newEditableMotivoTraslado, setNewEditableMotivoTraslado] = useState<IMotivoTraslado>({
    _id: {
      $oid: "",
    },
    codigo_opcional: null,
    motivo_traslado: "",
    notas_credito: "",
    estado: false,
  });

  const [motivoTrasladoList, setMotivoTrasladoList] = useState<
    IMotivoTraslado[]
  >([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getMotivoTrasladoList = async () => {
    setShowLoader(true);
    const brands = await getListMotivoTrasladoService(
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (brands) {
      if (brands.status === 200) {
        setMotivoTrasladoList(brands.json.data);
      }
    }
  };

  useEffect(() => {
    getMotivoTrasladoList();
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

  const handleCreateMotvioTraslado = async () => {
    if (newMotivoTraslado.notas_credito.trim() === "") {
      return errorValidateForm("notas de credito");
    }
    if (newMotivoTraslado.motivo_traslado.trim() === "") {
      return errorValidateForm("motivo de traslado");
    }
    setShowLoader(true);
    const response = await postMotivoTrasladoService(
      newMotivoTraslado,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getMotivoTrasladoList();
      resetNewMotivoTraslado();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Motivo traslado creado correctamente",
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

  const handleUpdateMArca = async () => {
    if (newEditableMotivoTraslado.notas_credito.trim() === "") {
      return errorValidateForm("notas de credito");
    }
    if (newEditableMotivoTraslado.motivo_traslado.trim() === "") {
      return errorValidateForm("motivo de traslado");
    }
    setShowLoader(true);
    const response = await putMotivoTrasladoService(
      newEditableMotivoTraslado,
      editableMotivoTraslado._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getMotivoTrasladoList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Motivo traslado actualizado correctamente",
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
    const response = await deleteMotivoTrasladoService(
      editableMotivoTraslado._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getMotivoTrasladoList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Motivo traslado eliminado correctamente",
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

  const resetNewMotivoTraslado = () => {
    setNewMotivoTraslado({
      ...newMotivoTraslado,
      codigo_opcional: null,
      motivo_traslado: "",
      notas_credito: ""
    });
  };

  const handleResetNewEditableMotivoTraslado = () => {
    setNewEditableMotivoTraslado(editableMotivoTraslado);
  };

  const funcion = (data: IMotivoTraslado) => {
    setEditableMotivoTraslado(data);
    setNewEditableMotivoTraslado(data);
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
            <button className={styles.option} onClick={resetNewMotivoTraslado}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateMotvioTraslado}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableMotivoTraslado}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteMarca}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateMArca}>
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
            <MotivoTrasladoDataTable
              action={funcion}
              rows={100}
              columns={motivoTrasladoList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaMotivoTrasladoForm
              new={newMotivoTraslado}
              setNew={setNewMotivoTraslado}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableMotivoTrasladoForm
              newEditable={newEditableMotivoTraslado}
              setNewEditable={setNewEditableMotivoTraslado}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo motivo traslado</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de motivos de traslado
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo motivo traslado
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar motivo traslado
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
