import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { INewUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";

interface INuevaUnidadForm {
  setNew: (data: INewUnit) => void;
  new: INewUnit;
}

export const NuevaUnidadForm: FC<INuevaUnidadForm> = ({
  setNew,
  new: newUnidad,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "valor") {
        return;
      }
    }
    setNew({
      ...newUnidad,
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
            value={newUnidad.descripcion}
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
            value={newUnidad.abreviatura}
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
            value={newUnidad.valor}
          />
        </div>
      </div>
    </>
  );
};
