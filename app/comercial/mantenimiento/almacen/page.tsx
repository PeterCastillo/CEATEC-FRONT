"use client";

import { AlmacenDataTable } from "@/components/comercial/mantenimiento/empresa/almacen/AlmacenDataTable";
import { EditableAlmacenForm } from "@/components/comercial/mantenimiento/empresa/almacen/EditableAlmacenForm";
import { NuevoAlmacenForm } from "@/components/comercial/mantenimiento/empresa/almacen/NuevoAlmacenForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  INewWareHouse,
  IWareHouse,
} from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  deleteAlmacenesService,
  getListaAlmacenesService,
  postAlmacenesService,
  putAlmacenesService,
} from "@/services/comercial/mantenimiento/empresa/almacenService";
import { getListaSucursalService } from "@/services/comercial/mantenimiento/empresa/sucursalService";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableWareHouse, setEditableWareHouse] = useState<IWareHouse>({
    _id: {
      $oid: "",
    },
    estado: false,
    descripcion: "",
    ubicacion: "",
    sucursal_id: "",
    empresa_id: "",
  });
  const [newWareHouse, setNewWareHouse] = useState<INewWareHouse>({
    empresa_id: getLocalStorageItem("empresa"),
    descripcion: "",
    sucursal_id: "",
    ubicacion: "",
  });
  const [newEditableWareHouse, setNewEditableWareHouse] = useState<IWareHouse>({
    _id: {
      $oid: "",
    },
    estado: false,
    descripcion: "",
    ubicacion: "",
    sucursal_id: "",
    empresa_id: "",
  });

  const [wareHousesList, setWareHousesList] = useState<IWareHouse[]>([]);
  const [branchOfficesList, setBranchOfficesList] = useState<IBranchOffice[]>(
    []
  );

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

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

  const getWareHousesList = async () => {
    setShowLoader(true);
    const wareHouses = await getListaAlmacenesService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (wareHouses) {
      if (wareHouses.status === 200) {
        setWareHousesList(wareHouses.json.data);
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getBranchOfficesList();
    getWareHousesList();
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

  const handleCreateWareHouse = async () => {
    if (newWareHouse.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newWareHouse.sucursal_id.trim() === "") {
      return errorValidateForm("sucursal");
    }
    if (newWareHouse.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    setShowLoader(true);
    const response = await postAlmacenesService(
      newWareHouse,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getWareHousesList();
        resetNewWareHouse();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El almacen fue creado correctamente",
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

  const handleUpdateWarehouse = async () => {
    if (newEditableWareHouse.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableWareHouse.sucursal_id.trim() === "") {
      return errorValidateForm("sucursal");
    }
    if (newEditableWareHouse.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    setShowLoader(true);
    const response = await putAlmacenesService(
      newEditableWareHouse,
      editableWareHouse._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getWareHousesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El almacen fue creado correctamente",
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

  const handleDeleteWareHouse = async () => {
    setShowLoader(true);
    const response = await deleteAlmacenesService(
      editableWareHouse._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getWareHousesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El almacen fue actualizado correctamente",
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

  const resetNewWareHouse = () => {
    setNewWareHouse({
      ...newWareHouse,
      descripcion: "",
      sucursal_id: "",
      ubicacion: "",
    });
  };

  const handleResetNewEditableMarca = () => {
    setNewEditableWareHouse(editableWareHouse);
  };

  const funcion = (data: IWareHouse) => {
    setEditableWareHouse(data);
    setNewEditableWareHouse(data);
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
            <button className={styles.option} onClick={resetNewWareHouse}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateWareHouse}>
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
            <button className={styles.delete} onClick={handleDeleteWareHouse}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateWarehouse}>
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
            <AlmacenDataTable
              sucursales={branchOfficesList}
              action={funcion}
              rows={100}
              columns={wareHousesList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevoAlmacenForm
              sucursales={branchOfficesList}
              new={newWareHouse}
              setNew={setNewWareHouse}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
              closeAlertTimeOut={closeAlertTimeOut}
              getBranchOfficesList={getBranchOfficesList}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableAlmacenForm
              sucursales={branchOfficesList}
              newEditable={newEditableWareHouse}
              setNewEditable={setNewEditableWareHouse}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
              closeAlertTimeOut={closeAlertTimeOut}
              getBranchOfficesList={getBranchOfficesList}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo almacen</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de almacenes
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo almacen
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar almacen
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
