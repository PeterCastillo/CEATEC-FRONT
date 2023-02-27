import { clsx } from "@/lib/clsx";
import { useState } from "react";
import styles from "./NuevoCliente.module.scss";
import { MdClose } from "react-icons/md";
import { NCPF } from "../../mantenimiento/cliente-proveedor/NuevoClienteProveedorForm";
import { INewClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { FaPlus } from "react-icons/fa";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { postClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import { getLocalStorageItem, getTokenFromLocalStorage } from "@/utils/localStorageControl";

export const NuevoCliente = ({
  show,
  setShowNewClientModal,
  sectorsList,
  typeClientProvidersList,
  zonesList,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setShowLoader,
  getProveedoresList,
  getSectorsList,
  getZonesList

}: {
  show: boolean;
  setShowNewClientModal: (data: boolean) => void;
  sectorsList: ISector[];
  typeClientProvidersList: ITipoClienteProveedor[];
  zonesList: IZone[];
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setShowLoader: (status: boolean) => void;
  getProveedoresList: () => void;
  getSectorsList: () => void
  getZonesList: () => void
}) => {
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

  const errorValidateForm = (field: string) => {
    setShowAlert({
      ...showAlert,
      icon: "warning",
      title: "Campos incompletos",
      message: "Se necesita seleccionar " + field,
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleCreateCompra = async () => {
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
        getProveedoresList();
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

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear Cliente/Proveedor</span>
          <button
            onClick={() => setShowNewClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateCompra}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <NCPF
            newClientProvider={newClientProvider}
            setNewClientProvider={setNewClientProvider}
            sectorsList={sectorsList}
            typeClientProvidersList={typeClientProvidersList}
            zonesList={zonesList}
            errorValidateForm={errorValidateForm}
            closeAlertTimeOut={closeAlertTimeOut}
            getSectorsList={getSectorsList}
            setShowAlert={setShowAlert}
            setShowLoader={setShowLoader}
            showAlert={showAlert}
            getZonesList={getZonesList}
          />
        </div>
      </div>
    </div>
  );
};
