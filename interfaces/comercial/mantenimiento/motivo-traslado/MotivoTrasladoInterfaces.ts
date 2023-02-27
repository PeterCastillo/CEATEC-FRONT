export interface IMotivoTraslado {
  _id: {
    $oid: string;
  };
  notas_credito: string;
  motivo_traslado: string;
  codigo_opcional: number | null;
  estado: boolean
}

export interface INewMotivoTraslado {
  notas_credito: string;
  motivo_traslado: string;
  codigo_opcional: number | null;
}
