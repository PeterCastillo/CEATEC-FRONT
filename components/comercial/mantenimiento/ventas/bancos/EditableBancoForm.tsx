"use client";

import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IBanco } from "@/interfaces/comercial/mantenimiento/ventas/bancosInterface";
import { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";

interface IEditableBancoForm {
  newEditableBanco: IBanco;
  monedas: IMoneda[];
  setNewEditableBanco: (state: IBanco) => void;
}

export const EditableBancoForm: FC<IEditableBancoForm> = ({
  newEditableBanco,
  setNewEditableBanco,
  monedas,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewEditableBanco({
      ...newEditableBanco,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setNewEditableBanco({
      ...newEditableBanco,
      [name]: value,
    });
  };
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="nombre">Nombre</label>
          <input autoComplete="off"
            id="nombre"
            name="nombre"
            type="text"
            onChange={handleInputChange}
            value={newEditableBanco.nombre}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_bancaria">Cuenta bancaria</label>
          <input autoComplete="off"
            id="cuenta_bancaria"
            name="cuenta_bancaria"
            type="text"
            onChange={handleInputChange}
            value={newEditableBanco.cuenta_bancaria}
          />
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="cuenta_contable">Cuenta contable</label>
          <input autoComplete="off"
            id="cuenta_contable"
            name="cuenta_contable"
            type="text"
            onChange={handleInputChange}
            value={newEditableBanco.cuenta_contable}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="moneda_id">Moneda</label>
          <select
            id="moneda_id"
            name="moneda_id"
            onChange={handleSelectChange}
            value={newEditableBanco.moneda_id}
          >
            <option hidden value="">
              Seleccione moneda
            </option>
            {monedas.map((moneda, index) => (
              <option value={moneda._id?.$oid} key={index}>
                {moneda.nombre}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
