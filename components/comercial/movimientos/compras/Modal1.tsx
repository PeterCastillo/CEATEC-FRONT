import { clsx } from "@/lib/clsx";
import styles from "./Articulo.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect, FormEvent } from "react";
import { IArticle } from "../../../../interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { IAlert } from "@/interfaces/componentsInterfaces";

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
}: {
  show: boolean;
  setShowModal: (data: boolean) => void;
  setShowArticleModal: (data: boolean) => void;
  handleSelectArticle: (id: string, name: string, unidad: IUnit) => void;
  articulos: IArticle[];
  almacenes: IWareHouse[];
  unidades: IUnit[];
  showAlert: IAlert;
  setShowAlert: (data: IAlert) => void;
  closeAlertTimeOut: () => void;
}) => {
  const [unidadSelect, setUnidadSelect] = useState<IUnit>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    abreviatura: "",
    valor: "",
    empresa_id: "",
    estado: true,
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

  const handleAddNewArticleVenta = () => {
    if (articleSelected._id.$oid == "") return errorValidateForm("articulo");
    if (unidadSelect._id.$oid == "") return errorValidateForm("unidad");

    handleSelectArticle(
      articleSelected._id.$oid,
      articleSelected.nombre_articulo,
      unidadSelect
    );
    setShowModal(false);
  };

  const handleSelectUnidad = (unidad: IUnit) => {
    const existUnit = unidadSelect._id.$oid == unidad._id.$oid;
    if (existUnit) {
      return setUnidadSelect({
        _id: {
          $oid: "",
        },
        descripcion: "",
        abreviatura: "",
        valor: "",
        empresa_id: "",
        estado: true,
      });
    }
    setUnidadSelect({
      ...unidadSelect,
      descripcion: unidad.descripcion,
      abreviatura: unidad.abreviatura,
      valor: unidad.valor,
      empresa_id: unidad.empresa_id,
      _id: {
        $oid: unidad._id.$oid,
      },
    });
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
          <select
            name="almacen_id"
            value={filtros.almacen_id}
            onChange={handleFiltrosChange}
          >
            <option value="" hidden>
              Todos
            </option>

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
                  <input autoComplete="off"
                    type="text"
                    name="codigo"
                    value={filtros.codigo}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input autoComplete="off"
                    type="text"
                    name="nombre"
                    value={filtros.nombre}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input autoComplete="off"
                    type="text"
                    name="marca"
                    value={filtros.marca}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input autoComplete="off"
                    type="text"
                    name="stock"
                    value={filtros.stock}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input autoComplete="off"
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
                ))}
            </tbody>
          </table>
        </div>
        <div className={styles.header}>
          <span className={styles.title}>Unidades</span>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Unidad</th>
                <th>Descripcion</th>
              </tr>
            </thead>
            <tbody>
              {unidades.map((unidad, index) => (
                <tr
                  className={`${
                    unidadSelect._id.$oid == unidad._id.$oid &&
                    styles.selected_row
                  }`}
                  key={unidad._id.$oid}
                  onClick={() => handleSelectUnidad(unidad)}
                >
                  <td>{unidad.abreviatura}</td>
                  <td>{unidad.descripcion}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
