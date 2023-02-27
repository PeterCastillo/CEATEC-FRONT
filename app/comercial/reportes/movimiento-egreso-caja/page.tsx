"use client";
import { CuentasPorPagar } from "@/components/comercial/reportes/cuentas-por-pagar/CuentasPorPagar";
import { ListadoEgresoCaja } from "@/components/comercial/reportes/listado-egreso-caja/ListadoIngresoEfectivoCaja";
import { ListadoIngresoEfectivoCaja } from "@/components/comercial/reportes/listado-ingreso-efectivo-caja/ListadoIngresoEfectivoCaja";
import { ListadoProductos } from "@/components/comercial/reportes/listado-productos/ListadoProductos";
import { MovimientoEgresoCaja } from "@/components/comercial/reportes/movimiento-ingreso-caja/MovimientoEgresoCaja";
import { ReporteVentasForm } from "@/components/comercial/reportes/reporte-ventas/ReporteVentaForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IAlert } from "@/interfaces/componentsInterfaces";
import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [showLoader, setShowLoader] = useState(false);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  useEffect(() => {}, []);

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
    // if (newGroup.descripcion.trim() === "") {
    //   return errorValidateForm("descripcion");
    // }
    // setShowLoader(true);
    // const response = await postGrupoService(
    //   newGroup,
    //   getTokenFromLocalStorage()
    // );
    // setShowLoader(false);
    // if (response) {
    //   setShowAlert({
    //     ...showAlert,
    //     icon: "success",
    //     title: "Operación exitosa",
    //     message: "Grupo creado correctamente",
    //     show: true,
    //   });
    //   return closeAlertTimeOut();
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

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Movimiento Ingreso/Egreso - Caja</span>
          <button className={styles.create} onClick={handleCreateMarca}>
            <FaPlus /> GUARDAR
          </button>
        </div>
        <div className={styles.foot}>
          <button className={styles.active}>Movimiento Ingreso/Egreso - Caja</button>
        </div>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.form}>
          <MovimientoEgresoCaja/>
        </div>
      </div>
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
