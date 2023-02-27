export interface ITipoDocumentoCompra {
  _id: {
    $oid: string;
  };
  descripcion: string;
  abreviatura: string;
  serie: string | number;
  correlativo: string | number;
  estado: boolean;
  empresa_id: string;
}

export interface INewTipoDocumentoCompra {
  descripcion: string;
  abreviatura: string;
  serie: string | number;
  correlativo: string | number;
  empresa_id: string;
}
