import { clsx } from "@/lib/clsx";
import { useState, FormEvent } from "react";
import styles from "./NuevoRol.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { postRolService } from "@/services/auth/usuariosServices";
import { INewRol } from "@/interfaces/autenticacion/usuariosInterface";

export const NuevoRol = ({
  show,
  setShowNewClientModal,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setShowLoader,
  getRolesList,
}: {
  show: boolean;
  setShowNewClientModal: (data: boolean) => void;
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setShowLoader: (status: boolean) => void;
  getRolesList: () => void;
}) => {
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

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewRol({
      ...newRol,
      [name]: value,
    });
  };

  const handleModuleChange = (descripcion: string) => {
    const validaro = newRol.modulos.find(
      (item) => item.descripcion == descripcion
    );
    if (validaro) {
      return setNewRol({
        ...newRol,
        modulos: newRol.modulos.map((item) =>
          item.descripcion == descripcion
            ? { ...item, estado: !item.estado }
            : item
        ),
      });
    }
    setNewRol({
      ...newRol,
      modulos: [...newRol.modulos, { descripcion: descripcion, estado: true }],
    });
  };
  const errorValidateForm = (field: string) => {
    setShowAlert({
      ...showAlert,
      icon: "warning",
      title: "Campos incompletos",
      message: "Se necesita seleccionar " + field,
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

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear Rol</span>
          <button
            onClick={() => setShowNewClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateRol}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.content}>
            <div className={styles.niveles_cabezera}>
              <label htmlFor="">Nivel Acceso:</label>
              <div>
                <input
                  type="text"
                  onChange={handleInputChange}
                  name="descripcion"
                  value={newRol.descripcion}
                />
              </div>
            </div>
            <div className={styles.acces_container}>
              <div className={styles.acces_section}>
                <div className={styles.form_section}>
                  <div className={styles.item}></div>
                  <span>Archicos</span>
                  <div className={styles.item}></div>
                </div>
                <div className={styles.input_container}>
                  {/* <div>
              <input type="checkbox" />
              <label htmlFor="">Activar Todos</label>
            </div> */}
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Tipo de Cambio")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Tipo de Cambio"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Tipo de Cambio")}
                    >
                      Tipo de Cambio
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Salir")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Salir"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Salir")}
                    >
                      Salir
                    </label>
                  </div>
                </div>
              </div>
              <div className={styles.acces_section}>
                <div className={styles.form_section}>
                  <div className={styles.item}></div>
                  <span>Ventas</span>
                  <div className={styles.item}></div>
                </div>
                <div className={styles.input_container}>
                  {/* <div>
              <input type="checkbox" />
              <label htmlFor="">Activar Todos</label>
            </div> */}
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Venta Producto")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Venta Producto"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Venta Producto")}
                    >
                      Venta Producto
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleModuleChange("Modificar/Eliminar Venta")
                      }
                      checked={
                        newRol.modulos.find(
                          (item) =>
                            item.descripcion == "Modificar/Eliminar Venta"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() =>
                        handleModuleChange("Modificar/Eliminar Venta")
                      }
                    >
                      Modificar/Eliminar Venta
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Nota de Credito")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Nota de Credito"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Nota de Credito")}
                    >
                      Nota de Credito
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Nota de Debito")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Nota de Debito"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Nota de Debito")}
                    >
                      Nota de Debito
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleModuleChange("Generar Cronograma de Pago")
                      }
                      checked={
                        newRol.modulos.find(
                          (item) =>
                            item.descripcion == "Generar Cronograma de Pago"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() =>
                        handleModuleChange("Generar Cronograma de Pago")
                      }
                    >
                      Generar Cronograma de Pago
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Gestion")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Gestion"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Gestion")}
                    >
                      Gestion
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Reimprimir Ventas")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Reimprimir Ventas"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Reimprimir Ventas")}
                    >
                      Reimprimir Ventas
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Cobranzas")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Cobranzas"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Cobranzas")}
                    >
                      Cobranzas
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() =>
                        handleModuleChange("Reimprimir Cobranzas")
                      }
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Reimprimir Cobranzas"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Reimprimir Cobranzas")}
                    >
                      Reimprimir Cobranza
                    </label>
                  </div>
                  <div>
                    <input
                      type="checkbox"
                      onChange={() => handleModuleChange("Mesas")}
                      checked={
                        newRol.modulos.find(
                          (item) => item.descripcion == "Mesas"
                        )?.estado ?? false
                      }
                    />
                    <label
                      htmlFor=""
                      onClick={() => handleModuleChange("Mesas")}
                    >
                      Mesas
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
