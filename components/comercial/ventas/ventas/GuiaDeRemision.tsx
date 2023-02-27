import { clsx } from "@/lib/clsx";
import styles from "./GuiaDeRemision.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IGuiaRemision } from "@/interfaces/comercial/ventas/ventasInterfaces";
import { FormEvent } from "react";
import { IMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";

export const GuiaDeRemision = ({
  show,
  setShow,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  guiaRemision,
  setGuiaRemision,
  handleSetGuiaRemision,
  handleCloseGuiaRemision,
  motivoTrasladoList,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  guiaRemision: IGuiaRemision;
  setGuiaRemision: (guia: IGuiaRemision) => void;
  handleSetGuiaRemision: () => void;
  handleCloseGuiaRemision: () => void;
  motivoTrasladoList: IMotivoTraslado[];
}) => {
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setGuiaRemision({
      ...guiaRemision,
      [name]: value.toUpperCase(),
    });
  };

  const handleSelectChange = (e: FormEvent<HTMLSelectElement>) => {
    const { name, value } = e.currentTarget;
    setGuiaRemision({
      ...guiaRemision,
      [name]: value,
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

  const handleCreateArticulo = async () => {
    if (guiaRemision.transportista_ruc.trim() == "") {
      return errorValidateForm("transportista RUC");
    }
    if (guiaRemision.transportista_rs.trim() == "") {
      return errorValidateForm("transportista razon social");
    }
    if (guiaRemision.conductor_dni.trim() == "") {
      return errorValidateForm("Conductor DNI");
    }
    if (guiaRemision.conductor_nombre.trim() == "") {
      return errorValidateForm("Conductor nombre");
    }
    if (guiaRemision.motivo_traslado_id.trim() == "") {
      return errorValidateForm("motivo traslado");
    }
    if (guiaRemision.fecha_traslado.trim() == "") {
      return errorValidateForm("fecha traslado");
    }
    if (guiaRemision.partida_direccion.trim() == "") {
      return errorValidateForm("partido de direccion");
    }
    if (guiaRemision.partida_ubigeo.trim() == "") {
      return errorValidateForm("partido de ubigei");
    }
    if (guiaRemision.vehiculo_placa.trim() == "") {
      return errorValidateForm("vehiculo placa");
    }
    if (guiaRemision.vehiculo_marca.trim() == "") {
      return errorValidateForm("vehiculo marca");
    }
    handleSetGuiaRemision();
    setShowAlert({
      ...showAlert,
      icon: "success",
      title: "Operación exitosa",
      message: "Guia de remision asignada correctamente",
      show: true,
    });
    return closeAlertTimeOut();
  };

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Guia remision</span>
          <button onClick={() => setShow(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.remove} onClick={handleCloseGuiaRemision}>
            <FaTrash /> Limpiar
          </button>
          <button className={styles.add} onClick={handleCreateArticulo}>
            <FaPlus /> Guardar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div>
              <label htmlFor="transportista_ruc">Trasportista RUC</label>
              <input autoComplete="off"
                id="transportista_ruc"
                type="text"
                name="transportista_ruc"
                value={guiaRemision.transportista_ruc}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="">Trasportista Razón Social</label>
              <input autoComplete="off"
                id="transportista_rs"
                type="text"
                name="transportista_rs"
                value={guiaRemision.transportista_rs}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="conductor_dni">Conductor DNI</label>
              <input autoComplete="off"
                id="conductor_dni"
                type="text"
                name="conductor_dni"
                value={guiaRemision.conductor_dni}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="fecha_traslado">Conductor Nombre</label>
              <input autoComplete="off"
                id="conductor_nombre"
                type="text"
                name="conductor_nombre"
                value={guiaRemision.conductor_nombre}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="fecha_traslado">Motivo traslado</label>
              <select
                id="motivo_traslado_id"
                name="motivo_traslado_id"
                value={guiaRemision.motivo_traslado_id}
                onChange={handleSelectChange}
              >
                <option value="" hidden></option>
                {motivoTrasladoList.map((item) => (
                  <option key={item._id.$oid} value={item._id.$oid}>
                    {item.motivo_traslado}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="fecha_traslado">Fecha Traslado</label>
              <input autoComplete="off"
                id="fecha_traslado"
                type="Dat"
                name="fecha_traslado"
                value={guiaRemision.fecha_traslado}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="partida_direccion">Direccion partida</label>
              <input autoComplete="off"
                id="partida_direccion"
                type="Dat"
                name="partida_direccion"
                value={guiaRemision.partida_direccion}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="partida_ubigeo">Ubigeo</label>
              <input autoComplete="off"
                id="partida_ubigeo"
                type="text"
                name="partida_ubigeo"
                value={guiaRemision.partida_ubigeo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="llegada_direccion">Direccion llegada</label>
              <input autoComplete="off"
                id="llegada_direccion"
                type="text"
                name="llegada_direccion"
                value={guiaRemision.llegada_direccion}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="llegada_ubigeo">Ubigeo</label>
              <input autoComplete="off"
                id="llegada_ubigeo"
                type="text"
                name="llegada_ubigeo"
                value={guiaRemision.llegada_ubigeo}
                onChange={handleInputChange}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div>
              <label htmlFor="vehiculo_placa">Placa de Carro</label>
              <input autoComplete="off"
                id="vehiculo_placa"
                type="text"
                name="vehiculo_placa"
                value={guiaRemision.vehiculo_placa}
                onChange={handleInputChange}
              />
            </div>
            <div>
              <label htmlFor="vehiculo_marca">Marca de Carro</label>
              <input autoComplete="off"
                id="vehiculo_marca"
                type="text"
                name="vehiculo_marca"
                value={guiaRemision.vehiculo_marca}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
