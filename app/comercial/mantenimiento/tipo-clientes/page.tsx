"use client";

import { EditableTipoClienteProveedorForm } from "@/components/comercial/mantenimiento/tipo-cliente-proveedor/EditableTipoClienteProveedorForm";
import { NuevaTipoClienteProveedorForm } from "@/components/comercial/mantenimiento/tipo-cliente-proveedor/NuevaTipoClienteProveedorForm";
import { TipoClienteProveedorDataTable } from "@/components/comercial/mantenimiento/tipo-cliente-proveedor/TipoClienteProveedorDataTable";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  IBrand,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { INewTipoClienteProveedor, ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";

import { deleteTipoClienteProveedoreService, getListaTipoClienteProveedoreService, postTipoClienteProveedoreService, putTipoClienteProveedoreService } from "@/services/comercial/mantenimiento/tipo-cliente-proveedor/tipoClienteProveedorService";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableTipoClienteProveedor, setEditableTipoClienteProveedor] = useState<ITipoClienteProveedor>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    empresa_id: "",
    estado: false,
  })
  const [newTipoClienteProveedor, setNewTipoClienteProveedor] = useState<INewTipoClienteProveedor>({
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [newEditableTipoClienteProveedor, setNewEditableTipoClienteProveedor] = useState<ITipoClienteProveedor>({
    _id: {
      $oid: "",
    },
    empresa_id: "",
    estado: false,
    descripcion: "",
  });

  const [tipoClienteProveedorList, setTipoClienteProveedorList] = useState<IBrand[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getTipoClienteProveedorList = async () => {
    setShowLoader(true);
    const tipoClienteProveedor = await getListaTipoClienteProveedoreService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (tipoClienteProveedor) {
      if (tipoClienteProveedor.status === 200) {
        setTipoClienteProveedorList(tipoClienteProveedor.json.data);
      }
    }
  };

  useEffect(() => {
    getTipoClienteProveedorList();
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

  const handleCreateTipoClienteProveedor = async () => {
    if (newTipoClienteProveedor.descripcion.length === 0) {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postTipoClienteProveedoreService(
      newTipoClienteProveedor,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getTipoClienteProveedorList();
      resetNewTipoClienteProveedor();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Cliente/Proveedor creado correctamente",
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

  const handleUpdateTipoClienteProveedor = async () => {
    if (newEditableTipoClienteProveedor.descripcion.length === 0) {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true)  
    const response = await putTipoClienteProveedoreService(
      newEditableTipoClienteProveedor,
      editableTipoClienteProveedor._id.$oid,
      getTokenFromLocalStorage()
    )  
    setShowLoader(true)  
    if (response) {
      if (response.status === 201) {
        getTipoClienteProveedorList()  
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El tipo Cliente/Proveedor fue actualizado correctamente",
          show: true,
        })  
        return closeAlertTimeOut()  
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    })  
    return closeAlertTimeOut()  
  };

  const handleDeleteTipoClienteProveedor = async () => {
    setShowLoader(true)  
    const response = await deleteTipoClienteProveedoreService(
      editableTipoClienteProveedor._id.$oid,
      getTokenFromLocalStorage()
    )  
    setShowLoader(false)  
    if (response) {
      if (response.status === 200) {
        getTipoClienteProveedorList()  
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Tipo Cliente/Proveedor fue eliminado correctamente",
          show: true,
        })  
        closeAlertTimeOut()  
        return setStep(1)  
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    })  
    return closeAlertTimeOut()  
  };


  const resetNewTipoClienteProveedor = () => {
    setNewTipoClienteProveedor({
      ...newTipoClienteProveedor,
      descripcion: "",
    });
  };

  const handleResetNewEditableTipoClienteProveedor = () => {
    setNewEditableTipoClienteProveedor(editableTipoClienteProveedor);
  };

  const funcion = (data: IBrand) => {
    setEditableTipoClienteProveedor(data);
    setNewEditableTipoClienteProveedor(data);
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
            <button className={styles.option} onClick={resetNewTipoClienteProveedor}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateTipoClienteProveedor}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableTipoClienteProveedor}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteTipoClienteProveedor}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateTipoClienteProveedor}>
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
            <TipoClienteProveedorDataTable action={funcion} rows={100} columns={tipoClienteProveedorList} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaTipoClienteProveedorForm new={newTipoClienteProveedor} setNew={setNewTipoClienteProveedor} />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableTipoClienteProveedorForm
              newEditable={newEditableTipoClienteProveedor}
              setNewEditable={setNewEditableTipoClienteProveedor}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo tipo cliente/proveedor</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista tipo cliente/proveedor
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo tipo cliente/proveedor
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar tipo cliente/proveedor
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
