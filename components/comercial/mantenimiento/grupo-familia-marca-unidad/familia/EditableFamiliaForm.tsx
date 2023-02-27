"use client";

import { FormEvent, FC, useState } from "react";
import styles from "@/styles/Form.module.scss";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";
import { clsx } from "@/lib/clsx";
import { NuevoGrupo } from "./NuevoGrupo";

interface IEditableFamiliaForm {
  newEditable: IFamily;
  setNewEditable: (data: IFamily) => void;
  grupos: IGroup[];
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getGroupsList: () => void;
}

export const EditableFamiliaForm: FC<IEditableFamiliaForm> = ({
  newEditable,
  setNewEditable,
  grupos,
  closeAlertTimeOut,
  getGroupsList,
  setShowAlert,
  setShowLoader,
  showAlert,
}) => {
  const [modalGrupo, setModalGrupo] = useState(false);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if(value.includes(".")){
      return
    }
    if (Number.isNaN(Number(value))) {
      if (
        name == "cuenta_compra_debe" ||
        name == "cuenta_compra_haber" ||
        name == "cuenta_mercaderia" ||
        name == "cuenta_prod_manufac" ||
        name == "cuenta_venta_debe" ||
        name == "cuenta_venta_haber"
      ) {
        return;
      }
    }
    setNewEditable({
      ...newEditable,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeGrupo = (value: string) => {
    setNewEditable({
      ...newEditable,
      grupo_id: value,
    });
  };

  const handleCheckboxExonerado = () => {
    setNewEditable({
      ...newEditable,
      exonerado_igv: !newEditable.exonerado_igv,
    });
  };

  const handleCheckboxVenta = () => {
    setNewEditable({
      ...newEditable,
      considerar_en_venta: !newEditable.considerar_en_venta,
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
            value={newEditable.descripcion}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="grupo_id">Grupo</label>
          <SelectDinamico
            handleChange={handleChangeGrupo}
            setModal={setModalGrupo}
            value={newEditable.grupo_id}
            dataList={grupos.map((item) => {
              return { id: item._id.$oid, descripcion: item.descripcion };
            })}
          />
        </div>
      </div>
      <div className={clsx(styles.separator)}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>CUENTAS DE MOVIMIENTO</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_compra_debe">Cuenta compra (D)</label>
          <input autoComplete="off"
            id="cuenta_compra_debe"
            name="cuenta_compra_debe"
            type="text"
            onChange={handleInputChange}
            value={newEditable.cuenta_compra_debe}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_compra_haber">Cuenta compra (H)</label>
          <input autoComplete="off"
            id="cuenta_compra_haber"
            name="cuenta_compra_haber"
            type="text"
            onChange={handleInputChange}
            value={newEditable.cuenta_compra_haber}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_venta_debe">Cuenta venta (D)</label>
          <input autoComplete="off"
            id="cuenta_venta_debe"
            name="cuenta_venta_debe"
            type="text"
            onChange={handleInputChange}
            value={newEditable.cuenta_venta_debe}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_venta_haber">Cuenta venta (H)</label>
          <input autoComplete="off"
            id="cuenta_venta_haber"
            name="cuenta_venta_haber"
            type="text"
            onChange={handleInputChange}
            value={newEditable.cuenta_venta_haber}
          />
        </div>
      </div>
      <div className={clsx(styles.separator)}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>CUENTAS DE ALMACEN</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_mercaderia">Cuenta mercaderia</label>
          <input autoComplete="off"
            id="cuenta_mercaderia"
            name="cuenta_mercaderia"
            type="text"
            onChange={handleInputChange}
            value={newEditable.cuenta_mercaderia}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_prod_manufac">
            Cuenta producto manofactura
          </label>
          <input autoComplete="off"
            id="cuenta_prod_manufac"
            name="cuenta_prod_manufac"
            type="text"
            onChange={handleInputChange}
            value={newEditable.cuenta_prod_manufac}
          />
        </div>
      </div>
      <div>
        <div className={styles.f_g}>
          <label htmlFor="exonerado_igv">
            <input autoComplete="off"
              id="exonerado_igv"
              name="exonerado_igv"
              type="checkbox"
              checked={newEditable.exonerado_igv}
              onChange={handleCheckboxExonerado}
            />
            Exonerado igv
          </label>
        </div>
      </div>
      <div>
        <div className={styles.f_g}>
          <label htmlFor="considerar_en_venta">
            <input autoComplete="off"
              id="considerar_en_venta"
              name="considerar_en_venta"
              type="checkbox"
              checked={newEditable.considerar_en_venta}
              onChange={handleCheckboxVenta}
            />
            Considerar en venta
          </label>
        </div>
      </div>
      <NuevoGrupo
        modal={modalGrupo}
        setModal={setModalGrupo}
        closeAlertTimeOut={closeAlertTimeOut}
        getGroupsList={getGroupsList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
      />
    </>
  );
};
