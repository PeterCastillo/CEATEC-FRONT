export interface IBusiness {
  _id: {
    $oid: string
  }
  razon_social: string
  ruc: string
  direccion: string
  representante_legal: string
  telefono1: string
  telefono2?: string
  telefono3?: string
  estado: boolean
  tipo_empresa_id: string
}

export interface INewBusiness {
  razon_social: string
  ruc: string
  direccion: string
  representante_legal: string
  telefono1: string
  telefono2?: string
  telefono3?: string
  tipo_empresa_id: string
}
