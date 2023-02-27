"use client";

import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";

interface IEditableUnidadForm {
  newEditable: IUnit;
  setNewEditable: (data: IUnit) => void;
}

export const EditableUnidadForm: FC<IEditableUnidadForm> = ({
  newEditable,
  setNewEditable,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "valor") {
        return;
      }
    }
    setNewEditable({
      ...newEditable,
      [name]: value.toUpperCase(),
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="descripcion">Descripción</label>
          <input
            autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newEditable.descripcion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="abreviatura">Abreviatura</label>
          <input
            autoComplete="off"
            id="abreviatura"
            name="abreviatura"
            type="text"
            onChange={handleInputChange}
            value={newEditable.abreviatura}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="valor">Valor</label>
          <input
            autoComplete="off"
            id="valor"
            name="valor"
            type="text"
            onChange={handleInputChange}
            value={newEditable.valor}
          />
        </div>
      </div>
    </>
  );
};
