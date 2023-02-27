export interface IWareHouse {
  _id: {
    $oid: string
  }
  descripcion: string
  ubicacion: string
  estado: boolean
  sucursal_id: string
  empresa_id: string
}

export interface INewWareHouse {
  descripcion: string
  ubicacion: string
  sucursal_id: string
  empresa_id: string
}
