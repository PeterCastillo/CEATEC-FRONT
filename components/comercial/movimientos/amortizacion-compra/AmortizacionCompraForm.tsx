import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { IAmortizarCompra } from "@/interfaces/comercial/movimientos/amortizarCompraInterface";
import { ICompra } from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { FC, FormEvent } from "react";
import style from "@/app/comercial/movimientos/amortizacion-compra/page.module.scss";
import table from "@/styles/DataTable.module.scss";

interface IAmortizarCompraForm {
  monedas: IMoneda[];
  tipoDocumento: ITipoDocumentoCompra[];
  amortizarCompra: IAmortizarCompra;
  setAmortizarCompra: (amortizar: IAmortizarCompra) => void;
  compra: ICompra;
}

export const AmortizarCompraForm: FC<IAmortizarCompraForm> = ({
  monedas,
  tipoDocumento,
  amortizarCompra,
  setAmortizarCompra,
  compra,
}) => {
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    setAmortizarCompra({
      ...amortizarCompra,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setAmortizarCompra({
      ...amortizarCompra,
      [name]: value,
    });
  };
  return (
    <>
      <div className={style.form_secction}>
        <div className={style.secction}>
          <div className={style.row_input}>
            <label htmlFor="tipo_documento_pago_id">
              Codigo amortizacion :{" "}
            </label>
            <input autoComplete="off"
              // type="text"
              // id="tipo_documento_pago_id"
              // name="tipo_documento_pago_id"
              // value={amortizarCompra.tipo_documento_pago_id}
              // onChange={handleInputChange}
              disabled
            />
          </div>
          <div className={style.input_group}>
            <div className={style.column_input}>
              <label htmlFor="tipo_documento_compra_id">
                Documento de pago
              </label>
              <select
                id="tipo_documento_compra_id"
                name="tipo_documento_compra_id"
                value={amortizarCompra.tipo_documento_compra_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                {tipoDocumento.map((tipo, index) => (
                  <option value={tipo._id?.$oid} key={index}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.column_input}>
              <label htmlFor="nro_de_documento_pago">Nro. de documento</label>
              <input autoComplete="off"
                type="text"
                id="nro_de_documento_pago"
                name="nro_de_documento_pago"
                value={amortizarCompra.nro_de_documento_pago}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={style.input_group}>
            <div className={style.column_input}>
              <label htmlFor="fecha_pago">Fecha de pago</label>
              <input autoComplete="off"
                type="date"
                id="fecha_pago"
                name="fecha_pago"
                value={amortizarCompra.fecha_pago}
                onChange={handleInputChange}
              />
            </div>
            <div className={style.column_input}>
              <label htmlFor="tipo_documento_pago_id">
                Tipo de pago compra
              </label>
              <select
                id="tipo_documento_pago_id"
                name="tipo_documento_pago_id"
                value={amortizarCompra.tipo_documento_pago_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
              </select>
            </div>
          </div>
        </div>
        <div className={style.secction}>
          <div className={style.row_input}>
            <label htmlFor="girado">Girado a : </label>
            <input autoComplete="off"
              type="text"
              id="girado"
              name="girado"
              value={amortizarCompra.girado}
              onChange={handleInputChange}
            />
          </div>
          <div className={style.input_group}>
            <div className={style.column_input}>
              <label htmlFor="">Cuenta</label>
              <select
                name="cuenta"
                value={amortizarCompra.cuenta}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                {tipoDocumento.map((tipo, index) => (
                  <option value={tipo._id?.$oid} key={index}>
                    {tipo.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className={style.column_input}>
              <label htmlFor="monto_a_pagar">Monto a pagar</label>
              <input autoComplete="off"
                type="text"
                id="monto_a_pagar"
                name="monto_a_pagar"
                value={amortizarCompra.monto_a_pagar}
                onChange={handleInputChange}
              />
            </div>
            <div className={style.column_input}>
              <label htmlFor="">Moneda</label>
              <select
                name="moneda_id"
                value={amortizarCompra.moneda_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                {monedas.map((moneda, index) => (
                  <option value={moneda._id?.$oid} key={index}>
                    {moneda.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className={style.row_input}>
            <label htmlFor="girado">Glosa : </label>
            <textarea
              className={style.min_height}
              id="girado"
              name="girado"
              value={amortizarCompra.girado}
              onChange={handleInputChange}
            ></textarea>
          </div>
        </div>
      </div>
      <table className={table.table}>
        <thead>
          <tr>
            <th>ITEM</th>
            <th>PROVEEDOR</th>
            <th>dni/ruc</th>
            <th>documento</th>
            <th>nRO. DOCUMENTO</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{1}</td>
            <td>{compra.proveedor_nombre}</td>
            <td>{compra.proveedor_ruc}</td>
            <td>{tipoDocumento.find(item => item._id.$oid == compra.documento_compra_id)?.descripcion}</td>
            <td>{compra.documento_compra}</td>
          </tr>
        </tbody>
      </table>
      <div className={style.footer_amortizar}>
        <div>
          <label htmlFor="">Monto total:</label>
          <input autoComplete="off" type="text" />
        </div>
        <div>
          <label htmlFor="">Total a pagar:</label>
          <input autoComplete="off" type="text" />
        </div>
      </div>
    </>
  );
};
