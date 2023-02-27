"use client";
import { ReporteCompra } from "@/components/comercial/reportes/reporte-compras/ReporteCompra";
import { ReporteComprasForm } from "@/components/comercial/reportes/reporte-compras/ReporteComprasForm";
import { ReporteVenta } from "@/components/comercial/reportes/reporte-ventas/ReporteVenta";
import { ReporteVentaForm } from "@/components/comercial/reportes/reporte-ventas/ReporteVentaForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IBox } from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IRegistroComra, IReporteCompra } from "@/interfaces/comercial/reporte/reporteCompra/reporteCompraIntefaces";
import { IRegistroVenta, IReporteVenta } from "@/interfaces/comercial/reporte/reporteVenta/reporteVentaIntefaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { getListaCajasService } from "@/services/comercial/mantenimiento/caja/cajaServices";
import { getListaClienteProveedorService } from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";
import { postReporteCompraService } from "@/services/comercial/reporte/reporte-compra/reporteCompraServices";
import { postReporteVentasService } from "@/services/comercial/reporte/reporte-venta/reporteVentasServices";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [reporteVenta, setReporteVenta] = useState<IReporteVenta>({
    caja_id: "TODOS",
    fecha_fin: new Date(Date.now() + 3600 * 1000).toJSON().split("T")[0],
    fecha_inicio: new Date(Date.now() - 3600 * 1000 * 168)
      .toJSON()
      .split("T")[0],
    ordenado_por: "",
    resumen_consolidado: false,
    resumido_detallado: "",
    proveedor_id: "TODOS",
    tipo_documento: "",
  });

  const [registroVentas,setRegistroVentas] = useState<IRegistroVenta[]>([])

  const [cajas, setCajas] = useState<IBox[]>([]);
  const [proveedores, setProveedores] = useState<IClientProvider[]>([]);

  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getCajasList = async () => {
    setShowLoader(true);
    const cajas = await getListaCajasService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (cajas) {
      if (cajas.status === 200) {
        setCajas(cajas.json.data);
      }
    }
  };
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

  useEffect(() => {
    getProveedoresList();
    getCajasList();
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

  const handleCreateMarca = async () => {
    if (reporteVenta.proveedor_id.trim() === "") {
      return errorValidateForm("proveedor");
    }
    if (reporteVenta.resumido_detallado.trim() === "") {
      return errorValidateForm("resumido/detallado");
    }
    if (reporteVenta.ordenado_por.trim() === "") {
      return errorValidateForm("ordenar por");
    }
    if (reporteVenta.caja_id.trim() === "") {
      return errorValidateForm("cajero");
    }
    if (reporteVenta.tipo_documento.trim() === "") {
      return errorValidateForm("tipo documento");
    }
    if (reporteVenta.fecha_inicio.trim() === "") {
      return errorValidateForm("fecha inicio");
    }
    if (reporteVenta.fecha_fin.trim() === "") {
      return errorValidateForm("fecha fin");
    }
    setShowLoader(true);
    function addOneDay(date: Date) {
      const dateCopy = new Date(date);
      dateCopy.setDate(date.getDate() + 1);
      return dateCopy;
    }
    const date = new Date(reporteVenta.fecha_fin.concat(" ", "GMT"));
    const newDateFilter = addOneDay(date);
    const response = await postReporteVentasService(
      { ...reporteVenta, fecha_fin: newDateFilter.toJSON().split("T")[0] },
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      setStep(2)
      setRegistroVentas(response.json.data)
      setShowAlert({
        ...showAlert,
        icon: "success",
        title: "Operación exitosa",
        message: "Report de compra creado correctamente",
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

  const renderComponent = () => {
    switch (step) {
      case 2:
        return (
          <div className={styles.datatable}>
            <ReporteVenta registroVentas={registroVentas}/>
          </div>
        );

      case 1:
        return (
          <div className={styles.form}>
            <ReporteVentaForm
              cajas={cajas}
              proveedores={proveedores}
              reporteVenta={reporteVenta}
              setReporteVenta={setReporteVenta}
            />
          </div>
        );
    }
  };

  const renderButtons = () => {
    switch (step) {
      case 2:
        return (
          <button className={styles.create}>
            <FaPlus /> IMPRIMIR
          </button>
        );

      case 1:
        return (
          <button className={styles.create} onClick={handleCreateMarca}>
            <FaPlus /> GENERAR
          </button>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Registro de Ventas</span>
          {renderButtons()}
        </div>
        <div className={styles.foot}>
          <button
            className={`${step == 1 && styles.active}`}
            onClick={() => setStep(1)}
          >
            Registro de Ventas Comerciales
          </button>
          <button className={styles.active} hidden={step == 2 ? false : true}>
            Registro
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
