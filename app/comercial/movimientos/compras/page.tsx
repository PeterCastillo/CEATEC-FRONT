"use client";

import styles from "./page.module.scss";
import { useState, useEffect } from "react";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import {
  ICompra,
  INewCompra,
} from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { FaPlus } from "react-icons/fa";
import { getListaMonedasService } from "@/services/comercial/mantenimiento/ventas/monedaServices";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { getListaClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { getListaArticulosService } from "@/services/comercial/mantenimiento/articulo/articulosService";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { getListaAlmacenesService } from "@/services/comercial/mantenimiento/empresa/almacenService";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import {
  getListaRegistroCompraService,
  postRegistroCompraService,
  putRegistroCompraService,
} from "@/services/comercial/movimientos/comprasServices";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { getListaTipoDocumentoCompraService } from "@/services/comercial/mantenimiento/tipo-documento/compra/compraServices";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadInterface";
import { getListaUnidadService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/unidadServices";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { NCF } from "@/components/comercial/movimientos/compras/NuevaCompraForm";
import { ECF } from "@/components/comercial/movimientos/compras/EditableCompraForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { CompraDataTable } from "@/components/comercial/movimientos/compras/CompraDataTable";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { getListaTipoClienteProveedoreService } from "@/services/comercial/mantenimiento/tipo-cliente-proveedor/tipoClienteProveedorService";
import { getListaZonasService } from "@/services/comercial/mantenimiento/empresa/zonaService";
import { getListaSectoresService } from "@/services/comercial/mantenimiento/empresa/sectorService";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import { getListaFamiliaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/familiaServices";
import { getListaMarcaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/marcaServices";
import { getListaEstadoArticuloService } from "@/services/comercial/extras/estadoArticuloServices";
import { getListaGrupoService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/grupoServices";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { getListaSucursalService } from "@/services/comercial/mantenimiento/empresa/sucursalService";
import { getSegmentosListService } from "@/services/comercial/mantenimiento/codigo-sunat/codigoSunatServices";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableCompra, setEditableCompra] = useState<ICompra>({
    _id: {
      $oid: "",
    },
    empresa_id: "",
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    documento_compra_id: "",
    documento_compra: "",
    tipo_compra_id: "",
    fecha_emision: "",
    moneda_id: "",
    fecha_vencimiento: "",
    fecha_llegada: "",
    transporte: false,
    articulos: [],
    subtotal: "",
    descuento: "",
    igv: "",
    total: "",
    deducir_igv: false,
    costear_igv: false,
    inc_percep: false,
    inc: "",
    percep: "",
    created_at: {
      $date: "",
    },
  });
  const [selectedCompra, setSelectedCompra] = useState<string>("");
  const [newCompra, setNewCompra] = useState<INewCompra>({
    empresa_id: getLocalStorageItem("empresa"),
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    documento_compra_id: "",
    documento_compra: "",
    tipo_compra_id: "CONTADO",
    fecha_emision: new Date(Date.now() + 3600 * 1000).toJSON().split("T")[0],
    moneda_id: "",
    fecha_vencimiento: new Date(Date.now() + 3600 * 1000)
      .toJSON()
      .split("T")[0],
    fecha_llegada: new Date(Date.now() + 3600 * 1000).toJSON().split("T")[0],
    transporte: false,
    articulos: [],
    descuento: "",
    subtotal: "",
    igv: "",
    total: "",
    deducir_igv: false,
    costear_igv: false,
    inc_percep: false,
    inc: "",
    percep: "",
  });
  const [newEditableCompra, setNewEditableCompra] = useState<ICompra>({
    _id: {
      $oid: "",
    },
    empresa_id: "",
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    documento_compra_id: "",
    documento_compra: "",
    tipo_compra_id: "",
    fecha_emision: "",
    moneda_id: "",
    fecha_vencimiento: "",
    fecha_llegada: "",
    transporte: false,
    articulos: [],
    subtotal: "",
    descuento: "",
    igv: "",
    total: "",
    deducir_igv: false,
    costear_igv: false,
    inc_percep: false,
    inc: "",
    percep: "",
    created_at: {
      $date: "",
    },
  });

  const [tipoDocumentos, setTipoDocumentos] = useState<ITipoDocumentoCompra[]>(
    []
  );
  const [segmentosList, setSegmentoList] = useState<ISegmentoCodigoSunat[]>([]);
  const [proveedores, setProveedores] = useState<IClientProvider[]>([]);
  const [almacenes, setAlmacenes] = useState<IWareHouse[]>([]);
  const [articulos, setArticulos] = useState<IArticle[]>([]);
  const [unidades, setUnidades] = useState<IUnit[]>([]);
  const [monedas, setMonedas] = useState<IMoneda[]>([]);
  const [typeClientProvidersList, setTypeClientProvidersList] = useState<
    ITipoClienteProveedor[]
  >([]);
  const [brandsList, setBrandsList] = useState<IBrand[]>([]);
  const [familiesList, setFamiliesList] = useState<IFamily[]>([]);
  const [groupsList, setGroupsList] = useState<IGroup[]>([]);
  const [zonesList, setZonesList] = useState<IZone[]>([]);
  const [sectorsList, setSectorsList] = useState<ISector[]>([]);
  const [stateArticlesList, setStateArticlesList] = useState<IEstadoArticulo[]>(
    []
  );
  const [sucursales, setSucursales] = useState<IBranchOffice[]>([]);

  const [comprasList, setComprasList] = useState<ICompra[]>([]);
  const [filtros, setFiltros] = useState({
    since: new Date(Date.now() - 3600 * 1000 * 168).toJSON().split("T")[0],
    until: new Date(Date.now() + 3600 * 1000 * 24).toJSON().split("T")[0],
    search: "",
  });

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getTipoDocumentoList = async () => {
    setShowLoader(true);
    const tipoDocumentos = await getListaTipoDocumentoCompraService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (tipoDocumentos) {
      if (tipoDocumentos.status === 200) {
        setTipoDocumentos(tipoDocumentos.json.data);
      }
    }
  };
  const getSucursalesList = async () => {
    setShowLoader(true);
    const response = await getListaSucursalService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setSucursales(response.json.data);
      }
    }
    setShowLoader(false);
  };
  const getSegmentoList = async () => {
    setShowLoader(true);
    const segmentos = await getSegmentosListService();
    if (segmentos) {
      if (segmentos.status === 200) {
        setSegmentoList(segmentos.json.data);
      }
    }
    setShowLoader(false);
  };
  const getComprasList = async () => {
    function addOneDay(date: Date) {
      const dateCopy = new Date(date);
      dateCopy.setDate(date.getDate() + 1);
      return dateCopy;
    }
    const date = new Date(filtros.until.concat(" ", "GMT"));
    const newDateFilter = addOneDay(date);
    let query_params = new URLSearchParams({
      since: filtros.since,
      until: newDateFilter.toJSON().split("T")[0],
    });
    setShowLoader(true);
    const compras = await getListaRegistroCompraService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage(),
      query_params
    );
    if (compras) {
      if (compras.status === 200) {
        setComprasList(compras.json.data);
      }
    }
    setShowLoader(false);
  };
  const getGroupsList = async () => {
    setShowLoader(true);
    const groups = await getListaGrupoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (groups) {
      if (groups.status === 200) {
        setGroupsList(groups.json.data);
      }
    }
    setShowLoader(false);
  };

  const getStateArticles = async () => {
    setShowLoader(true);
    const stateArticles = await getListaEstadoArticuloService(
      getTokenFromLocalStorage()
    );
    if (stateArticles) {
      if (stateArticles.status === 200) {
        setStateArticlesList(stateArticles.json.data);
      }
    }
    setShowLoader(false);
  };

  const getBrandsList = async () => {
    setShowLoader(true);
    const response = await getListaMarcaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setBrandsList(response.json.data);
      }
    }
    setShowLoader(false);
  };

  const getFamiliesList = async () => {
    setShowLoader(true);
    const response = await getListaFamiliaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 200) {
        setFamiliesList(response.json.data);
      }
    }
    setShowLoader(false);
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

  const getArticlesList = async (handleUpdateArticle = Function()) => {
    setShowLoader(true);
    const response = await getListaArticulosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        setArticulos(response.json.data);
        handleUpdateArticle()
      }
    }
  };

  const getUnidadesList = async () => {
    setShowLoader(true);
    const unidades = await getListaUnidadService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (unidades) {
      if (unidades.status === 200) {
        setUnidades(unidades.json.data);
      }
    }
  };
  const getMonedasList = async () => {
    setShowLoader(true);
    const monedas = await getListaMonedasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (monedas) {
      if (monedas.status === 200) {
        setNewCompra({
          ...newCompra,
          moneda_id:
            monedas.json.data.find(
              (moneda: IMoneda) => moneda.nombre == "SOLES"
            )?._id?.$oid ?? "",
        });
        setMonedas(monedas.json.data);
      }
    }
    setShowLoader(false);
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
    getMonedasList();
    getAlmacenesList();
    getProveedoresList();
    getUnidadesList();
    getTipoDocumentoList();
    getArticlesList();
    getComprasList();
    getTypeClientProvidersList();
    getZonesList();
    getSectorsList();
    getStateArticles();
    getFamiliesList();
    getGroupsList();
    getZonesList();
    getBrandsList();
    getSucursalesList();
    getSegmentoList();
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

  const handleDecimals = (numero: string): string => {
    if (numero.includes(".")) {
      return numero.split(".")[1].length >= 2
        ? Number(numero).toFixed(2).toString()
        : numero.toString();
    }
    return numero.toString();
  };

  const calcularSubTotal = (compra: ICompra | INewCompra): number => {
    let subtotal: number = 0.0;
    for (let index = 0; index < compra.articulos.length; index++) {
      subtotal = Number(compra.articulos[index].total) + subtotal;
    }
    return subtotal;
  };

  const calcularNewSubTotal = (compra: ICompra | INewCompra) => {
    const descuento = Number(compra.descuento) ?? 0;
    const total = calcularSubTotal(compra);
    if (compra.deducir_igv) {
      return Number(handleDecimals(((total - descuento) / 1.18).toString()));
    }
    return Number(handleDecimals((total - descuento).toString()));
  };

  const calcularTotal = (compra: ICompra | INewCompra) => {
    const percep = Number(compra.inc) ?? 0;
    const igv = Number(compra.igv) ?? 0;
    const total = Number(calcularNewSubTotal(compra)) ?? 0;
    return Number(
      handleDecimals((total + igv - ((total + igv) * percep) / 100).toString())
    );
  };

  const calcularPercep = (compra: ICompra | INewCompra) => {
    const total = calcularNewSubTotal(compra);
    const igv = Number(newEditableCompra.igv);
    const porcentajeInc = Number(newEditableCompra.inc);
    return handleDecimals((((total + igv) * porcentajeInc) / 100).toString());
  };

  const handleCreateCompra = async () => {
    if (newCompra.proveedor_id.trim() == "") {
      return errorValidateForm("proveedor");
    }
    if (newCompra.documento_compra_id.trim() == "") {
      return errorValidateForm("documento");
    }
    if (newCompra.documento_compra.trim() == "") {
      return errorValidateForm("documento");
    }
    if (newCompra.tipo_compra_id.trim() == "") {
      return errorValidateForm("tipo compra");
    }
    if (newCompra.moneda_id.trim() == "") {
      return errorValidateForm("moneda");
    }
    if (newCompra.articulos.length == 0) {
      setShowAlert({
        ...showAlert,
        icon: "warning",
        title: "Campos incompletos",
        message: "Se necesita ingresar articulos",
        show: true,
      });
      return closeAlertTimeOut();
    }
    for (let i = 0; i < newCompra.articulos.length; i++) {
      if (newCompra.articulos[i].unidad_descripcion == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita seleccionar unidad en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newCompra.articulos[i].almacen_id == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita seleccionar almacen en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newCompra.articulos[i].cantidad == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita ingresar cantidad en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newCompra.articulos[i].costo == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita ingresar costo en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newCompra.articulos[i].total == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita ingresar total en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowLoader(true);
    const response = await postRegistroCompraService(
      {
        ...newCompra,
        igv: Number(newCompra.igv),
        subtotal: Number(newCompra.subtotal),
        total: calcularTotal(newCompra),
        descuento: Number(newCompra.descuento),
        inc: Number(newCompra.inc),
        percep: calcularPercep(newCompra),
        articulos: newCompra.articulos.map((item) => {
          return {
            ...item,
            total: Number(item.total),
            costo: Number(item.costo),
            cantidad: Number(item.cantidad),
          };
        }),
      },
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getArticlesList();
        getComprasList();
        handleResetNewCompra();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Compra creada correctamente",
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

  const handleUpdateCompra = async () => {
    if (newEditableCompra.proveedor_id.trim() == "") {
      return errorValidateForm("proveedor");
    }
    if (newEditableCompra.documento_compra_id.trim() == "") {
      return errorValidateForm("documento");
    }
    if (newEditableCompra.documento_compra.trim() == "") {
      return errorValidateForm("documento");
    }
    if (newEditableCompra.tipo_compra_id.trim() == "") {
      return errorValidateForm("tipo compra");
    }
    if (newEditableCompra.moneda_id.trim() == "") {
      return errorValidateForm("moneda");
    }
    if (newEditableCompra.articulos.length == 0) {
      setShowAlert({
        ...showAlert,
        icon: "warning",
        title: "Campos incompletos",
        message: "Se necesita ingresar articulos",
        show: true,
      });
      return closeAlertTimeOut();
    }
    for (let i = 0; i < newEditableCompra.articulos.length; i++) {
      if (newEditableCompra.articulos[i].unidad_descripcion == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita seleccionar unidad en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newEditableCompra.articulos[i].almacen_id == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita seleccionar almacen en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newEditableCompra.articulos[i].cantidad == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita ingresar cantidad en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newEditableCompra.articulos[i].costo == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita ingresar costo en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (newEditableCompra.articulos[i].total == "") {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Campos incompletos",
          message: `Se necesita ingresar total en el articulo ${i + 1}`,
          show: true,
        });
        return closeAlertTimeOut();
      }
    }
    setShowLoader(true);

    const compraEdit = {
      ...newEditableCompra,
      igv: Number(newEditableCompra.igv),
      subtotal: Number(newEditableCompra.subtotal),
      total: calcularTotal(newEditableCompra),
      descuento: Number(newEditableCompra.descuento),
      inc: Number(newEditableCompra.inc),
      percep: calcularPercep(newEditableCompra),
      articulos: newEditableCompra.articulos.map((item) => {
        return {
          ...item,
          total: Number(item.total),
          costo: Number(item.costo),
          cantidad: Number(item.cantidad),
        };
      }),
    }
    delete compraEdit["created_at"]
    delete compraEdit["updated_at"]
    const response = await putRegistroCompraService(
      compraEdit,
      editableCompra._id.$oid,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getComprasList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Compra actualizada correctamente",
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

  const handleResetNewEditableCompra = () => {
    setNewEditableCompra(editableCompra);
  };

  const handleResetNewCompra = () => {
    setNewCompra({
      ...newCompra,
      empresa_id: getLocalStorageItem("empresa"),
      proveedor_id: "",
      proveedor_ruc: "",
      proveedor_nombre: "",
      documento_compra_id: "",
      documento_compra: "",
      tipo_compra_id: "",
      fecha_emision: new Date(Date.now() + 3600 * 1000).toJSON().split("T")[0],
      fecha_vencimiento: new Date(Date.now() + 3600 * 1000)
        .toJSON()
        .split("T")[0],
      fecha_llegada: new Date(Date.now() + 3600 * 1000).toJSON().split("T")[0],
      transporte: false,
      articulos: [],
      descuento: "",
      subtotal: "",
      igv: "",
      total: "",
      deducir_igv: false,
      costear_igv: false,
      inc_percep: false,
      inc: "",
      percep: "",
    });
  };

  const funcion = (data: ICompra) => {
    setEditableCompra(data);
    setNewEditableCompra(data);
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const renderComponent = () => {
    switch (step) {
      case 1:
        return (
          <div className={styles.datatable}>
            <CompraDataTable
              filtros={filtros}
              setFiltros={setFiltros}
              getComprasList={getComprasList}
              errorValidateForm={errorValidateForm}
              comprasList={comprasList}
              tipoDocumentos={tipoDocumentos}
              setSelectedCompra={setSelectedCompra}
              selectedCompra={selectedCompra}
              funcion={funcion}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <NCF
              setNewCompras={setNewCompra}
              newCompras={newCompra}
              tipoDocumentos={tipoDocumentos}
              monedas={monedas}
              articulos={articulos}
              almacenes={almacenes}
              proveedores={proveedores}
              unidades={unidades}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              closeAlertTimeOut={closeAlertTimeOut}
              sectorsList={sectorsList}
              getProveedoresList={getProveedoresList}
              setShowLoader={setShowLoader}
              typeClientProvidersList={typeClientProvidersList}
              zonesList={zonesList}
              brandsList={brandsList}
              familiesList={familiesList}
              getArticlesList={getArticlesList}
              groupsList={groupsList}
              stateArticlesList={stateArticlesList}
              getSectorsList={getSectorsList}
              getZonesList={getZonesList}
              getBrandsList={getBrandsList}
              getGroupsList={getGroupsList}
              getBranchOfficesList={getSucursalesList}
              getWareHousesList={getAlmacenesList}
              sucursales={sucursales}
              getUnitsList={getUnidadesList}
              segmentosList={segmentosList}
            />
          </div>
        );

      case 3:
        return (
          <div className={styles.form}>
            <ECF
              brandsList={brandsList}
              familiesList={familiesList}
              getArticlesList={getArticlesList}
              groupsList={groupsList}
              stateArticlesList={stateArticlesList}
              setNewEditableCompra={setNewEditableCompra}
              newEditableCompra={newEditableCompra}
              tipoDocumentos={tipoDocumentos}
              monedas={monedas}
              articulos={articulos}
              almacenes={almacenes}
              proveedores={proveedores}
              unidades={unidades}
              showAlert={showAlert}
              setShowAlert={setShowAlert}
              closeAlertTimeOut={closeAlertTimeOut}
              sectorsList={sectorsList}
              getProveedoresList={getProveedoresList}
              setShowLoader={setShowLoader}
              typeClientProvidersList={typeClientProvidersList}
              zonesList={zonesList}
              getSectorsList={getSectorsList}
              getZonesList={getZonesList}
              getBrandsList={getBrandsList}
              getGroupsList={getGroupsList}
              getBranchOfficesList={getSucursalesList}
              getWareHousesList={getAlmacenesList}
              sucursales={sucursales}
              getUnitsList={getUnidadesList}
              segmentosList={segmentosList}
            />
          </div>
        );
    }
  };

  const renderButton = () => {
    switch (step) {
      case 1:
        return (
          <>
            <button
              className={styles.create}
              onClick={() => (editableCompra._id.$oid ? setStep(3) : "")}
            >
              <FaPlus /> EDITAR
            </button>
          </>
        );
      case 2:
        return (
          <>
            <button className={styles.option} onClick={handleResetNewCompra}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateCompra}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableCompra}
            >
              DESHACER
            </button>
            <button className={styles.create} onClick={handleUpdateCompra}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nueva Compra</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de compras
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nueva compra
          </button>
          <button
            className={isStepActive(3)}
            onClick={() => setStep(3)}
            disabled
          >
            Editar Compra
          </button>
        </div>
      </div>
      <div className={styles.parametros}>{renderComponent()}</div>

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
