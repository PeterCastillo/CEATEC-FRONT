export interface ITipoDocumentoVenta {
    _id: {
      $oid: string
    }
    descripcion: string
    abreviatura: string
    serie: string | number
    correlativo: string | number
    caja_id: string
    empresa_id: string
    estado: boolean
  }

  export interface INewTipoDocumentoVenta {
    descripcion: string
    abreviatura: string
    serie: string | number
    correlativo: string | number
    caja_id: string
    empresa_id: string
  }
  
