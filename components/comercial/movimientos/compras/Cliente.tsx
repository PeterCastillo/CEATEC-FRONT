import { clsx } from "@/lib/clsx";
import styles from "./Cliente.module.scss";
import { MdClose } from "react-icons/md";
import { ImPlus, ImPencil } from "react-icons/im";
import { FaPlus } from "react-icons/fa";
import { IClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { FormEvent, useState, useEffect } from "react";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

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
  const [proveedoresList, setProveedoresList] = useState(proveedores);
  const [pagination, setPagination] = useState(0);
  const [filtros, setFiltros] = useState({
    nombre: "",
    direccion: "",
    dni_ruc: "",
    telefonos: "",
  });

  useEffect(() => {
    filtrarProveedores();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setProveedoresList(proveedores);
  }, [proveedores]);

  const handleFiltrosChange = (e: FormEvent<HTMLInputElement>) => {
    setPagination(0);
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
        nombre: name == "nombre" ? value.toUpperCase() : "",
        direccion: name == "direccion" ? value.toUpperCase() : "",
        dni_ruc: name == "dni_ruc" ? value.toUpperCase() : "",
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

  const filtrarProveedores = () => {
    const proveedoresFiltrados = proveedores.filter((proveedor) => {
      if (filtros.nombre && proveedor.nombre_comercial) {
        return proveedor.nombre_comercial
          .toUpperCase()
          .includes(filtros.nombre.toUpperCase());
      }
      if (filtros.nombre && !proveedor.nombre_comercial) {
        return proveedor.nombre_natural
          .concat("", proveedor.apellido_paterno_natural)
          .concat("", proveedor.apellido_materno_natural)
          .toUpperCase()
          .includes(filtros.nombre.toUpperCase());
      }
      if (filtros.dni_ruc) {
        return proveedor.dni_ruc
          .toUpperCase()
          .startsWith(filtros.dni_ruc.toUpperCase());
      }
      if (filtros.direccion) {
        return proveedor.direccion
          .toString()
          .toUpperCase()
          .includes(filtros.direccion.toUpperCase());
      }
      if (filtros.telefonos) {
        return proveedor.telefono1
          .toUpperCase()
          .startsWith(filtros.telefonos.toUpperCase());
      }
      return proveedor;
    });
    setProveedoresList(proveedoresFiltrados);
  };

  const renderProveedores = () => {
    const startIndex = pagination * 10;
    const endIndex = pagination * 10 + 10;
    if (!proveedoresList.length) {
      return (
        <>
          <tr>
            <td colSpan={4}>No tiene datos</td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
          <tr>
            <td colSpan={4}></td>
          </tr>
        </>
      );
    }
    const newData = [...proveedoresList];
    const empty = proveedoresList.length.toString().split("").at(-1);
    for (let i = 0; i < 10 - Number(empty); i++) {
      const emptyObject = {
        _id: {
          $oid: "",
        },
        estado: false,
        tipo_cliente_proveedor_id: "",
        clasificacion: "",
        dni_ruc: "",
        nombre_comercial: "",
        nombre_natural: "",
        apellido_paterno_natural: "",
        apellido_materno_natural: "",
        fecha_nacimiento_natural: "",
        codigo_ubigeo: "",
        sector_id: "",
        zona_id: "",
        direccion: "",
        email: "",
        telefono1: "",
        telefono2: "",
        nombre_contacto_otro: "",
        telefono_contacto_otro: "",
        descripcion_contacto_otro: "",
        precio_credito: null,
        empresa_id: "",
      };
      newData.push(emptyObject);
    }
    return newData
      .map((proveedor, index) => (
        <tr
          className={`${
            proveedor._id.$oid &&
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
          key={index}
        >
          {proveedor.nombre_natural == "" ? (
            <td>{proveedor.nombre_comercial}</td>
          ) : (
            <td>
              {proveedor.nombre_natural} {proveedor.apellido_paterno_natural}{" "}
              {proveedor.apellido_materno_natural}
            </td>
          )}
          <td>{proveedor.direccion}</td>
          <td>{proveedor.dni_ruc}</td>
          <td>{proveedor.telefono1}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
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
              setProveedorSelected("");
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
        <div className={styles.pag}>
          <div
            onClick={() => {
              if (proveedoresList.length == 0) {
                return;
              }
              setPagination(
                pagination === 0
                  ? Math.ceil(proveedoresList.length / 10) - 1
                  : pagination - 1
              );
            }}
          >
            <IoIosArrowBack />
          </div>
          <span>
            {pagination + 1}/
            {Math.ceil(proveedoresList.length / 10) == 0
              ? 1
              : Math.ceil(proveedoresList.length / 10)}
          </span>
          <div
            onClick={() => {
              if (proveedoresList.length == 0) {
                return;
              }
              setPagination(
                pagination == Math.ceil(proveedoresList.length / 10) - 1
                  ? 0
                  : pagination + 1
              );
            }}
          >
            <IoIosArrowForward />
          </div>
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
              {renderProveedores()}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
