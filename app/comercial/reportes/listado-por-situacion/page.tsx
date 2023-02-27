"use client";
import { ListadoDeProveedor } from "@/components/comercial/reportes/listado-de-proveedor/ListadoProveedores";
import { ListadoPorSituacion } from "@/components/comercial/reportes/listado-por-situacion/ListadoPorSituacion";
import { ListadoProductos } from "@/components/comercial/reportes/listado-productos/ListadoProductos";
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
          <span className={styles.title}>Listado por Situacion</span>
          <button className={styles.create} onClick={handleCreateMarca}>
            <FaPlus /> GUARDAR
          </button>
        </div>
        <div className={styles.foot}>
          <button className={styles.active}>Listado por Situacion</button>
        </div>
      </div>
      <div className={styles.contenedor}>
        <div className={styles.form}>
          <ListadoPorSituacion />
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
