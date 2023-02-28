import styles from "./Precio.module.scss";
import s from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { MdClose } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";
import {
  IArticle,
  IArticlePrecios,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { FormEvent, useEffect, useState } from "react";
import { IUnit } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadIntefaces";
import { NuevaUnidad } from "./NuevaUnidad";
import { IAlert } from "@/interfaces/componentsInterfaces";

export const Precio = ({
  show,
  setShowModal,
  newEditableArticulo,
  setNewEditableArticulo,
  precioActual,
  setPrecioActual,
  precioState,
  setPrecioState,
  unidades,
  handleUpdateArticle,
  closeAlertTimeOut,
  getUnitsList,
  setShowAlert,
  setShowLoader,
  showAlert,
  handleCreateSetNewUnidad,
}: {
  show: boolean;
  setShowModal: (state: boolean) => void;
  newEditableArticulo: IArticle;
  setNewEditableArticulo: (article: IArticle) => void;
  precioActual: { id: string };
  setPrecioActual: (precioId: { id: string }) => void;
  precioState: IArticlePrecios;
  setPrecioState: (precio: IArticlePrecios) => void;
  unidades: IUnit[];
  handleUpdateArticle: (
    article: IArticle,
    handleCreateSetNewUnidad?: () => void
  ) => void;
  closeAlertTimeOut: () => void;
  getUnitsList: () => void;
  setShowAlert: (state: IAlert) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  handleCreateSetNewUnidad: (newPrecio: IArticlePrecios) => void;
}) => {
  const [modalUnidad, setModalUnidad] = useState(false);
  const [porcentajes, setPorcentajes] = useState({
    precio_1: "",
    precio_2: "",
    precio_3: "",
    precio_4: "",
    precio_5: "",
  });

  const handlePorcentajeChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (
        name == "precio_1" ||
        name == "precio_2" ||
        name == "precio_3" ||
        name == "precio_4" ||
        name == "precio_5"
      ) {
        return;
      }
    }
    if (precioState.costo) {
      setPrecioState({
        ...precioState,
        [name]: handleDecimals(
          precioState.costo + (precioState.costo * Number(value)) / 100
        ),
      });
      setPorcentajes({
        ...porcentajes,
        [name]: value,
      });
    }
  };

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (
        name == "precio_1" ||
        name == "precio_2" ||
        name == "precio_3" ||
        name == "precio_4" ||
        name == "precio_5" ||
        name == "unidad_valor"
      ) {
        return;
      }
    }
    setPrecioState({
      ...precioState,
      [name]: value.toUpperCase(),
    });
    if (
      name == "precio_1" ||
      name == "precio_2" ||
      name == "precio_3" ||
      name == "precio_4" ||
      name == "precio_5"
    ) {
      if (precioState.costo) {
        setPorcentajes({
          ...porcentajes,
          [name]:
            value == ""
              ? " "
              : handleDecimals(
                  ((Number(value) - precioState.costo) / precioState.costo) *
                    100
                ),
        });
      }
    }
  };

  const handleDecimals = (numero: number): string => {
    if (numero.toString().includes(".")) {
      return numero.toString().split(".")[1].length >= 2
        ? Number(numero).toFixed(2).toString()
        : numero.toString();
    }
    return numero.toString();
  };

  const handlePrincipalCheck = () => {
    setPrecioState({
      ...precioState,
      principal: !precioState.principal,
    });
  };

  const handleAgregarPrecio = async () => {
    if (precioState.unidad_descripcion.trim() == "") {
      return;
    }
    if (precioState.unidad_abreviatura.trim() == "") {
      return;
    }
    if (precioState.unidad_valor.toString().trim() == "") {
      return;
    }
    setPorcentajes({
      precio_1: "",
      precio_2: "",
      precio_3: "",
      precio_4: "",
      precio_5: "",
    });
    if (precioActual.id) {
      const unidad = {
        ...newEditableArticulo,
        precios: newEditableArticulo.precios.map((precio, index) =>
          index == Number(precioActual.id)
            ? {
                ...precioState,
                unidad_valor: Number(precioState.unidad_valor),
                precio_1: Number(precioState.precio_1),
                precio_2: Number(precioState.precio_2),
                precio_3: Number(precioState.precio_3),
                precio_4: Number(precioState.precio_4),
                precio_5: Number(precioState.precio_5),
              }
            : precio
        ),
      };
      if (
        unidad.precios.filter(
          (item) => item.unidad_descripcion == precioState.unidad_descripcion
        ).length > 1
      ) {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Error inesperado",
          message: "No se pudo realizar la operación, unidad existente",
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (unidad.precios.filter((item) => item.principal).length > 1) {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Error inesperado",
          message:
            "No se pudo realizar la operación, unidad principal ya existe",
          show: true,
        });
        return closeAlertTimeOut();
      }
      setNewEditableArticulo(unidad);
      handleUpdateArticle(unidad);
      setPrecioActual({
        id: "",
      });
      return setShowModal(false);
    }
    if (!precioActual.id) {
      const unidad = {
        ...newEditableArticulo,
        precios: [
          ...newEditableArticulo.precios,
          {
            ...precioState,
            unidad_valor: Number(precioState.unidad_valor),
            precio_1: Number(precioState.precio_1),
            precio_2: Number(precioState.precio_2),
            precio_3: Number(precioState.precio_3),
            precio_4: Number(precioState.precio_4),
            precio_5: Number(precioState.precio_5),
          },
        ],
      };
      if (
        unidad.precios.filter(
          (item) => item.unidad_descripcion == precioState.unidad_descripcion
        ).length > 1
      ) {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Error inesperado",
          message: "No se pudo realizar la operación, unidad existente",
          show: true,
        });
        return closeAlertTimeOut();
      }
      if (unidad.precios.filter((item) => item.principal).length > 1) {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Error inesperado",
          message:
            "No se pudo realizar la operación, unidad principal ya existe",
          show: true,
        });
        return closeAlertTimeOut();
      }
      setNewEditableArticulo(unidad);
      handleUpdateArticle(unidad, () => handleCreateSetNewUnidad(precioState));
      setPrecioActual({
        id: "",
      });
      return setShowModal(false);
    }
  };

  const handleDeletePrecio = () => {
    setPorcentajes({
      precio_1: "",
      precio_2: "",
      precio_3: "",
      precio_4: "",
      precio_5: "",
    });
    setNewEditableArticulo({
      ...newEditableArticulo,
      precios: newEditableArticulo.precios.filter(
        (precio, index) => index != Number(precioActual.id)
      ),
    });
    setPrecioActual({
      id: "",
    });
    handleUpdateArticle({
      ...newEditableArticulo,
      precios: newEditableArticulo.precios.filter(
        (precio, index) => index != Number(precioActual.id)
      ),
    });
    setPrecioActual({
      id: "",
    });
    return setShowModal(false);
  };

  useEffect(() => {
    if (precioState.costo && precioActual.id) {
      setPorcentajes({
        ...porcentajes,
        precio_1:
          precioState.precio_1 > 0
            ? handleDecimals(
                ((precioState.precio_1 - precioState.costo) /
                  precioState.costo) *
                  100
              )
            : "",
        precio_2:
          precioState.precio_2 > 0
            ? handleDecimals(
                ((precioState.precio_2 - precioState.costo) /
                  precioState.costo) *
                  100
              )
            : "",
        precio_3:
          precioState.precio_3 > 0
            ? handleDecimals(
                ((precioState.precio_3 - precioState.costo) /
                  precioState.costo) *
                  100
              )
            : "",
        precio_4:
          precioState.precio_4 > 0
            ? handleDecimals(
                ((precioState.precio_4 - precioState.costo) /
                  precioState.costo) *
                  100
              )
            : "",
        precio_5:
          precioState.precio_5 > 0
            ? handleDecimals(
                ((precioState.precio_5 - precioState.costo) /
                  precioState.costo) *
                  100
              )
            : "",
      });
      return;
    }
    setPorcentajes({
      precio_1: "",
      precio_2: "",
      precio_3: "",
      precio_4: "",
      precio_5: "",
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [precioState.costo]);

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Precio</span>
          <button
            onClick={() => {
              setShowModal(false);
              setPorcentajes({
                precio_1: "",
                precio_2: "",
                precio_3: "",
                precio_4: "",
                precio_5: "",
              });
            }}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          {precioActual.id && (
            <button className={styles.delete} onClick={handleDeletePrecio}>
              <FaTrash /> Eliminar
            </button>
          )}
          <button className={styles.add} onClick={handleAgregarPrecio}>
            <FaPlus /> Agregar
          </button>
        </div>
        <div className={styles.form}>
          <div className={s.row}>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="unidad_descripcion">Descripcion</label>
              <input
                autoComplete="off"
                type="text"
                name="unidad_descripcion"
                onChange={handleInputChange}
                value={precioState.unidad_descripcion}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="unidad_abreviatura">Abreviatura</label>
              <input
                autoComplete="off"
                type="text"
                name="unidad_abreviatura"
                onChange={handleInputChange}
                value={precioState.unidad_abreviatura}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="unidad_valor">Relación</label>
              <input
                autoComplete="off"
                type="text"
                name="unidad_valor"
                onChange={handleInputChange}
                value={precioState.unidad_valor}
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="">Costo</label>
              <input
                autoComplete="off"
                type="text"
                value={precioState.costo ? precioState.costo : ""}
                disabled
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_1">1(%)</label>
              <input
                autoComplete="off"
                type="text"
                disabled={precioState.costo ? false : true}
                name="precio_1"
                value={porcentajes.precio_1}
                onChange={handlePorcentajeChange}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_2">2(%)</label>
              <input
                autoComplete="off"
                type="text"
                disabled={precioState.costo ? false : true}
                name="precio_2"
                value={porcentajes.precio_2}
                onChange={handlePorcentajeChange}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_3">3(%)</label>
              <input
                autoComplete="off"
                type="text"
                disabled={precioState.costo ? false : true}
                name="precio_3"
                value={porcentajes.precio_3}
                onChange={handlePorcentajeChange}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_4">4(%)</label>
              <input
                autoComplete="off"
                type="text"
                disabled={precioState.costo ? false : true}
                name="precio_4"
                value={porcentajes.precio_4}
                onChange={handlePorcentajeChange}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_5">5(%)</label>
              <input
                autoComplete="off"
                type="text"
                disabled={precioState.costo ? false : true}
                name="precio_5"
                value={porcentajes.precio_5}
                onChange={handlePorcentajeChange}
              />
            </div>
          </div>
          <div className={s.row}>
            <div className={s.f_2}></div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="">Precio 1</label>
              <input
                autoComplete="off"
                type="text"
                name="precio_1"
                onChange={handleInputChange}
                value={precioState.precio_1}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_2">Precio 2</label>
              <input
                autoComplete="off"
                id="precio_2"
                type="text"
                name="precio_2"
                onChange={handleInputChange}
                value={precioState.precio_2}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_3">Precio 3</label>
              <input
                autoComplete="off"
                id="precio_3"
                type="text"
                name="precio_3"
                onChange={handleInputChange}
                value={precioState.precio_3}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_4">Precio 4</label>
              <input
                autoComplete="off"
                id="precio_4"
                type="text"
                name="precio_4"
                onChange={handleInputChange}
                value={precioState.precio_4}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="precio_5">Precio 5</label>
              <input
                autoComplete="off"
                id="precio_5"
                type="text"
                name="precio_5"
                onChange={handleInputChange}
                value={precioState.precio_5}
              />
            </div>
          </div>
          <div className={styles.check}>
            <input
              autoComplete="off"
              type="checkbox"
              checked={precioState.principal}
              onChange={handlePrincipalCheck}
            />{" "}
            <label htmlFor="">Principal</label>
          </div>
        </div>
      </div>
      <NuevaUnidad
        closeAlertTimeOut={closeAlertTimeOut}
        getUnitsList={getUnitsList}
        modal={modalUnidad}
        setModal={setModalUnidad}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
      />
    </div>
  );
};
