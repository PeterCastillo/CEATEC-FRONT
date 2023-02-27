"use client";

import { FormEvent, FC } from "react";
import { IGasto } from "@/interfaces/comercial/mantenimiento/gastos/gastosInterface";
import styles from "@/styles/Form.module.scss";

interface IEditableGastosForm {
  newEditableGasto: IGasto;
  setNewEditableGasto: (data: IGasto) => void;
}

export const EditableGastosForm: FC<IEditableGastosForm> = ({
  setNewEditableGasto,
  newEditableGasto,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "cuenta_contable") {
        return;
      }
    }
    setNewEditableGasto({
      ...newEditableGasto,
      [name]: value.toUpperCase(),
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="descripcion">Descripcion</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newEditableGasto.descripcion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_contable">Cta. Contable</label>
          <input autoComplete="off"
            id="cuenta_contable"
            name="cuenta_contable"
            type="number"
            onChange={handleInputChange}
            value={newEditableGasto.cuenta_contable}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="resumen_automatico">Resumen Automatico</label>
          <input autoComplete="off"
            id="resumen_automatico"
            name="resumen_automatico"
            type="text"
            onChange={handleInputChange}
            value={newEditableGasto.resumen_automatico}
          />
        </div>
      </div>
    </>
  );
};
