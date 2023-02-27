import { clsx } from "@/lib/clsx";
import styles from "./NuevoCliente.module.scss";
import { MdClose } from "react-icons/md";
import {
  IClientProvider,
} from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { FaPlus } from "react-icons/fa";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { putClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import {
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { ECPF } from "../../mantenimiento/cliente-proveedor/EditableClienteProveedorForm";

export const EditCliente = ({
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
  getZonesList,
  clientProvider,
  setClienteProvider,
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
  getSectorsList: () => void;
  getZonesList: () => void;
  setClienteProvider: (state: IClientProvider) => void;
  clientProvider: IClientProvider;
}) => {
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
    if (clientProvider.tipo_cliente_proveedor_id.trim().length === 0) {
      return errorValidateForm("tipo proveedor");
    }
    if (clientProvider.dni_ruc.trim().length === 0) {
      return errorValidateForm("Dni / Ruc");
    }
    if (clientProvider.dni_ruc.length > 8) {
      if (clientProvider.nombre_comercial.trim().length === 0) {
        return errorValidateForm("nombre comercial");
      }
    }
    if (clientProvider.dni_ruc.length <= 8) {
      if (clientProvider.nombre_natural.trim().length === 0) {
        return errorValidateForm("nombre natural");
      }
      if (clientProvider.apellido_paterno_natural.trim().length === 0) {
        return errorValidateForm("apellido paterno natural");
      }
      if (clientProvider.apellido_materno_natural.trim().length === 0) {
        return errorValidateForm("apellido materno natural");
      }
      if (
        clientProvider.fecha_nacimiento_natural.trim().toString().length === 0
      ) {
        return errorValidateForm("fecha nacimiento natural");
      }
    }
    const data = {
      ...clientProvider,
      // # personaJuridica
      nombre_comercial:
        clientProvider.dni_ruc.length > 8
          ? clientProvider.nombre_comercial
          : "",
      // # personaNatura
      nombre_natural:
        clientProvider.dni_ruc.length <= 8 ? clientProvider.nombre_natural : "",
      apellido_paterno_natural:
        clientProvider.dni_ruc.length <= 8
          ? clientProvider.apellido_paterno_natural
          : "",
      apellido_materno_natural:
        clientProvider.dni_ruc.length <= 8
          ? clientProvider.apellido_materno_natural
          : "",
      fecha_nacimiento_natural:
        clientProvider.dni_ruc.length <= 8
          ? clientProvider.fecha_nacimiento_natural
          : "",
    };
    setShowLoader(true);
    const response = await putClienteProveedorService(
      data,
      clientProvider._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getProveedoresList();
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
          <span className={styles.title}>Editar Cliente/Proveedor</span>
          <button
            onClick={() => setShowNewClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateCompra}>
            <FaPlus /> Guardar
          </button>
        </div>
        <div className={styles.form}>
          <ECPF
            newClientProvider={clientProvider}
            setNewClientProvider={setClienteProvider}
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
