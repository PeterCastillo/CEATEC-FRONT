import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import {
  IArticuloVenta,
  IGuiaRemision,
  IVenta,
} from "@/interfaces/comercial/ventas/ventasInterfaces";
import { clsx } from "@/lib/clsx";
import { FC, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Articulo } from "./Articulo";
import { Cliente } from "./Cliente";
import { NuevoCliente } from "./NuevoCliente";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import styles from "@/app/comercial/ventas/ventas/page.module.scss";
import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { GuiaDeRemision } from "./GuiaDeRemision";
import { IMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";
import { EditCliente } from "./EditCliente";
import { getTokenFromLocalStorage } from "@/utils/localStorageControl";
import { getCorrelativoDocumentoVenta } from "@/services/comercial/mantenimiento/tipo-documento/venta/ventaServices";

interface IEditableVentaForm {
  newEditableVenta: IVenta;
  setNewEditbleVenta: (venta: IVenta) => void;
  monedas: IMoneda[];
  proveedores: IClientProvider[];
  almacenes: IWareHouse[];
  articulos: IArticle[];
  sectorsList: ISector[];
  typeClientProvidersList: ITipoClienteProveedor[];
  zonesList: IZone[];

  getProveedoresList: () => void;
  setShowLoader: (state: boolean) => void;
  closeAlertTimeOut: () => void;
  setShowAlert: (state: IAlert) => void;
  showAlert: IAlert;
  tipoDocumentoVenta: ITipoDocumentoVenta[];
  getZonesList: () => void;
  getSectorsList: () => void;
  motivoTrasladoList: IMotivoTraslado[];
}

export const EditableVentaForm: FC<IEditableVentaForm> = ({
  newEditableVenta,
  setNewEditbleVenta,
  monedas,
  proveedores,
  almacenes,
  articulos,
  sectorsList,
  typeClientProvidersList,
  zonesList,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setShowLoader,
  getProveedoresList,
  tipoDocumentoVenta,
  getSectorsList,
  getZonesList,
  motivoTrasladoList,
}) => {
  const [showArticuloModal, setArticuloModal] = useState(false);
  const [showClientModal, setShowClientModal] = useState(false);
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const [showGuiaRemision, setShowGuiaRemision] = useState(false);
  const [guiaDeRemision, setGuiaDeRemision] = useState<IGuiaRemision>({
    transportista_ruc: "",
    transportista_rs: "",
    conductor_dni: "",
    conductor_nombre: "",
    motivo_traslado_id: "",
    fecha_traslado: "",
    partida_direccion: "",
    partida_ubigeo: "",
    llegada_direccion: "",
    llegada_ubigeo: "",
    vehiculo_placa: "",
    vehiculo_marca: "",
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

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "descuento" || name == "pago_efectivo") {
        return;
      }
    }
    setNewEditbleVenta({
      ...newEditableVenta,
      [name]: value.toUpperCase(),
    });
    if (name == "pago_efectivo") {
      setNewEditbleVenta({
        ...newEditableVenta,
        [name]: value,
        vuelto: Number(value) - Number(newEditableVenta.valor_total),
      });
    }
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setNewEditbleVenta({
      ...newEditableVenta,
      [name]: value,
    });
  };

  const handleSelectTipoDocumento = async (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    const response = await getCorrelativoDocumentoVenta(
      value,
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status == 200) {
        const tipoDocumento = tipoDocumentoVenta.find(
          (item) => item._id.$oid == value
        );
        if (tipoDocumento) {
          setNewEditbleVenta({
            ...newEditableVenta,
            documento_venta_id: value,
            documento_venta: tipoDocumento.serie
              .toString()
              .concat("-", response.json.data.correlativo),
          });
        }
      }
    }
  };

  const handlePrecioChange = (index: number, value: string) => {
    if (Number.isNaN(Number(value))) {
      return;
    }
    if (value.includes(".")) {
      if (value.split(".")[1].length > 6) {
        return;
      }
    }
    const validar = articulos.find(
      (item) => item._id.$oid == newEditableVenta.articulos[index].articulo_id
    );
    if (validar) {
      for (let i = 0; i < validar.precios.length; i++) {
        if (
          newEditableVenta.articulos[index].unidad_descripcion ==
          validar.precios[i].unidad_descripcion
        ) {
          if (Number(value) < validar.precios[i].precio_1) {
            setShowAlert({
              ...showAlert,
              icon: "warning",
              title: "Error inesperado",
              message: "Ingrese precio valido",
              show: true,
            });
            closeAlertTimeOut();
          }
        }
      }
    }
    const newArticulos = newEditableVenta.articulos.map((art, i) => {
      if (i === index) {
        return {
          ...art,
          precio: value,
          total: handleDecimalsDataTable(
            (Number(value) * Number(art.cantidad)).toString()
          ),
        };
      }
      return art;
    });
    setNewEditbleVenta({
      ...newEditableVenta,
      articulos: newArticulos,
    });
  };

  const handleCantidadChange = (index: number, value: string) => {
    if (Number.isNaN(Number(value))) {
      return;
    }
    for (let i = 0; i < newEditableVenta.articulos.length; i++) {
      if (i == index) {
        const verificar = articulos.find(
          (item) => item._id.$oid == newEditableVenta.articulos[i].articulo_id
        );
        if (verificar) {
          const stock_maximo =
            verificar.stock.find(
              (item) =>
                item.almacen_id == newEditableVenta.articulos[i].almacen_id
            )?.cantidad ?? 0;
          if (Number(value) > stock_maximo) {
            setShowAlert({
              ...showAlert,
              icon: "warning",
              title: "Advertencia",
              message: "No se pudo realizar la operación, stock insuficiente",
              show: true,
            });
            return closeAlertTimeOut();
          }
        }
      }
    }
    const newArticulos = newEditableVenta.articulos.map((art, i) => {
      if (i === index) {
        return {
          ...art,
          cantidad: Number(value),
          total: handleDecimalsDataTable(
            (Number(value) * Number(art.precio)).toString()
          ),
        };
      }
      return art;
    });
    setNewEditbleVenta({
      ...newEditableVenta,
      articulos: newArticulos,
    });
  };

  const handleSetProveedor = (proveedor: IClientProvider) => {
    setNewEditbleVenta({
      ...newEditableVenta,
      proveedor_id: proveedor._id.$oid,
      proveedor_nombre:
        proveedor.nombre_comercial == ""
          ? proveedor.nombre_natural
              .concat(" ", proveedor.apellido_paterno_natural)
              .concat(" ", proveedor.apellido_materno_natural)
          : proveedor.nombre_comercial,
      proveedor_ruc: proveedor.dni_ruc,
      direccion: proveedor.direccion,
    });
  };
  const handleAddArticle = (article: IArticuloVenta) => {
    setNewEditbleVenta({
      ...newEditableVenta,
      articulos: [...newEditableVenta.articulos, article],
    });
  };
  const handleDeleteArticle = (id: number) => {
    setNewEditbleVenta({
      ...newEditableVenta,
      articulos: newEditableVenta.articulos.filter(
        (item, index) => index != id
      ),
    });
  };

  const handleGuiaRemision = () => {
    setShowGuiaRemision(true);
    if (newEditableVenta.guia_remision) {
      return setGuiaDeRemision(newEditableVenta.guia_remision);
    }
    if (!newEditableVenta.guia_remision) {
      return setGuiaDeRemision({
        transportista_ruc: "",
        transportista_rs: "",
        conductor_dni: "",
        conductor_nombre: "",
        motivo_traslado_id: "",
        fecha_traslado: "",
        partida_direccion: "",
        partida_ubigeo: "",
        llegada_direccion: "",
        llegada_ubigeo: "",
        vehiculo_placa: "",
        vehiculo_marca: "",
      });
    }
  };
  const handleRemoveGuiaRemision = () => {
    setShowGuiaRemision(false);
    setNewEditbleVenta({
      _id: {
        $oid: newEditableVenta._id.$oid,
      },
      proveedor_id: newEditableVenta.proveedor_id,
      proveedor_ruc: newEditableVenta.proveedor_ruc,
      proveedor_nombre: newEditableVenta.proveedor_nombre,
      direccion: newEditableVenta.direccion,
      direccion_entrega: newEditableVenta.direccion_entrega,
      moneda_id: newEditableVenta.moneda_id,
      medio_de_pago: newEditableVenta.medio_de_pago,
      trans_grat: newEditableVenta.trans_grat,
      descuento: newEditableVenta.descuento,
      sub_total: newEditableVenta.sub_total,
      igv: newEditableVenta.igv,
      valor_total: newEditableVenta.valor_total,
      pago_efectivo: newEditableVenta.pago_efectivo,
      vuelto: newEditableVenta.vuelto,
      calcular_igv: newEditableVenta.calcular_igv,
      deducir_igv: newEditableVenta.deducir_igv,
      empresa_id: newEditableVenta.empresa_id,
      articulos: newEditableVenta.articulos,
      documento_venta_id: newEditableVenta.documento_venta_id,
      documento_venta: newEditableVenta.documento_venta,
    });
  };

  const handleSetGuiaRemision = () => {
    setShowGuiaRemision(false);
    setNewEditbleVenta({
      ...newEditableVenta,
      guia_remision: guiaDeRemision,
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

  const handleRedondearDecimales = (numero: string): string => {
    if (numero.includes(".")) {
      return `${Number(numero).toFixed(1)}0`;
    }
    return numero.toString();
  };

  const calcularSubTotal = (): number => {
    let subtotal: number = 0.0;
    for (let index = 0; index < newEditableVenta.articulos.length; index++) {
      subtotal = Number(newEditableVenta.articulos[index].total) + subtotal;
    }
    return subtotal;
  };

  const calcularNewSubTotal = () => {
    const descuento = Number(newEditableVenta.descuento) ?? 0;
    const total = calcularSubTotal();
    if (newEditableVenta.deducir_igv) {
      return Number(handleDecimals(((total - descuento) / 1.18).toString()));
    }
    return Number(handleDecimals((total - descuento).toString()));
  };

  const calcularTotal = () => {
    const igv = Number(newEditableVenta.igv) ?? 0;
    const total = Number(calcularNewSubTotal()) ?? 0;
    return Number(handleRedondearDecimales((total + igv).toString()));
  };

  const handleCheckboxIgv = () => {
    setNewEditbleVenta({
      ...newEditableVenta,
      calcular_igv: !newEditableVenta.calcular_igv,
      deducir_igv: false,
      sub_total: newEditableVenta.deducir_igv
        ? handleDecimals(
            (calcularSubTotal() - Number(newEditableVenta.descuento)).toString()
          )
        : newEditableVenta.sub_total,
      igv: !newEditableVenta.calcular_igv
        ? handleDecimals(
            ((Number(newEditableVenta.sub_total) * 18) / 100).toString()
          )
        : "",
    });
  };

  const handleCheckDecucirIGV = () => {
    setNewEditbleVenta({
      ...newEditableVenta,
      calcular_igv:
        !newEditableVenta.calcular_igv && !newEditableVenta.deducir_igv
          ? true
          : newEditableVenta.calcular_igv,
      deducir_igv: !newEditableVenta.deducir_igv,
      sub_total: !newEditableVenta.deducir_igv
        ? handleDecimals((Number(newEditableVenta.sub_total) / 1.18).toString())
        : handleDecimals(
            (calcularSubTotal() - Number(newEditableVenta.descuento)).toString()
          ),
    });
  };

  useEffect(() => {
    if (newEditableVenta.articulos.length == 0) {
      return setNewEditbleVenta({
        ...newEditableVenta,
        igv: "",
        sub_total: "",
        valor_total: "",
        pago_efectivo: "",
        vuelto: 0,
        descuento: "",
        trans_grat: "",
        calcular_igv: false,
        deducir_igv: false,
      });
    }
    setNewEditbleVenta({
      ...newEditableVenta,
      sub_total: calcularNewSubTotal(),
      valor_total: calcularTotal(),
      pago_efectivo: calcularTotal(),
      vuelto: 0,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEditableVenta.articulos]);

  useEffect(() => {
    setNewEditbleVenta({
      ...newEditableVenta,
      sub_total: calcularNewSubTotal(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEditableVenta.descuento]);

  useEffect(() => {
    setNewEditbleVenta({
      ...newEditableVenta,
      igv: newEditableVenta.calcular_igv
        ? handleDecimals(
            ((Number(newEditableVenta.sub_total) * 18) / 100).toString()
          )
        : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEditableVenta.sub_total]);

  useEffect(() => {
    setNewEditbleVenta({
      ...newEditableVenta,
      vuelto: 0,
      pago_efectivo: handleRedondearDecimales(
        handleDecimals(
          (
            Number(newEditableVenta.sub_total) + Number(newEditableVenta.igv)
          ).toString()
        )
      ),
      valor_total: handleRedondearDecimales(
        handleDecimals(
          (
            Number(newEditableVenta.sub_total) + Number(newEditableVenta.igv)
          ).toString()
        )
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newEditableVenta.igv]);

  return (
    <div className={styles.ventas}>
      <div className={styles.contenedor}>
        <div className={styles.ventas_header}>
          <div className={styles.row}>
            <div className={styles.f_8}></div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="">Documento Venta</label>
              <select
                onChange={handleSelectTipoDocumento}
                value={newEditableVenta.documento_venta_id}
              >
                <option value="" hidden></option>
                {tipoDocumentoVenta.map((item) => (
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
                disabled
                value={newEditableVenta.documento_venta}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_6)}>
              <label htmlFor="proveedor_id">Cliente</label>
              <input
                autoComplete="off"
                type="text"
                disabled
                name="proveedor_nombre"
                value={newEditableVenta.proveedor_nombre}
                onChange={handleInputChange}
              />
              <span onClick={() => setShowClientModal(true)}>···</span>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="proveedor_ruc">RUC/DNI</label>
              <input
                autoComplete="off"
                type="text"
                name="proveedor_ruc"
                value={newEditableVenta.proveedor_ruc}
                onChange={handleInputChange}
                disabled
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_4)}>
              <label htmlFor="direccion">Dirección</label>
              <input
                autoComplete="off"
                type="text"
                name="direccion"
                value={newEditableVenta.direccion}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={clsx(styles.f_g, styles.f_6)}>
              <label htmlFor="direccion_entrega">
                Persona/Dirección de entrega
              </label>
              <input
                autoComplete="off"
                type="text"
                name="direccion_entrega"
                value={newEditableVenta.direccion_entrega}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="moneda_id">Moneda</label>
              <select
                name="moneda_id"
                value={newEditableVenta.moneda_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                {monedas.map((moneda) => (
                  <option value={moneda._id.$oid} key={moneda._id.$oid}>
                    {moneda.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className={clsx(styles.f_g, styles.f_3)}>
              <label htmlFor="medio_de_pago">Medio de pago</label>
              <select
                name="medio_de_pago"
                value={newEditableVenta.medio_de_pago}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                <option value="CONTADO">CONTADO</option>
                <option value="CREDITO">CREDITO</option>
              </select>
            </div>
          </div>
        </div>
        <div className={styles.ventas_footer}>
          <div className={styles.table}>
            <table>
              <thead>
                <tr className={styles.buscador}>
                  <th className={styles.item}>Item</th>
                  <th>Producto</th>
                  <th className={styles.unidad}>Unidad</th>
                  <th className={styles.number}>Precio</th>
                  <th className={styles.number}>Cant.</th>
                  <th className={styles.number}>Total</th>
                  <th className={styles.number}>Elim.</th>
                </tr>
              </thead>
              <tbody>
                {newEditableVenta.articulos.length > 0 &&
                  newEditableVenta.articulos.map((articulo, index) => (
                    <tr key={articulo.articulo_id} className={styles.buscador}>
                      <td className={styles.center_item}>{index + 1}</td>
                      <td>{articulo.articulo_nombre}</td>
                      <td>{articulo.unidad_abreviatura}</td>
                      <td>
                        <input
                          autoComplete="off"
                          type="text"
                          value={articulo.precio}
                          onChange={(e) =>
                            handlePrecioChange(index, e.currentTarget.value)
                          }
                        />
                      </td>
                      <td>
                        <input
                          autoComplete="off"
                          type="text"
                          value={articulo.cantidad}
                          onChange={(e) =>
                            handleCantidadChange(index, e.currentTarget.value)
                          }
                        />
                      </td>
                      <td>{articulo.total}</td>
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
                    <span onClick={() => setArticuloModal(true)}>···</span>
                  </td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={styles.row}>
            <div className={styles.f_4}></div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label>Importe bruto</label>
              <input
                autoComplete="off"
                type="text"
                disabled
                value={
                  newEditableVenta.articulos.length > 0
                    ? handleDecimals(calcularSubTotal().toString())
                    : ""
                }
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="trans_grat">Trans. Grat</label>
              <input
                autoComplete="off"
                type="text"
                name="trans_grat"
                value={newEditableVenta.trans_grat}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="descuento">Descuento</label>
              <input
                autoComplete="off"
                type="text"
                name="descuento"
                value={newEditableVenta.descuento}
                disabled={newEditableVenta.articulos.length == 0}
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="">Sub total</label>
              <input
                autoComplete="off"
                type="text"
                disabled
                value={newEditableVenta.sub_total}
              />
            </div>
            <div className={clsx(styles.f_g, styles.f_2, styles.igv)}>
              <div className={styles.incluir_igv}>
                <input
                  autoComplete="off"
                  type="checkbox"
                  id="igv"
                  checked={newEditableVenta.calcular_igv}
                  onChange={handleCheckboxIgv}
                />
                <label htmlFor="igv">IGV 18%</label>
              </div>
              <input
                autoComplete="off"
                value={
                  newEditableVenta.articulos.length == 0
                    ? ""
                    : newEditableVenta.igv
                }
                disabled
              />
              <div className={styles.deducir_igv}>
                <input
                  autoComplete="off"
                  type="checkbox"
                  id="deducir_igv"
                  checked={newEditableVenta.deducir_igv}
                  onChange={handleCheckDecucirIGV}
                />
                <label htmlFor="deducir_igv">Deducir IGV</label>
              </div>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label>Valor total</label>
              <input
                autoComplete="off"
                type="text"
                disabled
                value={
                  newEditableVenta.articulos.length > 0
                    ? newEditableVenta.valor_total
                    : ""
                }
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.f_8}></div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="guia_de_remision">Guia de remisión</label>
              <select
                read-only={"true"}
                value={newEditableVenta.guia_remision ? "2" : "1"}
                onFocus={handleGuiaRemision}
              >
                <option value="1">Sin Guía</option>
                <option value="2">Con Guía</option>
              </select>
            </div>
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="pago_efectivo">Pago Efectivo</label>
              <input
                autoComplete="off"
                type="text"
                name="pago_efectivo"
                value={newEditableVenta.pago_efectivo}
                onChange={handleInputChange}
                disabled={newEditableVenta.articulos.length == 0 ? true : false}
              />
            </div>
            {/* <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="pago_otro">Pago Otro</label>
              <input autoComplete="off"
                type="text"
                name="pago_otro"
                value={newEditableVenta.pago_otro}
                onChange={handleInputChange}
              />
            </div> */}
            <div className={clsx(styles.f_g, styles.f_2)}>
              <label htmlFor="vuelto">Vuelto</label>
              <input
                autoComplete="off"
                type="text"
                name="vuelto"
                value={newEditableVenta.vuelto}
                onChange={handleInputChange}
                readOnly
              />
            </div>
          </div>
        </div>
        <GuiaDeRemision
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
          show={showGuiaRemision}
          setShow={setShowGuiaRemision}
          guiaRemision={guiaDeRemision}
          setGuiaRemision={setGuiaDeRemision}
          handleSetGuiaRemision={handleSetGuiaRemision}
          handleCloseGuiaRemision={handleRemoveGuiaRemision}
          motivoTrasladoList={motivoTrasladoList}
        />
        <Articulo
          show={showArticuloModal}
          setShowModal={setArticuloModal}
          handleAddArticle={handleAddArticle}
          articulos={articulos}
          almacenes={almacenes}
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
        />
        <Cliente
          clientProvider={clientProvider}
          setClientProvider={setClientProvider}
          setShowEditProveedorModal={setShowEditProveedorModal}
          show={showClientModal}
          setShowClientModal={setShowClientModal}
          setShowNewClientModal={setShowNewClientModal}
          proveedores={proveedores}
          handleSetProveedor={handleSetProveedor}
          closeAlertTimeOut={closeAlertTimeOut}
          setShowAlert={setShowAlert}
          showAlert={showAlert}
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
          getZonesList={getZonesList}
          getSectorsList={getSectorsList}
        />
      </div>
    </div>
  );
};
