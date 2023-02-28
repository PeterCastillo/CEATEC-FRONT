import styles from "@/app/comercial/movimientos/compras/page.module.scss";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { INewCompra } from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { clsx } from "@/lib/clsx";
import { FC, FormEvent, use, useEffect, useState } from "react";
import { Articulo } from "./Articulo";
import { NuevoCliente } from "./NuevoCliente";
import {
  IArticle,
  IArticlePrecios,
} from "../../../../interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadInterface";
import { IArticuloCompra } from "../../../../interfaces/comercial/movimientos/comprasIntefaces";
import { FaTrash } from "react-icons/fa";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { Cliente } from "./Cliente";
import { NuevoArticulo } from "./NuevoArticulo";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { SelectDataTable } from "./SelectDataTable";
import { NuevoAlmacen } from "./NuevoAlmacen";
import { NuevaUnidad } from "./NuevaUnidad";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { EditarArticulo } from "./EditarArticulo";
import { EditCliente } from "./EditCliente";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";
import { ADMPA } from "./AdministrarPreciosArticulo";

interface INuevaCompraForm {
  setNewCompras: (data: INewCompra) => void;
  newCompras: INewCompra;
  tipoDocumentos: ITipoDocumentoCompra[];
  monedas: IMoneda[];
  articulos: IArticle[];
  almacenes: IWareHouse[];
  proveedores: IClientProvider[];
  showAlert: IAlert;
  unidades: IUnit[];
  setShowAlert: (data: IAlert) => void;
  closeAlertTimeOut: () => void;
  setShowLoader: (state: boolean) => void;
  sectorsList: ISector[];
  typeClientProvidersList: ITipoClienteProveedor[];
  zonesList: IZone[];
  getProveedoresList: () => void;
  familiesList: IFamily[];
  groupsList: IGroup[];
  brandsList: IBrand[];
  stateArticlesList: IEstadoArticulo[];
  getArticlesList: (handleCreateSetNewUnidad?: () => void) => void;
  getSectorsList: () => void;
  getZonesList: () => void;
  getBrandsList: () => void;
  getGroupsList: () => void;
  getBranchOfficesList: () => void;
  getWareHousesList: () => void;
  sucursales: IBranchOffice[];
  getUnitsList: () => void;
  segmentosList: ISegmentoCodigoSunat[];
}

export const NCF: FC<INuevaCompraForm> = ({
  setNewCompras,
  newCompras,
  tipoDocumentos,
  monedas,
  articulos,
  almacenes,
  proveedores,
  unidades,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getProveedoresList,
  sectorsList,
  setShowLoader,
  typeClientProvidersList,
  zonesList,
  familiesList,
  groupsList,
  brandsList,
  stateArticlesList,
  getArticlesList,
  getSectorsList,
  getZonesList,
  getBrandsList,
  getGroupsList,
  getBranchOfficesList,
  getWareHousesList,
  sucursales,
  getUnitsList,
  segmentosList,
}) => {
  const [index, setIndex] = useState("");
  const [modalAdmPrecios, setModalAdmPrecios] = useState(false);
  const [articuloId, setArticulId] = useState("");
  const [modalAlmacen, setModalAlmacen] = useState(false);
  const [modalUnidad, setModalUnidad] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [showEditArticleModal, setShowEditArticleModal] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [article, setArticle] = useState<IArticle>({
    _id: {
      $oid: "",
    },
    grupo: {
      id: "",
      descripcion: "",
    },
    familia: {
      id: "",
      descripcion: "",
    },
    marca: {
      id: "",
      descripcion: "",
    },
    codigo_barras: "",
    codigo_articulo: "",
    codigo_sunat: "",
    nombre_articulo: "",
    nombre_corto: "",
    estado_articulo: {
      id: "",
      descripcion: "",
    },
    exonerado_igv: false,
    formula_derivado: false,
    inafec: "",
    isc: "",
    stock_maximo: "",
    stock_minimo: "",
    ubicacion: "",
    calidad: "",
    descripcion_utilidad: "",
    estado: false,
    expira: "",
    precios: [],
    stock: [],
    stock_actual: "",
    empresa_id: "",
  });
  const [showEditProveedorModal, setShowEditProveedorModal] = useState(false);
  const [clientProvider, setClientProvider] = useState<IClientProvider>({
    _id: {
      $oid: "",
    },
    estado: false,
    tipo_cliente_proveedor_id: "",
    clasificacion: "",
    dni_ruc: "",
    nombre_comercial: "",
    nombre_natural: "",
    apellido_paterno_natural: "",
    apellido_materno_natural: "",
    fecha_nacimiento_natural: "",
    codigo_ubigeo: "",
    sector_id: "",
    zona_id: "",
    direccion: "",
    email: "",
    telefono1: "",
    telefono2: "",
    nombre_contacto_otro: "",
    telefono_contacto_otro: "",
    descripcion_contacto_otro: "",
    precio_credito: null,
    empresa_id: "",
  });

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setNewCompras({
      ...newCompras,
      [name]: value,
    });
  };

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (value.includes("-")) {
      if (value.split("-")[1].length > 7) {
        return;
      }
    }
    setNewCompras({
      ...newCompras,
      [name]: value.toUpperCase(),
    });
    if (name == "documento_compra") {
      if (value.length > 4 && !value.includes("-")) {
        setNewCompras({
          ...newCompras,
          [name]: newCompras.documento_compra.concat("-0000000"),
        });
      }
    }
  };

  const handleSelectTipoDocumento = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    const tipoDocumento = tipoDocumentos.find((item) => item._id.$oid == value);
    if (tipoDocumento) {
      setNewCompras({
        ...newCompras,
        documento_compra_id: value,
      });
    }
  };

  const handleSelectArticle = (articulo: IArticuloCompra) => {
    setNewCompras({
      ...newCompras,
      articulos: [...newCompras.articulos, articulo],
    });
  };

  const handleDeleteArticle = (id: number) => {
    setNewCompras({
      ...newCompras,
      articulos: newCompras.articulos.filter((item, index) => index != id),
    });
  };

  const handleSetProveedor = (proveedor: IClientProvider) => {
    setNewCompras({
      ...newCompras,
      proveedor_id: proveedor._id.$oid,
      proveedor_nombre:
        proveedor.nombre_comercial == ""
          ? proveedor.nombre_natural
              .concat(" ", proveedor.apellido_paterno_natural)
              .concat(" ", proveedor.apellido_materno_natural)
          : proveedor.nombre_comercial,
      proveedor_ruc: proveedor.dni_ruc,
    });
  };

  const handleEditInfoArticulo = (
    e: FormEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.currentTarget;
    if (Number.isNaN(Number(value))) {
      return;
    }
    if (value.includes(".")) {
      if (value.split(".")[1].length > 6) {
        return;
      }
    }
    const articulos: IArticuloCompra[] = newCompras.articulos.map((item, i) => {
      if (i == index) {
        if (value.trim() !== "") {
          if (
            name == "costo" &&
            item.total.toString().trim() !== "" &&
            item.cantidad.toString().trim() !== ""
          ) {
            return {
              ...item,
              [name]: value.toUpperCase(),
              total: handleDecimalsDataTable(
                (Number(item.cantidad) * Number(value.toUpperCase())).toString()
              ),
            };
          }
          if (
            name == "cantidad" &&
            item.total.toString().trim() !== "" &&
            item.costo.toString().trim() !== ""
          ) {
            return {
              ...item,
              [name]: value.toUpperCase(),
              total: handleDecimalsDataTable(
                (Number(item.costo) * Number(value.toUpperCase())).toString()
              ),
            };
          }
          if (
            name == "total" &&
            item.costo.toString().trim() !== "" &&
            item.cantidad.toString().trim() !== ""
          ) {
            return {
              ...item,
              [name]: value.toUpperCase(),
              cantidad: item.cantidad == 0 ? 1 : item.cantidad,
              costo:
                item.cantidad == 0
                  ? handleDecimalsDataTable(Number(item.costo).toString())
                  : handleDecimalsDataTable(
                      (
                        Number(value.toUpperCase()) / Number(item.cantidad)
                      ).toString()
                    ),
            };
          }
          if (name == "costo" && item.cantidad.toString().trim() !== "") {
            return {
              ...item,
              [name]: value.toUpperCase(),
              total: handleDecimalsDataTable(
                (Number(value.toUpperCase()) * Number(item.cantidad)).toString()
              ),
            };
          }
          if (name == "costo" && item.total.toString().trim() !== "") {
            return {
              ...item,
              [name]: value.toUpperCase(),
              cantidad: handleDecimalsDataTable(
                (Number(item.total) / Number(value.toUpperCase())).toString()
              ),
            };
          }

          if (name == "cantidad" && item.costo.toString().trim() !== "") {
            return {
              ...item,
              [name]: value.toUpperCase(),
              total: handleDecimalsDataTable(
                (Number(item.costo) * Number(value.toUpperCase())).toString()
              ),
            };
          }
          if (name == "cantidad" && item.total.toString().trim() !== "") {
            return {
              ...item,
              [name]: value.toUpperCase(),
              costo:
                Number(value) == 0
                  ? ""
                  : item.total == 0
                  ? 0
                  : handleDecimalsDataTable(
                      (Number(item.total) / Number(value)).toString()
                    ),
            };
          }
          if (name == "total" && item.costo.toString().trim() !== "") {
            return {
              ...item,
              [name]: value.toUpperCase(),
              cantidad: handleDecimalsDataTable(
                (Number(value.toUpperCase()) / Number(item.costo)).toString()
              ),
            };
          }
          if (name == "total" && item.cantidad.toString().trim() !== "") {
            return {
              ...item,
              [name]: value.toUpperCase(),
              costo:
                item.cantidad == 0
                  ? Number(value)
                  : handleDecimalsDataTable(
                      (Number(value) / Number(item.cantidad)).toString()
                    ),
            };
          }
        }
        return {
          ...item,
          [name]: value,
        };
      }
      return item;
    });
    setNewCompras({
      ...newCompras,
      articulos: articulos,
    });
  };

  const handleChangeUnidad = (value: string, id: number) => {
    const articuloUnidad = articulos
      .find((item) => item._id.$oid == newCompras.articulos[id].articulo_id)
      ?.precios.find((item) => item.unidad_descripcion == value);
    if (articuloUnidad) {
      setNewCompras({
        ...newCompras,
        articulos: newCompras.articulos.map((item, index) => {
          if (index == id) {
            return {
              ...item,
              unidad_descripcion: articuloUnidad.unidad_descripcion,
              unidad_abreviatura: articuloUnidad.unidad_abreviatura,
              unidad_valor: articuloUnidad.unidad_valor,
            };
          }
          return item;
        }),
      });
    }
  };

  const handleChangeAlmacen = (value: string, id: number) => {
    const almacen = almacenes.find((item) => item._id.$oid == value);
    if (almacen) {
      setNewCompras({
        ...newCompras,
        articulos: newCompras.articulos.map((item, index) => {
          if (index == id) {
            return {
              ...item,
              almacen_id: almacen._id.$oid,
              almacen_nombre: almacen.descripcion,
            };
          }
          return item;
        }),
      });
    }
  };

  const handleCreateSetNewUnidad = (newPrecio: IArticlePrecios) => {
    const id = Number(index)
    setNewCompras({
      ...newCompras,
      articulos: newCompras.articulos.map((item, index) =>
        index == id
          ? {
              ...item,
              unidad_abreviatura: newPrecio.unidad_abreviatura,
              unidad_descripcion: newPrecio.unidad_descripcion,
              unidad_valor: newPrecio.unidad_valor
            }
          : item
      ),
    });
  };

  const handleDecimalsDataTable = (numero: string): string => {
    if (numero.includes(".")) {
      return numero.split(".")[1].length >= 6
        ? Number(numero).toFixed(6).toString()
        : numero.toString();
    }
    return numero.toString();
  };

  const handleDecimals = (numero: string): string => {
    if (numero.includes(".")) {
      return numero.split(".")[1].length >= 2
        ? Number(numero).toFixed(2).toString()
        : numero.toString();
    }
    return numero.toString();
  };

  const calcularSubTotal = (): number => {
    let subtotal: number = 0.0;
    for (let index = 0; index < newCompras.articulos.length; index++) {
      subtotal = Number(newCompras.articulos[index].total) + subtotal;
    }
    return subtotal;
  };

  const calcularNewSubTotal = () => {
    const descuento = Number(newCompras.descuento) ?? 0;
    const total = calcularSubTotal();
    if (newCompras.deducir_igv) {
      return Number(handleDecimals(((total - descuento) / 1.18).toString()));
    }
    return Number(handleDecimals((total - descuento).toString()));
  };

  const handlePercep = () => {
    if (newCompras.articulos.length > 0 && newCompras.inc_percep) {
      return setNewCompras({
        ...newCompras,
        percep: calcularPercep(),
      });
    }
    setNewCompras({
      ...newCompras,
      percep: "",
    });
  };

  const calcularPercep = () => {
    const total = calcularNewSubTotal();
    const igv = Number(newCompras.igv);
    const porcentajeInc = Number(newCompras.inc);
    return handleDecimals((((total + igv) * porcentajeInc) / 100).toString());
  };

  const calcularTotal = () => {
    const percep = Number(newCompras.inc) ?? 0;
    const igv = Number(newCompras.igv) ?? 0;
    const total = Number(calcularNewSubTotal()) ?? 0;
    return handleRedondearDecimales(
      Number(
        handleDecimals(
          (total + igv - ((total + igv) * percep) / 100).toString()
        )
      ).toString()
    );
  };

  const handleRedondearDecimales = (numero: string): string => {
    if (numero.includes(".")) {
      return `${Number(numero).toFixed(1)}0`;
    }
    return numero.toString();
  };

  const handleCheckDecucirIGV = () => {
    if (newCompras.articulos.length > 0) {
      setNewCompras({
        ...newCompras,
        deducir_igv: !newCompras.deducir_igv,
        costear_igv: !newCompras.deducir_igv ? true : newCompras.deducir_igv,
      });
    }
  };

  const handleIncPerpCheckBox = (e: FormEvent<HTMLInputElement>) => {
    if (newCompras.articulos.length > 0) {
      setNewCompras({
        ...newCompras,
        inc_percep: !newCompras.inc_percep,
        inc: "",
        percep: "",
      });
    }
  };

  const handleInputChange2 = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "descuento" || name == "inc") {
        return;
      }
    }
    setNewCompras({
      ...newCompras,
      [name]: value,
    });
    if (name == "inc" && !value) {
      setNewCompras({
        ...newCompras,
        [name]: value,
        percep: "",
      });
    }
  };

  const handleCheckboxIgv = (e: FormEvent<HTMLInputElement>) => {
    if (newCompras.articulos.length > 0) {
      setNewCompras({
        ...newCompras,
        costear_igv: !newCompras.costear_igv,
        deducir_igv: newCompras.costear_igv ? false : newCompras.deducir_igv,
        igv: !newCompras.costear_igv
          ? handleDecimals(
              ((Number(newCompras.subtotal) * 18) / 100).toString()
            )
          : "",
      });
    }
  };

  useEffect(() => {
    if (newCompras.articulos.length == 0) {
      return setNewCompras({
        ...newCompras,
        igv: "",
        subtotal: "",
        total: "",
        descuento: "",
        costear_igv: false,
        deducir_igv: false,
        inc_percep: false,
        inc: "",
        percep: "",
      });
    }
    setNewCompras({
      ...newCompras,
      subtotal: calcularNewSubTotal(),
      total: calcularTotal(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCompras.articulos]);

  useEffect(() => {
    setNewCompras({
      ...newCompras,
      subtotal: calcularNewSubTotal(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCompras.descuento]);

  useEffect(() => {
    handlePercep();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCompras.inc_percep]);

  useEffect(() => {
    setNewCompras({
      ...newCompras,
      igv: newCompras.costear_igv
        ? handleDecimals(((Number(newCompras.subtotal) * 18) / 100).toString())
        : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCompras.subtotal]);

  useEffect(() => {
    setNewCompras({
      ...newCompras,
      subtotal: calcularNewSubTotal(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newCompras.deducir_igv]);

  const handleModalAdmPrecios = (id: string, index_articulo: number) => {
    setModalAdmPrecios(true);
    setArticulId(id);
    const item = newCompras.articulos.find(
      (item, index) => index == index_articulo
    );
    if (item) {
      setIndex(index_articulo.toString());
    }
  };

  const handleDocumentoCompra = () => {
    if (newCompras.documento_compra.includes("-")) {
      const newCorrelativo = "0"
        .repeat(7 - newCompras.documento_compra.split("-")[1].length)
        .toString()
        .concat(newCompras.documento_compra.split("-")[1]);
      const newSerie = "0"
        .repeat(4 - newCompras.documento_compra.split("-")[0].length)
        .toString()
        .concat(newCompras.documento_compra.split("-")[0]);
      setNewCompras({
        ...newCompras,
        documento_compra: newSerie.concat("-", newCorrelativo),
      });
    }
  };

  return (
    <div className={styles.ventas}>
      <div className={styles.contenedor}>
        <div className={styles.ventas_header}>
          <div className={styles.row}>
            <div className={styles.f_8}></div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="">Documento Compra</label>
              <select
                onChange={handleSelectTipoDocumento}
                value={newCompras.documento_compra_id}
              >
                <option value="" hidden></option>
                {tipoDocumentos.map((item) => (
                  <option value={item._id.$oid} key={item._id.$oid}>
                    {item.descripcion}
                  </option>
                ))}
              </select>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="">⠀</label>
              <input
                autoComplete="off"
                type="text"
                value={newCompras.documento_compra}
                name="documento_compra"
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handleDocumentoCompra;
                  }
                }}
                onBlur={handleDocumentoCompra}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_6)}>
              <label htmlFor="proveedor_nombre">Cliente</label>
              <input
                autoComplete="off"
                type="text"
                name="proveedor_nombre"
                disabled
                value={newCompras.proveedor_nombre}
                onChange={handleInputChange}
              />
              <span onClick={() => setShowClientModal(true)}>···</span>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="proveedor_ruc">DNI/RUC</label>
              <input
                autoComplete="off"
                type="text"
                name="proveedor_ruc"
                disabled
                defaultValue={newCompras.proveedor_ruc}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="tipo_compra_id">Tipo de compra</label>
              <select
                name="tipo_compra_id"
                value={newCompras.tipo_compra_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                <option value="CONTADO">CONTADO</option>
                <option value="CREDITO">CREDITO</option>
              </select>
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="">Moneda</label>
              <select
                name="moneda_id"
                value={newCompras.moneda_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                {monedas.map((item) => (
                  <option key={item._id.$oid} value={item._id.$oid}>
                    {item.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="fecha_emision">Fecha emisión</label>
              <input
                autoComplete="off"
                type="date"
                name="fecha_emision"
                value={newCompras.fecha_emision}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="fecha_vencimiento">Fecha vencimiento</label>
              <input
                autoComplete="off"
                type="date"
                name="fecha_vencimiento"
                value={newCompras.fecha_vencimiento}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="fecha_llegada">Fecha llegada</label>
              <input
                autoComplete="off"
                id="fecha_llegada"
                type="date"
                name="fecha_llegada"
                value={newCompras.fecha_llegada}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(styles.f_g_chbx, styles.f_2)}>
              <input autoComplete="off" type="checkbox" />
              <label htmlFor="">Transporte</label>
            </div>
          </div>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr className={styles.buscador}>
                <th className={styles.item}>Item</th>
                <th>Producto</th>
                <th className={styles.unidad}>Unidad</th>
                <th className={styles.unidad}>Almacen</th>
                <th className={styles.number}>Cant.</th>
                <th className={styles.number}>Costo</th>
                <th className={styles.number}>Total</th>
                <th className={styles.number}>Elim.</th>
              </tr>
            </thead>
            <tbody>
              {newCompras.articulos.map((articulo, index) => (
                <tr key={articulo.articulo_id} className={styles.buscador}>
                  <td className={styles.center_item}>{index + 1}</td>
                  <td>{articulo.articulo_nombre}</td>
                  <td>
                    <SelectDataTable
                      dataList={articulos
                        .filter(
                          (item) => item._id.$oid == articulo.articulo_id
                        )[0]
                        .precios.map((item) => {
                          return {
                            id: item.unidad_descripcion,
                            descripcion: item.unidad_descripcion,
                            sub_nombre: item.unidad_descripcion,
                          };
                        })}
                      handleChange={handleChangeUnidad}
                      id={index}
                      setModal={setModalUnidad}
                      value={articulo.unidad_descripcion}
                      articuloId={articulo.articulo_id}
                      handleModalAdmPrecios={handleModalAdmPrecios}
                      adm={true}
                    />
                  </td>
                  <td>
                    <SelectDataTable
                      dataList={almacenes.map((item) => {
                        return {
                          id: item._id.$oid,
                          descripcion: item.descripcion,
                          sub_nombre: item.descripcion,
                        };
                      })}
                      handleChange={handleChangeAlmacen}
                      id={index}
                      setModal={setModalAlmacen}
                      value={articulo.almacen_id}
                      articuloId={articulo.articulo_id}
                      handleModalAdmPrecios={handleModalAdmPrecios}
                      adm={false}
                    />
                  </td>
                  <td>
                    <input
                      autoComplete="off"
                      type="text"
                      value={articulo.cantidad}
                      name="cantidad"
                      onChange={(e) => handleEditInfoArticulo(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      autoComplete="off"
                      type="text"
                      value={articulo.costo}
                      name="costo"
                      onChange={(e) => handleEditInfoArticulo(e, index)}
                    />
                  </td>
                  <td>
                    <input
                      autoComplete="off"
                      type="text"
                      value={articulo.total}
                      name="total"
                      onChange={(e) => handleEditInfoArticulo(e, index)}
                    />
                  </td>
                  <td className={styles.center_item}>
                    <FaTrash
                      className={styles.trash}
                      onClick={() => handleDeleteArticle(index)}
                    />
                  </td>
                </tr>
              ))}
              <tr className={styles.buscador}>
                <td></td>
                <td>
                  <span onClick={() => setShowModal(true)}>···</span>
                </td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.footer}>
          <div className={styles.row}>
            <div className={styles.f_4}></div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="">Sub total sin desc</label>
              <input
                autoComplete="off"
                type="text"
                name="sub_total_sin_desc"
                onChange={handleInputChange}
                value={
                  newCompras.articulos.length == 0
                    ? ""
                    : handleDecimals(calcularSubTotal().toString())
                }
                disabled
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="descuento">Descuento</label>
              <input
                autoComplete="off"
                type="text"
                name="descuento"
                onChange={handleInputChange2}
                value={newCompras.descuento}
                disabled={newCompras.articulos.length == 0}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="sub_total">Sub total</label>
              <input
                autoComplete="off"
                type="text"
                name="sub_total"
                disabled
                value={newCompras.subtotal}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2, styles.igv)}>
              <div className={styles.incluir_igv}>
                <input
                  autoComplete="off"
                  type="checkbox"
                  id="igv"
                  checked={newCompras.costear_igv}
                  onChange={handleCheckboxIgv}
                />
                <label htmlFor="igv">IGV 18%</label>
              </div>
              <input
                autoComplete="off"
                value={newCompras.articulos.length == 0 ? "" : newCompras.igv}
                disabled
              />
              <div className={styles.deducir_igv}>
                <input
                  autoComplete="off"
                  type="checkbox"
                  id="deducir_igv"
                  checked={newCompras.deducir_igv}
                  onChange={handleCheckDecucirIGV}
                />
                <label htmlFor="deducir_igv">Deducir IGV</label>
              </div>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="valor_total">Valor total</label>
              <input
                autoComplete="off"
                type="text"
                name="valor_total"
                onChange={handleInputChange}
                value={newCompras.articulos.length > 0 ? calcularTotal() : ""}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.f_8}></div>
            <div className={clsx(styles.f_4, styles.f_g_percep)}>
              <input
                autoComplete="off"
                type="checkbox"
                name="costear_igv"
                id="costear_igv_contab"
              />
              <label htmlFor="costear_igv_contab">Costear IGV(en Contab)</label>
            </div>
            <div className={clsx(styles.f_3, styles.f_g_percep)}>
              <input
                autoComplete="off"
                id="inc_percep"
                name="inc_percep"
                type="checkbox"
                onChange={handleIncPerpCheckBox}
                checked={newCompras.inc_percep}
              />
              <label htmlFor="inc_percep">Inc. Percep. (%)</label>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <input
                autoComplete="off"
                id="inc"
                name="inc"
                type="text"
                disabled={!newCompras.inc_percep}
                onChange={handleInputChange}
                placeholder="0"
                value={newCompras.inc}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <input
                autoComplete="off"
                id="percep"
                name="percep"
                disabled
                type="text"
                onChange={handleInputChange}
                value={
                  newCompras.articulos.length > 0 && newCompras.inc_percep
                    ? calcularPercep()
                    : ""
                }
              />
            </div>
          </div>
        </div>

        <Articulo
          show={showModal}
          setShowModal={setShowModal}
          setShowArticleModal={setShowArticleModal}
          handleSelectArticle={handleSelectArticle}
          articulos={articulos}
          almacenes={almacenes}
          unidades={unidades}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          closeAlertTimeOut={closeAlertTimeOut}
          setArticle={setArticle}
          article={article}
          setShowEditArticleModal={setShowEditArticleModal}
        />

        <NuevoArticulo
          articulosList={articulos}
          show={showArticleModal}
          setShowNewClientModal={setShowArticleModal}
          groupsList={groupsList}
          familiesList={familiesList}
          setShowLoader={setShowLoader}
          brandsList={brandsList}
          stateArticlesList={stateArticlesList}
          closeAlertTimeOut={closeAlertTimeOut}
          getArticlesList={getArticlesList}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          getBrandsList={getBrandsList}
          getGroupsList={getGroupsList}
          segmentosList={segmentosList}
        />

        <EditarArticulo
          segmentosList={segmentosList}
          almacenes={almacenes}
          sucursales={sucursales}
          unidades={unidades}
          getBranchOfficesList={getBranchOfficesList}
          getUnitsList={getUnitsList}
          getWareHousesList={getWareHousesList}
          article={article}
          setArticle={setArticle}
          show={showEditArticleModal}
          setShowNewClientModal={setShowEditArticleModal}
          groupsList={groupsList}
          familiesList={familiesList}
          setShowLoader={setShowLoader}
          brandsList={brandsList}
          stateArticlesList={stateArticlesList}
          closeAlertTimeOut={closeAlertTimeOut}
          getArticlesList={getArticlesList}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          getBrandsList={getBrandsList}
          getGroupsList={getGroupsList}
        />
        <NuevoCliente
          show={showNewClientModal}
          setShowNewClientModal={setShowNewClientModal}
          sectorsList={sectorsList}
          typeClientProvidersList={typeClientProvidersList}
          zonesList={zonesList}
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          setShowLoader={setShowLoader}
          getProveedoresList={getProveedoresList}
          getSectorsList={getSectorsList}
          getZonesList={getZonesList}
        />
        <Cliente
          show={showClientModal}
          setShowClientModal={setShowClientModal}
          setShowNewClientModal={setShowNewClientModal}
          proveedores={proveedores}
          handleSetProveedor={handleSetProveedor}
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          setClientProvider={setClientProvider}
          setShowEditProveedorModal={setShowEditProveedorModal}
          clientProvider={clientProvider}
        />

        <EditCliente
          clientProvider={clientProvider}
          setClienteProvider={setClientProvider}
          show={showEditProveedorModal}
          setShowNewClientModal={setShowEditProveedorModal}
          sectorsList={sectorsList}
          typeClientProvidersList={typeClientProvidersList}
          zonesList={zonesList}
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          setShowLoader={setShowLoader}
          getProveedoresList={getProveedoresList}
          getSectorsList={getSectorsList}
          getZonesList={getZonesList}
        />
        <NuevoAlmacen
          closeAlertTimeOut={closeAlertTimeOut}
          getBranchOfficesList={getBranchOfficesList}
          getWareHousesList={getWareHousesList}
          sucursales={sucursales}
          modal={modalAlmacen}
          setModal={setModalAlmacen}
          setShowLoader={setShowLoader}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
        />
        <NuevaUnidad
          closeAlertTimeOut={closeAlertTimeOut}
          modal={modalUnidad}
          setModal={setModalUnidad}
          setShowLoader={setShowLoader}
          showAlert={showAlert}
          setShowAlert={setShowAlert}
          getUnitsList={getUnitsList}
        />

        <ADMPA
          articuloId={articuloId}
          articulos={articulos}
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          setShowLoader={setShowLoader}
          setShowNewClientModal={setModalAdmPrecios}
          show={modalAdmPrecios}
          showAlert={showAlert}
          unidades={unidades}
          getUnitsList={getUnitsList}
          index={index}
          getArticlesList={getArticlesList}
          handleChangeUnidad={handleChangeUnidad}
          handleCreateSetNewUnidad={handleCreateSetNewUnidad}
        />
      </div>
    </div>
  );
};
