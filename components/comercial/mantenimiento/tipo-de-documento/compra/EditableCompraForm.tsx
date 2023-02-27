import { FormEvent, FC } from "react";
import { clsx } from "@/lib/clsx";
import styles from "@/styles/Form.module.scss";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";

interface IEditableCompraForm {
  newEditableTipoDocumentoCompra: ITipoDocumentoCompra;
  setNewEditableTipoDocumentoCompra: (data: ITipoDocumentoCompra) => void;
}

export const EditableCompraForm: FC<IEditableCompraForm> = ({
  newEditableTipoDocumentoCompra,
  setNewEditableTipoDocumentoCompra,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "correlativo") {
        return;
      }
    }
    setNewEditableTipoDocumentoCompra({
      ...newEditableTipoDocumentoCompra,
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
            value={newEditableTipoDocumentoCompra.descripcion}
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
            value={newEditableTipoDocumentoCompra.abreviatura}
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
            value={newEditableTipoDocumentoCompra.serie}
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
            value={newEditableTipoDocumentoCompra.correlativo}
          />
        </div>
      </div>
    </>
  );
};
