"use client";
import { KardexPorArticulo } from "@/components/comercial/reportes/kardex-por-articulo/KardexPorArticuloForm";
import { ReporteCompra } from "@/components/comercial/reportes/reporte-compras/ReporteCompra";
import { ReporteComprasForm } from "@/components/comercial/reportes/reporte-compras/ReporteComprasForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import styles from "@/styles/Header.module.scss";
import { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [grupos,setGrupos] = useState<IGroup[]>([])
  const [familias,setFamilias] = useState<IFamily[]>([])
  const [articulos,setArticulos] = useState<IArticle[]>([])
  const [marcas,setMarcas] = useState<IBrand[]>([])
  const [almacenes,setAlmacenes] = useState<IWareHouse[]>([])
  const [proveedor,setProveedor] = useState<IClientProvider[]>([])

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

  const renderComponent = () => {
    switch (step) {
      // case 2:
      //   return (
      //     <div className={styles.datatable}>
      //       <ReporteCompra />
      //     </div>
      //   );
      case 1:
        return (
          <div className={styles.form}>
            <KardexPorArticulo />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Kardex por Articulo</span>
          <button className={styles.create} onClick={handleCreateMarca}>
            <FaPlus /> GUARDAR
          </button>
        </div>
        <div className={styles.foot}>
          <button
            className={`${step == 1 && styles.active}`}
            onClick={() => setStep(1)}
          >
            Kardex por Articulo
          </button>
          <button className={styles.active} hidden={step == 2 ? false : true}>
            Kardex
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
