import { clsx } from "@/lib/clsx";
import { useState, FormEvent } from "react";
import styles from "./CodigoSunat.module.scss";
import { MdClose } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import { IAlert } from "@/interfaces/componentsInterfaces";
import table from "@/styles/DataTable.module.scss";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { SelectCodigoSunat } from "./SelectCodigoSunat";
import { AiOutlineSearch } from "react-icons/ai";
import {
  IClaseCodigoSunat,
  ICodigoSunat,
  IFamiliaCodigoSunat,
  ISegmentoCodigoSunat,
} from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";
import {
  getArticulosByDescripcion,
  getClasesByFamilyService,
  getCodigosByClaseService,
  getFamiliesBySegmentoService,
} from "@/services/comercial/mantenimiento/codigo-sunat/codigoSunatServices";

export const CodigoSunat = ({
  show,
  setShow: setShow,
  closeAlertTimeOut,
  setShowAlert,
  showAlert,
  setShowLoader,
  articulo,
  segmentosList,
  handleSetCodigo,
}: {
  show: boolean;
  setShow: (data: boolean) => void;
  closeAlertTimeOut: () => void;
  showAlert: IAlert;
  setShowAlert: (alert: IAlert) => void;
  setShowLoader: (status: boolean) => void;
  articulo: string;
  segmentosList: ISegmentoCodigoSunat[];
  handleSetCodigo: (codigo: string) => void;
}) => {
  const [familiesList, setFamiliesList] = useState<IFamiliaCodigoSunat[]>([]);
  const [clasesList, setClasesList] = useState<IClaseCodigoSunat[]>([]);
  const [codigosList, setCodigosList] = useState<ICodigoSunat[]>([]);
  const [selectCodgio, setSelectCodigo] = useState<ICodigoSunat>({
    _id: {
      $oid: "",
    },
    codigo: "",
    codigo_clase: "",
    descripcion: "",
  });
  const [codigoSunat, setCodigoSunat] = useState({
    articulo: "",
    segmento: "",
    familia: "",
    clase: "",
  });

  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setCodigoSunat({
      ...codigoSunat,
      [name]: value,
    });
  };

  const handleArticuloDescripcion = async () => {
    setShowLoader(true);
    const response = await getArticulosByDescripcion(codigoSunat.articulo);
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        console.log(response);
        return setCodigosList(response.json.data);
      }
      setShowAlert({
        ...showAlert,
        icon: "error",
        title: "Error inesperado",
        message: "No se pudo realizar la operación, intente más tarde",
        show: true,
      });
      return closeAlertTimeOut();
    }
    setCodigosList([]);
  };

  const handleFamiliaId = async (value: string) => {
    setCodigoSunat({
      ...codigoSunat,
      familia: value,
    });
    setShowLoader(true);
    const clases = await getClasesByFamilyService(value);
    setShowLoader(false);
    if (clases) {
      if (clases.status == 200) {
        return setClasesList(clases.json.data);
      }
      setShowAlert({
        ...showAlert,
        icon: "error",
        title: "Error inesperado",
        message: "No se pudo realizar la operación, intente más tarde",
        show: true,
      });
      return closeAlertTimeOut();
    }
    setClasesList([]);
  };

  const handleSegmentoId = async (value: string) => {
    setCodigoSunat({
      ...codigoSunat,
      segmento: value,
    });
    setShowLoader(true);
    const familias = await getFamiliesBySegmentoService(value);
    setShowLoader(false);
    if (familias) {
      if (familias.status == 200) {
        console.log(familias);
        return setFamiliesList(familias.json.data);
      }
      setShowAlert({
        ...showAlert,
        icon: "error",
        title: "Error inesperado",
        message: "No se pudo realizar la operación, intente más tarde",
        show: true,
      });
      return closeAlertTimeOut();
    }
    setFamiliesList([]);
  };

  const handleClasesId = async (value: string) => {
    setCodigoSunat({
      ...codigoSunat,
      clase: value,
    });
    setShowLoader(true);
    const codigos = await getCodigosByClaseService(value);
    setShowLoader(false);
    if (codigos) {
      if (codigos.status == 200) {
        return setCodigosList(codigos.json.data);
      }
      setShowAlert({
        ...showAlert,
        icon: "error",
        title: "Error inesperado",
        message: "No se pudo realizar la operación, intente más tarde",
        show: true,
      });
      return closeAlertTimeOut();
    }
    setCodigosList([]);
  };

  const handleCodigoSunat = async () => {
    if (!selectCodgio._id.$oid) {
      setShowAlert({
        ...showAlert,
        icon: "warning",
        title: "Campos incompletos",
        message: "Se necesita seleccionar un codigo",
        show: true,
      });
      return closeAlertTimeOut();
    }
    handleSetCodigo(selectCodgio.codigo);
  };

  const renderCodigos = () => {
    if (codigosList.length == 0) {
      return (
        <tr>
          <td>No tiene datos</td>
          <td></td>
        </tr>
      );
    }
    return codigosList.map((item, index) => (
      <tr
        onClick={() => {
          selectCodgio._id.$oid == item._id.$oid
            ? setSelectCodigo({ ...item, _id: { $oid: "" } })
            : setSelectCodigo(item);
        }}
        key={item._id.$oid}
        className={`${
          selectCodgio._id.$oid == item._id.$oid && table.selected_row
        }`}
      >
        <td>{item.descripcion}</td>
      </tr>
    ));
  };

  return (
    <div className={clsx(styles.modal, !show && styles.hidden)}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.title}>
            Generar Codigo del Articulo para Sunat
          </span>
          <button onClick={() => setShow(false)} className={styles.close}>
            <MdClose />
          </button>
        </div>
        <div className={styles.options}>
          <button className={styles.add} onClick={handleCodigoSunat}>
            <FaPlus /> Guardar
          </button>
        </div>
        <div className={styles.form}>
          <span className={styles.nombre}>{articulo}</span>
          <div className={styles.articulo_input}>
            <label htmlFor="articulo">Buscar producto...</label>
            {/* <span onClick={handleArticuloDescripcion}>
              <AiOutlineSearch />
            </span> */}
            <input
              type="text"
              id="articulo"
              onKeyDown={(e) => e.key == "Enter" && handleArticuloDescripcion()}
              name="articulo"
              value={codigoSunat.articulo}
              onChange={handleInputChange}
            />
          </div>
          <div className={styles.select}>
            <label htmlFor="">Segmento</label>
            <SelectCodigoSunat
              dataList={segmentosList.map((item) => {
                return {
                  id: item.codigo,
                  descripcion: item.descripcion,
                  sub_nombre: item.descripcion,
                };
              })}
              handleChange={handleSegmentoId}
              value={codigoSunat.segmento}
            />
          </div>
          <div className={styles.select}>
            <label htmlFor="">Familia</label>
            <SelectCodigoSunat
              dataList={familiesList.map((item) => {
                return {
                  id: item.codigo,
                  descripcion: item.descripcion,
                  sub_nombre: item.descripcion,
                };
              })}
              handleChange={handleFamiliaId}
              value={codigoSunat.familia}
            />
          </div>
          <div className={styles.select}>
            <label htmlFor="">Clases</label>
            <SelectCodigoSunat
              dataList={clasesList.map((item) => {
                return {
                  id: item.codigo,
                  descripcion: item.descripcion,
                  sub_nombre: item.descripcion,
                };
              })}
              handleChange={handleClasesId}
              value={codigoSunat.clase}
            />
          </div>
          <div className={styles.talbe_container}>
            <table className={table.table}>
              <thead>
                <tr>
                  <th>DESCRIPCION</th>
                </tr>
              </thead>
              <tbody>{renderCodigos()}</tbody>
            </table>
          </div>
          <div className={styles.codigo_sunat}>
            <label htmlFor="">CODIGO SUNAT:</label>
            <input
              type="text"
              disabled
              value={selectCodgio._id.$oid ? selectCodgio.codigo : ""}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
