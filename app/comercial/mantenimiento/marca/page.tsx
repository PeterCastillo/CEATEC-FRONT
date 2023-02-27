"use client";

import { EditableMarcaForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/marca/EditableMarcaForm";
import { MarcaDataTable } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/marca/MarcaDataTable";
import { NuevaMarcaForm } from "@/components/comercial/mantenimiento/grupo-familia-marca-unidad/marca/NuevaMarcaForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  IBrand,
  INewBrand,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  deleteMarcaService,
  getListaMarcaService,
  postMarcaService,
  putMarcaService,
} from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/marcaServices";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableBrand, setEditableBrand] = useState<IBrand>({
    _id: {
      $oid: "",
    },
    empresa_id: "",
    estado: false,
    descripcion: "",
  });
  const [newBrand, setNewBrand] = useState<INewBrand>({
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });
  const [newEditableBrand, setNewEditableBrand] = useState<IBrand>({
    _id: {
      $oid: "",
    },
    empresa_id: "",
    estado: false,
    descripcion: "",
  });

  const [brandsList, setBrandsList] = useState<IBrand[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getBrandsList = async () => {
    setShowLoader(true);
    const brands = await getListaMarcaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (brands) {
      if (brands.status === 200) {
        setBrandsList(brands.json.data);
      }
    }
  };

  useEffect(() => {
    getBrandsList();
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
    if (newBrand.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postMarcaService(
      newBrand,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getBrandsList();
      resetNewMarca();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Marca creado correctamente",
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
    if (newEditableBrand.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putMarcaService(
      newEditableBrand,
      editableBrand._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(true);
    if (response) {
      if (response.status === 201) {
        getBrandsList();
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

  const handleDeleteMarca = async () => {
    setShowLoader(true);
    const response = await deleteMarcaService(
      editableBrand._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getBrandsList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Marca eliminado correctamente",
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
    setNewBrand({
      ...newBrand,
      descripcion: "",
    });
  };

  const handleResetNewEditableMarca = () => {
    setNewEditableBrand(editableBrand);
  };

  const funcion = (data: IBrand) => {
    setEditableBrand(data);
    setNewEditableBrand(data);
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
            <MarcaDataTable action={funcion} rows={100} columns={brandsList} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevaMarcaForm new={newBrand} setNew={setNewBrand} />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableMarcaForm
              newEditable={newEditableBrand}
              setNewEditable={setNewEditableBrand}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva marca</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de marcas
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva marca
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar marca
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
