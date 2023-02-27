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
import { getListaUsuariosService } from "@/services/auth/usuariosServices";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import {
  INewTipoDocumentoVenta,
  ITipoDocumentoVenta,
} from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import {
  deleteTipoDocumentoVentaService,
  getListaTipoDocumentoVentaService,
  postTipoDocumentoVentaService,
  putTipoDocumentoVentaService,
} from "@/services/comercial/mantenimiento/tipo-documento/venta/ventaServices";
import { VentaDataTable } from "@/components/comercial/mantenimiento/tipo-de-documento/venta/VentaDataTable";
import { NuevaVentaForm } from "@/components/comercial/mantenimiento/tipo-de-documento/venta/NuevaVentaForm";
import { EditableVentaForm } from "@/components/comercial/mantenimiento/tipo-de-documento/venta/EditableVentaForm";
import { getListaCajasService } from "@/services/comercial/mantenimiento/caja/cajaServices";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { getListaSucursalService } from "@/services/comercial/mantenimiento/empresa/sucursalService";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [tipoDocumentoVentaList, setTipoDocumentoVentaList] = useState<
    ITipoDocumentoVenta[]
  >([]);
  const [editableTipoDocumentoVenta, setEditableTipoDocumentoVenta] =
    useState<ITipoDocumentoVenta>({
      _id: {
        $oid: "",
      },
      descripcion: "",
      abreviatura: "",
      serie: "",
      correlativo: "",
      caja_id: "",
      empresa_id: "",
      estado: false,
    });
  const [newEditableTipoDocumentoVenta, setNewEditableTipoDocumentoVenta] =
    useState<ITipoDocumentoVenta>(editableTipoDocumentoVenta);
  const [newTipoDocumentoVenta, setNewTipoDocumentoVenta] =
    useState<INewTipoDocumentoVenta>({
      descripcion: "",
      abreviatura: "",
      serie: "",
      correlativo: "",
      caja_id: "",
      empresa_id: getLocalStorageItem("empresa"),
    });

  const [cajasList, setCajasList] = useState<IBox[]>([]);
  const [userList, setUserList] = useState<IUser[]>([]);
  const [branchOfficesList, setBranchOfficesList] = useState<IBranchOffice[]>(
    []
  );

  useEffect(() => {
    setNewEditableTipoDocumentoVenta(editableTipoDocumentoVenta);
  }, [editableTipoDocumentoVenta]);

  useEffect(() => {
    getTipoDocumentoVentaList();
    getCajasList();
    getSucursalesList();
    getUsersList();
  }, []);

  const getUsersList = async () => {
    setShowLoader(true);
    const users = await getListaUsuariosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (users) {
      if (users.status === 200) {
        setUserList(users.json.data);
      }
    }
    setShowLoader(false);
  };
  const getSucursalesList = async () => {
    setShowLoader(true);
    const response = await getListaSucursalService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setBranchOfficesList(response.json.data);
      }
    }
    setShowLoader(false);
  };

  const getTipoDocumentoVentaList = async () => {
    setShowLoader(true);
    const tipoDocumento = await getListaTipoDocumentoVentaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (tipoDocumento) {
      if (tipoDocumento.status === 200) {
        setTipoDocumentoVentaList(tipoDocumento.json.data);
      }
    }
  };

  const getCajasList = async () => {
    setShowLoader(true);
    const cajas = await getListaCajasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (cajas) {
      if (cajas.status === 200) {
        console.log(cajas.json);
        setCajasList(cajas.json.data);
      }
    }
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

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

  const funcion = (data: ITipoDocumentoVenta) => {
    setEditableTipoDocumentoVenta(data);
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

  const resetNewTipoDocumentoVenta = () => {
    setNewTipoDocumentoVenta({
      ...newTipoDocumentoVenta,
      abreviatura: "",
      correlativo: "",
      descripcion: "",
      serie: "",
      caja_id: "",
    });
  };
  const handleCreateTipoDocumentoVenta = async () => {
    if (newTipoDocumentoVenta.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newTipoDocumentoVenta.abreviatura.trim() === "") {
      return errorValidateForm("abreviatura");
    }
    if (newTipoDocumentoVenta.serie.toString().trim() === "") {
      return errorValidateForm("serie");
    }
    if (newTipoDocumentoVenta.correlativo.toString().trim() === "") {
      return errorValidateForm("correlativo");
    }
    if (newTipoDocumentoVenta.caja_id.trim() === "") {
      return errorValidateForm("caja");
    }
    setShowLoader(true);
    const response = await postTipoDocumentoVentaService(
      {
        ...newTipoDocumentoVenta,
        correlativo: Number(newTipoDocumentoVenta.correlativo),
      },
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getTipoDocumentoVentaList();
      resetNewTipoDocumentoVenta();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Tipo documento venta creado correctamente",
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

  const handleUpdateTipoDocumentoVenta = async () => {
    if (newEditableTipoDocumentoVenta.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableTipoDocumentoVenta.abreviatura.trim() === "") {
      return errorValidateForm("abreviatura");
    }
    if (newEditableTipoDocumentoVenta.serie.toString().trim() === "") {
      return errorValidateForm("serie");
    }
    if (newEditableTipoDocumentoVenta.correlativo.toString().trim() === "") {
      return errorValidateForm("correlativo");
    }
    if (newEditableTipoDocumentoVenta.caja_id.trim() === "") {
      return errorValidateForm("caja");
    }
    setShowLoader(true);
    const response = await putTipoDocumentoVentaService(
      {
        ...newEditableTipoDocumentoVenta,
        correlativo: Number(newEditableTipoDocumentoVenta.correlativo)
      },
      editableTipoDocumentoVenta._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getTipoDocumentoVentaList();
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

  const handleDeleteTipoDocumentoVenta = async () => {
    setShowLoader(true);
    const response = await deleteTipoDocumentoVentaService(
      editableTipoDocumentoVenta._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getTipoDocumentoVentaList();
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
    setNewEditableTipoDocumentoVenta({
      ...newEditableTipoDocumentoVenta,
      ...editableTipoDocumentoVenta,
    });
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button
              className={styles.option}
              onClick={resetNewTipoDocumentoVenta}
            >
              LIMPIAR
            </button>
            <button
              className={styles.create}
              onClick={handleCreateTipoDocumentoVenta}
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
              onClick={handleDeleteTipoDocumentoVenta}
            >
              <FaTrash /> ELIMINAR
            </button>
            <button
              className={styles.create}
              onClick={handleUpdateTipoDocumentoVenta}
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
            <VentaDataTable
              action={funcion}
              rows={100}
              columns={tipoDocumentoVentaList}
              cajas={cajasList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaVentaForm
              newTipoDocumentoVenta={newTipoDocumentoVenta}
              setNewTipoDocumentoVenta={setNewTipoDocumentoVenta}
              cajasList={cajasList}
              branchOfficesList={branchOfficesList}
              closeAlertTimeOut={closeAlertTimeOut}
              getBranchOfficesList={getSucursalesList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
              userList={userList}
              getCajasList={getCajasList}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableVentaForm
              newEditableTipoDocumentoVenta={newEditableTipoDocumentoVenta}
              setNewEditableTipoDocumentoVenta={
                setNewEditableTipoDocumentoVenta
              }
              branchOfficesList={branchOfficesList}
              closeAlertTimeOut={closeAlertTimeOut}
              getBranchOfficesList={getSucursalesList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
              userList={userList}
              cajasList={cajasList}
              getCajasList={getCajasList}
            />
          </div>
        );
    }
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Documento Venta</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de documentos de venta
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo documento de venta
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar documento de venta
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
