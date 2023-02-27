import { clsx } from "@/lib/clsx";
import style from "./Imprimir.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { Boleta } from "./Boleta";
import { IVenta } from "@/interfaces/comercial/ventas/ventasInterfaces";
import ReactToPrint from "react-to-print";
import { useRef } from "react";

export const Imprimir = ({
  show,
  setShow,
  venta,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
  venta: IVenta;
}) => {
  const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const boleta = useRef(null);

  const handleDescargarPDF = async () => {
    const referencia = document.createElement("a");
    referencia.href = `${apiUrl}/comercial/documentos/venta/${venta._id.$oid}`;
    referencia.download;
    referencia.click();
  };

  return (
    <div className={clsx(style.modal, !show && style.hidden)}>
      <div className={style.container}>
        <div className={style.header}>
          <span className={style.title}>Comprobante de Venta</span>
          <button onClick={() => setShow(false)} className={style.close}>
            <MdClose />
          </button>
        </div>
        <div className={style.options}>
          <button className={style.add} onClick={handleDescargarPDF}>
            <FaPlus /> Descargar PDF
          </button>
          <button className={style.add}>
            <FaPlus />{" "}
            <ReactToPrint
              trigger={() => <a>Imprimir Boleta</a>}
              content={() => boleta.current}
              pageStyle={`
                @page {
                  size-x: 10mm;
                }
              `}
            />
          </button>
        </div>
        <div className={style.form}>
          <div className={style.boleta} ref={boleta}>
            <h3 className={style.center}>KENTAKITO</h3>
            <div className={style.center}>DE: PINEDO IZUIZA DEYBITH</div>
            <div className={style.center}>RUC: 2015456415</div>
            <div className={style.line}></div>
            <p className={style.center}>
              <strong>FACTURA ELECTRONICA: {venta._id.$oid}</strong>
            </p>

            <div className={style.line}></div>
            <p>FECHA: {venta.created_at?.$date}</p>
            <p>NRO.DOC: {venta.documento_venta}</p>
            <p>CLIENTE: {venta.proveedor_nombre}</p>
            <p>DIRECCION: {venta.direccion}</p>

            <div className={style.line}></div>
            <div className={style.row}>
              <div className={style.start}>
                <strong>DESCRIPCION</strong>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.start}>
                <strong>CANTIDAD</strong>
              </div>
              <div className={style.special}>
                <span>
                  <strong>PRECIO</strong>
                </span>
                <span>
                  <strong>IMPORTE</strong>
                </span>
              </div>
            </div>
            <div className={style.line}></div>
            {venta.articulos.map((item) => {
              return (
                <>
                  <span key={item.articulo_id}>{item.articulo_nombre}</span>
                  <div className={style.row}>
                    <div className={style.center}>{item.cantidad}</div>
                    <div className={clsx(style.end, style.special)}>
                      <span>{item.precio}</span>
                      <span>{item.total}</span>
                    </div>
                  </div>
                </>
              );
            })}
            <div className={style.line}></div>
            <div className={style.row}>
              <div className={style.end}>SUB TOTAL</div>
              <div className={style.special}>
                <span>$/</span>
                <span>{venta.sub_total}</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.end}>DESCUENTO</div>
              <div className={style.special}>
                <span>$/</span>
                <span>{venta.descuento}</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.end}>INAFECTA</div>
              <div className={style.special}>
                <span>$/</span>
                <span>INA</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.end}>IGV(18%)</div>
              <div className={style.special}>
                <span>$/</span>
                <span>{venta.igv}</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.end}>ICBPER</div>
              <div className={style.special}>
                <span>$/</span>
                <span>ICBPER</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.end}>
                <strong>TOTAL</strong>
              </div>
              <div className={style.special}>
                <span>$/</span>
                <span>{venta.valor_total}</span>
              </div>
            </div>
            <div className={style.line}></div>
            <p>SON: VEINTI CUATRO</p>
            <div className={style.line}></div>
            <div className={style.row}>
              <div className={style.end}>EFECTIVO</div>
              <div className={style.special}>
                <span>$/</span>
                <span>00</span>
              </div>
            </div>
            <div className={style.row}>
              <div className={style.end}>VUELTO</div>
              <div className={style.special}>
                <span>$/</span>
                <span>00</span>
              </div>
            </div>
            <div className={style.line}></div>
            <p className={clsx(style.padding, style.center)}>
              <strong>
                REPRESENTACION IMPRESA DE LA BOLETA ELECTRONICA, PUEDE CONSULTAR
                EN: https/kentakito/ceatec.com.pe
              </strong>
            </p>
            <p className={clsx(style.center, style.max_with, style.padding)}>
              Bienes transferidos en la amazonia para ser considerados en las
              misma
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
