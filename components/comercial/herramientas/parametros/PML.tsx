import { clsx } from '@/lib/clsx'
import { useState } from 'react'
import styles from './PML.module.scss'


export const PML = () => {

  const [fetchRealizado, setFetchRealizado] = useState(true)
  const [objeto, setObjeto] = useState({
    porcentaje: ""
  })

  const invalidInput = (value: string) => {
    if (fetchRealizado && value.length === 0) {
      return styles.invalid
    }
  }

  return (
    <form className={styles.form}>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Porcentaje IGV</label>
        <input autoComplete="off" type="text" id="grupo" name="procentaje" className={clsx(invalidInput(objeto.porcentaje))} />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Porcentaje ISC</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Precio 1 (%)</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Precio 2 (%)</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Precio 3 (%)</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Precio 4 (%)</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Precio 5 (%)</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Valor Máx. Importe Bol. Vta.</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
      <div className={styles.f_g}>
        <label htmlFor="grupo">Valor UIT (S/.)</label>
        <input autoComplete="off" type="text" id="grupo" />
      </div>
    </form>
  )
}