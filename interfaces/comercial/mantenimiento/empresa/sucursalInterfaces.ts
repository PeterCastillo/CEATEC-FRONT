export interface IBranchOffice {
  _id: {
    $oid: string
  }
  descripcion: string
  ubicacion: string
  empresa_id: string
  estado: boolean
}

export interface INewBranchOffice {
  descripcion: string
  ubicacion: string
  empresa_id: string
}
