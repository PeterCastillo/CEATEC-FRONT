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
import { getListaMonedasService } from "@/services/comercial/extras/monedaServices";
import {
  deleteBancoService,
  getListaBancoService,
  postBancoService,
  putBancoService,
} from "@/services/comercial/mantenimiento/ventas/bancoServices";
import {
  IBanco,
  INewBanco,
} from "@/interfaces/comercial/mantenimiento/ventas/bancosInterface";
import { BancoDataTable } from "@/components/comercial/mantenimiento/ventas/bancos/BancoDataTable";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { NuevoBancoForm } from "@/components/comercial/mantenimiento/ventas/bancos/NuevoBancoForm";
import { EditableBancoForm } from "../../../../components/comercial/mantenimiento/ventas/bancos/EditableBancoForm";

export default function Home() {
  const [step, setStep] = useState(1);
  const [showLoader, setShowLoader] = useState(true);
  const [bancosList, setBancosList] = useState<IBanco[]>([]);
  const [monedas, setMonedas] = useState<IMoneda[]>([]);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });
  const [editableBanco, setEditableBanco] = useState<IBanco>({
    _id: {
      $oid: "",
    },
    nombre: "",
    cuenta_bancaria: "",
    cuenta_contable: "",
    moneda_id: "",
    estado: false,
    empresa_id: "",
  });
  const [newEditableBanco, setNewEditableBanco] =
    useState<IBanco>(editableBanco);

  const [newBanco, setNewBanco] = useState<INewBanco>({
    nombre: "",
    cuenta_bancaria: "",
    cuenta_contable: "",
    moneda_id: "",
    empresa_id: getLocalStorageItem("empresa"),
  });

  useEffect(() => {
    getBancosList();
    getMonedasList();
  }, []);

  useEffect(() => {
    setNewEditableBanco(editableBanco);
  }, [editableBanco]);

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

  const getMonedasList = async () => {
    setShowLoader(true);
    const monedas = await getListaMonedasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (monedas) {
      if (monedas.status === 200) {
        setMonedas(monedas.json.data);
      }
    }
  };

  const getBancosList = async () => {
    setShowLoader(true);
    const cajas = await getListaBancoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (cajas) {
      if (cajas.status === 200) {
        setBancosList(cajas.json.data);
      }
    }
  };

  const funcion = (data: IBanco) => {
    setEditableBanco(data);
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

  const resetNewBanco = () => {
    setNewBanco({
      ...newBanco,
      cuenta_bancaria: "",
      cuenta_contable: "",
      moneda_id: "",
      nombre: "",
    });
  };

  const handleCreateBanco = async () => {
    if (newBanco.nombre.trim() === "") {
      return errorValidateForm("nombre");
    }
    if (newBanco.cuenta_bancaria.trim() === "") {
      return errorValidateForm("cuenta bancaria");
    }
    if (newBanco.cuenta_contable.trim() === "") {
      return errorValidateForm("cuenta contable");
    }
    if (newBanco.moneda_id.trim() === "") {
      return errorValidateForm("moneda");
    }
    setShowLoader(true);
    const response = await postBancoService(
      newBanco,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getBancosList();
      resetNewBanco();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Banco creado correctamente",
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

  const handleUpdateBanco = async () => {
    if (newEditableBanco.nombre.trim() === "") {
      return errorValidateForm("nombre");
    }
    if (newEditableBanco.cuenta_bancaria.trim() === "") {
      return errorValidateForm("cuenta bancaria");
    }
    if (newEditableBanco.cuenta_contable.trim() === "") {
      return errorValidateForm("cuenta contable");
    }
    if (newEditableBanco.moneda_id.trim() === "") {
      return errorValidateForm("moneda");
    }
    setShowLoader(true);
    const response = await putBancoService(
      newEditableBanco,
      editableBanco._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getBancosList();
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Banco actualizado correctamente",
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

  const handleDeleteBanco = async () => {
    setShowLoader(true);
    const response = await deleteBancoService(
      editableBanco._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getBancosList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Banco eliminado correctamente",
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

  const resetNewEditableBanco = () => {
    setNewEditableBanco({
      ...newEditableBanco,
      ...editableBanco,
    });
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewBanco}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateBanco}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button className={styles.option} onClick={resetNewEditableBanco}>
              DESHACER
            </button>
            <button className={styles.delete} onClick={handleDeleteBanco}>
              <FaTrash /> ELIMINAR
            </button>
            <button className={styles.create} onClick={handleUpdateBanco}>
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
            <BancoDataTable
              action={funcion}
              rows={100}
              columns={bancosList}
              monedas={monedas}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NuevoBancoForm
              newBanco={newBanco}
              setNewBanco={setNewBanco}
              monedas={monedas}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableBancoForm
              newEditableBanco={newEditableBanco}
              setNewEditableBanco={setNewEditableBanco}
              monedas={monedas}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Banco</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de bancos
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo banco
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar banco
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
