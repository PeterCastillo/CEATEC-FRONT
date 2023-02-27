import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";

interface IEditableZonaForm {
  setNewEditableZone: (data: IZone) => void;
  newEditableZone: IZone;
}

export const EditableZonaForm: FC<IEditableZonaForm> = ({
  setNewEditableZone,
  newEditableZone,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewEditableZone({
      ...newEditableZone,
      [name]: value.toUpperCase(),
    });
  };

  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="zona">Código</label>
          <input autoComplete="off"
            id="zona"
            name="zona"
            type="text"
            onChange={handleInputChange}
            value={newEditableZone.zona}
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
            value={newEditableZone.descripcion}
          />
        </div>
      </div>
    </>
  );
};
