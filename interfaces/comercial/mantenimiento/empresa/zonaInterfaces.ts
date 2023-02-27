export interface IZone {
  _id: {
    $oid: string
  }
  zona: string
  descripcion: string
  empresa_id: string
  estado: boolean
}

export interface INewZone {
  zona: string
  descripcion: string
  empresa_id: string
}
