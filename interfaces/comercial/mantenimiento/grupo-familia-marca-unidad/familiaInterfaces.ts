export interface IFamily {
  _id: {
    $oid: string
  }
  descripcion: string
  grupo_id: string
  cuenta_compra_debe: string
  cuenta_venta_debe: string
  cuenta_venta_haber: string
  cuenta_compra_haber: string
  cuenta_mercaderia: string
  cuenta_prod_manufac: string
  exonerado_igv: boolean
  considerar_en_venta: boolean
  codigo_familia?: string
  estado: boolean
  empresa_id: string
}

export interface INewFamily {
  descripcion: string
  grupo_id: string
  cuenta_compra_debe: string
  cuenta_venta_debe: string
  cuenta_venta_haber: string
  cuenta_compra_haber: string
  cuenta_mercaderia: string
  cuenta_prod_manufac: string
  exonerado_igv: boolean
  considerar_en_venta: boolean
  empresa_id: string
}
