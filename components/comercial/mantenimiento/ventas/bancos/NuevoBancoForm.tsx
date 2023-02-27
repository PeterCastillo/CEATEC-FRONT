"use client";

import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { INewBanco } from "@/interfaces/comercial/mantenimiento/ventas/bancosInterface";
import { FC, FormEvent } from "react";
import styles from "@/styles/Form.module.scss";

interface INuevoBancoForm {
  monedas: IMoneda[];
  newBanco: INewBanco;
  setNewBanco: (newBanco: INewBanco) => void;
}

export const NuevoBancoForm: FC<INuevoBancoForm> = ({
  monedas,
  newBanco,
  setNewBanco,
}) => {
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setNewBanco({
      ...newBanco,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setNewBanco({
      ...newBanco,
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
            value={newBanco.nombre}
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
            value={newBanco.cuenta_bancaria}
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
            value={newBanco.cuenta_contable}
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
            value={newBanco.moneda_id}
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
