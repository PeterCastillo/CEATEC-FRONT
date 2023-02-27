import styles from "./Stock.module.scss";
import s from "@/styles/Form.module.scss";
import { clsx } from "@/lib/clsx";
import { MdClose } from "react-icons/md";
import { FaPlus, FaTrash } from "react-icons/fa";
import { IWareHouse } from "@/interfaces/comercial/mantenimiento/empresa/almacenInterfaces";
import {
  IArticle,
  IArticleStock,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { FormEvent } from "react";
import { NuevoAlmacen } from "./NuevoAlmacen";
import { useState } from "react";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { IBranchOffice } from "@/interfaces/comercial/mantenimiento/empresa/sucursalInterfaces";
import { SelectDinamico } from "@/components/commons/select/Select";

export const Stock = ({
  show,
  setShowModal,
  almacenes,
  stock,
  setStock,
  stockActual,
  setStockActual,
  newEditableArticulo,
  setNewEditableArticulo,
  handleUpdateArticle,
  closeAlertTimeOut,
  getBranchOfficesList,
  getWareHousesList,
  setShowAlert,
  setShowLoader,
  showAlert,
  sucursales,
}: {
  show: boolean;
  setShowModal: (state: boolean) => void;
  almacenes: IWareHouse[];
  stock: IArticleStock;
  setStock: (stock: IArticleStock) => void;
  newEditableArticulo: IArticle;
  setNewEditableArticulo: (article: IArticle) => void;
  stockActual: {
    id: string;
  };
  setStockActual: (id: { id: string }) => void;
  handleUpdateArticle: (article: IArticle) => void;
  closeAlertTimeOut: () => void;
  getBranchOfficesList: () => void;
  getWareHousesList: () => void;
  setShowAlert: (state: IAlert) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
  sucursales: IBranchOffice[];
}) => {
  const [modalAlmacen, setModalAlmacen] = useState(false);
  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (name == "cantidad") {
        return;
      }
    }
    setStock({
      ...stock,
      [name]: value,
    });
  };

  const handleChangeAlmacen = async (value: string) => {
    const almacen = almacenes.find((f) => f._id.$oid === value);
    if (almacen) {
      setStock({
        ...stock,
        almacen_id: almacen._id.$oid,
        almacen_descripcion: almacen.descripcion,
      });
    }
  };

  const handleAgregarStock = () => {
    if (stockActual.id) {
      const almacen = {
        ...newEditableArticulo,
        stock: newEditableArticulo.stock.map((stockArticulo, index) =>
          index == Number(stockActual.id)
            ? { ...stock, cantidad: Number(stock.cantidad) }
            : stockArticulo
        ),
      };
      if (
        almacen.stock.filter((item) => item.almacen_id == stock.almacen_id)
          .length > 1
      ) {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Error inesperado",
          message: "No se pudo realizar la operación, almacen existente",
          show: true,
        });
        return closeAlertTimeOut();
      }
      setNewEditableArticulo(almacen);
      handleUpdateArticle(almacen);
      setStockActual({
        id: "",
      });
      return setShowModal(false);
    }
    if (!stockActual.id) {
      const almacen = {
        ...newEditableArticulo,
        stock: [
          ...newEditableArticulo.stock,
          { ...stock, cantidad: Number(stock.cantidad) },
        ],
      };
      if (
        almacen.stock.filter((item) => item.almacen_id == stock.almacen_id)
          .length > 1
      ) {
        setShowAlert({
          ...showAlert,
          icon: "warning",
          title: "Error inesperado",
          message: "No se pudo realizar la operación, almacen existente",
          show: true,
        });
        return closeAlertTimeOut();
      }
      setNewEditableArticulo(almacen);
      handleUpdateArticle(almacen);
      setStockActual({
        id: "",
      });
      return setShowModal(false);
    }
  };

  const handleDeleteStock = () => {
    setNewEditableArticulo({
      ...newEditableArticulo,
      stock: newEditableArticulo.stock.filter(
        (stock, index) => index != Number(stockActual.id)
      ),
    });
    handleUpdateArticle({
      ...newEditableArticulo,
      stock: newEditableArticulo.stock.filter(
        (stock, index) => index != Number(stockActual.id)
      ),
    });
    setStockActual({
      id: "",
    });
    return setShowModal(false);
  };

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>Stock</span>
          <button
            onClick={() => {
              setShowModal(false);
            }}
            className={styles.close}
          >
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          {stockActual.id && (
            <button className={styles.delete} onClick={handleDeleteStock}>
              <FaTrash /> Eliminar
            </button>
          )}
          <button className={styles.add} onClick={handleAgregarStock}>
            <FaPlus /> Guardar
          </button>
        </div>
        <div className={styles.form}>
          <div className={s.row}>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="almacen">Almacen</label>
              <SelectDinamico
                handleChange={handleChangeAlmacen}
                setModal={setModalAlmacen}
                value={stock.almacen_id}
                dataList={almacenes.map((item) => {
                  return { id: item._id.$oid, descripcion: item.descripcion };
                })}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="cantidad">Stock</label>
              <input
                autoComplete="off"
                type="text"
                name="cantidad"
                value={stock.cantidad}
                id="cantidad"
                onChange={handleInputChange}
              />
            </div>
            <div className={clsx(s.f_g, s.f_2)}>
              <label htmlFor="prioridad">Prioridad</label>
              <select
                name="prioridad"
                value={stock.prioridad}
                id="prioridad"
                onChange={handleInputChange}
              >
                <option value="" hidden></option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      <NuevoAlmacen
        modal={modalAlmacen}
        setModal={setModalAlmacen}
        closeAlertTimeOut={closeAlertTimeOut}
        getBranchOfficesList={getBranchOfficesList}
        getWareHousesList={getWareHousesList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        sucursales={sucursales}
      />
    </div>
  );
};
