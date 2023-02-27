"use client";

import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";

interface IEditableTipoClienteProveedorForm {
  newEditable: ITipoClienteProveedor;
  setNewEditable: (data: ITipoClienteProveedor) => void;
}

export const EditableTipoClienteProveedorForm: FC<IEditableTipoClienteProveedorForm> = ({
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
