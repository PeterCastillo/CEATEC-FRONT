import { FormEvent, FC } from "react";
import { clsx } from "@/lib/clsx";
import styles from "@/styles/Form.module.scss";
import { INewTipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";

interface INuevaCompraForm {
  setNewTipoDocumento: (data: INewTipoDocumentoCompra) => void;
  newTipoDocumento: INewTipoDocumentoCompra;
}

export const NuevaCompraForm: FC<INuevaCompraForm> = ({
  setNewTipoDocumento,
  newTipoDocumento,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "correlativo") {
        return;
      }
    }
    setNewTipoDocumento({
      ...newTipoDocumento,
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
            value={newTipoDocumento.descripcion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="abreviatura">Abreviatura</label>
          <input autoComplete="off"
            id="abreviatura"
            name="abreviatura"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumento.abreviatura}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="serie">Serie</label>
          <input autoComplete="off"
            id="serie"
            name="serie"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumento.serie}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="correlativo">Correlativo</label>
          <input autoComplete="off"
            id="correlativo"
            name="correlativo"
            type="text"
            onChange={handleInputChange}
            value={newTipoDocumento.correlativo}
          />
        </div>
      </div>
    </>
  );
};
