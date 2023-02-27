import React, { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { INewMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";

interface INuevaMotivoTrasladoForm {
  setNew: (data: INewMotivoTraslado) => void;
  new: INewMotivoTraslado;
}

export const NuevaMotivoTrasladoForm: FC<INuevaMotivoTrasladoForm> = ({
  setNew,
  new: newMotivoTraslado,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "codigo_opcional") {
        return;
      }
    }
    setNew({
      ...newMotivoTraslado,
      [name]: value.toUpperCase(),
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="notas_credito">Notas de credito</label>
          <input
            autoComplete="off"
            id="notas_credito"
            name="notas_credito"
            type="text"
            onChange={handleInputChange}
            value={newMotivoTraslado.notas_credito}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="motivo_traslado">Motivo traslado</label>
          <input
            autoComplete="off"
            id="motivo_traslado"
            name="motivo_traslado"
            type="text"
            onChange={handleInputChange}
            value={newMotivoTraslado.motivo_traslado}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="codigo_opcional">Codigo opcional</label>
          <input
            autoComplete="off"
            id="codigo_opcional"
            name="codigo_opcional"
            type="text"
            onChange={handleInputChange}
            value={
              newMotivoTraslado.codigo_opcional
                ? newMotivoTraslado.codigo_opcional
                : ""
            }
          />
        </div>
      </div>
    </>
  );
};
