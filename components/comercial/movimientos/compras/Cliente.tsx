import { clsx } from "@/lib/clsx";
import styles from "./Cliente.module.scss";
import { MdClose } from "react-icons/md";
import { ImPlus, ImPencil, ImList, ImSigma } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { FormEvent, useState } from "react";
import { IAlert } from "@/interfaces/componentsInterfaces";

export const Cliente = ({
  show,
  setShowClientModal,
  setShowNewClientModal,
  proveedores,
  handleSetProveedor,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setClientProvider,
  setShowEditProveedorModal,
  clientProvider,
}: {
  show: boolean;
  setShowClientModal: (data: boolean) => void;
  setShowNewClientModal: (data: boolean) => void;
  proveedores: IClientProvider[];
  handleSetProveedor: (proveedor: IClientProvider) => void;
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setClientProvider: (state: IClientProvider) => void;
  clientProvider: IClientProvider;
  setShowEditProveedorModal: (state: boolean) => void;
}) => {
  const [proveedorSelected, setProveedorSelected] = useState("");
  const [filtros, setFiltros] = useState({
    nombre: "",
    direccion: "",
    dni_ruc: "",
    telefonos: "",
  });

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      [name]: value.toUpperCase,
    });
    if (
      name == "nombre" ||
      name == "direccion" ||
      name == "dni_ruc" ||
      name == "telefonos"
    ) {
      setFiltros({
        ...filtros,
        nombre: name == "nombre" ? value : "",
        direccion: name == "direccion" ? value : "",
        dni_ruc: name == "dni_ruc" ? value : "",
        telefonos: name == "telefonos" ? value : "",
      });
    }
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

  const handleSaveProveedor = () => {
    if (proveedorSelected.trim() == "") {
      return errorValidateForm("un proveedor");
    }
    if (proveedorSelected) {
      const proveedor = proveedores.find(
        (proveedor) => proveedor._id.$oid == proveedorSelected
      );
      if (proveedor) {
        handleSetProveedor(proveedor);
        setProveedorSelected("");
        setShowClientModal(false);
        return;
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
          <span className={styles.title}>Clientes</span>
          <button
            onClick={() => setShowClientModal(false)}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button
            className={styles.option}
            onClick={() => setShowNewClientModal(true)}
          >
            <ImPlus className={styles.plus} />
          </button>
          <button
            className={styles.option}
            onClick={() => {
              setProveedorSelected("")
              clientProvider._id.$oid
                ? setShowEditProveedorModal(true)
                : setShowEditProveedorModal(false);
            }}
          >
            <ImPencil className={styles.pencil} />
          </button>
          <button className={styles.add} onClick={handleSaveProveedor}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.table}>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Dirección</th>
                <th>DNI/RUC</th>
                <th>Teléfonos</th>
              </tr>
            </thead>
            <tbody>
              <tr className={styles.buscador}>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="nombre"
                    value={filtros.nombre}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="direccion"
                    value={filtros.direccion}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="dni_ruc"
                    value={filtros.dni_ruc}
                    onChange={handleFiltrosChange}
                  />
                </td>
                <td>
                  <input
                    autoComplete="off"
                    type="text"
                    name="telefonos"
                    value={filtros.telefonos}
                    onChange={handleFiltrosChange}
                  />
                </td>
              </tr>
              {proveedores
                .filter((proveedor) =>
                  filtros.nombre ||
                  filtros.direccion ||
                  filtros.dni_ruc ||
                  filtros.telefonos
                    ? (filtros.nombre &&
                        proveedor.nombre_comercial &&
                        proveedor.nombre_comercial
                          .toUpperCase()
                          .includes(filtros.nombre.toUpperCase())) ||
                      (filtros.nombre &&
                        !proveedor.nombre_comercial &&
                        proveedor.nombre_natural
                          .concat("", proveedor.apellido_paterno_natural)
                          .concat("", proveedor.apellido_materno_natural)
                          .toUpperCase()
                          .includes(filtros.nombre.toUpperCase())) ||
                      (filtros.dni_ruc &&
                        proveedor.dni_ruc
                          .toUpperCase()
                          .startsWith(filtros.dni_ruc.toUpperCase())) ||
                      (filtros.direccion &&
                        proveedor.direccion
                          .toString()
                          .toUpperCase()
                          .includes(filtros.direccion.toUpperCase())) ||
                      (filtros.telefonos &&
                        proveedor.telefono1
                          .toUpperCase()
                          .startsWith(filtros.telefonos.toUpperCase()))
                    : proveedor
                )
                .map((proveedor) => (
                  <tr
                    className={`${
                      proveedorSelected == proveedor._id.$oid &&
                      styles.selected_row
                    }`}
                    onClick={() => {
                      proveedorSelected == proveedor._id.$oid
                        ? setClientProvider({ ...proveedor, _id: { $oid: "" } })
                        : setClientProvider(proveedor);
                      proveedorSelected == proveedor._id.$oid
                        ? setProveedorSelected("")
                        : setProveedorSelected(proveedor._id.$oid);
                    }}
                    key={proveedor._id.$oid}
                  >
                    {proveedor.nombre_natural == "" ? (
                      <td>{proveedor.nombre_comercial}</td>
                    ) : (
                      <td>
                        {proveedor.nombre_natural}{" "}
                        {proveedor.apellido_paterno_natural}{" "}
                        {proveedor.apellido_materno_natural}
                      </td>
                    )}
                    <td>{proveedor.direccion}</td>
                    <td>{proveedor.dni_ruc}</td>
                    <td>{proveedor.telefono1}</td>
                  </tr>
                )).reverse()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
