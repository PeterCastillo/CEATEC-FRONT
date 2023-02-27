export interface ISegmentoCodigoSunat {
    _id: {
        $oid: string
    }
    codigo: string
    descripcion: string
}

export interface IFamiliaCodigoSunat {
    _id: {
        $oid: string
    }
    codigo: string
    codigo_segmento: string
    descripcion: string
}

export interface IClaseCodigoSunat {
    _id: {
        $oid: string
    }
    codigo: string
    codigo_familia: string
    descripcion: string
}

export interface ICodigoSunat {
    _id: {
        $oid: string
    }
    codigo: string
    codigo_clase: string
    descripcion: string
}