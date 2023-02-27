import { INewSector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevoSector.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { postSectorService } from "@/services/comercial/mantenimiento/empresa/sectorService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { INewZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { postZonasService } from "@/services/comercial/mantenimiento/empresa/zonaService";

interface INuevaZona {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getZonesList: () => void;
}

export const NuevaZona: FC<INuevaZona> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getZonesList,
}) => {
  const [newZone, setNewZone] = useState<INewZone>({
    zona: "",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewZone({
      ...newZone,
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

  const handleCreateSector = async () => {
    if (newZone.zona.trim() === "") {
      return errorValidateForm("zona");
    }
    if (newZone.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postZonasService(
      newZone,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getZonesList();
        setNewZone({
          descripcion: "",
          zona: "",
          empresa_id: getLocalStorageItem("empresa"),
        });
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La zona fue creada correctamente",
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
    <div className={clsx(styles.modal, !modal && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear zona</span>
          <button onClick={() => setModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateSector}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="zona">Código</label>
              <input autoComplete="off"
                id="zona"
                name="zona"
                type="text"
                onChange={handleInputChange}
                value={newZone.zona}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="descripcion">Descripción</label>
              <input autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                onChange={handleInputChange}
                value={newZone.descripcion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
