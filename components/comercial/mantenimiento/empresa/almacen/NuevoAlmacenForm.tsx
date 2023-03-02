import React, { FC, FormEvent, useState } from "react";
import styles from "@/styles/Form.module.scss";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { INewWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { NuevaSucursal } from "./NuevaSucursal";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";

interface INuevoAlmacenForm {
  setNew: (data: INewWareHouse) => void;
  new: INewWareHouse;
  sucursales: IBranchOffice[];
  setShowAlert: (state: IAlert) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  closeAlertTimeOut: () => void;
  getBranchOfficesList: () => void;
}

export const NuevoAlmacenForm: FC<INuevoAlmacenForm> = ({
  setNew,
  new: newAlmacen,
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
    setNew({
      ...newAlmacen,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeSucursal = (value: string) => {
    setNew({
      ...newAlmacen,
      sucursal_id: value,
    });
  };

  const handleCreateSetSucursal = (response: IBranchOffice) => {
    setModalSucursal(false)
    setNew({
      ...newAlmacen,
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
            value={newAlmacen.descripcion}
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
            value={newAlmacen.ubicacion}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div  className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="sucursal_id">Sucursal</label>
          <SelectDinamico
            handleChange={handleChangeSucursal}
            setModal={setModalSucursal}
            value={newAlmacen.sucursal_id}
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
