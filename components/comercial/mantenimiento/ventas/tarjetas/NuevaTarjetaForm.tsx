import { FormEvent, FC } from "react";
import { INewTarjeta } from "@/interfaces/comercial/mantenimiento/ventas/tarjetasInterface";
import styles from "@/styles/Form.module.scss";

interface INuevaTarjetaForm {
  newTarjeta: INewTarjeta;
  setNewTarjeta: (newTarjeta: INewTarjeta) => void;
}
export const NuevaTarjetaForm: FC<INuevaTarjetaForm> = ({
  newTarjeta,
  setNewTarjeta,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewTarjeta({
      ...newTarjeta,
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
            value={newTarjeta.descripcion}
          />
        </div>
      </div>
    </>
  );
};
