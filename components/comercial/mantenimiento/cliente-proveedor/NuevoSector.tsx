import { INewSector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevoSector.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { postSectorService } from "@/services/comercial/mantenimiento/empresa/sectorService";
import { getLocalStorageItem, getTokenFromLocalStorage } from "@/utils/localStorageControl";

interface INuevaSector {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getSectorsList: () => void
}

export const NuevoSector: FC<INuevaSector> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getSectorsList
}) => {
  const [newSector, setNewSector] = useState<INewSector>({
    sector: "",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewSector({
      ...newSector,
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
    if (newSector.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newSector.sector.trim() === "") {
      return errorValidateForm("sector");
    }
    setShowLoader(true);
    const response = await postSectorService(
      newSector,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getSectorsList();
        setNewSector({
            descripcion: "",
            sector: "",
            empresa_id: getLocalStorageItem("empresa"),
        })
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El sector fue creado correctamente",
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
          <span className={styles.title}>Crear Sector</span>
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
            <div className={styles.f_g}>
              <label htmlFor="sector">Código</label>
              <input autoComplete="off"
                id="sector"
                name="sector"
                type="text"
                onChange={handleInputChange}
                value={newSector.sector}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.f_g}>
              <label htmlFor="descripcion">Descripción</label>
              <input autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                onChange={handleInputChange}
                value={newSector.descripcion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
