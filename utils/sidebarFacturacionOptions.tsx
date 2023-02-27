import { BsCalendarWeek, BsFileBarGraph, BsGraphUp, BsJournalMinus, BsLayoutTextWindow, BsPauseCircle, BsShare } from "react-icons/bs"

interface IOptions {
  icon: JSX.Element
  name: string
  url: string
}

export const sidebarFacturacionOptions: IOptions[] = [
  {
    icon: <BsCalendarWeek />,
    name: "Resumen de Ventas por Dia",
    url: "/facturacion/resumen-de-ventas-por-dia",
  },
  {
    icon: <BsFileBarGraph />,
    name: "Libro de Documentos",
    url: "/facturacion/libro-de-documentos",
  },
  {
    icon: <BsGraphUp />,
    name: "Resumen Diario",
    url: "/facturacion/resumen-diario",
  },
  {
    icon: <BsJournalMinus />,
    name: "Documentos de Baja",
    url: "/facturacion/documentos-de-baja",
  },
  {
    icon: <BsLayoutTextWindow />,
    name: "Listado de Guias de Remisión",
    url: "/facturacion/listado-de-guias-de-remision",
  },
  {
    icon: <BsPauseCircle />,
    name: "Sincronizar",
    url: "/facturacion/sincronizar",
  },
  {
    icon: <BsShare />,
    name: "Consulta Validez CPE",
    url: "/facturacion/consulta-validez-cpe",
  },
]
