import { ISector } from "@/interfaces/comercial/mantenimiento/empresa/sectorInterface";
import { IZone } from "@/interfaces/comercial/mantenimiento/empresa/zonaInterfaces";
import { INewClientProvider } from "@/interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";
import { ITipoClienteProveedor } from "@/interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";
import { FormEvent, useEffect, useState } from "react";
import styles from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { SelectDinamico } from "@/components/commons/select/Select";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { NuevaZona } from "./NuevaZona";
import { NuevoSector } from "./NuevoSector";
import { AiOutlineFileSearch } from "react-icons/ai";
import {
  getConsultaSunatOneClienteProveedorByDniService,
  getConsultaSunatOneClienteProveedorByRucService,
} from "@/services/comercial/mantenimiento/cliente-proveedor/clienteProveedorService";

export const NCPF = ({
  newClientProvider,
  setNewClientProvider,
  sectorsList,
  typeClientProvidersList,
  zonesList,
  errorValidateForm,
  closeAlertTimeOut,
  getSectorsList,
  setShowAlert,
  setShowLoader,
  showAlert,
  getZonesList,
}: {
  newClientProvider: INewClientProvider;
  setNewClientProvider: (data: INewClientProvider) => void;
  typeClientProvidersList: ITipoClienteProveedor[];
  sectorsList: ISector[];
  zonesList: IZone[];
  errorValidateForm: (text: string) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getSectorsList: () => void;
  getZonesList: () => void;
}) => {
  const [modalSector, setModalSector] = useState(false);
  const [modalZona, setModalZona] = useState(false);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (
      name === "nombre_comercial" ||
      name === "nombre_juridico" ||
      name === "nombre_vendedor" ||
      name === "telefono_venderdor" ||
      name === "nombre_natural" ||
      name === "apellido_paterno_natural" ||
      name === "apellido_materno_natural" ||
      name === "fecha_nacimiento_natural"
    ) {
      if (newClientProvider.dni_ruc.trim() == "") {
        return errorValidateForm("DNI/RUC");
      }
    }
    if (Number.isNaN(Number(value))) {
      if (name == "precio_credito") {
        return;
      }
    }
    setNewClientProvider({
      ...newClientProvider,
      [name]: value.toUpperCase(),
    });
  };
  const handleSelectChange = (event: FormEvent<HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    if (
      name == "estado_civil_natural" &&
      newClientProvider.dni_ruc.trim() == ""
    ) {
      return errorValidateForm("DNI/RUC");
    }
    setNewClientProvider({
      ...newClientProvider,
      [name]: value,
    });
  };

  const handleSectorChange = (value: string) => {
    setNewClientProvider({
      ...newClientProvider,
      sector_id: value,
    });
  };

  const handleZonaChange = (value: string) => {
    setNewClientProvider({
      ...newClientProvider,
      zona_id: value,
    });
  };

  const handleDisableInput = (typePerson: string): boolean => {
    if (newClientProvider.dni_ruc.trim().length > 0) {
      switch (typePerson) {
        case "juridica": {
          if (newClientProvider.dni_ruc.trim().length > 8) {
            return false;
          } else {
            return true;
          }
        }
        case "natural": {
          if (newClientProvider.dni_ruc.trim().length <= 8) {
            return false;
          } else {
            return true;
          }
        }
      }
    }
    return false;
  };

  const handleConsultaSunat = async () => {
    if(newClientProvider.dni_ruc.length < 8){
      return
    }
    setShowLoader(true);
    if (newClientProvider.dni_ruc.length <= 8) {
      const response = await getConsultaSunatOneClienteProveedorByDniService(
        newClientProvider.dni_ruc
      );
      if (response) {
        setNewClientProvider({
          ...newClientProvider,
          nombre_natural: response.json.nombres,
          apellido_paterno_natural: response.json.apellido_paterno,
          apellido_materno_natural: response.json.apellido_materno
        });
        setShowLoader(false);
        return;
      }
    }
    if (newClientProvider.dni_ruc.length > 8) {
      const response = await getConsultaSunatOneClienteProveedorByRucService(
        newClientProvider.dni_ruc
      );
      if (response) {
        setNewClientProvider({
          ...newClientProvider,
          nombre_comercial: response.json.result.razon_social,
          direccion: response.json.result.domicilio_fiscal
        });
        setShowLoader(false);
        return;
      }
    }
    setShowLoader(false);
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Error inesperado",
      message: "No se pudo realizar la operación, intente más tarde",
      show: true,
    });
    return closeAlertTimeOut();
  };

  useEffect(() => {
    if (newClientProvider.dni_ruc.trim().length <= 8) {
      setNewClientProvider({
        ...newClientProvider,
        nombre_comercial: "",
      });
    }
    if (newClientProvider.dni_ruc.trim().length > 8) {
      setNewClientProvider({
        ...newClientProvider,
        nombre_natural:
          newClientProvider.dni_ruc.length <= 8
            ? newClientProvider.nombre_natural
            : "",
        apellido_paterno_natural: "",
        apellido_materno_natural: "",
        fecha_nacimiento_natural: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newClientProvider.dni_ruc]);

  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="tipo_cliente_proveedor_id">Tipo proveedor</label>
          <select
            id="tipo_cliente_proveedor_id"
            name="tipo_cliente_proveedor_id"
            onChange={handleSelectChange}
            value={newClientProvider.tipo_cliente_proveedor_id}
          >
            <option hidden value={""}>
              Seleccionar tipo proveedor
            </option>
            {typeClientProvidersList.map((clientProv) => (
              <option value={clientProv._id.$oid} key={clientProv._id.$oid}>
                {clientProv.descripcion}
              </option>
            ))}
          </select>
        </div>
        <div className={styles.f_g}>
          <label htmlFor="clasificacion">Clasificacion</label>
          <select
            name="clasificacion"
            id="clasificacion"
            onChange={handleSelectChange}
            value={newClientProvider.clasificacion}
          >
            <option value="" hidden>
              Selecionar clasificacion
            </option>
            <option value="Minoristas">Minoristas</option>
            <option value="Mayoristas">Mayoristas</option>
          </select>
        </div>
        <div className={styles.f_g}>
          <label htmlFor="dni_ruc">DNI/RUC</label>
          <input autoComplete="off"
            id="dni_ruc"
            name="dni_ruc"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.dni_ruc}
          />
          <span onClick={handleConsultaSunat} title="Consulta Web Sunat">
            <AiOutlineFileSearch />
          </span>
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>PERSONA JURIDICA</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="nombre_comercial">Nombre comercial</label>
          <input autoComplete="off"
            id="nombre_comercial"
            name="nombre_comercial"
            type="text"
            disabled={handleDisableInput("juridica")}
            onChange={handleInputChange}
            value={newClientProvider.nombre_comercial}
          />
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>PERSONA NATURAL</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="nombre_natural">Nombre</label>
          <input autoComplete="off"
            id="nombre_natural"
            name="nombre_natural"
            type="text"
            disabled={handleDisableInput("natural")}
            onChange={handleInputChange}
            value={newClientProvider.nombre_natural}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="apellido_paterno_natural">Apellido paterno</label>
          <input autoComplete="off"
            id="apellido_paterno_natural"
            name="apellido_paterno_natural"
            type="text"
            disabled={handleDisableInput("natural")}
            onChange={handleInputChange}
            value={newClientProvider.apellido_paterno_natural}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="apellido_materno_natural">Apellido materno</label>
          <input autoComplete="off"
            id="apellido_materno_natural"
            name="apellido_materno_natural"
            type="text"
            disabled={handleDisableInput("natural")}
            onChange={handleInputChange}
            value={newClientProvider.apellido_materno_natural}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="fecha_nacimiento_natural">Fecha nacimiento</label>
          <input autoComplete="off"
            id="fecha_nacimiento_natural"
            name="fecha_nacimiento_natural"
            type="date"
            disabled={handleDisableInput("natural")}
            onChange={handleInputChange}
            value={newClientProvider.fecha_nacimiento_natural}
          />
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>UBICACIÓN</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="codigo_ubigeo">Ubigeo</label>
          <input autoComplete="off"
            id="codigo_ubigeo"
            name="codigo_ubigeo"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.codigo_ubigeo}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="sector_id">Sector</label>
          <SelectDinamico
            setModal={setModalSector}
            handleChange={handleSectorChange}
            value={newClientProvider.sector_id}
            dataList={sectorsList.map((item) => {
              return {
                id: item._id.$oid,
                descripcion: item.descripcion,
              };
            })}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="zona_id">Zona</label>
          <SelectDinamico
            setModal={setModalZona}
            handleChange={handleZonaChange}
            value={newClientProvider.zona_id}
            dataList={zonesList.map((item) => {
              return {
                id: item._id.$oid,
                descripcion: item.descripcion,
              };
            })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="direccion">Direccion</label>
          <input autoComplete="off"
            id="direccion"
            name="direccion"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.direccion}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="email">Email</label>
          <input autoComplete="off"
            id="email"
            name="email"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.email}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="telefono1">Telefono 1</label>
          <input autoComplete="off"
            id="telefono1"
            name="telefono1"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.telefono1}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="telefono2">Telefono 2</label>
          <input autoComplete="off"
            id="telefono2"
            name="telefono2"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.telefono2}
          />
        </div>
      </div>
      <div className={styles.separator}>
        <div className={styles.line}></div>
        <span className={styles.subtitle}>OTROS DATOS</span>
        <div className={styles.line}></div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="nombre_contacto_otro">Contacto</label>
          <input autoComplete="off"
            id="nombre_contacto_otro"
            name="nombre_contacto_otro"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.nombre_contacto_otro}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="telefono_contacto_otro">Telefono contacto</label>
          <input autoComplete="off"
            id="telefono_contacto_otro"
            name="telefono_contacto_otro"
            type="text"
            onChange={handleInputChange}
            value={newClientProvider.telefono_contacto_otro}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="precio_credito">Precio credito</label>
          <input autoComplete="off"
            id="precio_credito"
            name="precio_credito"
            type="text"
            onChange={handleInputChange}
            value={
              newClientProvider.precio_credito == null
                ? ""
                : newClientProvider.precio_credito
            }
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="descripcion_contacto_otro">
            Descripcion contacto
          </label>
          <textarea
            id="descripcion_contacto_otro"
            name="descripcion_contacto_otro"
            onChange={handleInputChange}
            rows={3}
            value={newClientProvider.descripcion_contacto_otro}
          />
        </div>
      </div>
      <NuevoSector
        closeAlertTimeOut={closeAlertTimeOut}
        modal={modalSector}
        setModal={setModalSector}
        getSectorsList={getSectorsList}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        setShowLoader={setShowLoader}
      />
      <NuevaZona
        closeAlertTimeOut={closeAlertTimeOut}
        modal={modalZona}
        setModal={setModalZona}
        getZonesList={getZonesList}
        setShowAlert={setShowAlert}
        showAlert={showAlert}
        setShowLoader={setShowLoader}
      />
    </>
  );
};
