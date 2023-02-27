export interface ISector {
  _id: {
    $oid: string
  }
  descripcion: string
  sector: string
  empresa_id: string
  estado: boolean
}

export interface INewSector {
  sector: string
  descripcion: string
  empresa_id: string
}