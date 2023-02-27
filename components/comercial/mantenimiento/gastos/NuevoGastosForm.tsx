"use client";

import { INewGasto } from "@/interfaces/comercial/mantenimiento/gastos/gastosInterface";
import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";

interface INuevoGastosForm {
  setNewGasto: (data: INewGasto) => void;
  newGasto: INewGasto;
}

export const NuevoGastosForm: FC<INuevoGastosForm> = ({
  setNewGasto,
  newGasto,
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
    setNewGasto({
      ...newGasto,
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
            value={newGasto.descripcion}
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
            value={newGasto.cuenta_contable}
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
            value={newGasto.resumen_automatico}
          />
        </div>
      </div>
    </>
  );
};
