"use client";

import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { ITipoNivelAcceso } from "@/interfaces/comercial/mantenimiento/tipo-nivel-acceso/tipoNivelAcceso";

interface IEditableTipoNivelAccesoForm {
  setNewEditableTipoNivelDeAcceso: (data: ITipoNivelAcceso) => void;
  newEditableTipoNivelDeAcceso: ITipoNivelAcceso;
}

export const EditableTipoNivelAccesoForm: FC<IEditableTipoNivelAccesoForm> = ({
  setNewEditableTipoNivelDeAcceso,
  newEditableTipoNivelDeAcceso,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditableTipoNivelDeAcceso({
      ...newEditableTipoNivelDeAcceso,
      [name]: value.toUpperCase(),
    });
  };

  const handleCheckboxState = () => {
    setNewEditableTipoNivelDeAcceso({
      ...newEditableTipoNivelDeAcceso,
      estado: !newEditableTipoNivelDeAcceso.estado,
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
            value={newEditableTipoNivelDeAcceso.nombre}
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
              checked={newEditableTipoNivelDeAcceso.estado}
              onChange={handleCheckboxState}
            />
            Activar
          </label>
        </div>
      </div>
    </>
  );
};
