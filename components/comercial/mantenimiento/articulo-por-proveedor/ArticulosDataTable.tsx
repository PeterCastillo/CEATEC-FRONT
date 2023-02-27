"use client";
import {
  FC,
  useState,
  FormEvent,
  useEffect,
  Dispatch,
  SetStateAction,
} from "react";
import styles from "@/styles/DataTable.module.scss";
import { IReceivedArticle } from "@/interfaces/comercial/mantenimiento/otros/restaurarArticulosInterface";

interface IArticulosDataTable {
  rows: number;
  columns: IReceivedArticle[];
  action: (data: ISelectedArticle[]) => void;
  setSelectedArticles: Dispatch<SetStateAction<ISelectedArticle[]>>;
  selectedArticles: ISelectedArticle[];
}

interface ISelectedArticle {
  articulo_id: string;
}

export const ArticulosDataTable: FC<IArticulosDataTable> = ({
  rows,
  columns,
  action,
  setSelectedArticles,
  selectedArticles,
}) => {
  const [pagination, setPagination] = useState(1);
  const [articles, setArticles] = useState<IReceivedArticle[]>(columns);

  useEffect(() => {
    setArticles(columns);
  }, [columns]);

  const searchArticles = (event: FormEvent<HTMLInputElement>) => {};

  const handleSelectArticles = (id: string) => {
    const newArticles = articles.map((article) => {
      if (article._id.$oid == id) {
        if (!article.selected) {
          return { ...article, selected: true };
        }
        return { ...article, selected: !article.selected };
      }
      return article;
    });
    let formatedArticlesSelected: ISelectedArticle[] = [];
    for (let index = 0; index < newArticles.length; index++) {
      if (newArticles[index].selected) {
        formatedArticlesSelected.push({
          articulo_id: newArticles[index]._id.$oid,
        });
      }
    }
    setArticles(newArticles);
    setSelectedArticles(formatedArticlesSelected);
    action(formatedArticlesSelected);
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
      .map((column, index) => (
        <tr
          key={index}
          onClick={() => handleSelectArticles(column._id.$oid)}
          className={`${
            selectedArticles.filter(
              (selectedArticle) =>
                selectedArticle.articulo_id == column._id.$oid
            ).length && styles.selected_row
          }`}
        >
          <td>{column.nombre_articulo}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Contacto</th>
        </tr>
      </thead>
      <tbody>
        {/* <tr className={styles.buscador}>
          <td>
            <input autoComplete="off"
              type="text"
              name="dni_ruc"
              value={filtros.dni_ruc}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="nombre_razon_social"
              value={filtros.nombre_razon_social}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input autoComplete="off"
              type="text"
              name="direccion"
              value={filtros.direccion}
              onChange={handleFiltrosChange}
            />
          </td>
        </tr> */}
        {renderRows()}
      </tbody>
    </table>
  );
};
