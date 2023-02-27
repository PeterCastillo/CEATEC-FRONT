"use client";

import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { INewTipoNivelAcceso } from "@/interfaces/comercial/mantenimiento/tipo-nivel-acceso/tipoNivelAcceso";

interface IINuevoTipoNivelAccesoForm {
  setNewTipoNivelDeAcceso: (data: INewTipoNivelAcceso) => void;
  newTipoNivelDeAcceso: INewTipoNivelAcceso;
}

export const NuevoTipoNivelAccesoForm: FC<IINuevoTipoNivelAccesoForm> = ({
  setNewTipoNivelDeAcceso,
  newTipoNivelDeAcceso,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewTipoNivelDeAcceso({
      ...newTipoNivelDeAcceso,
      [name]: value.toUpperCase(),
    });
  };

  const handleCheckboxState = () => {
    setNewTipoNivelDeAcceso({
      ...newTipoNivelDeAcceso,
      estado: !newTipoNivelDeAcceso.estado,
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="nombre">Nombre</label>
          <input autoComplete="off"
            id="nombre"
            name="nombre"
            type="text"
            onChange={handleInputChange}
            value={newTipoNivelDeAcceso.nombre}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="estado">
            <input autoComplete="off"
              id="estado"
              name="estado"
              type="checkbox"
              checked={newTipoNivelDeAcceso.estado}
              onChange={handleCheckboxState}
            />
            Activar
          </label>
        </div>
      </div>
    </>
  );
};
