import { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import { SelectDinamico } from "@/components/commons/select/Select";
import { useState } from "react"
import { NuevaSucursal } from "./NuevaSucursal";
import { IAlert } from "@/interfaces/componentsInterfaces";

interface IEditableCajaForm {
  newEditableBox: IBox;
  setNewEditableBox: (data: IBox) => void;
  usersList: IUser[];
  branchOfficesList: IBranchOffice[];
  getBranchOfficesList:() => void
  showAlert: IAlert
  closeAlertTimeOut: () => void
  setShowLoader: (state:boolean) => void
  setShowAlert: (state:IAlert) => void
}

export const EditableCajaForm: FC<IEditableCajaForm> = ({
  newEditableBox,
  setNewEditableBox,
  usersList,
  branchOfficesList,
  getBranchOfficesList,
  closeAlertTimeOut,
  setShowAlert,
  setShowLoader,
  showAlert,
}) => {
  const [modalSucursal, setModalSucursal] = useState(false);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditableBox({
      ...newEditableBox,
      [name]: value.toUpperCase(),
    });
  };

  const handleSucursalChange = (value: string) => {
    setNewEditableBox({
      ...newEditableBox,
      sucursal_id: value,
    });
  };

  const handleCreateSetSucursal = (sucursal:IBranchOffice) => {
    setModalSucursal(false)
    setNewEditableBox({
      ...newEditableBox,
      sucursal_id: sucursal._id.$oid
    })
  }

  return (
    <>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="sucursal_id">Sucursal</label>
          <SelectDinamico
            dataList={branchOfficesList.map((item) => {
              return {
                id: item._id.$oid,
                descripcion: item.descripcion,
              };
            })}
            handleChange={handleSucursalChange}
            setModal={setModalSucursal}
            value={newEditableBox.sucursal_id}
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
            value={newEditableBox.descripcion}
          />
        </div>{" "}
      </div>

      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="ubicacion">Ubicación</label>
          <input autoComplete="off"
            id="ubicacion"
            name="ubicacion"
            type="text"
            onChange={handleInputChange}
            value={newEditableBox.ubicacion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="usuario_id">Usuario encargado</label>
          <select
            name="usuario_id"
            id="usuario_id"
            onChange={handleInputChange}
          >
            <option hidden value={""}>
              Seleccionar usuario
            </option>
            {usersList &&
              usersList.map((user) => (
                <option value={user._id.$oid} key={user._id.$oid}>
                  {user.nombre_completo}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="codigo_boleta_predeterminada">Codigo Boleta</label>
          <input autoComplete="off"
            id="codigo_boleta_predeterminada"
            name="codigo_boleta_predeterminada"
            type="text"
            onChange={handleInputChange}
            value={newEditableBox.codigo_boleta_predeterminada}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="codigo_factura_predeterminada">Codigo Factura</label>
          <input autoComplete="off"
            id="codigo_factura_predeterminada"
            name="codigo_factura_predeterminada"
            type="text"
            onChange={handleInputChange}
            value={newEditableBox.codigo_factura_predeterminada}
          />
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
          handleCreateSetSucursal={handleCreateSetSucursal}
        />
    </>
  );
};
