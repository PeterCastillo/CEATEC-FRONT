"use client";
import { FC, useState, FormEvent } from "react";
import { FaSave } from "react-icons/fa";
import { CgSearchFound } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import style from "@/app/comercial/reportes/movimiento-egreso-caja/page.module.scss";

interface IMovimientoEgresoCaja {}
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
export const MovimientoEgresoCaja: FC<IMovimientoEgresoCaja> = () => {
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
              <label htmlFor="">Unidades:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todas los Unidades</option>
              </select>
            </div>
          </div>
          <div className={style.separator}>
            <div className={style.line}></div>
            <span className={style.subtitle}>
              <div className={style.check}>
                <input autoComplete="off" type="checkbox" />
                <label htmlFor="">Periodo de movimiento</label>
              </div>
            </span>
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
          <div className={style.check}>
                <input autoComplete="off" type="checkbox" />
                <label htmlFor="">Incluir Saldo de fechas anteriores</label>
              </div>
        </div>
      </div>
    </>
  );
};
