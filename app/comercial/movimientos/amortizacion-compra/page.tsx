"use client";

import { AmortizarCompraForm } from "@/components/comercial/movimientos/amortizacion-compra/AmortizacionCompraForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IMoneda } from "@/interfaces/comercial/extras/monedaInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { ITipoDocumentoCompra } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";
import { IBanco } from "@/interfaces/comercial/mantenimiento/ventas/bancosInterface";
import { IAmortizarCompra } from "@/interfaces/comercial/movimientos/amortizarCompraInterface";
import {
  ICompra,
} from "@/interfaces/comercial/movimientos/comprasIntefaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { getListaMonedasService } from "@/services/comercial/extras/monedaServices";
import { getListaClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import { getListaTipoDocumentoCompraService } from "@/services/comercial/mantenimiento/tipo-documento/compra/compraServices";
import { getListaBancoService } from "@/services/comercial/mantenimiento/ventas/bancoServices";
import styles from "./page.module.scss"
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { ProveedorCompra } from "@/components/comercial/movimientos/amortizacion-compra/ProveedorCompras";
import { postAmortizacionCompraService } from "@/services/comercial/movimientos/amortizarCompraServices";

export default function Home() {
  const [step, setStep] = useState(1);

  const [compra, setCompra] = useState<ICompra>({
    _id: {
      $oid: "",
    },
    empresa_id: "",
    proveedor_id: "",
    proveedor_ruc: "",
    proveedor_nombre: "",
    documento_compra: "",
    documento_compra_id: "",
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
    created_at: {$date: ""}
  });
  const [amortizarCompra, setAmortizarCompra] = useState<IAmortizarCompra>({
    girado: "",
    tipo_documento_pago_id: "",
    fecha_pago: "",
    cuenta: "",
    monto_a_pagar: "",
    nro_de_documento_pago: "",
    tipo_de_pago_compra: "",
    moneda_id: "",
    glosa: "",
    compra_id: "",
    proveedor: "",
    tipo_documento_compra_id: "",
    nro_documento_compra: "",
    deuda: "",
  });

  const [monedas, setMonedas] = useState<IMoneda[]>([]);
  const [bancos, setBancos] = useState<IBanco[]>([]);
  const [tipoDocumentos, setTipoDocumentos] = useState<ITipoDocumentoCompra[]>(
    []
  );
  const [proveedores, setProveedores] = useState<IClientProvider[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getProveedoresList = async () => {
    setShowLoader(true);
    const proveedores = await getListaClienteProveedorService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (proveedores) {
      if (proveedores.status === 200) {
        setProveedores(proveedores.json.data);
      }
    }
    setShowLoader(false);
  };
  const getMonedasList = async () => {
    setShowLoader(true);
    const monedas = await getListaMonedasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (monedas) {
      if (monedas.status === 200) {
        setMonedas(monedas.json.data);
      }
    }
    setShowLoader(false);
  };
  const getTipoDocumentoList = async () => {
    setShowLoader(true);
    const tipoDocumentos = await getListaTipoDocumentoCompraService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (tipoDocumentos) {
      if (tipoDocumentos.status === 200) {
        setTipoDocumentos(tipoDocumentos.json.data);
      }
    }
    setShowLoader(false);
  };
  const getBancosList = async () => {
    setShowLoader(true);
    const bancos = await getListaBancoService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (bancos) {
      if (bancos.status === 200) {
        setBancos(bancos.json.data);
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getProveedoresList();
    getTipoDocumentoList();
    getMonedasList();
    getBancosList();
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

  const handleAmortizarCompra = async() => {
    if (amortizarCompra.tipo_documento_compra_id.trim() === "") {
      return errorValidateForm("documento de pago");
    }
    if (amortizarCompra.nro_documento_compra.trim() === "") {
      return errorValidateForm("numero de documento");
    }
    if (amortizarCompra.fecha_pago.trim() === "") {
      return errorValidateForm("fecha de pago");
    }
    if (amortizarCompra.tipo_documento_pago_id.trim() === "") {
      return errorValidateForm("tipo documento de pago");
    }
    if (amortizarCompra.girado.trim() === "") {
      return errorValidateForm("girado");
    }
    if (amortizarCompra.cuenta.trim() === "") {
      return errorValidateForm("cuenta");
    }
    if (amortizarCompra.monto_a_pagar.trim() === "") {
      return errorValidateForm("monto a pagar");
    }
    if (amortizarCompra.moneda_id.trim() === "") {
      return errorValidateForm("moneda");
    }
    if (amortizarCompra.glosa.trim() === "") {
      return errorValidateForm("glosa");
    }
    setShowLoader(true);
    const response = await postAmortizacionCompraService(
      amortizarCompra,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      setStep(1);
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Compra amortizada correctamente",
        show: true,
      });
      return closeAlertTimeOut();
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

  const resetNewAmortizar = () => {};

  const handleSetAmortizarCompra = (compra: ICompra) => {
    setAmortizarCompra({
      ...amortizarCompra,
      compra_id: compra._id.$oid,
    });
    setCompra(compra)
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
            <button className={styles.create} onClick={() => amortizarCompra.compra_id ? setStep(2) : ""}>
              <FaPlus /> Amortizar
            </button>
          </>
        );
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewAmortizar}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleAmortizarCompra}>
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
            <ProveedorCompra
              handleSetAmortizarCompra={handleSetAmortizarCompra}
              monedas={monedas}
              proveedores={proveedores}
              tipoDocumento={tipoDocumentos}
              setShowLoader={setShowLoader}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <AmortizarCompraForm
              amortizarCompra={amortizarCompra}
              setAmortizarCompra={setAmortizarCompra}
              tipoDocumento={tipoDocumentos}
              monedas={monedas}
              compra={compra}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Amortizacion compra</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de compras - proveedor
          </button>
          <button
            className={isStepActive(2)}
            disabled
            onClick={() => setStep(2)}
          >
            Amortizar compra
          </button>
        </div>
      </div>
      <div className={styles.contenedor}>{renderComponent()}</div>
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
