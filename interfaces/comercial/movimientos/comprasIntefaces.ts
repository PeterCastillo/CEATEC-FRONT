export interface IArticuloCompra {
  articulo_id: string;
  articulo_nombre: string;
  cantidad: string | number;
  costo: string | number;
  total: string | number;
  almacen_id: string;
  almacen_nombre: string;
  unidad_descripcion: string;
  unidad_abreviatura: string;
  unidad_valor: string | number
}

export interface ICompra {
  _id: {
    $oid: string;
  };
  empresa_id: string;
  proveedor_id: string;
  proveedor_ruc: string;
  proveedor_nombre: string;
  documento_compra_id: string;
  documento_compra: string
  tipo_compra_id: string;
  fecha_emision: string;
  moneda_id: string;
  fecha_vencimiento: string;
  fecha_llegada: string;
  transporte: boolean;
  articulos: IArticuloCompra[];
  subtotal: number | string;
  descuento: number | string;
  igv: number | string;
  total: number | string;
  deducir_igv: boolean;
  costear_igv: boolean;
  inc_percep: boolean;
  inc: number | string;
  percep: number | string;
  created_at?: {$date: string}
  updated_at?: {$date: string}
}

export interface INewCompra {
  empresa_id: string;
  proveedor_id: string;
  proveedor_ruc: string;
  proveedor_nombre: string;
  documento_compra_id: string;
  documento_compra: string
  tipo_compra_id: string;
  fecha_emision: string;
  moneda_id: string;
  fecha_vencimiento: string;
  fecha_llegada: string;
  transporte: boolean;
  articulos: IArticuloCompra[];
  subtotal: number | string;
  descuento: number | string;
  igv: number | string;
  total: number | string;
  deducir_igv: boolean;
  costear_igv: boolean;
  inc_percep: boolean;
  inc: number | string;
  percep: number | string;
}
