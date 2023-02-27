import { BsArchive, BsBag, BsCalendarDate, BsCardList, BsClipboardData, BsGear, BsGraphUp, BsReverseLayoutTextSidebarReverse, BsShop, BsSliders, BsTags } from "react-icons/bs"
import { HiOutlineDatabase, HiOutlinePrinter, HiOutlineShoppingCart, HiOutlineTruck, HiOutlineUserGroup } from 'react-icons/hi'
import { HiOutlineBanknotes, HiOutlineClipboardDocument, HiOutlineDocumentMinus, HiOutlineDocumentPlus, HiOutlineHomeModern } from 'react-icons/hi2'
import { CiMoneyCheck1 } from 'react-icons/ci'
import { GiMoneyStack } from 'react-icons/gi'
import { MdOutlineAccountBalance, MdOutlineFeaturedPlayList } from "react-icons/md"
import { FaFileInvoiceDollar, FaRegUser } from "react-icons/fa"
import { AiOutlineAppstoreAdd, AiOutlineDatabase } from "react-icons/ai"
import { RiSecurePaymentLine, RiSoundModuleFill } from 'react-icons/ri'
import { SiMonkeytie } from 'react-icons/si'
import { TbReportAnalytics } from 'react-icons/tb'

export interface ISubmenu {
  icon: JSX.Element
  name: string
  url?: string
  show?: boolean
  submenu: {
    name: string
    url: string
  }[]
}

export interface IOptions {
  icon: JSX.Element
  name: string
  submenu: ISubmenu[]
}

export const sidebarOptions: IOptions[] = [
  {
    icon: <BsShop />,
    name: "Ventas",
    submenu: [
      {
        icon: <HiOutlineShoppingCart />,
        name: "Venta Producto",
        url: "/comercial/ventas/ventas",
        submenu: []
      },
      {
        icon: <HiOutlineDocumentMinus />,
        name: "Nota de Crédito",
        url: "/comercial/ventas/nota-de-credito",
        submenu: []
      },
      {
        icon: <HiOutlineDocumentPlus />,
        name: 'Nóta de Débito',
        url: '/comercial/ventas/nota-de-debito',
        submenu: []
      },
      {
        icon: <HiOutlinePrinter />,
        name: "Reimprimir Ventas",
        url: "/ventas/reimprimir-ventas",
        submenu: []
      },
      {
        icon: <CiMoneyCheck1 />,
        name: "Cobranzas",
        url: "/ventas/cobranzas",
        submenu: []
      },
      {
        icon: <HiOutlinePrinter />,
        name: "Reimprimir Cobranza",
        url: "/ventas/reimprimir-cobranzas",
        submenu: []
      },
    ],
  },
  {
    icon: <BsArchive />,
    name: "Movimientos",
    submenu: [
      {
        icon: <CiMoneyCheck1 />,
        name: "Compras",
        url: "/comercial/movimientos/compras",
        submenu: []
      },
      {
        icon: <CiMoneyCheck1 />,
        name: "Amortizacion Compra",
        url: "/comercial/movimientos/amortizacion-compra",
        submenu: []
      },
      {
        icon: <GiMoneyStack />,
        name: "Valorizar Compra - Flete",
        url: "/comercial/movimientos/valorizar-compra-flete",
        submenu: []
      },
      {
        icon: <MdOutlineFeaturedPlayList />,
        name: "Administración Gastos",
        submenu: [
          {
            name: "Registro Gastos",
            url: "/comercial/movimientos/administracion-gastos/registro-gastos",
          },
          {
            name: "Modifica Gastos",
            url: "/comercial/movimientos/administracion-gastos/modifica-gastos",
          },
          {
            name: "Pago de Gastos",
            url: "/comercial/movimientos/administracion-gastos/pago-de-gastos",
          },
          {
            name: "Reporte de Gastos",
            url: "/comercial/movimientos/administracion-gastos/reporte-de-gastos",
          },
        ],
      },
    ],
  },
  {
    icon: <BsReverseLayoutTextSidebarReverse />,
    name: "Reportes",
    submenu: [
      {
        icon: <TbReportAnalytics />,
        name: "Reporte ventas",
        url: "/comercial/reportes/reporte-ventas",
        submenu: []
      },
      {
        icon: <CiMoneyCheck1 />,
        name: "Reporte compras",
        url: "/comercial/reportes/reporte-compras",
        submenu: []
      },
      {
        icon: <FaFileInvoiceDollar />,
        name: "Gestion archivos SUNAT",
        url: "/facturacion",
        submenu: []
      },
      {
        icon: <FaFileInvoiceDollar />,
        name: "Listados de...",
        submenu: [
          {
            name: "Productos",
            url: "/comercial/reportes/listado-productos"
          },
          {
            name: "Situacion documentos",
            url: "/comercial/reportes/listado-situacion-documentos"
          }
        ]
      },
      {
        icon: <FaFileInvoiceDollar />,
        name: "Cuentas por pagar",
        url: "/comercial/reportes/cuentas-por-pagar",
        submenu: []
      },
      {
        icon: <FaFileInvoiceDollar />,
        name: "Cuentas por cobrar",
        url: "/comercial/reportes/cuentas-por-cobrar",
        submenu: []
      },
      {
        icon: <FaFileInvoiceDollar />,
        name: "Listado de cliente",
        url: "/facturacion",
        submenu: []
      },
      {
        icon: <BsGraphUp />,
        name: "Kardex por artículo",
        url: "/facturacion",
        submenu: []
      },
      {
        icon: <BsGraphUp />,
        name: "Movimiento caja",
        url: "/facturacion",
        submenu: []
      },
      {
        icon: <BsGraphUp />,
        name: "Analisis de gastos",
        url: "/facturacion",
        submenu: []
      }
    ]
  },
  {
    icon: <BsClipboardData />,
    name: "Inventario",
    submenu: [
      {
        icon: <BsCalendarDate />,
        name: "Inicio de inventario",
        submenu: []
      }
    ]
  },
  {
    icon: <BsBag />,
    name: "Mantenimiento",
    submenu: [
      {
        icon: <BsTags />,
        name: "Articulos",
        url: "/comercial/mantenimiento/articulo",
        submenu: []
      },
      {
        icon: <FaRegUser />,
        name: "Cliente proveedor",
        url: "/comercial/mantenimiento/cliente-proveedor",
        submenu: []
      },
      {
        icon: <HiOutlineHomeModern />,
        name: "Empresa",
        submenu: [
          {
            name: "Sucursal",
            url: "/comercial/mantenimiento/sucursal",
          },
          {
            name: "Almacen",
            url: "/comercial/mantenimiento/almacen",
          },
          {
            name: "Zona",
            url: "/comercial/mantenimiento/zona",
          },
          {
            name: "Sector",
            url: "/comercial/mantenimiento/sector",
          }
        ],
      },
      {
        icon: <AiOutlineAppstoreAdd />,
        name: "Grupo, Familia, Marca...",
        submenu: [
          {
            name: "Grupo",
            url: "/comercial/mantenimiento/grupo",
          },
          {
            name: "Familia",
            url: "/comercial/mantenimiento/familia",
          },
          {
            name: "Marca",
            url: "/comercial/mantenimiento/marca",
          },
          {
            name: "Unidad",
            url: "/comercial/mantenimiento/unidad",
          },
        ],
      },
      {
        icon: <HiOutlineUserGroup />,
        name: "Tipos de Clientes",
        url: "/comercial/mantenimiento/tipo-clientes",
        submenu: []
      },
      {
        icon: <HiOutlineClipboardDocument />,
        name: 'Tipo documento',
        submenu: [
          {
            name: "Compra",
            url: "/comercial/mantenimiento/documento-compra",
          },
          {
            name: "Venta",
            url: "/comercial/mantenimiento/documento-venta",
          },
        ]
      },
      {
        icon: <MdOutlineAccountBalance />,
        name: "Caja",
        url: "/comercial/mantenimiento/caja",
        submenu: []
      },
      {
        icon: <HiOutlineTruck />,
        name: "Motívo traslado G/R y N/C",
        url: "/comercial/mantenimiento/motivo-traslado-guia-remision-nota-credito",
        submenu: []
      },
      {
        icon: <CiMoneyCheck1 />,
        name: "Gastos",
        url: "/comercial/mantenimiento/gastos",
        submenu: []
      },
      {
        icon: <HiOutlineDocumentMinus />,
        name: "Restaurar artículos",
        url: "/comercial/mantenimiento/restaurar-articulos-eliminados",
        submenu: []
      },
      {
        icon: <HiOutlineBanknotes />,
        name: 'Ventas',
        submenu: [
          {
            name: "Bancos",
            url: "/comercial/mantenimiento/bancos",
          },
          {
            name: "Tarjetas",
            url: "/comercial/mantenimiento/tarjetas",
          },
        ]
      },
    ],
  },
  {
    icon: <BsGear />,
    name: "Herramientas",
    submenu: [
      {
        icon: <RiSoundModuleFill />,
        name: "Parametros",
        url: "/comercial/herramientas/parametros",
        submenu: []
      },
      {
        icon: <BsSliders />,
        name: "Empresa y Usuarios",
        url: "/comercial/herramientas/seguridad/administrar-empresa-y-usuarios",
        submenu: []
      },
      {
        icon: <RiSecurePaymentLine />,
        name: "Seguridad",
        submenu: [
          {
            name: "Usuarios",
            url: "/comercial/herramientas/usuarios",
          },
          {
            name: "Niveles de Acceso",
            url: "/comercial/herramientas/niveles-de-acceso",
          }
        ]
      },
      {
        icon: <HiOutlineDatabase />,
        name: "Copia de Seguridad",
        submenu: [
          {
            name: "BackUp Total",
            url: "/comercial/herramientas/copia-de-seguridad/backup-total",
          },
        ],
      },
      {
        icon: <AiOutlineDatabase />,
        name: "Reordenar Base de Datos",
        url: "/comercial/herramientas/reordenar-base-de-datos",
        submenu: []
      },
    ],
  }
]
