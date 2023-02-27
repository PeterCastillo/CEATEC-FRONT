export interface IGroup {
  _id: {
    $oid: string
  }
  descripcion: string
  empresa_id: string
  codigo_grupo?: string 
  estado: boolean
}

export interface INewGroup {
  descripcion: string
  empresa_id: string
}
