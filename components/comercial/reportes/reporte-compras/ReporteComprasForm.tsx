"use client";
import { FC, useState, FormEvent } from "react";
import style from "@/app/comercial/reportes/reporte-compras/page.module.scss";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IReporteCompra } from "@/interfaces/comercial/reporte/reporteCompra/reporteCompraIntefaces";
import { SelectDinamico } from "@/components/commons/select/Select";

interface IReporteComprasForm {
  proveedores: IClientProvider[];
  cajas: IBox[];
  reporteCompra: IReporteCompra;
  setReporteCompra: (state: IReporteCompra) => void;
}

export const ReporteComprasForm: FC<IReporteComprasForm> = ({
  cajas,
  proveedores,
  reporteCompra,
  setReporteCompra,
}) => {
  const [modalProveedor, setModalProveedor] = useState(false);

  const handleSelectProveedor = (value: string) => {
    if (value == "TODOS") {
      setReporteCompra({
        ...reporteCompra,
        proveedor_id: "TODOS",
      });
      return;
    }
    const proveedor = proveedores.find((item) => item._id.$oid == value);
    if (proveedor) {
      setReporteCompra({
        ...reporteCompra,
        proveedor_id: proveedor._id.$oid,
      });
    }
  };

  const handleSelectCaja = (value: string) => {
    if (value == "TODOS") {
      setReporteCompra({
        ...reporteCompra,
        caja_id: "TODOS",
      });
      return;
    }
    const caja = cajas.find((item) => item._id.$oid == value);
    if (caja) {
      setReporteCompra({
        ...reporteCompra,
        caja_id: caja._id.$oid,
      });
    }
  }

  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setReporteCompra({
      ...reporteCompra,
      [name]: value,
    });
  };

  const handleResumenCheckBox = () => {
    setReporteCompra({
      ...reporteCompra,
      resumen_consolidado: !reporteCompra.resumen_consolidado,
    });
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.form}>
          <div>
            <label htmlFor="">Proveedor:</label>
            <SelectDinamico
              handleChange={handleSelectProveedor}
              dataList={[
                {
                  id: "TODOS",
                  descripcion: "TODOS",
                },
                ...proveedores.map((item) => {
                  return {
                    id: item._id.$oid,
                    descripcion:
                      item.nombre_comercial 
                      ? item.nombre_comercial 
                      : item.nombre_natural.concat(
                        item.apellido_paterno_natural,
                        item.apellido_materno_natural
                      ),
                  };
                }),
              ]}
              setModal={setModalProveedor}
              value={reporteCompra.proveedor_id}
            />
          </div>
          <div className={style.separator}>
            <div className={style.line}></div>
            <span className={style.subtitle}>
              <div className={style.colum_radio}>
                <div>
                  <div>
                    <input
                      autoComplete="off"
                      id="RESUMIDO"
                      type="radio"
                      value={"RESUMIDO"}
                      name="resumido_detallado"
                      checked={reporteCompra.resumido_detallado == "RESUMIDO"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="RESUMIDO">Resumido</label>
                  </div>
                  <div>
                    <input
                      autoComplete="off"
                      id="DETALLADO"
                      type="radio"
                      value={"DETALLADO"}
                      name="resumido_detallado"
                      checked={reporteCompra.resumido_detallado == "DETALLADO"}
                      onChange={handleInputChange}
                    />
                    <label htmlFor="DETALLADO">Detallado</label>
                  </div>
                </div>
              </div>{" "}
            </span>
            <div className={style.line}></div>
          </div>
          <div className={style.colum_radio}>
            <label htmlFor="">Ordenar por:</label>
            <div className={style.radio}>
              <div>
                <input
                  autoComplete="off"
                  id="CLIENTE"
                  type="radio"
                  value={"CLIENTE"}
                  name="ordenado_por"
                  checked={reporteCompra.ordenado_por == "CLIENTE"}
                  onChange={handleInputChange}
                />
                <label htmlFor="CLIENTE">Cleinte/Proveedor</label>
              </div>
              <div>
                <input
                  autoComplete="off"
                  id="DOCUMENTO"
                  type="radio"
                  value={"DOCUMENTO"}
                  name="ordenado_por"
                  checked={reporteCompra.ordenado_por == "DOCUMENTO"}
                  onChange={handleInputChange}
                />
                <label htmlFor="DOCUMENTO">Documento</label>
              </div>
              {/* <div>
                <input autoComplete="off" type="checkbox" />
                <label htmlFor="">Con Hora</label>
              </div> */}
            </div>
          </div>
          <div className={style.input_colum}>
            <label htmlFor="caja_id">Cajero:</label>
            <SelectDinamico
              handleChange={handleSelectCaja}
              dataList={[
                {
                  id: "TODOS",
                  descripcion: "TODOS",
                },
                ...cajas.map((item) => {
                  return {
                    id: item._id.$oid,
                    descripcion: item.descripcion
                  };
                }),
              ]}
              setModal={setModalProveedor}
              value={reporteCompra.caja_id}
            />
          </div>
          <div className={style.colum_radio_especil}>
            <div>
              <input
                autoComplete="off"
                type="radio"
                id="BVT + FAC + TCK"
                value={"BVT + FAC + TCK"}
                name="tipo_documento"
                checked={reporteCompra.tipo_documento == "BVT + FAC + TCK"}
                onChange={handleInputChange}
              />
              <label htmlFor="BVT + FAC + TCK">BVT + FAC + TCK</label>
            </div>
            <div>
              <input
                autoComplete="off"
                type="radio"
                id="BVT"
                value={"BVT"}
                name="tipo_documento"
                checked={reporteCompra.tipo_documento == "BVT"}
                onChange={handleInputChange}
              />
              <label htmlFor="BVT">BVT</label>
            </div>
            <div>
              <input
                autoComplete="off"
                type="radio"
                id="FAC"
                value={"FAC"}
                name="tipo_documento"
                checked={reporteCompra.tipo_documento == "FAC"}
                onChange={handleInputChange}
              />
              <label htmlFor="FAC">FAC</label>
            </div>
            <div>
              <input
                autoComplete="off"
                type="radio"
                id="OTROS"
                value={"OTROS"}
                name="tipo_documento"
                checked={reporteCompra.tipo_documento == "OTROS"}
                onChange={handleInputChange}
              />
              <label htmlFor="OTROS">Otros</label>
            </div>
          </div>
          <div className={style.separator}>
            <div className={style.line}></div>
            <span className={style.subtitle}>PARAMETROS</span>
            <div className={style.line}></div>
          </div>
          <div className={style.input_group}>
            <div>
              <label htmlFor="fecha_inicio">Fecha de inicio:</label>
              <input
                autoComplete="off"
                id="fecha_inicio"
                type="date"
                name="fecha_inicio"
                value={reporteCompra.fecha_inicio}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="fecha_fin">Fecha de fin:</label>
              <input
                autoComplete="off"
                id="fecha_fin"
                type="date"
                name="fecha_fin"
                value={reporteCompra.fecha_fin}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={style.check}>
            <input
              autoComplete="off"
              id="cc"
              type="checkbox"
              onChange={handleResumenCheckBox}
              checked={reporteCompra.resumen_consolidado}
            />
            <label htmlFor="cc">Resumen consolidado</label>
          </div>
        </div>
      </div>
    </>
  );
};
