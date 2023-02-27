import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevoGrupo.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { INewBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { postMarcaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/marcaServices";

interface INuevaMarca {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getBrandsList: () => void
}

export const NuevaMarca: FC<INuevaMarca> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getBrandsList
}) => {
  const [newBrand, setNewBrand] = useState<INewBrand>({
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
  });

  const handleInputChange = (
    event: FormEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewBrand({
      ...newBrand,
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

  const handleCreateMarca = async () => {
    if (newBrand.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postMarcaService(
      newBrand,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      getBrandsList();
      setNewBrand({
        descripcion: "",
        empresa_id: getLocalStorageItem("empresa"),
      });;
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Marca creado correctamente",
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
          <span className={styles.title}>Crear Marca</span>
          <button onClick={() => setModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateMarca}>
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
                value={newBrand.descripcion}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
