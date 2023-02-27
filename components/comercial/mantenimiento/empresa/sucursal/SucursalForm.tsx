import { FormEvent, FC } from "react";
import { INewBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { clsx } from "@/lib/clsx";
import styles from '@/styles/Form.module.scss'

interface ISucursalForm {
  setNewBranchOffice: (data: INewBranchOffice) => void;
  newBranchOffice: INewBranchOffice;
}

export const SucursalForm: FC<ISucursalForm> = ({
  setNewBranchOffice,
  newBranchOffice,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewBranchOffice({
      ...newBranchOffice,
      [name]: value.toUpperCase(),
    });
  };

  return (
    <>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="descripcion">Descripcion</label>
          <input autoComplete="off"
            id="descripcion"
            name="descripcion"
            type="text"
            onChange={handleInputChange}
            value={newBranchOffice.descripcion}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={clsx(styles.f_g, styles.f_2)}>
          <label htmlFor="ubicacion">Ubicación</label>
          <input autoComplete="off"
            id="ubicacion"
            name="ubicacion"
            type="text"
            onChange={handleInputChange}
            value={newBranchOffice.ubicacion}
          />
        </div>
      </div>
    </>
  );
};
