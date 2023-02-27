export interface IBrand {
  _id: {
    $oid: string
  }
  descripcion: string
  empresa_id: string
  estado: boolean
}

export interface INewBrand {
  descripcion: string
  empresa_id: string 
}
