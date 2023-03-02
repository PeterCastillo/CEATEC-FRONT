import { clsx } from "@/lib/clsx";
import { FormEvent, FC, useState } from "react";
import styles from "./NuevaFamilia.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import {
  getLocalStorageItem,
  getTokenFromLocalStorage,
} from "@/utils/localStorageControl";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";
import { NuevoGrupo } from "./NuevoGrupo";
import {
  IFamily,
  INewFamily,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { postFamiliaService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/familiaServices";

interface INuevaFamilia {
  modal: boolean;
  setModal: (state: boolean) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  closeAlertTimeOut: () => void;
  getGroupsList: () => void;
  grupos: IGroup[];
  handleCreateSetFamilia: (familia: IFamily) => void;
  getFamilyList: (handleCreateSetFamilia?: () => void) => void;
}

export const NuevaFamilia: FC<INuevaFamilia> = ({
  setModal,
  modal,
  setShowLoader,
  showAlert,
  setShowAlert,
  closeAlertTimeOut,
  getGroupsList,
  grupos,
  getFamilyList,
  handleCreateSetFamilia,
}) => {
  const [modalGrupo, setModalGrupo] = useState(false);
  const [newFamily, setNewFamily] = useState<INewFamily>({
    considerar_en_venta: false,
    cuenta_compra_debe: "6011",
    cuenta_venta_debe: "7011",
    cuenta_compra_haber: "4212",
    cuenta_venta_haber: "1212",
    cuenta_mercaderia: "6911",
    cuenta_prod_manufac: "2011",
    descripcion: "",
    empresa_id: getLocalStorageItem("empresa"),
    exonerado_igv: false,
    grupo_id: "",
  });
  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (value.includes(".")) {
      return;
    }
    if (Number.isNaN(Number(value))) {
      if (
        name == "cuenta_compra_debe" ||
        name == "cuenta_compra_haber" ||
        name == "cuenta_mercaderia" ||
        name == "cuenta_prod_manufac" ||
        name == "cuenta_venta_debe" ||
        name == "cuenta_venta_haber"
      ) {
        return;
      }
    }
    setNewFamily({
      ...newFamily,
      [name]: value.toUpperCase(),
    });
  };

  const handleChangeGrupo = (value: string) => {
    setNewFamily({
      ...newFamily,
      grupo_id: value,
    });
  };

  const handleCheckboxExonerado = () => {
    setNewFamily({
      ...newFamily,
      exonerado_igv: !newFamily.exonerado_igv,
    });
  };

  const handleCheckboxVenta = () => {
    setNewFamily({
      ...newFamily,
      considerar_en_venta: !newFamily.considerar_en_venta,
    });
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

  const handleCreateFamily = async () => {
    if (newFamily.descripcion.trim() === "") {
      return errorValidateForm("descripcion");
    }
    if (newFamily.grupo_id.trim() === "") {
      return errorValidateForm("grupo");
    }
    setShowLoader(true);
    const response = await postFamiliaService(
      newFamily,
      getTokenFromLocalStorage()
    );
    setShowLoader(false);
    if (response) {
      if (response.status == 201) {
        getFamilyList(() => handleCreateSetFamilia(response.json.data));
        setNewFamily({
          considerar_en_venta: false,
          cuenta_compra_debe: "6011",
          cuenta_venta_debe: "7011",
          cuenta_compra_haber: "4212",
          cuenta_venta_haber: "1212",
          cuenta_mercaderia: "6911",
          cuenta_prod_manufac: "2011",
          descripcion: "",
          empresa_id: getLocalStorageItem("empresa"),
          exonerado_igv: false,
          grupo_id: "",
        });
        setShowAlert({
          ...showAlert,
          icon: "success",
          title: "Operación exitosa",
          message: "Familia creado correctamente",
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

  const handleCreateSetGrupo = (response: IGroup) => {
    setModalGrupo(false);
    setNewFamily({
      ...newFamily,
      grupo_id: response._id.$oid,
    });
  };

  return (
    <div className={clsx(styles.modal, !modal && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Crear Familia</span>
          <button onClick={() => setModal(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCreateFamily}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <div className={styles.f_g}>
              <label htmlFor="descripcion">Descripción</label>
              <input
                autoComplete="off"
                id="descripcion"
                name="descripcion"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.descripcion}
              />
            </div>
            <div className={styles.f_g}>
              <label htmlFor="grupo_id">Grupo</label>
              <SelectDinamico
                handleChange={handleChangeGrupo}
                setModal={setModalGrupo}
                value={newFamily.grupo_id}
                dataList={grupos.map((item) => {
                  return { id: item._id.$oid, descripcion: item.descripcion };
                })}
              />
            </div>
          </div>
          <div className={clsx(styles.row, styles.separator)}>
            <div className={styles.line}></div>
            <span className={styles.subtitle}>CUENTAS DE MOVIMIENTO</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <div className={styles.f_g}>
              <label htmlFor="cuenta_compra_debe">Cuenta compra (D)</label>
              <input
                autoComplete="off"
                id="cuenta_compra_debe"
                name="cuenta_compra_debe"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.cuenta_compra_debe}
              />
            </div>
            <div className={styles.f_g}>
              <label htmlFor="cuenta_compra_haber">Cuenta compra (H)</label>
              <input
                autoComplete="off"
                id="cuenta_compra_haber"
                name="cuenta_compra_haber"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.cuenta_compra_haber}
              />
            </div>
          </div>
          <div className={styles.row}>
            <div className={styles.f_g}>
              <label htmlFor="cuenta_venta_debe">Cuenta venta (D)</label>
              <input
                autoComplete="off"
                id="cuenta_venta_debe"
                name="cuenta_venta_debe"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.cuenta_venta_debe}
              />
            </div>
            <div className={styles.f_g}>
              <label htmlFor="cuenta_venta_haber">Cuenta venta (H)</label>
              <input
                autoComplete="off"
                id="cuenta_venta_haber"
                name="cuenta_venta_haber"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.cuenta_venta_haber}
              />
            </div>
          </div>
          <div className={clsx(styles.row, styles.separator)}>
            <div className={styles.line}></div>
            <span className={styles.subtitle}>CUENTAS DE ALMACEN</span>
            <div className={styles.line}></div>
          </div>
          <div className={styles.row}>
            <div className={styles.f_g}>
              <label htmlFor="cuenta_mercaderia">Cuenta mercaderia</label>
              <input
                autoComplete="off"
                id="cuenta_mercaderia"
                name="cuenta_mercaderia"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.cuenta_mercaderia}
              />
            </div>
            <div className={styles.f_g}>
              <label htmlFor="cuenta_prod_manufac">
                Cuenta producto manofactura
              </label>
              <input
                autoComplete="off"
                id="cuenta_prod_manufac"
                name="cuenta_prod_manufac"
                type="text"
                className={styles.padding}
                onChange={handleInputChange}
                value={newFamily.cuenta_prod_manufac}
              />
            </div>
          </div>
          <div>
            <div className={styles.f_g}>
              <label htmlFor="exonerado_igv">
                <input
                  autoComplete="off"
                  id="exonerado_igv"
                  name="exonerado_igv"
                  type="checkbox"
                  className={styles.padding}
                  checked={newFamily.exonerado_igv}
                  onChange={handleCheckboxExonerado}
                />
                Exonerado igv
              </label>
            </div>
          </div>
          <div>
            <div className={styles.f_g}>
              <label htmlFor="considerar_en_venta">
                <input
                  autoComplete="off"
                  id="considerar_en_venta"
                  name="considerar_en_venta"
                  type="checkbox"
                  className={styles.padding}
                  checked={newFamily.considerar_en_venta}
                  onChange={handleCheckboxVenta}
                />
                Considerar en venta
              </label>
            </div>
          </div>
          <NuevoGrupo
            modal={modalGrupo}
            setModal={setModalGrupo}
            closeAlertTimeOut={closeAlertTimeOut}
            getGroupsList={getGroupsList}
            setShowAlert={setShowAlert}
            setShowLoader={setShowLoader}
            showAlert={showAlert}
            handleCreateSetGrupo={handleCreateSetGrupo}
          />
        </div>
      </div>
    </div>
  );
};
