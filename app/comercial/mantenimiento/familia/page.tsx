"use client";

import { EditableFamiliaForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/familia/EditableFamiliaForm";
import { FamiliaDataTable } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/familia/FamiliaDataTable";
import { NuevaFamiliaForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/familia/NuevaFamiliaForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  IFamily,
  INewFamily,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  deleteFamiliaService,
  getListaFamiliaService,
  postFamiliaService,
  putFamiliaService,
} from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/familiaServices";
import { getListaGrupoService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/grupoServices";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableFamily, setEditableFamily] = useState<IFamily>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    grupo_id: "",
    cuenta_compra_debe: "",
    cuenta_venta_debe: "",
    cuenta_compra_haber: "",
    cuenta_venta_haber: "",
    cuenta_mercaderia: "",
    cuenta_prod_manufac: "",
    exonerado_igv: false,
    considerar_en_venta: false,
    estado: false,
    empresa_id: ""
  });
  const [newFamily, setNewFamily] = useState<INewFamily>({
    considerar_en_venta: false,
    cuenta_compra_debe: "6011",
    cuenta_venta_debe: "7011",
    cuenta_compra_haber: "4212",
    cuenta_venta_haber: "1212",
    cuenta_mercaderia: "6911",
    cuenta_prod_manufac: "2011",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
    exonerado_igv: false,
    grupo_id: "",
  });
  const [newEditableFamily, setNewEditableFamily] = useState<IFamily>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    grupo_id: "",
    cuenta_compra_debe: "",
    cuenta_venta_debe: "",
    cuenta_compra_haber: "",
    cuenta_venta_haber: "",
    cuenta_mercaderia: "",
    cuenta_prod_manufac: "",
    exonerado_igv: false,
    considerar_en_venta: false,
    estado: false,
    empresa_id: ""
  });

  const [familiessList, setFamiliesList] = useState<IFamily[]>([]);
  const [groupsList, setGroupsList] = useState<IGroup[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getFamiliesList = async () => {
    setShowLoader(true);
    const response = await getListaFamiliaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setFamiliesList(response.json.data);
      }
    }
    setShowLoader(false);
  };

  const getGroupsList = async (handleCreateSetGroup = Function()) => {
    setShowLoader(true);
    const groups = await getListaGrupoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (groups) {
      if (groups.status === 200) {
        setGroupsList(groups.json.data);
        handleCreateSetGroup()
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getFamiliesList();
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

  const handleCreateFamily = async () => {
    if (newFamily.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newFamily.grupo_id.trim() === "") {
      return errorValidateForm("grupo");
    }
    setShowLoader(true);
    const response = await postFamiliaService(
      newFamily,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getFamiliesList();
      resetNewFamily();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Familia creado correctamente",
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

  const handleUpdateFamily = async () => {
    if (newEditableFamily.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newEditableFamily.grupo_id.trim() === "") {
      return errorValidateForm("grupo");
    }
    setShowLoader(true);
    const response = await putFamiliaService(
      newEditableFamily,
      editableFamily._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getFamiliesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Marca actualizado correctamente",
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

  const handleDeleteFamily = async () => {
    setShowLoader(true);
    const response = await deleteFamiliaService(
      editableFamily._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getFamiliesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Familia eliminado correctamente",
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

  const resetNewFamily = () => {
    setNewFamily({
      ...newFamily,
      considerar_en_venta: false,
      cuenta_compra_debe: "6011",
      cuenta_venta_debe: "7011",
      cuenta_compra_haber: "4212",
      cuenta_venta_haber: "1212",
      cuenta_mercaderia: "6911",
      cuenta_prod_manufac: "2011",
      descripcion: "",
      empresa_id: getLocalStorageItem("empresa"),
      exonerado_igv: false,
      grupo_id: "",
    });
  };

  const handleResetNewEditableFamily = () => {
    setNewEditableFamily(editableFamily);
  };

  const funcion = (data: IFamily) => {
    setEditableFamily(data);
    setNewEditableFamily(data);
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
            <button className={styles.option} onClick={resetNewFamily}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateFamily}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableFamily}
            >
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteFamily}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateFamily}>
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
            <FamiliaDataTable
              grupos={groupsList}
              action={funcion}
              rows={100}
              columns={familiessList}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaFamiliaForm
              grupos={groupsList}
              new={newFamily}
              setNew={setNewFamily}
              closeAlertTimeOut={closeAlertTimeOut}
              getGroupsList={getGroupsList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableFamiliaForm
              grupos={groupsList}
              newEditable={newEditableFamily}
              setNewEditable={setNewEditableFamily}
              closeAlertTimeOut={closeAlertTimeOut}
              getGroupsList={getGroupsList}
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
          <span className={styles.title}>Nueva familia</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de familias
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva familia
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar familia
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
