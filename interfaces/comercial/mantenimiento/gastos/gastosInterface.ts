export interface IGasto {
  _id: {
    $oid: string;
  };
  descripcion: string;
  cuenta_contable: number | string;
  resumen_automatico: string;
  estado: boolean;
  empresa_id: string;
}

export interface INewGasto {
  descripcion: string;
  cuenta_contable: number | string;
  resumen_automatico: string;
  empresa_id: string;
}
