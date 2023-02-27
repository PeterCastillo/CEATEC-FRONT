export interface ITipoNivelAcceso {
  _id: {
    $oid: string;
  };
  nombre: string;
  estado: boolean;
  empresa_id: string;
}

export interface INewTipoNivelAcceso {
  nombre: string;
  estado: boolean;
  empresa_id: string;
}
