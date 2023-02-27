import { clsx } from "@/lib/clsx";
import styles from "./Articulo.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, FormEvent } from "react";
import { IArticle } from "../../../../interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IArticuloCompra } from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { ImPlus, ImPencil } from "react-icons/im";

export const Articulo = ({
  show,
  setShowModal,
  setShowArticleModal,
  handleSelectArticle,
  articulos,
  almacenes,
  unidades,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  article,
  setArticle,
  setShowEditArticleModal,
}: {
  show: boolean;
  setShowModal: (data: boolean) => void;
  setShowArticleModal: (data: boolean) => void;
  handleSelectArticle: (articulo: IArticuloCompra) => void;
  articulos: IArticle[];
  almacenes: IWareHouse[];
  unidades: IUnit[];
  showAlert: IAlert;
  setShowAlert: (data: IAlert) => void;
  closeAlertTimeOut: () => void;
  article: IArticle;
  setArticle: (state: IArticle) => void;
  setShowEditArticleModal: (state: boolean) => void;
}) => {
  const [filtros, setFiltros] = useState({
    ordenar_by: "",
    codigo: "",
    nombre: "",
    marca: "",
    stock: "",
    ubicacion: "",
  });
  const [articleSelected, setArticleSelected] = useState<IArticle>({
    _id: {
      $oid: "",
    },
    estado: true,
    grupo: {
      id: "",
      descripcion: "",
    },
    familia: {
      id: "",
      descripcion: "",
    },
    codigo_barras: "",
    codigo_articulo: "",
    expira: "",
    ubicacion: "",
    stock: [],
    stock_actual: 0,
    stock_minimo: 0,
    stock_maximo: 0,
    descripcion_utilidad: "",
    calidad: "",
    codigo_sunat: "",
    estado_articulo: {
      id: "",
      descripcion: "",
    },
    exonerado_igv: true,
    formula_derivado: true,
    nombre_corto: "",
    nombre_articulo: "",
    marca: {
      id: "",
      descripcion: "",
    },
    isc: "",
    inafec: "",
    empresa_id: "",
    precios: [],
  });
  const [articlesList, setArticlesList] = useState<IArticle[]>(articulos);

  useEffect(() => {
    setArticlesList(articulos);
  }, [articulos]);

  const handleFiltrosChange = (
    e: FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      [name]: value,
    });
    if (
      name == "codigo" ||
      name == "nombre" ||
      name == "marca" ||
      name == "stock" ||
      name == "ubicacion"
    ) {
      setFiltros({
        ...filtros,
        codigo: name == "codigo" ? value : "",
        nombre: name == "nombre" ? value : "",
        marca: name == "marca" ? value : "",
        stock: name == "stock" ? value : "",
        ubicacion: name == "ubicacion" ? value : "",
      });
    }
  };

  const errorValidateForm = (field: string) => {
    setShowAlert({
      ...showAlert,
      icon: "warning",
      title: "Campos incompletos",
      message: "Se necesita seleccionar " + field,
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleAddNewArticleVenta = () => {
    if (articleSelected._id.$oid == "") return errorValidateForm("articulo");
    handleSelectArticle({
      articulo_id: articleSelected._id.$oid,
      articulo_nombre: articleSelected.nombre_articulo,
      cantidad: "",
      costo: "",
      total: "",
      unidad_abreviatura:
        articleSelected.precios.find((item) => item.principal == true)
          ?.unidad_abreviatura ?? "",
      unidad_descripcion:
        articleSelected.precios.find((item) => item.principal == true)
          ?.unidad_descripcion ?? "",
      almacen_id: "",
      almacen_nombre: "",
      unidad_valor:
        articleSelected.precios.find((item) => item.principal == true)
          ?.unidad_valor ?? "",
    });
    setShowModal(false);
  };

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Artículos</span>
          <button onClick={() => setShowModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => setShowArticleModal(true)}
          >
            <ImPlus className={styles.plus} />
          </button>
          <button
            className={styles.option}
            onClick={() => {
              setArticleSelected({ ...articleSelected, _id: { $oid: "" } });
              article._id.$oid
                ? setShowEditArticleModal(true)
                : setShowEditArticleModal(false);
            }}
          >
            <ImPencil className={styles.pencil} />
          </button>
          <select
            name="ordenar_by"
            value={filtros.ordenar_by}
            onChange={handleFiltrosChange}
          >
            <option value="" hidden>
              Listar
            </option>
            <option value="1">Por código</option>
            <option value="2">Por nombre</option>
          </select>
          <button className={styles.add} onClick={handleAddNewArticleVenta}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Marca</th>
                <th>Stock</th>
                <th>Ubicación</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.buscador}>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="codigo"
                    value={filtros.codigo}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="nombre"
                    value={filtros.nombre}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="marca"
                    value={filtros.marca}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="stock"
                    value={filtros.stock}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="ubicacion"
                    value={filtros.ubicacion}
                    onChange={handleFiltrosChange}
                  />
                </td>
              </tr>
              {articlesList
                .filter((articulo) =>
                  filtros.codigo ||
                  filtros.nombre ||
                  filtros.marca ||
                  filtros.stock ||
                  filtros.ubicacion
                    ? (filtros.codigo &&
                        articulo.codigo_articulo.startsWith(filtros.codigo)) ||
                      (filtros.nombre &&
                        articulo.nombre_articulo
                          .toUpperCase()
                          .includes(filtros.nombre.toUpperCase())) ||
                      (filtros.marca &&
                        articulo.marca.descripcion
                          .toUpperCase()
                          .includes(filtros.marca.toUpperCase())) ||
                      (filtros.stock &&
                        articulo.stock_actual
                          .toString()
                          .toUpperCase()
                          .includes(filtros.stock.toUpperCase())) ||
                      (filtros.ubicacion &&
                        articulo.ubicacion
                          .toUpperCase()
                          .includes(filtros.ubicacion.toUpperCase()))
                    : articulo
                )
                .sort((a, b) => {
                  if (filtros.ordenar_by == "1") {
                    if (a.codigo_articulo < b.codigo_articulo) {
                      return -1;
                    }
                    if (a.codigo_articulo > b.codigo_articulo) {
                      return 1;
                    }
                  }
                  if (filtros.ordenar_by == "2") {
                    if (a.nombre_articulo < b.nombre_articulo) {
                      return -1;
                    }
                    if (a.nombre_articulo > b.nombre_articulo) {
                      return 1;
                    }
                  }
                  return 0;
                })
                .map((articulo) => (
                  <tr
                    className={`${
                      articleSelected._id.$oid == articulo._id.$oid &&
                      styles.selected_row
                    }`}
                    onClick={() => {
                      articleSelected._id.$oid == articulo._id.$oid
                        ? setArticle({
                            ...articulo,
                            _id: { $oid: "" },
                          })
                        : setArticle(articulo);
                      articleSelected._id.$oid == articulo._id.$oid
                        ? setArticleSelected({
                            ...articulo,
                            _id: { $oid: "" },
                          })
                        : setArticleSelected(articulo);
                    }}
                    key={articulo._id.$oid}
                  >
                    <td>{articulo.codigo_articulo}</td>
                    <td>{articulo.nombre_articulo}</td>
                    <td>{articulo.marca.descripcion}</td>
                    <td>{articulo.stock_actual}</td>
                    <td>{articulo.ubicacion}</td>
                  </tr>
                ))
                .reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
