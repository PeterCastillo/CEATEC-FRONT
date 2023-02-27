import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { INewZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { clsx } from "@/lib/clsx";

interface INuevaZonaForm {
  setNewZone: (data: INewZone) => void;
  newZone: INewZone;
}

export const NuevaZonaForm: FC<INuevaZonaForm> = ({ setNewZone, newZone }) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewZone({
      ...newZone,
      [name]: value.toUpperCase(),
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="zona">Código</label>
          <input autoComplete="off"
            id="zona"
            name="zona"
            type="text"
            onChange={handleInputChange}
            value={newZone.zona}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="descripcion">Descripción</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newZone.descripcion}
          />
        </div>
      </div>
    </>
  );
};
