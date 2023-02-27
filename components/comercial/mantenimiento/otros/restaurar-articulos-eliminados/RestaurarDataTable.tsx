"use client";
import styles from "@/styles/DataTable.module.scss";
import { FC, useState, FormEvent, useEffect } from "react";
import { IReceivedArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";

interface IArticleSelected {
  articulo_id: string;
}

interface IRestaurarDataTable {
  rows: number;
  columns: IReceivedArticle[];
  action: (data: IArticleSelected[]) => void;
  restartArticle: () => void;
}

export const RestaurarDataTable: FC<IRestaurarDataTable> = ({
  rows,
  columns,
  action,
  restartArticle,
}) => {
  const [pagination, setPagination] = useState(1);
  const [articles, setArticles] = useState(columns);
  const [articlesSelected, setArticlesSelected] = useState<IArticleSelected[]>(
    []
  );
  const [filtros, setFiltros] = useState({
    codigo_articulo: "",
    codigo_barras: "",
    nombre: "",
  });

  useEffect(() => {
    searchArticulos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setArticles(columns);
  }, [columns]);

  useEffect(() => {
    action(articlesSelected);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [articlesSelected]);

  const handleSelectedArticle = (id: string) => {
    const exist = articlesSelected.filter(
      (articleselected) => articleselected.articulo_id == id
    );
    if (exist.length) {
      const filterArticlesSelected = articlesSelected.filter(
        (articleSelected) => articleSelected.articulo_id !== id
      );
      return setArticlesSelected(filterArticlesSelected);
    }
    setArticlesSelected([...articlesSelected, { articulo_id: id }]);
  };

  const updatePagination = (_action: string) => {
    if (_action === "next") {
      return setPagination(pagination + 1);
    }
    return setPagination(pagination - 1);
  };

  const searchArticulos = () => {
    const filterArticles = columns.filter((articulo) => {
      if (filtros.codigo_articulo) {
        return articulo.codigo_articulo?.includes(filtros.codigo_articulo);
      }
      if (filtros.codigo_barras) {
        return articulo.codigo_barras?.includes(filtros.codigo_barras);
      }
      if (filtros.nombre) {
        return articulo.nombre_articulo?.includes(filtros.nombre);
      }

      return articulo;
    });
    setArticles(filterArticles);
  };

  const renderRows = () => {
    const startIndex = rows * pagination - rows;
    const endIndex = rows * pagination;
    if (!articles.length) {
      return (
        <tr>
          <td>No tiene datos</td>
        </tr>
      );
    }
    return articles
      .map((article, index) => (
        <tr
          key={index}
          onClick={() => handleSelectedArticle(article._id.$oid)}
          className={`${articlesSelected.filter(
            (articleSelect) => articleSelect.articulo_id == article._id.$oid
          ).length && styles.selected_row
            }`}
        >
          <td>{article.codigo_articulo}</td>
          <td>{article.codigo_barras}</td>
          <td>{article.nombre_articulo}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    const initialForm = {
      codigo_articulo: "",
      codigo_barras: "",
      nombre: "",
    };
    if (name == "codigo_articulo") {
      return setFiltros({
        ...initialForm,
        codigo_articulo: value.toUpperCase(),
      });
    }
    if (name == "codigo_barras") {
      return setFiltros({ ...initialForm, codigo_barras: value.toUpperCase() });
    }
    if (name == "nombre") {
      return setFiltros({
        ...initialForm,
        nombre: value.toUpperCase(),
      });
    }
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Codigo articulo</th>
          <th>Codigo de barras</th>
          <th>Nombre</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.buscador}>
          <td>
            <input autoComplete="off"
              type="text"
              name="codigo_articulo"
              value={filtros.codigo_articulo}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="codigo_barras"
              value={filtros.codigo_barras}
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
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
