"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  deleteTipoDocumentoCompraService,
  getListaTipoDocumentoCompraService,
  postTipoDocumentoCompraService,
  putTipoDocumentoCompraService,
} from "@/services/comercial/mantenimiento/tipo-documento/compra/compraServices";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  INewTipoDocumentoCompra,
  ITipoDocumentoCompra,
} from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { CompraDataTable } from "@/components/comercial/mantenimiento/tipo-de-documento/compra/CompraDataTable";
import { NuevaCompraForm } from "@/components/comercial/mantenimiento/tipo-de-documento/compra/NuevaCompraForm";
import { EditableCompraForm } from "@/components/comercial/mantenimiento/tipo-de-documento/compra/EditableCompraForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [editableTipoDocumento, setEditableTipoDocumento] =
    useState<ITipoDocumentoCompra>({
      _id: {
        $oid: "",
      },
      abreviatura: "",
      correlativo: "",
      descripcion: "",
      serie: "",
      estado: false,
      empresa_id: "",
    });
  const [newTipoDocumento, setNewTipoDocumento] =
    useState<INewTipoDocumentoCompra>({
      abreviatura: "",
      correlativo: "",
      descripcion: "",
      serie: "",
      empresa_id: getLocalStorageItem("empresa"),
    });
  const [tipoDocumentoComraList, setTipoDocumentoCompraList] = useState<
    ITipoDocumentoCompra[]
  >([]);
  const [newEditableTipoDocumentoCompra, setNewEditableTipoDocumentoCompra] =
    useState(editableTipoDocumento);

  useEffect(() => {
    getTipoDocumentoCompraList();
  }, []);

  useEffect(() => {
    setNewEditableTipoDocumentoCompra(editableTipoDocumento);
  }, [editableTipoDocumento]);
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

  const getTipoDocumentoCompraList = async () => {
    setShowLoader(true);
    const tipoDocumento = await getListaTipoDocumentoCompraService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (tipoDocumento) {
      if (tipoDocumento.status === 200) {
        setTipoDocumentoCompraList(tipoDocumento.json.data);
      }
    }
  };

  const funcion = (data: ITipoDocumentoCompra) => {
    setEditableTipoDocumento(data);
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

  const handleUpdateTipoDocumento = async () => {
    if (newEditableTipoDocumentoCompra.abreviatura.trim() === "") {
      return errorValidateForm("zona");
    }
    if (newEditableTipoDocumentoCompra.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableTipoDocumentoCompra.serie.toString().trim() === "") {
      return errorValidateForm("serie");
    }
    if (newEditableTipoDocumentoCompra.correlativo.toString().trim() === "") {
      return errorValidateForm("correlativo");
    }
    setShowLoader(true);
    const response = await putTipoDocumentoCompraService(
      newEditableTipoDocumentoCompra,
      editableTipoDocumento._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getTipoDocumentoCompraList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El tipo documento fue actualizado correctamente",
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

  const handleDeleteTipoDocumento = async () => {
    setShowLoader(true);
    const response = await deleteTipoDocumentoCompraService(
      editableTipoDocumento._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getTipoDocumentoCompraList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Tipo documento fue eliminado correctamente",
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

  const handleResetTipoDocumentoVenta = () => {
    setNewEditableTipoDocumentoCompra({
      ...newEditableTipoDocumentoCompra,
      ...editableTipoDocumento,
    });
  };

  const resetNewTipoDocumentoCompra = () => {
    setNewTipoDocumento({
      ...newTipoDocumento,
      abreviatura: "",
      correlativo: "",
      descripcion: "",
      serie: "",
    });
  };
  const handleCreateTipoDocumentoCompra = async () => {
    if (newTipoDocumento.abreviatura.trim() === "") {
      return errorValidateForm("zona");
    }
    if (newTipoDocumento.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newTipoDocumento.serie.toString().trim() === "") {
      return errorValidateForm("serie");
    }
    if (newTipoDocumento.correlativo.toString().trim() === "") {
      return errorValidateForm("correlativo");
    }
    setShowLoader(true);
    const response = await postTipoDocumentoCompraService(
      newTipoDocumento,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getTipoDocumentoCompraList();
      resetNewTipoDocumentoCompra();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "La marca fue creada correctamente",
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

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button
              className={styles.option}
              onClick={resetNewTipoDocumentoCompra}
            >
              LIMPIAR
            </button>
            <button
              className={styles.create}
              onClick={handleCreateTipoDocumentoCompra}
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
              onClick={handleResetTipoDocumentoVenta}
            >
              DESHACER
            </button>
            <button
              className={styles.delete}
              onClick={handleDeleteTipoDocumento}
            >
              <FaTrash /> ELIMINAR
            </button>
            <button
              className={styles.create}
              onClick={handleUpdateTipoDocumento}
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
            <CompraDataTable
              action={funcion}
              rows={100}
              columns={tipoDocumentoComraList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaCompraForm
              setNewTipoDocumento={setNewTipoDocumento}
              newTipoDocumento={newTipoDocumento}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableCompraForm
              setNewEditableTipoDocumentoCompra={
                setNewEditableTipoDocumentoCompra
              }
              newEditableTipoDocumentoCompra={newEditableTipoDocumentoCompra}
            />
          </div>
        );
    }
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Documento Compra</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de documentos de compra
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo documento de compra
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar documento de compra
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
