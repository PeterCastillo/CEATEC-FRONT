import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { IClientProvider, INewClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { NCPF } from "./NuevoClienteProveedorForm";
import { FC } from "react";
import { ECPF } from "./EditableClienteProveedorForm";
import { IAlert } from "@/interfaces/componentsInterfaces";

interface IEditableClienteProveedorForm {
  newClientProvider: IClientProvider;
  setNewClientProvider: (data: IClientProvider) => void;
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
export const EditableClienteProveedorForm: FC<IEditableClienteProveedorForm> = ({
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
  showAlert,
  getZonesList
}) => {
  return (
    <ECPF
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
