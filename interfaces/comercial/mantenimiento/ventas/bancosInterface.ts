export interface IBanco {
  _id: {
    $oid: string;
  };
  nombre: string;
  cuenta_bancaria: string;
  cuenta_contable: string;
  moneda_id: string;
  empresa_id: string;
  estado: boolean;
}

export interface INewBanco {
  nombre: string;
  cuenta_bancaria: string;
  cuenta_contable: string;
  moneda_id: string;
  empresa_id: string;
}
