"use client";

import { UsuarioEditableForm } from "@/components/comercial/herramientas/seguridad/usuarios/UsuarioEditableForm";
import { UsuarioForm } from "@/components/comercial/herramientas/seguridad/usuarios/UsuarioForm";
import { UserDataTable } from "@/components/comercial/herramientas/seguridad/usuarios/UsuariosDataTable";
import { Alert } from "@/components/commons/alert/Alert";
import { Loader } from "@/components/commons/loader/Loader";
import {
  INewUser,
  IRol,
  IUpdateUser,
  IUser,
} from "@/interfaces/autenticacion/usuariosInterface";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getListaUsuariosService,
  getListRolesService,
  postUserService,
  putUserService,
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

  const [editableUser, setEditableUser] = useState<IUser>({
    _id: {
      $oid: "",
    },
    nombre_completo: "",
    correo: "",
    contrasena: "",
    empresa_id: "",
    rol: {
      id: "",
      descripcion: "",
    },
    estado: false,
  });
  const [newUser, setNewUser] = useState<INewUser>({
    nombre_completo: "",
    correo: "",
    contrasena: "",
    empresa_id: getLocalStorageItem("empresa"),
    rol: {
      id: "1312",
      descripcion: "1212123",
    },
  });
  const [newEditableUser, setNewEditableUser] = useState<IUser>({
    _id: {
      $oid: "",
    },
    nombre_completo: "",
    correo: "",
    contrasena: "",
    empresa_id: "",
    rol: {
      id: "",
      descripcion: "",
    },
    estado: false,
  });

  const [userList, setUserList] = useState<IUser[]>([]);
  const [roles, setRoles] = useState<IRol[]>([]);

  const [showLoader, setShowLoader] = useState(true);
  const [showAlert, setShowAlert] = useState<IAlert>({
    icon: "info",
    message: "",
    title: "",
    show: false,
  });

  const getUserList = async () => {
    setShowLoader(true);
    const users = await getListaUsuariosService(
      getLocalStorageItem("empresa"),
      getTokenFromLocalStorage()
    );
    if (users) {
      if (users.status === 200) {
        console.log(users);
        setUserList(users.json.data);
      }
    }
    setShowLoader(false);
  };

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
    getUserList();
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

  const handleCreateMarca = async () => {
    if (newUser.nombre_completo.trim() === "") {
      return errorValidateForm("nombre completo");
    }
    if (newUser.correo.trim() === "") {
      return errorValidateForm("correo");
    }
    if (newUser.contrasena.trim() === "") {
      return errorValidateForm("constraseña");
    }
    if (newUser.rol.id.trim() === "") {
      return errorValidateForm("rol");
    }
    setShowLoader(true);
    const response = await postUserService(newUser, getTokenFromLocalStorage());
    setShowLoader(false);
    if (response) {
      if (response.status === 201) {
        getUserList();
        resetNewUser();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Usuario creado correctamente",
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (response.status === 409) {
        setShowAlert({
          ...showAlert,
          icon: "error",
          title: "Error inesperado",
          message: "Usuario existente",
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

  const handleUpdateMarca = async () => {
    if (newEditableUser.nombre_completo.trim() === "") {
      return errorValidateForm("nombre completo");
    }
    if (newEditableUser.correo.trim() === "") {
      return errorValidateForm("correo");
    }
    if (newEditableUser.rol.id.trim() === "") {
      return errorValidateForm("rol");
    }
    setShowLoader(true);
    const data: IUpdateUser = {
      correo: newEditableUser.correo,
      nombre_completo: newEditableUser.nombre_completo,
      rol: newEditableUser.rol,
      constrasena: newEditableUser.contrasena,
    };
    if (data.constrasena) {
      if (data.constrasena.length < 6) {
        delete data["constrasena"];
      }
    }
    const response = await putUserService(
      data,
      editableUser._id.$oid,
      getTokenFromLocalStorage()
    );
    if (response) {
      if (response.status === 201) {
        getUserList();
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Usuario actualizado correctamente",
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

  //   const handleDeleteMarca = async () => {
  //     setShowLoader(true);
  //     const response = await deleteGrupoService(
  //       editableUser._id.$oid,
  //       getTokenFromLocalStorage()
  //     );
  //     setShowLoader(false);
  //     if (response) {
  //       if (response.status === 200) {
  //         getGroupsList();
  //         setShowAlert({
  //           ...showAlert,
  //           icon: "success",
  //           title: "Operación exitosa",
  //           message: "Usuario eliminado correctamente",
  //           show: true,
  //         });
  //         closeAlertTimeOut();
  //         return setStep(1);
  //       }
  //     }
  //     setShowAlert({
  //       ...showAlert,
  //       icon: "error",
  //       title: "Error inesperado",
  //       message: "No se pudo realizar la operación, intente más tarde",
  //       show: true,
  //     });
  //     return closeAlertTimeOut();
  //   };

  const resetNewUser = () => {
    setNewUser({
      ...newUser,
      nombre_completo: "",
      correo: "",
      contrasena: "",
    });
  };

  const handleResetNewEditableMarca = () => {
    setNewEditableUser(editableUser);
  };

  const funcion = (data: IUser) => {
    setEditableUser(data);
    setNewEditableUser(data);
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
            <button className={styles.create} onClick={handleCreateMarca}>
              <FaPlus /> GUARDAR
            </button>
          </>
        );
      case 3:
        return (
          <>
            <button
              className={styles.option}
              onClick={handleResetNewEditableMarca}
            >
              DESHACER
            </button>
            {/* <button className={styles.delete}>
              <FaTrash /> ELIMINAR
            </button> */}
            <button className={styles.create} onClick={handleUpdateMarca}>
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
            <UserDataTable
              action={funcion}
              columns={userList}
              rows={10}
              roles={roles}
            />
          </div>
        );

      case 2:
        return (
          <div className={styles.form}>
            <UsuarioForm
              newUser={newUser}
              setNewUser={setNewUser}
              roles={roles}
              closeAlertTimeOut={closeAlertTimeOut}
              getRolesList={getRolesList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
            />
          </div>
        );
      case 3:
        return (
          <div className={styles.form}>
            <UsuarioEditableForm
              user={newEditableUser}
              setUser={setNewEditableUser}
              roles={roles}
              closeAlertTimeOut={closeAlertTimeOut}
              getRolesList={getRolesList}
              setShowAlert={setShowAlert}
              setShowLoader={setShowLoader}
              showAlert={showAlert}
            />
          </div>
        );
    }
  };

  return (
    <>
      <div className={styles.header}>
        <div className={styles.head}>
          <span className={styles.title}>Nuevo usuario</span>
          {renderButton()}
        </div>
        <div className={styles.foot}>
          <button className={isStepActive(1)} onClick={() => setStep(1)}>
            Lista de usuarios
          </button>
          <button className={isStepActive(2)} onClick={() => setStep(2)}>
            Nuevo usuario
          </button>
          <button
            disabled
            className={isStepActive(3)}
            onClick={() => setStep(3)}
          >
            Editar usuario
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
