export interface ITypesBusiness {
  _id: {
    $oid: string
  }
  nombre: string
  estado: boolean
}

export interface INewTypesBusiness {
  nombre: string
}
