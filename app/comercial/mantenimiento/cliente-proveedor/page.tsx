"use client";

import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  IClientProvider,
  INewClientProvider,
} from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { getListaTipoClienteProveedoreService } from "@/services/comercial/mantenimiento/tipo-cliente-proveedor/tipoClienteProveedorService";
import { getListaSectoresService } from "@/services/comercial/mantenimiento/empresa/sectorService";
import { getListaZonasService } from "@/services/comercial/mantenimiento/empresa/zonaService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  deleteClienteProveedorService,
  getListaClienteProveedorService,
  postClienteProveedorService,
  putClienteProveedorService,
} from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { ClienteProveedorDataTable } from "@/components/comercial/mantenimiento/cliente-proveedor/ClienteProveedorDataTable";
import { Loader } from "@/components/commons/loader/Loader";
import { Alert } from "@/components/commons/alert/Alert";
import { NuevoClienteProveedorForm } from "@/components/comercial/mantenimiento/cliente-proveedor/NuevoClienteProveedor";
import { EditableClienteProveedorForm } from "@/components/comercial/mantenimiento/cliente-proveedor/EditableClienteProveedor";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableClientProvider, setEditableClientProvider] =
    useState<IClientProvider>({
      _id: {
        $oid: "",
      },
      estado: false,
      tipo_cliente_proveedor_id: "",
      clasificacion: "",
      dni_ruc: "",
      nombre_comercial: "",
      nombre_natural: "",
      apellido_paterno_natural: "",
      apellido_materno_natural: "",
      fecha_nacimiento_natural: "",
      codigo_ubigeo: "",
      sector_id: "",
      zona_id: "",
      direccion: "",
      email: "",
      telefono1: "",
      telefono2: "",
      nombre_contacto_otro: "",
      telefono_contacto_otro: "",
      descripcion_contacto_otro: "",
      precio_credito: null,
      empresa_id: "",
    });
  const [newClientProvider, setNewClientProvider] =
    useState<INewClientProvider>({
      tipo_cliente_proveedor_id: "",
      clasificacion: "",
      dni_ruc: "",
      nombre_comercial: "",
      nombre_natural: "",
      apellido_paterno_natural: "",
      apellido_materno_natural: "",
      fecha_nacimiento_natural: "",
      codigo_ubigeo: "",
      sector_id: "",
      zona_id: "",
      direccion: "",
      email: "",
      telefono1: "",
      telefono2: "",
      nombre_contacto_otro: "",
      telefono_contacto_otro: "",
      descripcion_contacto_otro: "",
      precio_credito: null,
      empresa_id: getLocalStorageItem("empresa"),
    });
  const [newEditableClientProvider, setNewEditableClientProvider] =
    useState<IClientProvider>({
      _id: {
        $oid: "",
      },
      estado: false,
      tipo_cliente_proveedor_id: "",
      clasificacion: "",
      dni_ruc: "",
      nombre_comercial: "",
      nombre_natural: "",
      apellido_paterno_natural: "",
      apellido_materno_natural: "",
      fecha_nacimiento_natural: "",
      codigo_ubigeo: "",
      sector_id: "",
      zona_id: "",
      direccion: "",
      email: "",
      telefono1: "",
      telefono2: "",
      nombre_contacto_otro: "",
      telefono_contacto_otro: "",
      descripcion_contacto_otro: "",
      precio_credito: null,
      empresa_id: "",
    });

  const [clientProvidersList, setClientProvidersList] = useState<
    IClientProvider[]
  >([]);
  const [typeClientProvidersList, setTypeClientProvidersList] = useState<
    ITipoClienteProveedor[]
  >([]);
  const [sectoresList, setSectoresList] = useState<ISector[]>([]);
  const [zonasList, setZonasList] = useState<IZone[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getClientProvidersList = async () => {
    setShowLoader(true);
    const response = await getListaClienteProveedorService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      setClientProvidersList(response.json.data);
    }
    setShowLoader(false);
  };
  const getSectorsList = async () => {
    setShowLoader(true);
    const sectors = await getListaSectoresService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (sectors) {
      if (sectors.status === 200) {
        setSectoresList(sectors.json.data);
      }
    }
  };
  const getZonesList = async () => {
    setShowLoader(true);
    const zones = await getListaZonasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (zones) {
      if (zones.status === 200) {
        setZonasList(zones.json.data);
      }
    }
  };
  const getTypeClientProvidersList = async () => {
    setShowLoader(true);
    const typeClientProviders = await getListaTipoClienteProveedoreService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (typeClientProviders) {
      if (typeClientProviders.status === 200) {
        setTypeClientProvidersList(typeClientProviders.json.data);
      }
    }
  };

  useEffect(() => {
    getSectorsList();
    getZonesList();
    getTypeClientProvidersList();
    getClientProvidersList();
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

  const handleCreateClientProvider = async () => {
    if (newClientProvider.tipo_cliente_proveedor_id.trim().length === 0) {
      return errorValidateForm("tipo proveedor");
    }
    if (newClientProvider.dni_ruc.trim().length === 0) {
      return errorValidateForm("Dni / Ruc");
    }
    if (newClientProvider.dni_ruc.length > 8) {
      if (newClientProvider.nombre_comercial.trim().length === 0) {
        return errorValidateForm("nombre comercial");
      }
    }
    if (newClientProvider.dni_ruc.length <= 8) {
      if (newClientProvider.nombre_natural.trim().length === 0) {
        return errorValidateForm("nombre natural");
      }
      if (newClientProvider.apellido_paterno_natural.trim().length === 0) {
        return errorValidateForm("apellido paterno natural");
      }
      if (newClientProvider.apellido_materno_natural.trim().length === 0) {
        return errorValidateForm("apellido materno natural");
      }
      if (
        newClientProvider.fecha_nacimiento_natural.trim().toString().length ===
        0
      ) {
        return errorValidateForm("fecha nacimiento natural");
      }
    }
    const data = {
      ...newClientProvider,
      // # personaJuridica
      nombre_comercial:
        newClientProvider.dni_ruc.length > 8
          ? newClientProvider.nombre_comercial
          : "",
      // # personaNatura
      nombre_natural:
        newClientProvider.dni_ruc.length <= 8
          ? newClientProvider.nombre_natural
          : "",
      apellido_paterno_natural:
        newClientProvider.dni_ruc.length <= 8
          ? newClientProvider.apellido_paterno_natural
          : "",
      apellido_materno_natural:
        newClientProvider.dni_ruc.length <= 8
          ? newClientProvider.apellido_materno_natural
          : "",
      fecha_nacimiento_natural:
        newClientProvider.dni_ruc.length <= 8
          ? newClientProvider.fecha_nacimiento_natural
          : "",
    };
    setShowLoader(true);
    const response = await postClienteProveedorService(
      data,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getClientProvidersList();
        resetNewProveedor();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El cliente/proveedor fue creado correctamente",
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

  const handleUpdateClientProvider = async () => {
    if (newEditableClientProvider.tipo_cliente_proveedor_id.trim().length === 0) {
      return errorValidateForm("tipo proveedor");
    }

    if (newEditableClientProvider.dni_ruc.trim().length === 0) {
      return errorValidateForm("Dni / Ruc");
    }
    if (newEditableClientProvider.dni_ruc.length > 8) {
      if (newEditableClientProvider.nombre_comercial.trim().length === 0) {
        return errorValidateForm("nombre comercial");
      }
    }
    if (newEditableClientProvider.dni_ruc.length <= 8) {
      if (newEditableClientProvider.nombre_natural.trim().length === 0) {
        return errorValidateForm("nombre natural");
      }
      if (newEditableClientProvider.apellido_paterno_natural.trim().length === 0) {
        return errorValidateForm("apellido paterno natural");
      }
      if (newEditableClientProvider.apellido_materno_natural.trim().length === 0) {
        return errorValidateForm("apellido materno natural");
      }
      if (
        newEditableClientProvider.fecha_nacimiento_natural.trim().toString().length ===
        0
      ) {
        return errorValidateForm("fecha nacimiento natural");
      }
    }
    const data = {
      ...newEditableClientProvider,
      // # personaJuridica
      nombre_comercial:
        newEditableClientProvider.dni_ruc.length > 8
          ? newEditableClientProvider.nombre_comercial
          : "",
      // # personaNatura
      nombre_natural:
        newEditableClientProvider.dni_ruc.length <= 8
          ? newEditableClientProvider.nombre_natural
          : "",
      apellido_paterno_natural:
        newEditableClientProvider.dni_ruc.length <= 8
          ? newEditableClientProvider.apellido_paterno_natural
          : "",
      apellido_materno_natural:
        newEditableClientProvider.dni_ruc.length <= 8
          ? newEditableClientProvider.apellido_materno_natural
          : "",
      fecha_nacimiento_natural:
        newEditableClientProvider.dni_ruc.length <= 8
          ? newEditableClientProvider.fecha_nacimiento_natural
          : "",
    };
    setShowLoader(true);
    const response = await putClienteProveedorService(
      data,
      editableClientProvider._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getClientProvidersList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El cliente/proveedor fue actualizado correctamente",
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

  const handleDeleteClientProvider = async () => {
    setShowLoader(true);
    const response = await deleteClienteProveedorService(
      editableClientProvider._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 200) {
        getClientProvidersList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El cliente/proveedor fue eliminada correctamente",
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

  const resetNewProveedor = () => {
    setNewClientProvider({
      tipo_cliente_proveedor_id: "",
      clasificacion: "",
      dni_ruc: "",
      nombre_comercial: "",
      nombre_natural: "",
      apellido_paterno_natural: "",
      apellido_materno_natural: "",
      fecha_nacimiento_natural: "",
      codigo_ubigeo: "",
      sector_id: "",
      zona_id: "",
      direccion: "",
      email: "",
      telefono1: "",
      telefono2: "",
      nombre_contacto_otro: "",
      telefono_contacto_otro: "",
      descripcion_contacto_otro: "",
      precio_credito: null,
      empresa_id: getLocalStorageItem("empresa"),
    });
  };

  const handleResetNewEditableProveedor = () => {
    setNewEditableClientProvider(editableClientProvider);
  };

  const funcion = (data: IClientProvider) => {
    setEditableClientProvider(data);
    setNewEditableClientProvider(data);
    setStep(3);
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };
  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <ClienteProveedorDataTable
              action={funcion}
              columns={clientProvidersList}
              rows={100}
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.form}>
            <NuevoClienteProveedorForm
              errorValidateForm={errorValidateForm}
              newClientProvider={newClientProvider}
              setNewClientProvider={setNewClientProvider}
              sectorsList={sectoresList}
              typeClientProvidersList={typeClientProvidersList}
              zonesList={zonasList}
              closeAlertTimeOut={closeAlertTimeOut}
              getSectorsList={getSectorsList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
              getZonesList={getZonesList}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableClienteProveedorForm
              errorValidateForm={errorValidateForm}
              newClientProvider={newEditableClientProvider}
              setNewClientProvider={setNewEditableClientProvider}
              sectorsList={sectoresList}
              typeClientProvidersList={typeClientProvidersList}
              zonesList={zonasList}
              closeAlertTimeOut={closeAlertTimeOut}
              getSectorsList={getSectorsList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
              getZonesList={getZonesList}
            />
          </div>
        );
    }
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewProveedor}>
              LIMPIAR
            </button>
            <button
              className={styles.create}
              onClick={handleCreateClientProvider}
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
              onClick={handleResetNewEditableProveedor}
            >
              DESHACER
            </button>
            <button
              className={styles.delete}
              onClick={handleDeleteClientProvider}
            >
              <FaTrash /> ELIMINAR
            </button>
            <button
              className={styles.create}
              onClick={handleUpdateClientProvider}
            >
              <FaPlus /> GUARDAR
            </button>
          </>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Cliente/Proveedor</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de Clientes/Proveedors
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo Cliente/Proveedor
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar Cliente/Proveedor
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
