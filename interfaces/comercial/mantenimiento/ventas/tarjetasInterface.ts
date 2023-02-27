export interface ITarjeta {
  _id: {
    $oid: string;
  };
  descripcion: string;
  estado: boolean;
  empresa_id: string;
}
export interface INewTarjeta {
  descripcion: string;
  empresa_id: string;
}
