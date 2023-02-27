export interface IArticlePrecios {
  costo: number | null
  unidad_descripcion: string;
  unidad_abreviatura: string;
  precio_1: number;
  precio_2: number;
  precio_3: number;
  precio_4: number;
  precio_5: number;
  principal: boolean;
  unidad_valor: number
}

export interface IArticleStock {
  almacen_id: string;
  almacen_descripcion: string;
  cantidad: number | string;
  prioridad: number;
}

export interface IReceivedArticle {
  _id: {
    $oid: string;
  };
  estado: boolean;
  nombre_corto: string;
  nombre_articulo: string;
  selected?: boolean;
  codigo_barras?: string;
  codigo_articulo?: string;
}

export interface INewArticle {
  grupo: {
    id: string;
    descripcion: string;
  };
  familia: {
    id: string;
    descripcion: string;
  };
  codigo_barras: string;
  codigo_articulo: string;
  expira: string;
  ubicacion: string;
  stock_actual: number | string;
  stock_minimo: number | string;
  stock_maximo: number | string;
  descripcion_utilidad: string;
  calidad: string;
  codigo_sunat: string;
  nombre_articulo: string;
  nombre_corto: string;
  marca: {
    id: string;
    descripcion: string;
  };
  estado_articulo: {
    id: string;
    descripcion: string;
  };
  exonerado_igv: boolean;
  formula_derivado: boolean;
  isc: string;
  inafec: string;
  precios: IArticlePrecios[];
  stock: IArticleStock[];
  empresa_id: string;
  estado: boolean;
}

export interface IArticle {
  _id: {
    $oid: string;
  };
  grupo: {
    id: string;
    descripcion: string;
  };
  familia: {
    id: string;
    descripcion: string;
  };
  codigo_barras: string;
  codigo_articulo: string;
  expira: string;
  ubicacion: string;
  stock_actual: number | string;
  stock_minimo: number | string;
  stock_maximo: number | string;
  descripcion_utilidad: string;
  calidad: string;
  codigo_sunat: string;
  nombre_articulo: string;
  nombre_corto: string;
  marca: {
    id: string;
    descripcion: string;
  };
  estado_articulo: {
    id: string;
    descripcion: string;
  };
  exonerado_igv: boolean;
  formula_derivado: boolean;
  isc: string;
  inafec: string;
  precios: IArticlePrecios[];
  stock: IArticleStock[];
  empresa_id: string;
  estado: boolean;
}
