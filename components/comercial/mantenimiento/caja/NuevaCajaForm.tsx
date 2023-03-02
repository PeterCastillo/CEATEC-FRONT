import { FormEvent, FC } from "react";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { clsx } from "@/lib/clsx";
import styles from "@/styles/Form.module.scss";
import { INewBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import { SelectDinamico } from "@/components/commons/select/Select";
import { useState } from "react";
import { NuevaSucursal } from "./NuevaSucursal";
import { IAlert } from "@/interfaces/componentsInterfaces";

interface INuevaCajaForm {
  branchOfficesList: IBranchOffice[];
  usersList: IUser[];
  getBoxesList: (data: string) => void;
  setNewBox: (data: INewBox) => void;
  newBox: INewBox;
  getBranchOfficesList:() => void
  showAlert: IAlert
  closeAlertTimeOut: () => void
  setShowLoader: (state:boolean) => void
  setShowAlert: (state:IAlert) => void
}

export const NuevaCajaForm: FC<INuevaCajaForm> = ({
  branchOfficesList,
  usersList,
  setNewBox,
  newBox,
  getBranchOfficesList,
  closeAlertTimeOut,
  setShowAlert,
  setShowLoader,
  showAlert,
  getBoxesList
}) => {
  const [modalSucursal, setModalSucursal] = useState(false);
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewBox({
      ...newBox,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setNewBox({
      ...newBox,
      [name]: value,
    });
  };

  const handleSucursalChange = (value: string) => {
    setNewBox({
      ...newBox,
      sucursal_id: value,
    });
  };

  const handleCreateSetSucursal = (sucursal:IBranchOffice) => {
    setModalSucursal(false)
    setNewBox({
      ...newBox,
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
            value={newBox.sucursal_id}
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
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="usuario_id">Usuario encargado</label>
          <select
            name="usuario_id"
            id="usuario_id"
            onChange={handleSelectChange}
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
          <label htmlFor="codigo_factura_predeterminada">Codigo Factura</label>
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
