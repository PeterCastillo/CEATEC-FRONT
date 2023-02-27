import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { INewTipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";

interface INuevaTipoClienteProveedorForm {
  setNew: (data: INewTipoClienteProveedor) => void;
  new: INewTipoClienteProveedor;
}

export const NuevaTipoClienteProveedorForm: FC<INuevaTipoClienteProveedorForm> = ({
  setNew,
  new : newTipoClienteProveedor
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNew({
      ...newTipoClienteProveedor,
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
            value={newTipoClienteProveedor.descripcion}
          />
        </div>
      </div>
    </>
  );
};
