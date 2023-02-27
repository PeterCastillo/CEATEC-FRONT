"use client";

import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces"; 
import { FC, SetStateAction, Dispatch } from "react";
import styles from "@/styles/Form.module.scss";
import { ArticulosDataTable } from "./ArticulosDataTable";
import { IReceivedArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces"; 
import { ArticulosSaveDataTable } from "./ArticulosSaveDataTable";

interface IArticulosXProveedorForm {
  proveedorSelected: IClientProvider;
  articles: IReceivedArticle[];
  handleSelectedArticles: (data: ISelectedArticle[]) => void;
  handleDeleteSaveArticle: (id: string) => void;
  articulosProveedor: any;
  setSelectedArticles: Dispatch<SetStateAction<ISelectedArticle[]>>;
  selectedArticles: ISelectedArticle[];
}

interface IArticulosSelected {
  articulo: {
    id: string | undefined;
    nombre_articulo: string;
    marca: string;
  };
  _id: {
    $oid: string;
  };
}

interface ISelectedArticle {
  articulo_id: string;
}

export const ArticulosXProveedorForm: FC<IArticulosXProveedorForm> = ({
  handleSelectedArticles,
  handleDeleteSaveArticle,
  setSelectedArticles,
  proveedorSelected,
  articles,
  articulosProveedor,
  selectedArticles,
}) => {
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="proveedor">Proveedor</label>
          <input autoComplete="off"
            id="proveedor"
            name="proveedor"
            type="text"
            defaultValue={
              proveedorSelected.nombre_comercial.length > 0
                ? proveedorSelected.nombre_comercial
                : proveedorSelected.nombre_natural +
                  " " +
                  proveedorSelected.apellido_paterno_natural +
                  " " +
                  proveedorSelected.apellido_materno_natural
            }
            readOnly
          />
        </div>
      </div>

      <span>ARTICULOS</span>

      <div>
        <ArticulosDataTable
          rows={100}
          columns={articles}
          action={handleSelectedArticles}
          setSelectedArticles={setSelectedArticles}
          selectedArticles={selectedArticles}
        />
      </div>

      <span>ARTICULOS GUARDADOS</span>

      <div>
        <ArticulosSaveDataTable
          rows={100}
          columns={articulosProveedor}
          action={handleDeleteSaveArticle}
        />
      </div>
    </>
  );
};
