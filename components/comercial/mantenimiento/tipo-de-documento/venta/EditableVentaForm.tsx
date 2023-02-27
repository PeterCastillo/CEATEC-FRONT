import { FormEvent, FC, useState } from "react";
import styles from "@/styles/Form.module.scss";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import {
  ITipoDocumentoVenta,
} from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { NuevaCaja } from "./NuevaCaja";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";

interface IEditableVentaForm {
  newEditableTipoDocumentoVenta: ITipoDocumentoVenta;
  setNewEditableTipoDocumentoVenta: (data: ITipoDocumentoVenta) => void;
  cajasList: IBox[];
  userList: IUser[]
  showAlert: IAlert
  getBranchOfficesList: () => void
  closeAlertTimeOut: () => void
  setShowLoader: (state:boolean) => void
  setShowAlert: (state:IAlert) => void
  branchOfficesList: IBranchOffice[]
  getCajasList: () => void
}

export const EditableVentaForm: FC<IEditableVentaForm> = ({
  newEditableTipoDocumentoVenta,
  setNewEditableTipoDocumentoVenta,
  cajasList,
  branchOfficesList,
  closeAlertTimeOut,
  getBranchOfficesList,
  setShowAlert,
  setShowLoader,
  showAlert,
  userList,
  getCajasList
}) => {
  const [modalCajas,setModalCajas] = useState(false)
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "correlativo") {
        return;
      }
    }
    setNewEditableTipoDocumentoVenta({
      ...newEditableTipoDocumentoVenta,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditableTipoDocumentoVenta({
      ...newEditableTipoDocumentoVenta,
      [name]: value,
    });
  };

  const handleCajaChange = (value: string) => {
    setNewEditableTipoDocumentoVenta({
      ...newEditableTipoDocumentoVenta,
      caja_id: value,
    });
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="descripcion">Descripción</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newEditableTipoDocumentoVenta.descripcion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="">Abreviatura</label>
          <input autoComplete="off"
            id="abreviatura"
            name="abreviatura"
            type="text"
            onChange={handleInputChange}
            value={newEditableTipoDocumentoVenta.abreviatura}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="serie">Serie</label>
          <input autoComplete="off"
            id="serie"
            name="serie"
            type="text"
            onChange={handleInputChange}
            value={newEditableTipoDocumentoVenta.serie}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="correlativo">Correlativo</label>
          <input autoComplete="off"
            id="correlativo"
            name="correlativo"
            type="text"
            onChange={handleInputChange}
            value={newEditableTipoDocumentoVenta.correlativo}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="caja_id">Caja</label>
          <SelectDinamico
            dataList={cajasList.map((item) => {
              return {
                id: item._id.$oid,
                descripcion: item.descripcion,
              };
            })}
            handleChange={handleCajaChange}
            value={newEditableTipoDocumentoVenta.caja_id}
            setModal={setModalCajas}
          />
        </div>
      </div>
      <NuevaCaja
        branchOfficesList={branchOfficesList}
        closeAlertTimeOut={closeAlertTimeOut}
        getBranchOfficesList={getBranchOfficesList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        setShowNewClientModal={setModalCajas}
        show={modalCajas}
        showAlert={showAlert}
        userList={userList}
        getCajasList={getCajasList}
      />
    </>
  );
};
