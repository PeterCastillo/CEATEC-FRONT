export interface IBox {
  _id: {
    $oid: string;
  };
  descripcion: string;
  ubicacion: string;
  usuario_id: string;
  sucursal_id: string;
  codigo_boleta_predeterminada: string;
  codigo_factura_predeterminada: string;
  empresa_id: string;
  estado: boolean;
}

export interface INewBox {
  descripcion: string;
  ubicacion: string;
  usuario_id: string;
  sucursal_id: string;
  codigo_boleta_predeterminada: string;
  empresa_id: string;
  codigo_factura_predeterminada: string;
}
