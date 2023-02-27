export interface IActivateArticulo {
  articulos: IArticulo[];
}

interface IArticulo {
  articulo_id: string;
}

export interface IReceivedArticle {
  _id: {
    $oid: string;
  };
  estado: boolean;
  nombre_corto: string;
  nombre_articulo: string;
  selected?: boolean;
  stock_actual?: number | string;
  stock_minimo?: number | string;
  stock_maximo?: number | string;
  codigo_barras?: string;
  codigo_articulo?: string;
}
