import { IRegistroComra } from "@/interfaces/comercial/reporte/reporteCompra/reporteCompraIntefaces";
import { IRegistroVenta } from "@/interfaces/comercial/reporte/reporteVenta/reporteVentaIntefaces";
import styles from "./ReporteCompra.module.scss";

export const ReporteVenta = ({
  registroVentas: registroVentas,
}: {
  registroVentas: IRegistroVenta[];
}) => {
  const handleRedondearDecimales = (numero: string): string => {
    if (numero.includes(".")) {
      return `${Number(numero).toFixed(1)}0`;
    }
    return numero.toString();
  };
  const handleDecimals = (numero: string): string => {
    if (numero.includes(".")) {
      return numero.split(".")[1].length >= 2
        ? Number(numero).toFixed(2).toString()
        : numero.toString();
    }
    return numero.toString();
  };
  const renderColums = () => {
    return registroVentas.map((item) => {
      const contado = item.ventas.filter(
        (item) => item.medio_de_pago == "CONTADO"
      );
      const credito = item.ventas.filter(
        (item) => item.medio_de_pago == "CREDITO"
      );
      return (
        <>
          {item.ventas.length > 1 && (
            <tr className={styles.line}>
              <td colSpan={10}>
                COMPRAS DEL DIA: <strong>{item.created_at}</strong>
              </td>
            </tr>
          )}
          {contado.length > 1 && (
            <tr className={styles.line}>
              <td colSpan={10}>
                <strong>C CONTADO</strong>
              </td>
            </tr>
          )}
          {contado.map((item) => (
            <tr>
              <td>C</td>
              <td>{item.medio_de_pago}</td>
              <td>{item.proveedor_ruc}</td>
              <td>{item.proveedor_nombre}</td>
              <td>fecha_llegada</td>
              <td>fecha_vencimiento</td>
              <td>{item.sub_total}</td>
              <td>{item.igv}</td>
              <td>0</td>
              <td>{item.valor_total}</td>
            </tr>
          ))}
          {contado.length > 1 && (
            <tr className={styles.footer}>
              <td colSpan={6} className={styles.end}>
                <strong>TOTAL CREDITO:</strong>
              </td>
              <td>
                <strong>
                  {handleDecimals(
                    contado
                      .reduce((acc, cc) => acc + Number(cc.sub_total), 0)
                      .toString()
                  )}
                </strong>
              </td>
              <td>
                <strong>
                  {handleDecimals(
                    contado
                      .reduce((acc, cc) => acc + Number(cc.igv), 0)
                      .toString()
                  )}
                </strong>
              </td>
              <td>
                <strong> 0
                  {/* {handleRedondearDecimales(
                    contado
                      .reduce((acc, cc) => acc + Number(cc.percep), 0)
                      .toString()
                  )} */}
                </strong>
              </td>
              <td>
                <strong> 0
                  {/* {handleRedondearDecimales(
                    contado
                      .reduce((acc, cc) => acc + Number(cc.total), 0)
                      .toString()
                  )} */}
                </strong>
              </td>
            </tr>
          )}
          {credito.length > 1 && (
            <tr className={styles.line}>
              <td colSpan={10}>
                <strong>C CREDITO</strong>
              </td>
            </tr>
          )}
          {credito.map((item) => (
            <tr>
              <td>C</td>
              <td>{item.medio_de_pago}</td>
              <td>{item.proveedor_ruc}</td>
              <td>{item.proveedor_nombre}</td>
              <td></td>
              <td></td>
              <td>{item.sub_total}</td>
              <td>{item.igv}</td>
              <td>0</td>
              <td>{item.valor_total}</td>
            </tr>
          ))}
          {credito.length > 1 && (
            <tr className={styles.footer}>
              <td colSpan={6} className={styles.end}>
                <strong>TOTAL CREDITO:</strong>
              </td>
              <td>
                <strong>
                  {handleDecimals(
                    credito
                      .reduce((acc, cc) => acc + Number(cc.sub_total), 0)
                      .toString()
                  )}
                </strong>
              </td>
              <td>
                <strong>
                  {handleDecimals(
                    credito
                      .reduce((acc, cc) => acc + Number(cc.igv), 0)
                      .toString()
                  )}
                </strong>
              </td>
              <td>
                <strong>
                  <strong>0
                    {/* {handleRedondearDecimales(
                      credito
                        .reduce((acc, cc) => acc + Number(cc.percep), 0)
                        .toString()
                    )} */}
                  </strong>
                </strong>
              </td>
              <td>
                <strong>
                  {handleRedondearDecimales(
                    credito
                      .reduce((acc, cc) => acc + Number(cc.valor_total), 0)
                      .toString()
                  )}
                </strong>
              </td>
            </tr>
          )}
          {item.ventas.length > 1 && (
            <tr className={styles.footer}>
              <td colSpan={6} className={styles.end}>
                <strong>TOTAL DIA {item.created_at}:</strong>
              </td>
              <td>
                <strong>
                  {handleDecimals(
                    item.ventas
                      .reduce((acc, cc) => acc + Number(cc.sub_total), 0)
                      .toString()
                  )}
                </strong>
              </td>
              <td>
                <strong>
                  {handleDecimals(
                    item.ventas
                      .reduce((acc, cc) => acc + Number(cc.igv), 0)
                      .toString()
                  )}
                </strong>
              </td>
              <td>
                <strong>0
                  {/* {handleRedondearDecimales(
                    item.ventas
                      .reduce((acc, cc) => acc + Number(cc.inc_percep), 0)
                      .toString()
                  )} */}
                </strong>
              </td>
              <td>
                <strong>
                  {handleRedondearDecimales(
                    item.ventas
                      .reduce((acc, cc) => acc + Number(cc.valor_total), 0)
                      .toString()
                  )}
                </strong>
              </td>
            </tr>
          )}
        </>
      );
    });
  };
  return (
    <>
      <table className={styles.table}>
        <thead>
          <tr className={styles.selected_thead}>
            <th>Tipo</th>
            <th>Nro. Documento</th>
            <th>Ruc</th>
            <th>Nombre Cliente</th>
            <th>Ingreso</th>
            <th>Vcto</th>
            <th>Base Imponible</th>
            <th>IGV</th>
            <th>icbper</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>{renderColums()}</tbody>
      </table>
    </>
  );
};
