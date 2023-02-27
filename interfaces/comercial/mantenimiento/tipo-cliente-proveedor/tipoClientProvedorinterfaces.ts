export interface ITipoClienteProveedor {
    _id: {
        $oid: string
    }
    descripcion: string
    estado: boolean
    empresa_id: string
}

export interface INewTipoClienteProveedor {
    descripcion: string
    empresa_id: string
}