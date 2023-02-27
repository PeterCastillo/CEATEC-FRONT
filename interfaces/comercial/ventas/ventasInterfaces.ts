export interface IArticuloVenta {
  articulo_id: string;
  articulo_nombre: string;
  cantidad: string | number;
  precio: string | number | undefined;
  total: string | number | undefined;
  unidad_abreviatura: string;
  unidad_descripcion: string;
  unidad_valor: string | number
  almacen_id: string;
  almacen_descripcion: string;
}

export interface IGuiaRemision {
  transportista_ruc: string;
  transportista_rs: string;
  conductor_dni: string;
  conductor_nombre: string;
  motivo_traslado_id: string;
  fecha_traslado: string;
  partida_direccion: string;
  partida_ubigeo: string;
  llegada_direccion: string;
  llegada_ubigeo: string;
  vehiculo_placa: string;
  vehiculo_marca: string;
}

export interface IVenta {
  _id: {
    $oid: string;
  };
  empresa_id: string;
  proveedor_id: string;
  proveedor_ruc: string;
  proveedor_nombre: string;
  direccion: string;
  direccion_entrega: string;
  moneda_id: string;
  documento_venta_id: string;
  documento_venta: string;
  medio_de_pago: string;
  trans_grat: string | number;
  descuento: string | number;
  sub_total: string | number;
  deducir_igv: boolean
  calcular_igv: boolean
  igv: string | number;
  valor_total: string | number;
  pago_efectivo: string | number
  vuelto: string | number
  articulos: IArticuloVenta[];
  guia_remision?: IGuiaRemision
  created_at?: {$date: string}
  updated_at?: {$date: string}
}

export interface INewVenta {
  empresa_id: string;
  proveedor_id: string;
  proveedor_ruc: string;
  proveedor_nombre: string;
  direccion: string;
  direccion_entrega: string;
  documento_venta_id: string;
  documento_venta: string;
  moneda_id: string;
  medio_de_pago: string;
  articulos: IArticuloVenta[];
  trans_grat: string | number;
  descuento: string | number;
  sub_total: string | number;
  deducir_igv: boolean
  calcular_igv: boolean
  igv: string | number;
  valor_total: string | number;
  pago_efectivo: string | number
  vuelto: string | number
  guia_remision?: IGuiaRemision
}
