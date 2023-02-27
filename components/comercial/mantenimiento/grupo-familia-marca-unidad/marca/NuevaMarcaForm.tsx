import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { INewGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";

interface INuevaMarcaForm {
  setNew: (data: INewGroup) => void;
  new: INewGroup;
}

export const NuevaMarcaForm: FC<INuevaMarcaForm> = ({
  setNew,
  new : newGroup
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNew({
      ...newGroup,
      [name]: value.toUpperCase(),
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="descripcion">Descripción</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newGroup.descripcion}
          />
        </div>
      </div>
    </>
  );
};
