import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";

interface IEditableSectorForm {
  setNewEditableSector: (data: ISector) => void;
  newEditableSector: ISector;
}

export const EditableSectorForm: FC<IEditableSectorForm> = ({
  setNewEditableSector,
  newEditableSector,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditableSector({
      ...newEditableSector,
      [name]: value.toUpperCase(),
    });
  };
  
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="sector">Código</label>
          <input autoComplete="off"
            id="sector"
            name="sector"
            type="text"
            onChange={handleInputChange}
            value={newEditableSector.sector}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="descripcion">Descripción</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newEditableSector.descripcion}
          />
        </div>
      </div>
    </>
  );
};
