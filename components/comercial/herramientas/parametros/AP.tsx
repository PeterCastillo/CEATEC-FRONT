import { FC } from "react"
import { GoArrowUp } from "react-icons/go"
import { AiOutlineCloudUpload } from "react-icons/ai"
import style from "./AP.module.scss"

interface IApariencia {
}
export const AP: FC<IApariencia> = ({ }) => {
  return (
    <div className={style.form}>
      <form className={style.form_special_apariencia}>
        <div className={style.form}>
          <div className={style.input_apariencia}>
            <input type="checkbox" />
            <label htmlFor="">Mostrar siempre el Panel de inicio Rapido</label>
          </div>
          <div className={style.input_apariencia}>
            <input type="checkbox" />
            <label htmlFor="">Mostrar siempre el sub panel de ayuda</label>
          </div>
          <div className={style.input_apariencia}>
            <input type="checkbox" />
            <label htmlFor="">
              Mostrar ToolTips de Ayuda en los controles de las ventanas
            </label>
          </div>
          <div className={style.input_apariencia}>
            <input type="checkbox" />
            <label htmlFor="">Mostar animacion del fondo del escritorio</label>
          </div>
          <div className={style.input_apariencia}>
            <input type="checkbox" />
            <label htmlFor="">
              Utilizar una imagen como fondo del marco de trabajo
            </label>
          </div>
        </div>
        <div className={style.img}>
          <div className={style.img_container}>
            <span>
              <GoArrowUp />
            </span>
            {false ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/2/2120.png"
                alt=""
              />
            ) : (
              <div><AiOutlineCloudUpload/></div>
            )}
          </div>
        </div>
      </form>
    </div>
  )
}
