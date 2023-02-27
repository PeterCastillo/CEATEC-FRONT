"use client";

import styles from "@/styles/Header.module.scss";
import { FaPlus } from "react-icons/fa";
import { IVenta } from "@/interfaces/comercial/ventas/ventasInterfaces";
import { useState, useEffect } from "react";
import { getListaRegistroVentaService } from "@/services/comercial/ventas/ventasServices";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { Loader } from "@/components/commons/loader/Loader";
import { Alert } from "@/components/commons/alert/Alert";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { ReimprimirVentasDataTable } from "@/components/comercial/ventas/reimprimir-ventas/ReimprimirVentas";
import { ITipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";
import { getListaTipoDocumentoVentaService } from "@/services/comercial/mantenimiento/tipo-documento/venta/ventaServices";

export default function Home() {
  const [step, setStep] = useState(1);

  const [ventasList, setVentasList] = useState<IVenta[]>([]);
  const [tipoDocumentoVenta,setTipoDocumentoVenta] = useState<ITipoDocumentoVenta[]>([])

  const [selectedVenta, setSelectedVenta] = useState<IVenta>({
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
  const [filtros, setFiltros] = useState({
    tipo_documento_venta_id: "",
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

  const getVentasList = async () => {
    setShowLoader(true);
    let query_params = new URLSearchParams({
      since: filtros.since,
      until: filtros.until,
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

  const getTipoDocumentoList = async () => {
    setShowLoader(true);

    const response = await getListaTipoDocumentoVentaService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage(),
    );
    if (response) {
      if (response.status === 200) {
        setTipoDocumentoVenta(response.json.data);
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getVentasList();
    getTipoDocumentoList()
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
    if (selectedVenta._id.$oid.trim() == "") {
      return errorValidateForm("venta");
    }
    // setShowLoader(true);
    // const response = await postRegistroVentaService(
    //   {
    //     ...newVenta,
    //     trans_grat: Number(newVenta.trans_grat),
    //     descuento: Number(newVenta.descuento),
    //     igv: Number(newVenta.igv),
    //     sub_total: Number(newVenta.sub_total),
    //     valor_total: Number(newVenta.valor_total),
    //   },
    //   getTokenFromLocalStorage()
    // );
    // setShowLoader(false);
    // if (response) {
    //   if (response.status == 201) {
    //     setVentaModalImprimir(response.json.data)
    //     setModalImprimir(true);
    //     getVentasList();
    //     handleResetNewVenta();
    //     setShowAlert({
    //       ...showAlert,
    //       icon: "success",
    //       title: "Operación exitosa",
    //       message: "Venta creada correctamente",
    //       show: true,
    //     });
    //     return closeAlertTimeOut();
    //   }
    // }
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
    setSelectedVenta({
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
      _id: {
        $oid: "",
      },
      created_at: {
        $date: "",
      },
    });
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
              onClick={() => (selectedVenta._id.$oid ? handleCreateVenta : "")}
            >
              <FaPlus /> Reimprimir
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
            <ReimprimirVentasDataTable
              errorValidateForm={errorValidateForm}
              filtros={filtros}
              getVentasList={getVentasList}
              selectedVenta={selectedVenta}
              setFiltros={setFiltros}
              setSelectedVenta={setSelectedVenta}
              tipoDocumentoVenta={tipoDocumentoVenta}
              ventaList={ventasList}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Reimprimir Venta</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Reimprimir Venta
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
