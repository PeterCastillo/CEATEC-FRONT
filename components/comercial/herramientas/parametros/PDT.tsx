import { FC } from "react";
import { GoArrowUp } from "react-icons/go";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { FaSave } from "react-icons/fa";
import style from "./PDT.module.scss";

interface IParametrosDeTicket {}
export const PDT: FC<IParametrosDeTicket> = ({}) => {
  return (
    <div className={style.form}>
      <form className={style.form_special}>
        <div className={style.special_input_group}>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Usas ticketera</label>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Incluir en imprecion codigo de barras</label>
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Titulo 1</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Titulo 2</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Titulo 3</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Titulo 4</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Titulo 5</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Sub Titulo 1</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Sub Titulo 2</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Sub Titulo 3</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 1</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 2</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 3</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 4</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 5</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 6</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 7</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 8</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 9</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 10</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 11</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 12</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Resumen 13</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Pie Pagina 1</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Pie Pagina 2</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Pie Pagina 3</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.inputs_group}>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Pie Pagina 4</label>
            </div>
            <input type="text" />
          </div>
          <div className={style.input}>
            <div className={style.info}>
              <label htmlFor="">Nomb.Impreso</label>
            </div>
            <input type="text" />
          </div>
        </div>
        <div className={style.parametros_ticket_footer}>
          <div>
            <div className={style.last_input_group}>
              <div className={style.input_nombre}>
                <label htmlFor="">Nombre Letra ticket</label>
                <input type="text" />
              </div>
              <div className={style.input_nombre}>
                <label htmlFor="">Numero Letra</label>
                <input type="text" />
              </div>
            </div>
            <div className={style.check_box_row}>
              <input type="checkbox" />
              <label htmlFor="">Incluir RUC y Nombre en BVT</label>
            </div>
            <div className={style.check_box_row}>
              <input type="checkbox" />
              <label htmlFor="">Imprimir codigo QR</label>
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
                <div>
                  <AiOutlineCloudUpload />
                </div>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
