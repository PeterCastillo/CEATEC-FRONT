export interface IArticuloProveedor {
  id?: string
  _id?: {
    $oid: string
  }
  articulos: IarticuloId[]
  proveedor_id?: string
}

interface IarticuloId {
  articulo_id: string
}
