"use client";
import { FC, FormEvent, useState } from "react";
import { FaSave } from "react-icons/fa";
import { AiOutlineSearch } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { CgSearchFound } from "react-icons/cg";
import style from "@/app/comercial/reportes/listado-productos/page.module.scss";

interface IListadoProductos {}
interface IArti {
  art: string;
}
const articulos = [
  {
    art: "ACEITE SOYA",
  },
  {
    art: "ZAPATILLAS",
  },
  {
    art: "JAMON",
  },
  {
    art: "GUANTES",
  },
  {
    art: "ARROZ",
  },
  {
    art: "MADERA",
  },
  {
    art: "TECLADO",
  },
  {
    art: "MOUSE",
  },
  {
    art: "BILLETERAS",
  },
];
export const ListadoProductos: FC<IListadoProductos> = () => {
  const [inventarioAlmacen, setInventarioAlmacen] = useState({
    articulo: "",
  });
  const [ariticulosFilter, setArticulosFilter] = useState<IArti[]>([]);

  const handleBusquedaArticuloChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setInventarioAlmacen({
      ...inventarioAlmacen,
      [name]: value.toUpperCase(),
    });
    if (value.length >= 1) {
      const filtro = articulos.filter((item) =>
        item.art.toUpperCase().startsWith(value.toUpperCase())
      );
      setArticulosFilter(filtro);
      return;
    }
    setArticulosFilter(articulos);
  };
  const handleSelectArticulo = (item: IArti) => {
    setInventarioAlmacen({
      ...inventarioAlmacen,
      articulo: item.art.toUpperCase(),
    });
    setArticulosFilter([]);
  };
  return (
    <>
      <div className={style.content}>
        <div className={style.form}>
          <div className={style.input_group}>
            <div>
              <label htmlFor="">Grupos:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todos los Grupos</option>
              </select>
            </div>
          </div>
          <div className={style.input_group}>
            <div>
              <label htmlFor="">Familia:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todas las Familias</option>
              </select>
            </div>
          </div>
          <div className={style.select_articulo}>
            <div className={style.buscador}>
              <label htmlFor="">Articulo:</label>
              <div>
                <input autoComplete="off"
                  type="text"
                  value={inventarioAlmacen.articulo}
                  name="articulo"
                  onChange={handleBusquedaArticuloChange}
                  onBlur={() => setTimeout(() => setArticulosFilter([]), 200)}
                  onFocus={() =>
                    setArticulosFilter(
                      inventarioAlmacen.articulo
                        ? articulos.filter((item) =>
                            item.art
                              .toUpperCase()
                              .startsWith(
                                inventarioAlmacen.articulo.toUpperCase()
                              )
                          )
                        : articulos
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
            {ariticulosFilter.length >= 1 && (
              <div className={style.art_container}>
                {ariticulosFilter.map((item) => (
                  <div
                    className={style.art}
                    onClick={() => handleSelectArticulo(item)}
                    key={item.art}
                  >
                    <span className={style.icon}>
                      <CgSearchFound />
                    </span>
                    <span className={style.element}>{item.art}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={style.check}>
            <input autoComplete="off" type="checkbox" />
            <label htmlFor="">Todos los articulos</label>
          </div>
          <div className={style.radio_group_options}>
            <label htmlFor="">Movimientos:</label>
            <div className={style.group_options}>
              <div>
                <input autoComplete="off" type="radio" />
                <label htmlFor="">Lista genreal</label>
              </div>
              <div>
                <input autoComplete="off" type="radio" />
                <label htmlFor="">
                  Articulos con Unidades, Relacion y Principal
                </label>
              </div>
              <div>
                <input autoComplete="off" type="radio" />
                <label htmlFor="">Articulos con dos o mas Pricipales</label>
              </div>
              <div>
                <input autoComplete="off" type="radio" />
                <label htmlFor="">
                  Articulos ordenados por nombre (T.Inv.)
                </label>
              </div>
              <div>
                <input autoComplete="off" type="radio" />
                <label htmlFor="">
                  Articulos ordenados por nombre (T.Inv.Inc.Cant.)
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
