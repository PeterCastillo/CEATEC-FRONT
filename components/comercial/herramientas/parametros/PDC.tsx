import { FC } from "react"
import { FaSave } from "react-icons/fa"
import style from "./PDC.module.scss"
interface IParametrosDeCuenta {
}
export const PDC: FC<IParametrosDeCuenta> = ({  }) => {
  return (
    <div className={style.form}>
      <form className={style.form_special}>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cuenta IGV</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cuenta ISC</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cuenta IES</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Percepciones</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cierre Compras</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cierre Ventas</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Difer. Cambio(+)</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Difer. Cambio(-)</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cuenta Reten. 4ta</label>
          </div>
          <input type="text" />
        </div>
        <div className={style.row_input_special}>
          <div>
            <label htmlFor="">Cuenta IVAP</label>
          </div>
          <input type="text" />
        </div>
      </form>
    </div>
  )
}
