"use client";

import styles from "./page.module.scss";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  INewVenta,
  IVenta,
} from "@/interfaces/comercial/ventas/ventasInterfaces";
import { useState, useEffect, useRef } from "react";
import { getListaArticulosService } from "@/services/comercial/mantenimiento/articulo/articulosService";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { getListaAlmacenesService } from "@/services/comercial/mantenimiento/empresa/almacenService";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { getListaMonedasService } from "@/services/comercial/extras/monedaServices";
import { getListaClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import {
  getListaRegistroVentaService,
  postRegistroVentaService,
  putRegistroVentaService,
} from "@/services/comercial/ventas/ventasServices";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { getListaSectoresService } from "@/services/comercial/mantenimiento/empresa/sectorService";
import { getListaZonasService } from "@/services/comercial/mantenimiento/empresa/zonaService";
import { getListaTipoClienteProveedoreService } from "@/services/comercial/mantenimiento/tipo-cliente-proveedor/tipoClienteProveedorService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { Loader } from "@/components/commons/loader/Loader";
import { Alert } from "@/components/commons/alert/Alert";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { NuevaVentaForm } from "@/components/comercial/ventas/ventas/NuevaVentaForm";
import { EditableVentaForm } from "@/components/comercial/ventas/ventas/EditableVentaForm";
import { VentasDataTable } from "@/components/comercial/ventas/ventas/VentasDataTable";
import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { getListaTipoDocumentoVentaService } from "@/services/comercial/mantenimiento/tipo-documento/venta/ventaServices";
import { IMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";
import { getListMotivoTrasladoService } from "@/services/comercial/mantenimiento/motivo-traslado/motivoTrasladoServices";
import { Imprimir } from "@/components/comercial/ventas/ventas/Imprimir";
export default function Home() {
  const [step, setStep] = useState(1);

  const [editableVenta, setEditableVenta] = useState<IVenta>({
    _id: {
      $oid: "",
    },
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    direccion: "",
    direccion_entrega: "",
    documento_venta_id: "",
    documento_venta: "",
    moneda_id: "",
    medio_de_pago: "",
    trans_grat: "",
    descuento: "",
    sub_total: "",
    calcular_igv: false,
    deducir_igv: false,
    igv: "",
    valor_total: "",
    pago_efectivo: "",
    vuelto: "",
    empresa_id: "",
    created_at: { $date: "" },
    articulos: [],
  });
  const [newVenta, setNewVenta] = useState<INewVenta>({
    empresa_id: getLocalStorageItem("empresa"),
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    direccion: "",
    direccion_entrega: "",
    moneda_id: "",
    medio_de_pago: "CONTADO",
    articulos: [],
    trans_grat: "",
    descuento: "",
    sub_total: "",
    calcular_igv: false,
    deducir_igv: false,
    igv: "",
    valor_total: "",
    pago_efectivo: "",
    vuelto: "",
    documento_venta_id: "",
    documento_venta: "",
  });
  const [newEditableVenta, setNewEditableVenta] = useState<IVenta>({
    _id: {
      $oid: "",
    },
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    direccion: "",
    direccion_entrega: "",
    moneda_id: "",
    medio_de_pago: "",
    trans_grat: "",
    descuento: "",
    sub_total: "",
    igv: "",
    valor_total: "",
    pago_efectivo: "",
    vuelto: "",
    empresa_id: "",
    created_at: { $date: "" },
    articulos: [],
    documento_venta_id: "",
    documento_venta: "",
    calcular_igv: false,
    deducir_igv: false,
  });

  const [ventaModalImprimir, setVentaModalImprimir] = useState<IVenta>({
    _id: {
      $oid: "",
    },
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    direccion: "",
    direccion_entrega: "",
    moneda_id: "",
    medio_de_pago: "",
    trans_grat: "",
    descuento: "",
    sub_total: "",
    igv: "",
    valor_total: "",
    pago_efectivo: "",
    vuelto: "",
    empresa_id: "",
    created_at: { $date: "" },
    articulos: [],
    documento_venta_id: "",
    documento_venta: "",
    calcular_igv: false,
    deducir_igv: false,
  });

  const boleta = useRef(null);

  const [ventasList, setVentasList] = useState<IVenta[]>([]);
  const [articulos, setArticulos] = useState<IArticle[]>([]);
  const [almacenes, setAlmacenes] = useState<IWareHouse[]>([]);
  const [motivoTrasladoList, setMotivoTrasladoList] = useState<
    IMotivoTraslado[]
  >([]);
  const [monedas, setMonedas] = useState<IMoneda[]>([]);
  const [proveedores, setProveedores] = useState<IClientProvider[]>([]);
  const [zonesList, setZonesList] = useState<IZone[]>([]);
  const [sectorsList, setSectorsList] = useState<ISector[]>([]);
  const [tipoDocumentoVenta, setTipoDocumentoVenta] = useState<
    ITipoDocumentoVenta[]
  >([]);
  const [typeClientProvidersList, setTypeClientProvidersList] = useState<
    ITipoClienteProveedor[]
  >([]);

  const [selectedVenta, setSelectedVenta] = useState<string>("");
  const [filtros, setFiltros] = useState({
    tipo_documento_venta_id: "",
    since: new Date(Date.now() - 3600 * 1000 * 168).toJSON().split("T")[0],
    until: new Date().toJSON().split("T")[0],
    search: "",
  });

  const [modalImprimir, setModalImprimir] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getVentasList = async () => {
    function addOneDay(date: Date) {
      const dateCopy = new Date(date);
      dateCopy.setDate(date.getDate() + 1);
      return dateCopy;
    }
    const date = new Date(filtros.until.concat(" ", "GMT"));
    const newDateFilter = addOneDay(date)
    setShowLoader(true);
    let query_params = new URLSearchParams({
      since: filtros.since,
      until: newDateFilter.toJSON().split("T")[0],
      tipo_documento_venta_id: filtros.tipo_documento_venta_id,
    });
    const registroDeVentas = await getListaRegistroVentaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage(),
      query_params
    );
    if (registroDeVentas) {
      if (registroDeVentas.status === 200) {
        setVentasList(registroDeVentas.json.data);
      }
    }
    setShowLoader(false);
  };
  const getArticlesList = async () => {
    setShowLoader(true);
    const response = await getListaArticulosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        setArticulos(response.json.data);
      }
    }
  };
  const getMotivoTrasladoList = async () => {
    setShowLoader(true);
    const brands = await getListMotivoTrasladoService(
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (brands) {
      if (brands.status === 200) {
        setMotivoTrasladoList(brands.json.data);
      }
    }
  };
  const getAlmacenesList = async () => {
    setShowLoader(true);
    const response = await getListaAlmacenesService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        setAlmacenes(response.json.data);
      }
    }
  };
  const getTipoDocumentoVenta = async () => {
    setShowLoader(true);
    const response = await getListaTipoDocumentoVentaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        setTipoDocumentoVenta(response.json.data);
      }
    }
  };
  const getMonedasList = async () => {
    setShowLoader(true);
    const response = await getListaMonedasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        setNewVenta({
          ...newVenta,
          moneda_id:
            response.json.data.find(
              (moneda: IMoneda) => moneda.nombre == "SOLES"
            )?._id?.$oid ?? "",
        });
        setMonedas(response.json.data);
      }
    }
  };
  const getProveedoresList = async () => {
    setShowLoader(true);
    const response = await getListaClienteProveedorService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        setProveedores(response.json.data);
      }
    }
  };
  const getSectorsList = async () => {
    setShowLoader(true);
    const sectors = await getListaSectoresService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (sectors) {
      if (sectors.status === 200) {
        setSectorsList(sectors.json.data);
      }
    }
  };
  const getZonesList = async () => {
    setShowLoader(true);
    const zones = await getListaZonasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (zones) {
      if (zones.status === 200) {
        setZonesList(zones.json.data);
      }
    }
  };
  const getTypeClientProvidersList = async () => {
    setShowLoader(true);
    const typeClientProviders = await getListaTipoClienteProveedoreService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (typeClientProviders) {
      if (typeClientProviders.status === 200) {
        setTypeClientProvidersList(typeClientProviders.json.data);
      }
    }
  };

  useEffect(() => {
    getArticlesList();
    getAlmacenesList();
    getMonedasList();
    getMonedasList();
    getProveedoresList();
    getSectorsList();
    getZonesList();
    getTypeClientProvidersList();
    getVentasList();
    getTipoDocumentoVenta();
    getMotivoTrasladoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const closeAlertTimeOut = () => {
    setTimeout(() => {
      setShowAlert({
        ...showAlert,
        icon: "info",
        message: "",
        title: "",
        show: false,
      });
    }, 4000);
  };

  const errorValidateForm = (field: string) => {
    setShowAlert({
      ...showAlert,
      icon: "warning",
      title: "Campos incompletos",
      message: "Se necesita el campo " + field,
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleCreateVenta = async () => {
    if (newVenta.documento_venta_id.trim() == "") {
      return errorValidateForm("documento de venta");
    }
    if (newVenta.proveedor_id.trim() == "") {
      return errorValidateForm("codigo de proveedor");
    }
    if (newVenta.moneda_id.trim() == "") {
      return errorValidateForm("tipo de moneda");
    }
    if (newVenta.medio_de_pago.trim() == "") {
      return errorValidateForm("medio de pago");
    }
    if (newVenta.pago_efectivo.toString().trim() == "") {
      return errorValidateForm("pago efectivo");
    }
    if (newVenta.vuelto.toString().trim() == "") {
      return errorValidateForm("vuelto");
    }
    if (newVenta.articulos.length == 0) {
      setShowAlert({
        ...showAlert,
        icon: "warning",
        title: "Campos incompletos",
        message: "Se necesita ingresar articulos",
        show: true,
      });
      return closeAlertTimeOut();
    }
    setShowLoader(true);
    const response = await postRegistroVentaService(
      {
        ...newVenta,
        trans_grat: Number(newVenta.trans_grat),
        descuento: Number(newVenta.descuento),
        igv: Number(newVenta.igv),
        sub_total: Number(newVenta.sub_total),
        valor_total: Number(newVenta.valor_total),
        vuelto: Number(newVenta.vuelto),
        pago_efectivo: Number(newVenta.pago_efectivo),
        articulos: newVenta.articulos.map(item => {
          return {
            ...item,
            unidad_valor: Number(item.unidad_valor)
          }
        }),
      },
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getArticlesList()
        setVentaModalImprimir(response.json.data);
        setModalImprimir(true);
        getVentasList();
        handleResetNewVenta();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Venta creada correctamente",
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleUpdateVenta = async () => {
    if (newEditableVenta.documento_venta_id.trim() == "") {
      return errorValidateForm("documento de venta");
    }
    if (newEditableVenta.proveedor_id.trim() == "") {
      return errorValidateForm("codigo de proveedor");
    }
    if (newEditableVenta.moneda_id.trim() == "") {
      return errorValidateForm("tipo de moneda");
    }
    if (newEditableVenta.medio_de_pago.trim() == "") {
      return errorValidateForm("medio de pago");
    }
    if (newEditableVenta.pago_efectivo.toString().trim() == "") {
      return errorValidateForm("pago efectivo");
    }
    if (newEditableVenta.vuelto.toString().trim() == "") {
      return errorValidateForm("vuelto");
    }
    if (newEditableVenta.articulos.length == 0) {
      setShowAlert({
        ...showAlert,
        icon: "warning",
        title: "Campos incompletos",
        message: "Se necesita ingresar articulos",
        show: true,
      });
      return closeAlertTimeOut();
    }
    const editVenta = {
      ...newEditableVenta,
      trans_grat: Number(newEditableVenta.trans_grat),
      descuento: Number(newEditableVenta.descuento),
      igv: Number(newEditableVenta.igv),
      sub_total: Number(newEditableVenta.sub_total),
      valor_total: Number(newEditableVenta.valor_total),
    }
    delete editVenta["created_at"]
    delete editVenta["updated_at"]

    const response = await putRegistroVentaService(
      editVenta,
      editableVenta._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        setVentaModalImprimir(response.json.data);
        setModalImprimir(true);
        getVentasList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Venta actualizada correctamente",
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };

  const handleResetNewVenta = () => {
    setNewVenta({
      empresa_id: "",
      proveedor_id: "",
      proveedor_ruc: "",
      proveedor_nombre: "",
      direccion: "",
      direccion_entrega: "",
      moneda_id: "",
      medio_de_pago: "",
      articulos: [],
      trans_grat: "",
      descuento: "",
      sub_total: "",
      igv: "",
      valor_total: "",
      pago_efectivo: "",
      vuelto: "",
      documento_venta: "",
      documento_venta_id: "",
      calcular_igv: false,
      deducir_igv: false,
    });
  };

  const handleResetNewEditableVenta = () => {
    setNewEditableVenta(editableVenta);
  };

  const funcion = (data: IVenta) => {
    setEditableVenta(data);
    setNewEditableVenta({ ...newEditableVenta, ...data });
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const renderButton = () => {
    switch (step) {
      case 1:
        return (
          <>
            <button
              className={styles.create}
              onClick={() => (editableVenta._id.$oid ? setStep(3) : "")}
            >
              <FaPlus /> EDITAR
            </button>
          </>
        );
      case 2:
        return (
          <>
            <button className={styles.option} onClick={handleResetNewVenta}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateVenta}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableVenta}
            >
              DESHACER
            </button>
            <button className={styles.create} onClick={handleUpdateVenta}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <VentasDataTable
              filtros={filtros}
              setFiltros={setFiltros}
              getVentasList={getVentasList}
              tipoDocumentoVenta={tipoDocumentoVenta}
              ventas={ventasList}
              funcion={funcion}
              selectedVenta={selectedVenta}
              setSelectedVenta={setSelectedVenta}
              errorValidateForm={errorValidateForm}
            />
          </div>
        );
      case 2:
        return (
          <div className={styles.form}>
            <NuevaVentaForm
              newVenta={newVenta}
              setNewVenta={setNewVenta}
              almacenes={almacenes}
              articulos={articulos}
              monedas={monedas}
              proveedores={proveedores}
              sectorsList={sectorsList}
              typeClientProvidersList={typeClientProvidersList}
              zonesList={zonesList}
              showAlert={showAlert}
              tipoDocumentoVenta={tipoDocumentoVenta}
              closeAlertTimeOut={closeAlertTimeOut}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              getProveedoresList={getProveedoresList}
              getZonesList={getZonesList}
              getSectorsList={getSectorsList}
              motivoTrasladoList={motivoTrasladoList}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <EditableVentaForm
              newEditableVenta={newEditableVenta}
              setNewEditbleVenta={setNewEditableVenta}
              almacenes={almacenes}
              articulos={articulos}
              monedas={monedas}
              proveedores={proveedores}
              sectorsList={sectorsList}
              typeClientProvidersList={typeClientProvidersList}
              zonesList={zonesList}
              showAlert={showAlert}
              tipoDocumentoVenta={tipoDocumentoVenta}
              closeAlertTimeOut={closeAlertTimeOut}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              getProveedoresList={getProveedoresList}
              getSectorsList={getSectorsList}
              getZonesList={getZonesList}
              motivoTrasladoList={motivoTrasladoList}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva Venta</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de ventas
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva venta
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar venta
          </button>
        </div>
      </div>

      <div className={styles.parametros}>{renderComponent()}</div>

      <Imprimir
        show={modalImprimir}
        setShow={setModalImprimir}
        venta={ventaModalImprimir}
      />
      <Alert
        icon={showAlert.icon}
        show={showAlert.show}
        message={showAlert.message}
        title={showAlert.title}
      />
      <Loader show={showLoader} />
    </>
  );
}
