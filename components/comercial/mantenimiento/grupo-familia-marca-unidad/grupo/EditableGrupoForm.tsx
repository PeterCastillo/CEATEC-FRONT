"use client";

import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";

interface IEditableGrupoForm {
  newEditableGrupo: IGroup;
  setNewEditableGrupo: (data: IGroup) => void;
}

export const EditableGrupoForm: FC<IEditableGrupoForm> = ({
  newEditableGrupo,
  setNewEditableGrupo,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditableGrupo({
      ...newEditableGrupo,
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
            value={newEditableGrupo.descripcion}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};
