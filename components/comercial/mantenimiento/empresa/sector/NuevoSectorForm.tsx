import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { INewSector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";

interface INuevoSectorForm {
  setNewSector: (data: INewSector) => void;
  newSector: INewSector;
}

export const NuevoSectorForm: FC<INuevoSectorForm> = ({
  setNewSector,
  newSector,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewSector({
      ...newSector,
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
            value={newSector.sector}
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
            value={newSector.descripcion}
          />
        </div>
      </div>
    </>
  );
};
