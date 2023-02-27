import styles from "@/app/comercial/ventas/ventas/page.module.scss";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import {
  IArticuloVenta,
  IGuiaRemision,
  INewVenta,
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
import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { GuiaDeRemision } from "./GuiaDeRemision";
import { IMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";
import { EditCliente } from "./EditCliente";
import { getCorrelativoDocumentoVenta } from "@/services/comercial/mantenimiento/tipo-documento/venta/ventaServices";
import { getTokenFromLocalStorage } from "@/utils/localStorageControl";

interface INuevaVentaForm {
  newVenta: INewVenta;
  setNewVenta: (venta: INewVenta) => void;
  monedas: IMoneda[];
  proveedores: IClientProvider[];
  almacenes: IWareHouse[];
  articulos: IArticle[];
  sectorsList: ISector[];
  typeClientProvidersList: ITipoClienteProveedor[];
  zonesList: IZone[];
  tipoDocumentoVenta: ITipoDocumentoVenta[];
  getProveedoresList: () => void;
  setShowLoader: (state: boolean) => void;
  closeAlertTimeOut: () => void;
  setShowAlert: (state: IAlert) => void;
  showAlert: IAlert;
  getZonesList: () => void;
  getSectorsList: () => void;
  motivoTrasladoList: IMotivoTraslado[];
}

export const NuevaVentaForm: FC<INuevaVentaForm> = ({
  newVenta,
  setNewVenta,
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
  getZonesList,
  getSectorsList,
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
    setNewVenta({
      ...newVenta,
      [name]: value.toUpperCase(),
    });
    if (name == "pago_efectivo") {
      setNewVenta({
        ...newVenta,
        [name]: value,
        vuelto: Number(value) - Number(newVenta.valor_total),
      });
    }
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    if (name == "guia_remision" && Number(value) == 2) {
      setShowGuiaRemision(true);
    }
    setNewVenta({
      ...newVenta,
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
          setNewVenta({
            ...newVenta,
            documento_venta_id: value,
            documento_venta: tipoDocumento.serie
              .toString()
              .concat("-", response.json.data.correlativo),
          });
        }
      }
    }
  };

  const handlePrecioChange = (
    index: number,
    e: FormEvent<HTMLInputElement>
  ) => {
    const { value } = e.currentTarget;
    if (Number.isNaN(Number(value))) {
      return;
    }
    if (value.includes(".")) {
      if (value.split(".")[1].length > 6) {
        return;
      }
    }
    const validar = articulos.find(
      (item) => item._id.$oid == newVenta.articulos[index].articulo_id
    );
    if (validar) {
      for (let i = 0; i < validar.precios.length; i++) {
        if (
          newVenta.articulos[index].unidad_descripcion ==
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
    const newArticulos = newVenta.articulos.map((art, i) => {
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
    setNewVenta({
      ...newVenta,
      articulos: newArticulos,
    });
  };

  const handleCantidadChange = (index: number, value: string) => {
    if (Number.isNaN(Number(value))) {
      return;
    }
    for (let i = 0; i < newVenta.articulos.length; i++) {
      if (i == index) {
        const verificar = articulos.find(
          (item) => item._id.$oid == newVenta.articulos[i].articulo_id
        );
        if (verificar) {
          const stock_maximo =
            verificar.stock.find(
              (item) => item.almacen_id == newVenta.articulos[i].almacen_id
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
    const newArticulos = newVenta.articulos.map((art, i) => {
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
    setNewVenta({
      ...newVenta,
      articulos: newArticulos,
    });
  };
  const handleSetProveedor = (proveedor: IClientProvider) => {
    setNewVenta({
      ...newVenta,
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
    setNewVenta({
      ...newVenta,
      articulos: [...newVenta.articulos, article],
    });
  };
  const handleDeleteArticle = (id: number) => {
    setNewVenta({
      ...newVenta,
      articulos: newVenta.articulos.filter((item, index) => index != id),
    });
  };

  const handleGuiaRemision = () => {
    setShowGuiaRemision(true);
    if (newVenta.guia_remision) {
      setGuiaDeRemision(newVenta.guia_remision);
    }
  };
  const handleRemoveGuiaRemision = () => {
    setShowGuiaRemision(false);
    setNewVenta({
      proveedor_id: newVenta.proveedor_id,
      proveedor_ruc: newVenta.proveedor_ruc,
      proveedor_nombre: newVenta.proveedor_nombre,
      direccion: newVenta.direccion,
      direccion_entrega: newVenta.direccion_entrega,
      moneda_id: newVenta.moneda_id,
      medio_de_pago: newVenta.medio_de_pago,
      trans_grat: newVenta.trans_grat,
      descuento: newVenta.descuento,
      sub_total: newVenta.sub_total,
      igv: newVenta.igv,
      valor_total: newVenta.valor_total,
      pago_efectivo: newVenta.pago_efectivo,
      vuelto: newVenta.vuelto,
      calcular_igv: newVenta.calcular_igv,
      deducir_igv: newVenta.deducir_igv,
      empresa_id: newVenta.empresa_id,
      articulos: newVenta.articulos,
      documento_venta_id: newVenta.documento_venta_id,
      documento_venta: newVenta.documento_venta,
    });
  };
  const handleSetGuiaRemision = () => {
    setShowGuiaRemision(false);
    setNewVenta({
      ...newVenta,
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
    for (let index = 0; index < newVenta.articulos.length; index++) {
      subtotal = Number(newVenta.articulos[index].total) + subtotal;
    }
    return subtotal;
  };

  const calcularNewSubTotal = () => {
    const descuento = Number(newVenta.descuento) ?? 0;
    const total = calcularSubTotal();
    if (newVenta.deducir_igv) {
      return Number(handleDecimals(((total - descuento) / 1.18).toString()));
    }
    return Number(handleDecimals((total - descuento).toString()));
  };

  const calcularTotal = () => {
    const igv = Number(newVenta.igv) ?? 0;
    const total = Number(calcularNewSubTotal()) ?? 0;
    return Number(handleRedondearDecimales((total + igv).toString()));
  };

  const handleCheckboxIgv = () => {
    setNewVenta({
      ...newVenta,
      calcular_igv: !newVenta.calcular_igv,
      deducir_igv: false,
      sub_total: newVenta.deducir_igv
        ? handleDecimals(
            (calcularSubTotal() - Number(newVenta.descuento)).toString()
          )
        : newVenta.sub_total,
      igv: !newVenta.calcular_igv
        ? handleDecimals(((Number(newVenta.sub_total) * 18) / 100).toString())
        : "",
    });
  };

  const handleCheckDecucirIGV = () => {
    setNewVenta({
      ...newVenta,
      calcular_igv:
        !newVenta.calcular_igv && !newVenta.deducir_igv
          ? true
          : newVenta.calcular_igv,
      deducir_igv: !newVenta.deducir_igv,
      sub_total: !newVenta.deducir_igv
        ? handleDecimals((Number(newVenta.sub_total) / 1.18).toString())
        : handleDecimals(
            (calcularSubTotal() - Number(newVenta.descuento)).toString()
          ),
    });
  };

  useEffect(() => {
    if (newVenta.articulos.length == 0) {
      return setNewVenta({
        ...newVenta,
        igv: "",
        sub_total: "",
        pago_efectivo: "",
        vuelto: "",
        valor_total: "",
        descuento: "",
        trans_grat: "",
        calcular_igv: false,
        deducir_igv: false,
      });
    }
    setNewVenta({
      ...newVenta,
      sub_total: calcularNewSubTotal(),
      pago_efectivo: calcularTotal(),
      vuelto: 0,
      valor_total: calcularTotal(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVenta.articulos]);

  useEffect(() => {
    setNewVenta({
      ...newVenta,
      sub_total: calcularNewSubTotal(),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVenta.descuento]);

  useEffect(() => {
    setNewVenta({
      ...newVenta,
      igv: newVenta.calcular_igv
        ? handleDecimals(((Number(newVenta.sub_total) * 18) / 100).toString())
        : "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVenta.sub_total]);

  useEffect(() => {
    setNewVenta({
      ...newVenta,
      vuelto: 0,
      pago_efectivo: handleRedondearDecimales(
        handleDecimals(
          (Number(newVenta.sub_total) + Number(newVenta.igv)).toString()
        )
      ),
      valor_total: handleRedondearDecimales(
        handleDecimals(
          (Number(newVenta.sub_total) + Number(newVenta.igv)).toString()
        )
      ),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newVenta.igv]);

  return (
    <>
      <div className={styles.ventas}>
        <div className={styles.contenedor}>
          <div className={styles.ventas_header}>
            <div className={styles.row}>
              <div className={styles.f_8}></div>
              <div className={clsx(styles.f_g, styles.f_2)}>
                <label htmlFor="">Documento Venta</label>
                <select
                  onChange={handleSelectTipoDocumento}
                  value={newVenta.documento_venta_id}
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
                  value={newVenta.documento_venta}
                  disabled
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
                  value={newVenta.proveedor_nombre}
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
                  value={newVenta.proveedor_ruc}
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
                  value={newVenta.direccion}
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
                  value={newVenta.direccion_entrega}
                  onChange={handleInputChange}
                />
              </div>
              <div className={clsx(styles.f_g, styles.f_3)}>
                <label htmlFor="moneda_id">Moneda</label>
                <select
                  name="moneda_id"
                  value={newVenta.moneda_id}
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
                  value={newVenta.medio_de_pago}
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
                    <th className={styles.number}>Cant.</th>
                    <th className={styles.number}>Precio</th>
                    <th className={styles.number}>Total</th>
                    <th className={styles.number}>Elim.</th>
                  </tr>
                </thead>
                <tbody>
                  {newVenta.articulos.length > 0 &&
                    newVenta.articulos.map((articulo, index) => (
                      <tr key={articulo.articulo_id} className={styles.buscador}>
                        <td className={styles.center_item}>{index + 1}</td>
                        <td>{articulo.articulo_nombre}</td>
                        <td>{articulo.unidad_abreviatura}</td>
                        <td className={styles.number}>
                          <input
                            autoComplete="off"
                            type="text"
                            value={articulo.cantidad}
                            onChange={(e) =>
                              handleCantidadChange(index, e.currentTarget.value)
                            }
                          />
                        </td>
                        <td>
                          <input
                            autoComplete="off"
                            type="text"
                            value={articulo.precio}
                            onChange={(e) => handlePrecioChange(index, e)}
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
                    newVenta.articulos.length > 0
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
                  value={newVenta.trans_grat}
                  onChange={handleInputChange}
                />
              </div>
              <div className={clsx(styles.f_g, styles.f_2)}>
                <label htmlFor="descuento">Descuento</label>
                <input
                  autoComplete="off"
                  type="text"
                  name="descuento"
                  value={newVenta.descuento}
                  disabled={newVenta.articulos.length == 0}
                  onChange={handleInputChange}
                />
              </div>
              <div className={clsx(styles.f_g, styles.f_2)}>
                <label htmlFor="">Sub total</label>
                <input
                  autoComplete="off"
                  type="text"
                  disabled
                  value={newVenta.sub_total}
                />
              </div>
              <div className={clsx(styles.f_g, styles.f_2, styles.igv)}>
                <div className={styles.incluir_igv}>
                  <input
                    autoComplete="off"
                    type="checkbox"
                    id="igv"
                    checked={newVenta.calcular_igv}
                    onChange={handleCheckboxIgv}
                  />
                  <label htmlFor="igv">IGV 18%</label>
                </div>
                <input
                  autoComplete="off"
                  value={newVenta.articulos.length == 0 ? "" : newVenta.igv}
                  disabled
                />
                <div className={styles.deducir_igv}>
                  <input
                    autoComplete="off"
                    type="checkbox"
                    id="deducir_igv"
                    checked={newVenta.deducir_igv}
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
                    newVenta.articulos.length > 0 ? newVenta.valor_total : ""
                  }
                />
              </div>
            </div>
            <div className={styles.row}>
              <div className={styles.f_8}></div>
              <div className={clsx(styles.f_g, styles.f_2)}>
                <label htmlFor="guia_remision">Guia de remisión</label>
                <select
                  read-only={"true"}
                  value={newVenta.guia_remision ? "2" : "1"}
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
                  disabled={newVenta.articulos.length == 0 ? true : false}
                  value={newVenta.pago_efectivo}
                  onChange={handleInputChange}
                />
              </div>
              {/* <div className={clsx(styles.f_g, styles.f_2)}>
                <label htmlFor="pago_otro">Pago Otro</label>
                <input autoComplete="off"
                  type="text"
                  name="pago_otro"
                  value={newVenta.pago_otro}
                  onChange={handleInputChange}
                />
              </div> */}
              <div className={clsx(styles.f_g, styles.f_2)}>
                <label htmlFor="vuelto">Vuelto</label>
                <input
                  autoComplete="off"
                  type="text"
                  name="vuelto"
                  value={newVenta.vuelto}
                  onChange={handleInputChange}
                  readOnly
                />
              </div>
            </div>
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
        show={showClientModal}
        setShowClientModal={setShowClientModal}
        setShowNewClientModal={setShowNewClientModal}
        proveedores={proveedores}
        handleSetProveedor={handleSetProveedor}
        closeAlertTimeOut={closeAlertTimeOut}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        setShowEditProveedorModal={setShowEditProveedorModal}
        setClientProvider={setClientProvider}
        clientProvider={clientProvider}
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
        getZonesList={getZonesList}
        getSectorsList={getSectorsList}
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
    </>
  );
};
