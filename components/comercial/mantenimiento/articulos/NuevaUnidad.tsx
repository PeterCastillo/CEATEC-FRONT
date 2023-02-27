import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevaUnidad.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { INewUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { postUnidadService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/unidadServices";

interface INuevaUnidad {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getUnitsList: () => void;
}

export const NuevaUnidad: FC<INuevaUnidad> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getUnitsList,
}) => {
  const [newUnidad, setNewUnidad] = useState<INewUnit>({
    abreviatura: "",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
    valor: "",
  });
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewUnidad({
      ...newUnidad,
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

  const handleCreateUnidad = async () => {
    if (newUnidad.abreviatura.trim() === "") {
      return errorValidateForm("abreviatura");
    }
    if (newUnidad.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newUnidad.valor.toString().trim() === "") {
      return errorValidateForm("valor");
    }
    const data = {
      ...newUnidad,
      valor: Number(newUnidad.valor.toString()),
    };
    setShowLoader(true);
    const response = await postUnidadService(
        data,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getUnitsList();
      setNewUnidad({
        abreviatura: "",
        descripcion: "",
        empresa_id: getLocalStorageItem("empresa"),
        valor: "",
      });;
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Unidad creado correctamente",
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

  return (
    <div className={clsx(styles.modal, !modal && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear Unidad</span>
          <button onClick={() => setModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateUnidad}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="descripcion">Descripción</label>
              <input autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                onChange={handleInputChange}
                value={newUnidad.descripcion}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="abreviatura">Abreviatura</label>
              <input autoComplete="off"
                id="abreviatura"
                name="abreviatura"
                type="text"
                onChange={handleInputChange}
                value={newUnidad.abreviatura}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="valor">Valor</label>
              <input autoComplete="off"
                id="valor"
                name="valor"
                type="text"
                onChange={handleInputChange}
                value={newUnidad.valor}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
