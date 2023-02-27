import { clsx } from "@/lib/clsx";
import styles from "./Articulo.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import {
  IArticle,
  IArticlePrecios,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { FormEvent, useState, useEffect } from "react";
import { IArticuloVenta } from "@/interfaces/comercial/ventas/ventasInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";

export const Articulo = ({
  show,
  setShowModal,
  articulos,
  handleAddArticle,
  almacenes,
  closeAlertTimeOut,
  showAlert,
  setShowAlert,
}: {
  show: boolean;
  setShowModal: (data: boolean) => void;
  articulos: IArticle[];
  handleAddArticle: (articulo: IArticuloVenta) => void;
  almacenes: IWareHouse[];
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
}) => {
  const [articleSelected, setArticleSelected] = useState<IArticle>({
    _id: {
      $oid: "",
    },
    estado: false,
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
    stock_actual: "",
    stock_minimo: "",
    stock_maximo: "",
    descripcion_utilidad: "",
    calidad: "",
    codigo_sunat: "",
    exonerado_igv: false,
    formula_derivado: false,
    nombre_corto: "",
    nombre_articulo: "",
    marca: {
      id: "",
      descripcion: "",
    },
    isc: "",
    estado_articulo: {
      id: "",
      descripcion: "",
    },
    inafec: "",
    empresa_id: "",
    precios: [],
  });
  const [precioSelected, setPrecioSelected] = useState({
    id: "" as string,
    key: "precio_5" as keyof IArticlePrecios,
    unidad_id: "" as string,
    unidad_descripcion: "" as string,
    unidad_abreviatura: "" as string,
    unidad_valor: "",
    precio: "" as string,
  });
  const [filtros, setFiltros] = useState({
    ordenar_by: "",
    almacen_id: "",
    codigo: "",
    nombre: "",
    marca: "",
    stock: "",
    ubicacion: "",
  });

  const handlePrecioChange = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setPrecioSelected({
      ...precioSelected,
      [name]: value,
    });
  };

  const handleFiltrosChange = (
    e: FormEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    setArticleSelected({
      ...articleSelected,
      _id: { $oid: "" },
    });

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
    if (articleSelected._id.$oid.trim() == "") {
      return errorValidateForm("un articulo");
    }
    if (precioSelected.id.trim() == "") {
      return errorValidateForm("unidad");
    }
    if (precioSelected.unidad_descripcion.trim() == "") {
      return errorValidateForm("un precio");
    }
    const precio = articleSelected.precios.find(
      (precio, index) => index == Number(precioSelected.id)
    );
    if (precio) {
      handleAddArticle({
        articulo_id: articleSelected._id.$oid,
        articulo_nombre: articleSelected.nombre_articulo,
        precio:
          typeof precio[precioSelected.key] === "number"
            ? precio[precioSelected.key]?.toString()
            : precio["precio_5"],
        cantidad: 1,
        total:
          typeof precio[precioSelected.key] === "number"
            ? precio[precioSelected.key]?.toString()
            : precio["precio_5"],
        unidad_valor: precioSelected.unidad_valor,
        unidad_abreviatura: precioSelected.unidad_abreviatura,
        unidad_descripcion: precioSelected.unidad_descripcion,
        almacen_id: filtros.almacen_id,
        almacen_descripcion:
          almacenes.find((almacen) => almacen._id.$oid == filtros.almacen_id)
            ?.descripcion ?? "",
      });
      setArticleSelected({
        ...articleSelected,
        _id: {
          $oid: "",
        },
      });
      setPrecioSelected({
        ...precioSelected,
        id: "",
      });
      setShowModal(false);
      return;
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };

  useEffect(() => {
    const almacen_id  = almacenes.find((almacen) => almacen.descripcion == "PRINCIPAL")?._id
    .$oid ?? ""
    setFiltros({
      ...filtros,
      almacen_id: almacen_id
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [almacenes]);

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
          {/* <button onClick={() => setShowArticleModal(true)}><ImPlus className={styles.plus} /></button>
          <button><ImPencil className={styles.pencil} /></button> */}
          <select
            name="almacen_id"
            value={filtros.almacen_id}
            onChange={handleFiltrosChange}
          >
            <option value="" hidden></option>
            {almacenes.map((almacen) => (
              <option value={almacen._id.$oid} key={almacen._id.$oid}>
                {almacen.descripcion}
              </option>
            ))}
          </select>
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
          <select
            name="key"
            id=""
            value={precioSelected.key}
            onChange={handlePrecioChange}
          >
            <option value="precio_1">Precio 1</option>
            <option value="precio_2">Precio 2</option>
            <option value="precio_3">Precio 3</option>
            <option value="precio_4">Precio 4</option>
            <option value="precio_5">Precio 5</option>
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
              {articulos
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
                .filter((articulo) =>
                  filtros.almacen_id && articulo.stock
                    ? articulo.stock.find(
                        (stock) => stock.almacen_id == filtros.almacen_id
                      )
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
                      setPrecioSelected({ ...precioSelected, id: "" });
                      if (articleSelected._id.$oid == articulo._id.$oid) {
                        setArticleSelected({
                          ...articulo,
                          _id: { $oid: "" },
                        });
                        setPrecioSelected({ ...precioSelected, id: "" });
                      } else {
                        setArticleSelected(articulo);
                        for (let i = 0; i < articulo.precios.length; i++) {
                          if (articulo.precios[i].principal) {
                            return setPrecioSelected({
                              ...precioSelected,
                              id: i.toString(),
                              unidad_abreviatura:
                                articulo.precios[i].unidad_abreviatura,
                              unidad_descripcion:
                                articulo.precios[i].unidad_descripcion,
                            });
                          }
                        }
                        if (articulo.precios[0]) {
                          setPrecioSelected({
                            ...precioSelected,
                            id: "0",
                            unidad_abreviatura:
                              articulo.precios[0].unidad_abreviatura,
                            unidad_descripcion:
                              articulo.precios[0].unidad_descripcion,
                          });
                        }
                        // preselecteUnidad
                      }
                    }}
                    key={articulo._id.$oid}
                  >
                    <td>{articulo.codigo_articulo}</td>
                    <td>{articulo.nombre_articulo}</td>
                    <td>{articulo.marca.descripcion}</td>
                    <td>
                      {
                        articulo.stock.find(
                          (item) => item.almacen_id == filtros.almacen_id
                        )?.cantidad
                      }
                    </td>
                    <td>{articulo.ubicacion}</td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.header}>
          <span className={styles.title}>Precios</span>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Precio 1</th>
                <th>Precio 2</th>
                <th>Precio 3</th>
                <th>Precio 4</th>
                <th>Precio 5</th>
              </tr>
            </thead>
            <tbody>
              {articleSelected._id.$oid ? (
                articleSelected.precios.map((precio, index) => (
                  <tr
                    className={`${
                      precioSelected.id == index.toString() &&
                      styles.selected_row
                    }`}
                    onClick={() =>
                      setPrecioSelected({
                        ...precioSelected,
                        id: index.toString(),
                        unidad_descripcion: precio.unidad_descripcion,
                        unidad_abreviatura: precio.unidad_abreviatura,
                        unidad_valor: precio.unidad_valor.toString()
                      })
                    }
                  >
                    <td>{precio.unidad_descripcion}</td>
                    <td
                      className={`${
                        precioSelected.id == index.toString() &&
                        precioSelected.key == "precio_1" &&
                        styles.selected_data
                      }`}
                    >
                      {precio.precio_1}
                    </td>
                    <td
                      className={`${
                        precioSelected.id == index.toString() &&
                        precioSelected.key == "precio_2" &&
                        styles.selected_data
                      }`}
                    >
                      {precio.precio_2}
                    </td>
                    <td
                      className={`${
                        precioSelected.id == index.toString() &&
                        precioSelected.key == "precio_3" &&
                        styles.selected_data
                      }`}
                    >
                      {precio.precio_3}
                    </td>
                    <td
                      className={`${
                        precioSelected.id == index.toString() &&
                        precioSelected.key == "precio_4" &&
                        styles.selected_data
                      }`}
                    >
                      {precio.precio_4}
                    </td>
                    <td
                      className={`${
                        precioSelected.id == index.toString() &&
                        precioSelected.key == "precio_5" &&
                        styles.selected_data
                      }`}
                    >
                      {precio.precio_5}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td>Seleccione un articulo</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
