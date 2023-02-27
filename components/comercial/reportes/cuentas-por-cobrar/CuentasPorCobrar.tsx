"use client";
import { FC, useState, FormEvent } from "react";
import { FaSave } from "react-icons/fa";
import { CgSearchFound } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import style from "@/app/comercial/reportes/cuentas-por-cobrar/page.module.scss";

interface ICuentasPorCobrar {}
interface IProvee {
  prove: string;
}
const proveedores = [
  {
    prove: "Peter",
  },
  {
    prove: "Tomas",
  },
  {
    prove: "Adriana",
  },
  {
    prove: "Raul",
  },
  {
    prove: "Jose",
  },
  {
    prove: "Alexandra",
  },
  {
    prove: "Maria",
  },
  {
    prove: "Jack",
  },
  {
    prove: "Jackson",
  },
];
export const CuentasPorCobrar: FC<ICuentasPorCobrar> = () => {
  const [reporteVenta, setReporteVenta] = useState({
    proveedor: "",
  });
  const [proveedoresFilter, setProveedoresFilter] = useState<IProvee[]>([]);

  const handleBusquedaProveedorChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setReporteVenta({
      ...reporteVenta,
      [name]: value.toUpperCase(),
    });
    if (value.length >= 1) {
      const filtro = proveedores.filter((item) =>
        item.prove.toUpperCase().startsWith(value.toUpperCase())
      );
      setProveedoresFilter(filtro);
      return;
    }
    setProveedoresFilter(proveedores);
  };
  const handleSelectArticulo = (item: IProvee) => {
    setReporteVenta({
      ...reporteVenta,
      proveedor: item.prove.toUpperCase(),
    });
    setProveedoresFilter([]);
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.form}>
          <div className={style.input_group}>
            <div>
              <label htmlFor="">Zonas:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todas las Zonas</option>
              </select>
            </div>
          </div>
          <div className={style.input_group}>
            <div>
              <label htmlFor="">Sectores:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todas los Sectores</option>
              </select>
            </div>
          </div>
          <div className={style.select_articulo}>
            <div className={style.buscador}>
              <label htmlFor="">Proveedores:</label>
              <div>
                <input autoComplete="off"
                  type="text"
                  value={reporteVenta.proveedor}
                  name="proveedor"
                  onChange={handleBusquedaProveedorChange}
                  onBlur={() => setTimeout(() => setProveedoresFilter([]), 200)}
                  onFocus={() =>
                    setProveedoresFilter(
                      reporteVenta.proveedor
                        ? proveedores.filter((item) =>
                            item.prove
                              .toUpperCase()
                              .startsWith(reporteVenta.proveedor.toUpperCase())
                          )
                        : proveedores
                    )
                  }
                />
                <span className={style.search}>
                  <AiOutlineSearch />
                </span>
                <span className={style.delete}>
                  <FiX />
                </span>
              </div>
            </div>
            {proveedoresFilter.length >= 1 && (
              <div className={style.art_container}>
                {proveedoresFilter.map((item) => (
                  <div
                    className={style.art}
                    onClick={() => handleSelectArticulo(item)}
                    key={item.prove}
                  >
                    <span className={style.icon}>
                      <CgSearchFound />
                    </span>
                    <span className={style.element}>{item.prove}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.check}>
            <input autoComplete="off" type="checkbox" />
            <label htmlFor="">Todos los proveedores</label>
          </div>
          <div className={style.separator}>
            <div className={style.line}></div>
            <span className={style.subtitle}>
              <div className={style.colum_radio}>
                <div className={style.content_radios}>
                  <div>
                    <input autoComplete="off" type="radio" />
                    <label htmlFor="">Resumido</label>
                  </div>
                  <div>
                    <input autoComplete="off" type="radio" />
                    <label htmlFor="">Detallado</label>
                  </div>
                  <div>
                    <input autoComplete="off" type="radio" />
                    <label htmlFor="">Listado general</label>
                  </div>
                </div>
              </div>
            </span>
            <div className={style.line}></div>
          </div>
          <div className={style.separator}>
            <div className={style.line}></div>
            <span className={style.subtitle}>PARAMETROS</span>
            <div className={style.line}></div>
          </div>
          <div className={style.input_group}>
            <div>
              <label htmlFor="">Fecha de inicio:</label>
              <input autoComplete="off" type="date" />
            </div>
            <div>
              <label htmlFor="">Fecha de fin:</label>
              <input autoComplete="off" type="date" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
