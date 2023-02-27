export interface IUnit {
  _id: {
    $oid: string
  }
  descripcion: string
  abreviatura: string
  valor: number | string
  empresa_id: string
  estado: boolean
}

export interface INewUnit {
  descripcion: string
  abreviatura: string
  empresa_id: string
  valor: number | string
}
