import { FC } from "react"
import style from "./DDR.module.scss"

interface IDatosDeReporte {
}
export const DDR: FC<IDatosDeReporte> = ({  }) => {
  return (
    <div className={style.form}>
      <form className={style.form_special}>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Direcion de Reportes</label>
            <span>:</span>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nom. Boleta Vta</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nombre Factura</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nombre Guia</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nomb. Nota Credito</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nomb. Nota Credito</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nomb. Liq. Compra</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nomb. Bol. Vta. Libre</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nombre Proforma</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.row_special_reportes}>
          <div className={style.reporte_info}>
            <label htmlFor="">Nombre Pedido</label>
          </div>
          <div className={style.reporte_datos}>
            <input type="text" />
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group_colums}>
          <div>
            <label htmlFor="">Cuenta destino Compras</label>
            <input type="text" />
          </div>
          <div>
            <label htmlFor="">Cuenta destino Ventas</label>
            <input type="text" />
          </div>
        </div>
      </form>
    </div>
  )
}
