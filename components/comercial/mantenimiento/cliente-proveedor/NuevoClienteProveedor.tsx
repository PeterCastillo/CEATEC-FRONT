import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { INewClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { NCPF } from "./NuevoClienteProveedorForm";
import { FC } from "react";
import { IAlert } from "@/interfaces/componentsInterfaces";

interface INuevoClienteProveedorForm {
  newClientProvider: INewClientProvider;
  setNewClientProvider: (data: INewClientProvider) => void;
  typeClientProvidersList: ITipoClienteProveedor[];
  sectorsList: ISector[];
  zonesList: IZone[];
  errorValidateForm: (text: string) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getSectorsList: () => void
  getZonesList: () => void
}
export const NuevoClienteProveedorForm: FC<INuevoClienteProveedorForm> = ({
  newClientProvider,
  setNewClientProvider,
  sectorsList,
  typeClientProvidersList,
  zonesList,
  errorValidateForm,
  closeAlertTimeOut,
  getSectorsList,
  setShowAlert,
  setShowLoader,
  getZonesList,
  showAlert
}) => {
  return (
    <NCPF
      newClientProvider={newClientProvider}
      setNewClientProvider={setNewClientProvider}
      sectorsList={sectorsList}
      typeClientProvidersList={typeClientProvidersList}
      zonesList={zonesList}
      errorValidateForm={errorValidateForm}
      getSectorsList={getSectorsList}
      setShowAlert={setShowAlert}
      showAlert={showAlert}
      setShowLoader={setShowLoader}
      closeAlertTimeOut={closeAlertTimeOut}
      getZonesList={getZonesList}
    />
  );
};
