import { ICompra } from "../../movimientos/comprasIntefaces"

export interface IReporteCompra {
    proveedor_id: string,
    resumido_detallado: string,
    ordenado_por: string
    tipo_documento: string
    caja_id: string,
    fecha_inicio: string,
    fecha_fin: string,
    resumen_consolidado: boolean
  }

  export interface IRegistroComra {
    created_at: string
    compras:  ICompra[]
  }