"use client";

import { FormEvent, FC, useState } from "react";
import styles from "@/styles/Form.module.scss";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { NuevaSucursal } from "./NuevaSucursal";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";

interface IEditableAlmacenForm {
  newEditable: IWareHouse;
  setNewEditable: (data: IWareHouse) => void;
  sucursales: IBranchOffice[];
  setShowAlert: (state: IAlert) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  closeAlertTimeOut: () => void;
  getBranchOfficesList: () => void;
}

export const EditableAlmacenForm: FC<IEditableAlmacenForm> = ({
  newEditable,
  setNewEditable,
  sucursales,
  closeAlertTimeOut,
  getBranchOfficesList,
  setShowAlert,
  setShowLoader,
  showAlert,
}) => {
  const [modalSucursal, setModalSucursal] = useState(false);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditable({
      ...newEditable,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeSucursal = (value: string) => {
    setNewEditable({
      ...newEditable,
      sucursal_id: value,
    });
  };

  const handleCreateSetSucursal = (response: IBranchOffice) => {
    setModalSucursal(false)
    setNewEditable({
      ...newEditable,
      sucursal_id: response._id.$oid
    })
  }

  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="descripcion">Descripcion</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            value={newEditable.descripcion}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="ubicacion">Ubicacion</label>
          <input autoComplete="off"
            id="ubicacion"
            name="ubicacion"
            type="text"
            value={newEditable.ubicacion}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="sucursal_id">Sucursal</label>
          <SelectDinamico
            handleChange={handleChangeSucursal}
            setModal={setModalSucursal}
            value={newEditable.sucursal_id}
            dataList={sucursales.map((item) => {
              return { id: item._id.$oid, descripcion: item.descripcion };
            })}
          />
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
        handleCreateSetSucursal={handleCreateSetSucursal}
      />
    </>
  );
};
