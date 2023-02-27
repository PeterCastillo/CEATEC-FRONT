import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { IUser } from "@/interfaces/autenticacion/usuariosInterface";
import { INewTipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";
import { useState } from "react";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { NuevaCaja } from "./NuevaCaja";

interface INuevaVentaForm {
  setNewTipoDocumentoVenta: (data: INewTipoDocumentoVenta) => void;
  newTipoDocumentoVenta: INewTipoDocumentoVenta;
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

export const NuevaVentaForm: FC<INuevaVentaForm> = ({
  setNewTipoDocumentoVenta,
  newTipoDocumentoVenta,
  cajasList,
  userList,
  showAlert,
  setShowLoader,
  getBranchOfficesList,
  setShowAlert,
  closeAlertTimeOut,
  branchOfficesList,
  getCajasList
}) => {
  const [modalCajas, setModalCajas] = useState(false);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "correlativo") {
        return;
      }
    }
    setNewTipoDocumentoVenta({
      ...newTipoDocumentoVenta,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setNewTipoDocumentoVenta({
      ...newTipoDocumentoVenta,
      [name]: value,
    });
  };

  const handleCajaChange = (value: string) => {
    setNewTipoDocumentoVenta({
      ...newTipoDocumentoVenta,
      caja_id: value,
    });
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="descripcion">Descripción</label>
          <input
            autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumentoVenta.descripcion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="">Abreviatura</label>
          <input
            autoComplete="off"
            id="abreviatura"
            name="abreviatura"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumentoVenta.abreviatura}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="serie">Serie</label>
          <input
            autoComplete="off"
            id="serie"
            name="serie"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumentoVenta.serie}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="correlativo">Correlativo</label>
          <input
            autoComplete="off"
            id="correlativo"
            name="correlativo"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumentoVenta.correlativo}
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
            value={newTipoDocumentoVenta.caja_id}
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
