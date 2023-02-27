import { clsx } from "@/lib/clsx";
import { useState, FormEvent } from "react";
import styles from "./NuevaCaja.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { INewBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { postCajasService } from "@/services/comercial/mantenimiento/caja/cajaServices";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import { SelectUser } from "./SelectUser";
import { NuevaSucursal } from "./NuevaSucursal";

export const NuevaCaja = ({
  show,
  setShowNewClientModal,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setShowLoader,
  branchOfficesList,
  userList,
  getBranchOfficesList,
  getCajasList
}: {
  show: boolean;
  setShowNewClientModal: (data: boolean) => void;
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setShowLoader: (status: boolean) => void;
  branchOfficesList: IBranchOffice[];
  userList: IUser[];
  getBranchOfficesList: () => void
  getCajasList: () => void
}) => {
  const [modalSucursal, setModalSucursal] = useState(false);
  const [newBox, setNewBox] = useState<INewBox>({
    codigo_boleta_predeterminada: "",
    codigo_factura_predeterminada: "",
    descripcion: "",
    sucursal_id: "",
    ubicacion: "",
    usuario_id: "",
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

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewBox({
      ...newBox,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeSucursal = (value: string) => {
    setNewBox({
      ...newBox,
      sucursal_id: value,
    });
  };

  const handleChangeUser = (value: string) => {
    setNewBox({
      ...newBox,
      usuario_id: value,
    });
  };

  const handleCreateBox = async () => {
    if (newBox.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newBox.ubicacion.trim() === "") {
      return errorValidateForm("ubicacion");
    }
    if (newBox.sucursal_id.trim() === "") {
      return errorValidateForm("sucursal");
    }
    if (newBox.codigo_boleta_predeterminada.trim() === "") {
      return errorValidateForm("codigo de boleta");
    }
    if (newBox.codigo_factura_predeterminada.trim() === "") {
      return errorValidateForm("codigo de factura");
    }
    if (newBox.usuario_id.trim() === "") {
      return errorValidateForm("usuario encargado");
    }
    setShowLoader(true);
    const response = await postCajasService(newBox, getTokenFromLocalStorage());
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getCajasList()
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "La caja fue creada correctamente",
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
          <span className={styles.title}>Nueva Caja</span>
          <button
            onClick={() => setShowNewClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateBox}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div >
            <div>
              <label htmlFor="sucursal_id">Sucursal</label>
              <SelectDinamico
                setModal={setModalSucursal}
                value={newBox.sucursal_id}
                handleChange={handleChangeSucursal}
                dataList={branchOfficesList.map((item) => {
                  return {
                    id: item._id.$oid,
                    descripcion: item.descripcion,
                  };
                })}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="descripcion">Descripción</label>
              <input
                autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                onChange={handleInputChange}
                value={newBox.descripcion}
              />
            </div>{" "}
          </div>

          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="ubicacion">Ubicación</label>
              <input
                autoComplete="off"
                id="ubicacion"
                name="ubicacion"
                type="text"
                onChange={handleInputChange}
                value={newBox.ubicacion}
              />
            </div>
          </div>
          <div>
            <div>
              <label htmlFor="usuario_id">Usuario encargado</label>
              <SelectUser
                handleChange={handleChangeUser}
                value={newBox.usuario_id}
                dataList={userList.map((item) => {
                  return {
                    id: item._id.$oid,
                    descripcion: item.nombre_completo,
                  };
                })}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="codigo_boleta_predeterminada">
                Codigo Boleta
              </label>
              <input
                autoComplete="off"
                id="codigo_boleta_predeterminada"
                name="codigo_boleta_predeterminada"
                type="text"
                onChange={handleInputChange}
                value={newBox.codigo_boleta_predeterminada}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="codigo_factura_predeterminada">
                Codigo Factura
              </label>
              <input
                autoComplete="off"
                id="codigo_factura_predeterminada"
                name="codigo_factura_predeterminada"
                type="text"
                onChange={handleInputChange}
                value={newBox.codigo_factura_predeterminada}
              />
            </div>
          </div>
        </div>
        <NuevaSucursal
          closeAlertTimeOut={closeAlertTimeOut}
          getBranchOfficesList={getBranchOfficesList}
          modal={modalSucursal}
          setModal={setModalSucursal}
          setShowAlert={setShowAlert}
          setShowLoader={setShowLoader}
          showAlert={showAlert}
        />
      </div>
    </div>
  );
};
