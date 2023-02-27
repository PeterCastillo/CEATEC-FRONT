"use client";

import { RolDataTable } from "@/components/comercial/herramientas/seguridad/niveles-de-acceso/RolDataTable";
import { RolesEditableForm } from "@/components/comercial/herramientas/seguridad/niveles-de-acceso/RolEditableForm";
import { RolesForm } from "@/components/comercial/herramientas/seguridad/niveles-de-acceso/RolesForm";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import { INewRol, IRol } from "@/interfaces/autenticacion/usuariosInterface";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getListRolesService,
  postRolService,
  putRolService,
} from "@/services/auth/usuariosServices";
import styles from "@/styles/Header.module.scss";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

export default function Home() {
  const [step, setStep] = useState(1);

  const [editableRol, setEditableRol] = useState<IRol>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    modulos: [],
    empresa_id: "",
    estado: false,
  });
  const [newRol, setNewRol] = useState<INewRol>({
    empresa_id: getLocalStorageItem("empresa"),
    descripcion: "",
    modulos: [
      {
        descripcion: "Archivar Todos",
        estado: false,
      },
      {
        descripcion: "Tipo de Cambio",
        estado: false,
      },
      {
        descripcion: "Salir",
        estado: false,
      },
      {
        descripcion: "Venta Producto",
        estado: false,
      },
      {
        descripcion: "Modificar/Eliminar Venta",
        estado: false,
      },
      {
        descripcion: "Nota de Credito",
        estado: false,
      },
      {
        descripcion: "Nota de Debito",
        estado: false,
      },
      {
        descripcion: "Generar Cronograma de Pago",
        estado: false,
      },
      {
        descripcion: "Gestion",
        estado: false,
      },
      {
        descripcion: "Ventas",
        estado: false,
      },
      {
        descripcion: "Reimprimir Ventas",
        estado: false,
      },
      {
        descripcion: "Cobranzas",
        estado: false,
      },
      {
        descripcion: "Reimprimir Cobranzas",
        estado: false,
      },
      {
        descripcion: "Mesas",
        estado: false,
      },
    ],
  });
  const [newEditableRol, setNewEditableRol] = useState<IRol>({
    _id: {
      $oid: "",
    },
    descripcion: "",
    modulos: [],
    empresa_id: "",
    estado: false,
  });

  const [roles, setRoles] = useState<IRol[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getRolesList = async () => {
    setShowLoader(true);
    const roles = await getListRolesService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (roles) {
      if (roles.status === 200) {
        setRoles(roles.json.data);
      }
    }
    setShowLoader(false);
  };

  useEffect(() => {
    getRolesList();
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

  const handleCreateRol = async () => {
    if (newRol.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await postRolService(newRol, getTokenFromLocalStorage());
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getRolesList();
        resetNewUser();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Rol creado correctamente",
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

  const handleUpdateRol = async () => {
    if (newEditableRol.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    setShowLoader(true);
    const response = await putRolService(
      newEditableRol,
      editableRol._id.$oid,
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 201) {
        getRolesList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Rol actualizado correctamente",
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

  const resetNewUser = () => {
    setNewRol({
      ...newRol,
      descripcion: "",
      modulos: [
        {
          descripcion: "Archivar Todos",
          estado: false,
        },
        {
          descripcion: "Tipo de Cambio",
          estado: false,
        },
        {
          descripcion: "Venta Producto",
          estado: false,
        },
        {
          descripcion: "Modificar/Eliminar Venta",
          estado: false,
        },
        {
          descripcion: "Nota de Credito",
          estado: false,
        },
        {
          descripcion: "Nota de Debito",
          estado: false,
        },
        {
          descripcion: "Generar Cronograma de Pago",
          estado: false,
        },
        {
          descripcion: "Gestion",
          estado: false,
        },
        {
          descripcion: "Ventas",
          estado: false,
        },
        {
          descripcion: "Reimprimir Ventas",
          estado: false,
        },
        {
          descripcion: "Cobranzas",
          estado: false,
        },
        {
          descripcion: "Reimprimir Cobranzas",
          estado: false,
        },
        {
          descripcion: "Mesas",
          estado: false,
        },
      ],
    });
  };

  const handleResetNewEditableRol = () => {
    setNewEditableRol(editableRol);
  };

  const funcion = (data: IRol) => {
    setEditableRol(data);
    setNewEditableRol(data);
    setStep(3);
  };

  const isStepActive = (stp: number) => {
    if (step === stp) {
      return styles.active;
    }
  };

  const renderButton = () => {
    switch (step) {
      case 2:
        return (
          <>
            <button className={styles.option} onClick={resetNewUser}>
              LIMPIAR
            </button>
            <button className={styles.create} onClick={handleCreateRol}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableRol}
            >
              DESHACER
            </button>
            <button className={styles.create} onClick={handleUpdateRol}>
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
            <RolDataTable action={funcion} columns={roles} rows={10} />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <RolesForm
              newRol={newRol}
              setNewRol={setNewRol}
              //   newUser={newRol}
              //   setNewUser={setNewRol}
              //   roles={roles}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <RolesEditableForm
              rol={newEditableRol}
              setRol={setNewEditableRol}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo Nivel de Acceso</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de niveles de acceso
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo nivel de acceso
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar nivel de acceso
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
