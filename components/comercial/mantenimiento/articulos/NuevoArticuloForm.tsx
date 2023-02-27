import { SelectDinamico } from "@/components/commons/select/Select";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import {
  IArticle,
  INewArticle,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { getFamilysForGroupsService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/familiaServices";
import styles from "@/styles/Form.module.scss";
import { getTokenFromLocalStorage } from "@/utils/localStorageControl";
import { FormEvent, useState, useEffect } from "react";
import { NuevaFamilia } from "./NuevaFamilia";
import { NuevaMarca } from "./NuevaMarca";
import { NuevoGrupo } from "./NuevoGrupo";
import { AiOutlineFileSearch } from "react-icons/ai";
import { CodigoSunat } from "./CodigoSunat";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";
import { getCodigoBarrasService } from "@/services/comercial/mantenimiento/articulo/articulosService";

export const NAF = ({
  setNewArticle,
  newArticle,
  groupsList,
  familiesList,
  setShowLoader,
  brandsList,
  stateArticlesList,
  closeAlertTimeOut,
  getGroupsList,
  setShowAlert,
  showAlert,
  getBrandsList,
  segmentosList,
}: {
  setNewArticle: (newArticle: INewArticle) => void;
  newArticle: INewArticle;
  groupsList: IGroup[];
  familiesList: IFamily[];
  setShowLoader: (state: boolean) => void;
  brandsList: IBrand[];
  stateArticlesList: IEstadoArticulo[];
  closeAlertTimeOut: () => void;
  getGroupsList: () => void;
  setShowAlert: (alert: IAlert) => void;
  showAlert: IAlert;
  getBrandsList: () => void;
  articulosList: IArticle[];
  segmentosList: ISegmentoCodigoSunat[];
}) => {
  const [modalGrupo, setModalGrupo] = useState(false);
  const [modalFamilia, setModalFamilia] = useState(false);
  const [modalMarca, setModalMarca] = useState(false);
  const [modalSunat, setModalSunat] = useState(false);

  const [familiesListByGrup, setFamiliesListByGroup] = useState<IFamily[]>([]);

  useEffect(() => {
    setFamiliesListByGroup(familiesList);
  }, [familiesList]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.currentTarget;
    if (Number.isNaN(Number(value))) {
      if (
        name == "stock_actual" ||
        name == "stock_minimo" ||
        name == "stock_maximo"
      ) {
        return;
      }
    }
    setNewArticle({
      ...newArticle,
      [name]: value.toUpperCase(),
    });
    if(name == "codigo_barras"){
      setNewArticle({
        ...newArticle,
        codigo_barras: value,
        codigo_articulo: value
      })
    }
  };

  const handleChangeGrupo = async (value: string) => {
    setShowLoader(true);
    const families = await getFamilysForGroupsService(
      value,
      getTokenFromLocalStorage()
    );
    if (families) {
      if (families.status === 200) {
        setFamiliesListByGroup(families.json.data);
      }
    }
    setShowLoader(false);
    const group = groupsList.find((g) => g._id.$oid === value);
    if (group) {
      setNewArticle({
        ...newArticle,
        familia: {
          id: "",
          descripcion: "",
        },
        grupo: {
          id: value,
          descripcion: group.descripcion,
        },
      });
    }
  };

  const handleChangeFamilia = async (value: string) => {
    const family = familiesListByGrup.find((f) => f._id.$oid === value);
    if (family) {
      setNewArticle({
        ...newArticle,
        familia: {
          id: value,
          descripcion: family.descripcion,
        },
      });
    }
  };

  const getFamilyList = async () => {
    if (newArticle.grupo.id) {
      setShowLoader(true);
      const families = await getFamilysForGroupsService(
        newArticle.grupo.id,
        getTokenFromLocalStorage()
      );
      if (families) {
        if (families.status === 200) {
          setFamiliesListByGroup(families.json.data);
        }
      }
      setShowLoader(false);
    }
  };

  const handleMarcaChange = async (value: string) => {
    const estado = brandsList.find((f) => f._id.$oid === value);
    if (estado) {
      setNewArticle({
        ...newArticle,
        marca: {
          id: value,
          descripcion: estado.descripcion,
        },
      });
    }
  };

  const handleSelectEstadoArticleChange = async (
    event: FormEvent<HTMLSelectElement>
  ) => {
    const { value } = event.currentTarget;
    const estado = stateArticlesList.find((f) => f._id.$oid === value);
    if (estado) {
      setNewArticle({
        ...newArticle,
        estado_articulo: {
          id: value,
          descripcion: estado.nombre,
        },
      });
    }
  };

  const handleCheckboxExonerado = () => {
    setNewArticle({
      ...newArticle,
      exonerado_igv: !newArticle.exonerado_igv,
    });
  };

  const handleCheckboxFormula = () => {
    setNewArticle({
      ...newArticle,
      formula_derivado: !newArticle.formula_derivado,
    });
  };

  const handleModalSunta = () => {
    setModalSunat(true);
  };

  const handleSetCodigo = (value: string) => {
    setNewArticle({
      ...newArticle,
      codigo_sunat: value,
    });
    setModalSunat(false);
  };

  const handleCodigoBarrasArticulo = async () => {
    setShowLoader(true);
    const response = await getCodigoBarrasService(getTokenFromLocalStorage());
    setShowLoader(false);
    if (response) {
      if (response.status == 200) {
        const familia_code = familiesList.find(
          (item) => item._id.$oid == newArticle.familia.id
        )?.codigo_familia;
        const grupo_code = groupsList.find(
          (item) => item._id.$oid == newArticle.grupo.id
        )?.codigo_grupo;
        if (familia_code && grupo_code) {
          setNewArticle({
            ...newArticle,
            codigo_barras: familia_code.concat(
              grupo_code,
              response.json.data.codigo_articulo_orden
            ),
            codigo_articulo: familia_code.concat(
              grupo_code,
              response.json.data.codigo_articulo_orden
            ),
          });
        }
      }
    }
  };
  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="grupo_id">Grupo</label>
          <SelectDinamico
            handleChange={handleChangeGrupo}
            setModal={setModalGrupo}
            value={newArticle.grupo.id}
            dataList={groupsList.map((item) => {
              return { id: item._id.$oid, descripcion: item.descripcion };
            })}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="familia_id">Familia</label>
          <SelectDinamico
            handleChange={handleChangeFamilia}
            setModal={setModalFamilia}
            value={newArticle.familia.id}
            dataList={familiesListByGrup.map((item) => {
              return { id: item._id.$oid, descripcion: item.descripcion };
            })}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="codigo_barras">Código barras</label>
          <input
            autoComplete="off"
            id="codigo_barras"
            name="codigo_barras"
            type="text"
            onChange={handleInputChange}
            value={newArticle.codigo_barras}
          />
          <span onClick={handleCodigoBarrasArticulo} title="Codigo de barras">
            <AiOutlineFileSearch />
          </span>
        </div>
        <div className={styles.f_g}>
          <label htmlFor="codigo_articulo">Código artículo</label>
          <input
            autoComplete="off"
            id="codigo_articulo"
            name="codigo_articulo"
            type="text"
            onChange={handleInputChange}
            value={newArticle.codigo_articulo}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="codigo_sunat">Código SUNAT</label>
          <input
            autoComplete="off"
            id="codigo_sunat"
            name="codigo_sunat"
            type="text"
            onChange={handleInputChange}
            value={newArticle.codigo_sunat}
          />
          <span onClick={handleModalSunta} title="Consulta Web Sunat">
            <AiOutlineFileSearch />
          </span>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="nombre_articulo">Nombre del artículo</label>
          <input
            autoComplete="off"
            id="nombre_articulo"
            name="nombre_articulo"
            type="text"
            onChange={handleInputChange}
            value={newArticle.nombre_articulo}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="nombre_corto">Nombre corto</label>
          <input
            autoComplete="off"
            id="nombre_corto"
            name="nombre_corto"
            type="text"
            onChange={handleInputChange}
            value={newArticle.nombre_corto}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="familia_id">Marca</label>
          <SelectDinamico
            handleChange={handleMarcaChange}
            setModal={setModalMarca}
            value={newArticle.marca.id}
            dataList={brandsList.map((item) => {
              return { id: item._id.$oid, descripcion: item.descripcion };
            })}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="ubicacion">Ubicación</label>
          <input
            autoComplete="off"
            id="ubicacion"
            name="ubicacion"
            type="text"
            onChange={handleInputChange}
            value={newArticle.ubicacion}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="estado_articulo">Estado</label>
          <select
            id="estado_articulo"
            name="estado_articulo"
            onChange={handleSelectEstadoArticleChange}
            value={newArticle.estado_articulo.id}
          >
            <option hidden value="">
              Seleccione estado
            </option>
            {stateArticlesList &&
              stateArticlesList.map((stateArticle) => (
                <option
                  value={stateArticle._id.$oid}
                  key={stateArticle._id.$oid}
                >
                  {stateArticle.nombre}
                </option>
              ))}
          </select>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="isc">ISC (%)</label>
          <input
            autoComplete="off"
            id="isc"
            name="isc"
            type="text"
            onChange={handleInputChange}
            value={newArticle.isc}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="inafec">Inafec (%)</label>
          <input
            autoComplete="off"
            id="inafec"
            name="inafec"
            type="text"
            onChange={handleInputChange}
            value={newArticle.inafec}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="descripcion_utilidad">Descripcion/Utilidad</label>
          <input
            autoComplete="off"
            id="descripcion_utilidad"
            name="descripcion_utilidad"
            type="text"
            value={newArticle.descripcion_utilidad}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="calidad">Calidad</label>
          <input
            autoComplete="off"
            id="calidad"
            name="calidad"
            type="text"
            vocab={newArticle.calidad}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="stock_minimo">Stock minimo</label>
          <input
            autoComplete="off"
            id="stock_minimo"
            name="stock_minimo"
            type="text"
            onChange={handleInputChange}
            value={newArticle.stock_minimo}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="stock_maximo">Stock maximo</label>
          <input
            autoComplete="off"
            id="stock_maximo"
            name="stock_maximo"
            type="text"
            onChange={handleInputChange}
            value={newArticle.stock_maximo}
          />
        </div>
      </div>
      <div className={styles.f_g}>
        <label htmlFor="exonerado_igv">
          <input
            autoComplete="off"
            id="exonerado_igv"
            name="exonerado_igv"
            type="checkbox"
            checked={newArticle.exonerado_igv}
            onChange={handleCheckboxExonerado}
          />
          Exonerado
        </label>
      </div>
      <div className={styles.f_g}>
        <label htmlFor="formula_derivado">
          <input
            autoComplete="off"
            id="formula_derivado"
            name="formula_derivado"
            type="checkbox"
            checked={newArticle.formula_derivado}
            onChange={handleCheckboxFormula}
          />
          Formula/Derivado de
        </label>
      </div>
      <NuevoGrupo
        modal={modalGrupo}
        setModal={setModalGrupo}
        closeAlertTimeOut={closeAlertTimeOut}
        getGroupsList={getGroupsList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
      />
      <NuevaFamilia
        modal={modalFamilia}
        setModal={setModalFamilia}
        closeAlertTimeOut={closeAlertTimeOut}
        getGroupsList={getGroupsList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        grupos={groupsList}
        getFamilyList={getFamilyList}
      />
      <NuevaMarca
        modal={modalMarca}
        setModal={setModalMarca}
        closeAlertTimeOut={closeAlertTimeOut}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        getBrandsList={getBrandsList}
      />
      <CodigoSunat
        closeAlertTimeOut={closeAlertTimeOut}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        setShow={setModalSunat}
        show={modalSunat}
        articulo={newArticle.nombre_articulo}
        segmentosList={segmentosList}
        handleSetCodigo={handleSetCodigo}
      />
    </>
  );
};
