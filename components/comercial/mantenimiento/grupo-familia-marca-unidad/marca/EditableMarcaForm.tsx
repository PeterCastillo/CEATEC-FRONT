"use client";

import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";

interface IEditableMarcaForm {
  newEditable: IBrand;
  setNewEditable: (data: IBrand) => void;
}

export const EditableMarcaForm: FC<IEditableMarcaForm> = ({
  newEditable,
  setNewEditable,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditable({
      ...newEditable,
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
            value={newEditable.descripcion}
            onChange={handleInputChange}
          />
        </div>
      </div>
    </>
  );
};
