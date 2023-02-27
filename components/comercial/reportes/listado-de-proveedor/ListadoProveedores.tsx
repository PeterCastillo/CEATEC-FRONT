"use client";
import { FC, FormEvent, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { CgSearchFound } from "react-icons/cg";
import style from "@/app/comercial/reportes/listado-de-proveedor/page.module.scss";

interface IListadoDeProveedor {}
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
export const ListadoDeProveedor: FC<IListadoDeProveedor> = () => {
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
              <label htmlFor="">Zonas:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todas los Zonas</option>
              </select>
            </div>
          </div>
          <div className={style.input_group}>
            <div>
              <label htmlFor="">Sectores:</label>
              <select name="" id="">
                <option value="" hidden></option>
                <option value="">Todos los Sectores</option>
              </select>
            </div>
          </div>
          <div className={style.select_articulo}>
            <div className={style.buscador}>
              <label htmlFor="">Proveedores:</label>
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
            <label htmlFor="">Todos los proveedores</label>
          </div>
        </div>
      </div>
    </>
  );
};
