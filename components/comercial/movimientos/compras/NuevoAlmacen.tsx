import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevoAlmacen.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { INewWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { postAlmacenesService } from "@/services/comercial/mantenimiento/empresa/almacenService";
import { NuevaSucursal } from "./NuevaSucursal";
import { SelectDinamico } from "@/components/commons/select/Select";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";

interface INuevoAlmacen {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getWareHousesList: () => void;
  getBranchOfficesList: () => void;
  sucursales: IBranchOffice[]
}

export const NuevoAlmacen: FC<INuevoAlmacen> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getWareHousesList,
  getBranchOfficesList,
  sucursales
}) => {
  const [modalSucursal, setModalSucursal] = useState(false);
  const [newWareHouse, setNewWareHouse] = useState<INewWareHouse>({
    empresa_id: getLocalStorageItem("empresa"),
    descripcion: "",
    sucursal_id: "",
    ubicacion: "",
  });

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewWareHouse({
      ...newWareHouse,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeSucursal = (value: string) => {
    setNewWareHouse({
      ...newWareHouse,
      sucursal_id: value
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

  const handleCreateWareHouse = async () => {
    if (newWareHouse.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newWareHouse.sucursal_id.trim() === "") {
      return errorValidateForm("sucursal");
    }
    if (newWareHouse.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    setShowLoader(true);
    const response = await postAlmacenesService(
      newWareHouse,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getWareHousesList();
        setNewWareHouse({
          empresa_id: getLocalStorageItem("empresa"),
          descripcion: "",
          sucursal_id: "",
          ubicacion: "",
        });
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "El almacen fue creado correctamente",
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
          <span className={styles.title}>Crear Almacen</span>
          <button onClick={() => setModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateWareHouse}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.f_g}>
              <label htmlFor="descripcion">Descripcion</label>
              <input autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                value={newWareHouse.descripcion}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.f_g}>
              <label htmlFor="ubicacion">Ubicacion</label>
              <input autoComplete="off"
                id="ubicacion"
                name="ubicacion"
                type="text"
                value={newWareHouse.ubicacion}
                onChange={handleInputChange}
              />
            </div>
            <div className={styles.f_g}>
              <label htmlFor="sucursal_id">Sucursal</label>
              <SelectDinamico
                handleChange={handleChangeSucursal}
                setModal={setModalSucursal}
                value={newWareHouse.sucursal_id}
                dataList={sucursales.map((item) => {
                  return { id: item._id.$oid, descripcion: item.descripcion };
                })}
              />
            </div>
          </div>
        </div>
        <NuevaSucursal
          modal={modalSucursal}
          setModal={setModalSucursal}
          setShowAlert={setShowAlert}
          setShowLoader={setShowLoader}
          showAlert={showAlert}
          closeAlertTimeOut={closeAlertTimeOut}
          getBranchOfficesList={getBranchOfficesList}
        />
      </div>
    </div>
  );
};
