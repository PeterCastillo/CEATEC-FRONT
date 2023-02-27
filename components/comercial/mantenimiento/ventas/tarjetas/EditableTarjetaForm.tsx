import { FormEvent, FC } from "react";
import styles from "@/styles/Form.module.scss";
import { ITarjeta } from "../../../../../interfaces/comercial/mantenimiento/ventas/tarjetasInterface";

interface IEditableTarjetaForm {
  newEditabletarjeta: ITarjeta;
  setNewEditableTarjeta: (data: ITarjeta) => void;
}

export const EditableTarjetaForm: FC<IEditableTarjetaForm> = ({
  newEditabletarjeta,
  setNewEditableTarjeta,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewEditableTarjeta({
      ...newEditabletarjeta,
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
            onChange={handleInputChange}
            value={newEditabletarjeta.descripcion}
          />
        </div>
      </div>
    </>
  );
};
