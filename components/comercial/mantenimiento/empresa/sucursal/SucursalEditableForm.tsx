import { FC, FormEvent } from "react";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { clsx } from "@/lib/clsx";
import styles from '@/styles/Form.module.scss'

interface ISucursalEditableForm {
  editableBranchOffice: IBranchOffice;
  setNewEditableBranchOffice: any;
  newEditableBranchOffice: any;
}
export const SucursalEditableForm: FC<ISucursalEditableForm> = ({
  editableBranchOffice,
  newEditableBranchOffice,
  setNewEditableBranchOffice,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setNewEditableBranchOffice({
      ...newEditableBranchOffice,
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
            value={newEditableBranchOffice.descripcion}
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
            value={newEditableBranchOffice.ubicacion}
          />
        </div>
      </div>
    </>
  );
};
