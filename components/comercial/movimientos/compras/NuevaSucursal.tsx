import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevaSucursal.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { IBranchOffice, INewBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { postSucursalService } from "@/services/comercial/mantenimiento/empresa/sucursalService";

interface INuevaSucursal {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getBranchOfficesList: (handleCreateSetSucursal?: ()=> void) => void;
  handleCreateSetSucursal: (sucursal:IBranchOffice) => void
}

export const NuevaSucursal: FC<INuevaSucursal> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getBranchOfficesList,
  handleCreateSetSucursal
}) => {
  const [newBranchOffice, setNewBranchOffice] = useState<INewBranchOffice>({
    descripcion: "",
    ubicacion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewBranchOffice({
      ...newBranchOffice,
      [name]: value.toUpperCase(),
    });
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

  const handleCreateBranchOffice = async () => {
    if (newBranchOffice.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newBranchOffice.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    if (newBranchOffice.empresa_id.trim() === "") {
      return errorValidateForm("empresa");
    }
    setShowLoader(true)
    const response = await postSucursalService(
      newBranchOffice,
      getTokenFromLocalStorage()
    );
    setShowLoader(false)
    if (response) {
      if (response.status === 201) {
        getBranchOfficesList(()=>handleCreateSetSucursal(response.json.data));
        setNewBranchOffice({
            descripcion: "",
            ubicacion: "",
            empresa_id: getLocalStorageItem("empresa"),
          });;
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La sucursal fue creada correctamente",
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente mas tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };


  return (
    <div className={clsx(styles.modal, !modal && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear Sucursal</span>
          <button onClick={() => setModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateBranchOffice}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="descripcion">Descripcion</label>
              <input autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                onChange={handleInputChange}
                value={newBranchOffice.descripcion}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="ubicacion">Ubicación</label>
              <input autoComplete="off"
                id="ubicacion"
                name="ubicacion"
                type="text"
                onChange={handleInputChange}
                value={newBranchOffice.ubicacion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
