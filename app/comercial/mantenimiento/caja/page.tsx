"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert, ISignInUserData } from "@/interfaces/componentsInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  getTokenFromLocalStorage,
  getLocalStorageItem,
} from "@/utils/localStorageControl";
import { getListaSucursalService } from "@/services/comercial/mantenimiento/empresa/sucursalService";
import { getListaUsuariosService } from "@/services/auth/usuariosServices";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import {
  deleteCajasService,
  getListaCajasServiceForBranchOffice,
  postCajasService,
  putCajasService,
} from "@/services/comercial/mantenimiento/caja/cajaServices";
import {
  IBox,
  INewBox,
} from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { CajaDataTable } from "@/components/comercial/mantenimiento/caja/CajaDataTable";
import { NuevaCajaForm } from "../../../../components/comercial/mantenimiento/caja/NuevaCajaForm";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import { EditableCajaForm } from "../../../../components/comercial/mantenimiento/caja/EditableCajaForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [boxesList, setBoxesList] = useState<IBox[]>([]);
  const [selectData, setSelectData] = useState("Sucursal");
  const [branchOfficesList, setBranchOfficesList] = useState<IBranchOffice[]>(
    []
  );
  const [sucursalId, setSucursalId] = useState("");
  const [usersList, setUsersList] = useState<IUser[]>([]);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [editableBox, setEditableBox] = useState<IBox>({
    _id: {
      $oid: "",
    },
    estado: false,
    descripcion: "",
    ubicacion: "",
    usuario_id: "",
    sucursal_id: "",
    codigo_boleta_predeterminada: "",
    codigo_factura_predeterminada: "",
    empresa_id: "",
  });
  const [newEditableBox, setNewEditableBox] = useState<IBox>(editableBox);
  const [newBox, setNewBox] = useState<INewBox>({
    codigo_boleta_predeterminada: "",
    codigo_factura_predeterminada: "",
    descripcion: "",
    sucursal_id: "",
    ubicacion: "",
    usuario_id: "",
    empresa_id: getLocalStorageItem("empresa"),
  });

  useEffect(() => {
    setNewEditableBox(editableBox);
  }, [editableBox]);

  useEffect(() => {
    getBranchOfficesList();
    getUsersList();
  }, []);

  const getBoxesList = async (branchOffice_id: string) => {
    setShowLoader(true);
    const boxes = await getListaCajasServiceForBranchOffice(
      branchOffice_id,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (boxes) {
      if (boxes.status === 200) {
        setBoxesList(boxes.json.data);
      }
    }
  };

  const getBranchOfficesList = async (handleCreateSetSucursal = Function()) => {
    setShowLoader(true);
    const branchOffices = await getListaSucursalService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (branchOffices) {
      if (branchOffices.status === 200) {
        setBranchOfficesList(branchOffices.json.data);
        handleCreateSetSucursal()
      }
    }
  };

  const getUsersList = async () => {
    setShowLoader(true);
    const users = await getListaUsuariosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (users) {
      if (users.status === 200) {
        setUsersList(users.json.data);
      }
    }
    setShowLoader(false);
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

  const handleSelectCajaBySucursal = (sucursalId: string) => {
    const filterBranchOffice = branchOfficesList.filter(
      (branch) => branch.descripcion.toUpperCase() == sucursalId
    );
    if (filterBranchOffice.length) {
      setSelectData(filterBranchOffice[0].descripcion);
      setNewBox({
        ...newBox,
        sucursal_id: filterBranchOffice[0]._id.$oid,
      });
      getBoxesList(filterBranchOffice[0]._id.$oid);
    }
  };

  const funcion = (data: IBox) => {
    setEditableBox(data);
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

  const resetNewBoxFields = () => {
    setNewBox({
      ...newBox,
      codigo_boleta_predeterminada: "",
      codigo_factura_predeterminada: "",
      descripcion: "",
      ubicacion: "",
      usuario_id: "",
    });
  };

  const handleUpdateBox = async () => {
    if (newEditableBox.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableBox.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    if (newEditableBox.sucursal_id.trim() === "") {
      return errorValidateForm("sucursal");
    }
    if (newEditableBox.codigo_boleta_predeterminada.trim() === "") {
      return errorValidateForm("codigo de boleta");
    }
    if (newEditableBox.codigo_factura_predeterminada.trim() === "") {
      return errorValidateForm("codigo de factura");
    }
    if (newEditableBox.usuario_id.trim() === "") {
      return errorValidateForm("usuario encargado");
    }
    setShowLoader(true);
    const response = await putCajasService(
      newEditableBox,
      editableBox._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La caja fue actualizada correctamente",
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

  const handleDeleteBox = async () => {
    setShowLoader(true);
    const response = await deleteCajasService(
      editableBox._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La caja fue eliminada correctamente",
          show: true,
        });
        setSucursalId("");
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

  const resetNewEditableBoxFields = () => {
    setNewEditableBox({
      ...newEditableBox,
      ...editableBox,
    });
  };

  const handleCreateBox = async () => {
    if (newBox.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newBox.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    if (newBox.sucursal_id.trim() === "") {
      return errorValidateForm("sucursal");
    }
    if (newBox.codigo_boleta_predeterminada.trim() === "") {
      return errorValidateForm("codigo de boleta");
    }
    if (newBox.codigo_factura_predeterminada.trim() === "") {
      return errorValidateForm("codigo de factura");
    }
    if (newBox.usuario_id.trim() === "") {
      return errorValidateForm("usuario encargado");
    }
    setShowLoader(true);
    const response = await postCajasService(newBox, getTokenFromLocalStorage());
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        resetNewBoxFields();
        getBoxesList(newBox.sucursal_id);
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La caja fue creada correctamente",
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
            <button className={styles.option} onClick={resetNewBoxFields}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateBox}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={resetNewEditableBoxFields}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteBox}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateBox}>
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
            <CajaDataTable
              action={funcion}
              rows={100}
              columns={boxesList}
              branchOfficesList={branchOfficesList}
              handleSelectCajaBySucursal={handleSelectCajaBySucursal}
              setSucursalId={setSucursalId}
              sucursalId={sucursalId}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaCajaForm
              branchOfficesList={branchOfficesList}
              usersList={usersList}
              getBoxesList={getBoxesList}
              setNewBox={setNewBox}
              newBox={newBox}
              closeAlertTimeOut={closeAlertTimeOut}
              getBranchOfficesList={getBranchOfficesList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableCajaForm
              setNewEditableBox={setNewEditableBox}
              newEditableBox={newEditableBox}
              branchOfficesList={branchOfficesList}
              usersList={usersList}
              closeAlertTimeOut={closeAlertTimeOut}
              getBranchOfficesList={getBranchOfficesList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva Caja</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de cajas
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva caja
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar caja
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
