import { ICompra } from "../../movimientos/comprasIntefaces"
import { IVenta } from "../../ventas/ventasInterfaces"

export interface IReporteVenta {
    proveedor_id: string,
    resumido_detallado: string,
    ordenado_por: string
    tipo_documento: string
    caja_id: string,
    fecha_inicio: string,
    fecha_fin: string,
    resumen_consolidado: boolean
  }

  export interface IRegistroVenta {
    created_at: string
    ventas:  IVenta[]
  }