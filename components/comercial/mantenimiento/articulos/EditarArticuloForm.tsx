import { SelectDinamico } from "@/components/commons/select/Select";
import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import { IArticle } from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { getFamilysForGroupsService } from "@/services/comercial/mantenimiento/grupo-familia-marca-unidad/familiaServices";
import styles from "@/styles/Form.module.scss";
import { getTokenFromLocalStorage } from "@/utils/localStorageControl";
import { FormEvent, useState, useEffect } from "react";
import { CodigoSunat } from "./CodigoSunat";
import { NuevaFamilia } from "./NuevaFamilia";
import { NuevaMarca } from "./NuevaMarca";
import { NuevoGrupo } from "./NuevoGrupo";
import { AiOutlineFileSearch } from "react-icons/ai";
import { getCodigoBarrasService } from "@/services/comercial/mantenimiento/articulo/articulosService";

export const EAF = ({
  setArticle,
  article,
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
  setArticle: (newArticle: IArticle) => void;
  article: IArticle;
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
  segmentosList: ISegmentoCodigoSunat[];
}) => {
  const [modalSunat, setModalSunat] = useState(false);
  const [familiesListByGrup, setFamiliesListByGroup] = useState<IFamily[]>([]);
  const [modalGrupo, setModalGrupo] = useState(false);
  const [modalFamilia, setModalFamilia] = useState(false);
  const [modalMarca, setModalMarca] = useState(false);

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
    setArticle({
      ...article,
      [name]: value.toUpperCase(),
    });
    if (name == "codigo_barras") {
      setArticle({
        ...article,
        codigo_barras: value,
        codigo_articulo: value,
      });
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
      setArticle({
        ...article,
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
      setArticle({
        ...article,
        familia: {
          id: value,
          descripcion: family.descripcion,
        },
      });
    }
  };

  const getFamilyList = async (handleCreateSetFamilia = Function()) => {
    if (article.grupo.id) {
      setShowLoader(true);
      const families = await getFamilysForGroupsService(
        article.grupo.id,
        getTokenFromLocalStorage()
      );
      if (families) {
        if (families.status === 200) {
          setFamiliesListByGroup(families.json.data);
          handleCreateSetFamilia()
        }
      }
      setShowLoader(false);
    }
  };

  const handleMarcaChange = async (value: string) => {
    const marca = brandsList.find((f) => f._id.$oid === value);
    if (marca) {
      setArticle({
        ...article,
        marca: {
          id: value,
          descripcion: marca.descripcion,
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
      setArticle({
        ...article,
        estado_articulo: {
          id: value,
          descripcion: estado.nombre,
        },
      });
    }
  };

  const handleCheckboxExonerado = () => {
    setArticle({
      ...article,
      exonerado_igv: !article.exonerado_igv,
    });
  };

  const handleCheckboxFormula = () => {
    setArticle({
      ...article,
      formula_derivado: !article.formula_derivado,
    });
  };

  const handleSetCodigo = (value: string) => {
    setArticle({
      ...article,
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
          (item) => item._id.$oid == article.familia.id
        )?.codigo_familia;
        const grupo_code = groupsList.find(
          (item) => item._id.$oid == article.grupo.id
        )?.codigo_grupo;
        console.log(familia_code, grupo_code);
        if (familia_code && grupo_code) {
          setArticle({
            ...article,
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

  const handleCreateSetGrupo = (response:IGroup) => {
    setModalGrupo(false)
    setArticle({
      ...article,
      grupo: {
        id: response._id.$oid,
        descripcion: response.descripcion
      }
    })
  }
  const handleCreateSetFamilia = (response:IFamily) => {
    if(response.grupo_id != article.grupo.id){
      return
    }
    setModalFamilia(false)
    setArticle({
      ...article,
      familia: {
        id: response._id.$oid,
        descripcion: response.descripcion
      }
    })
  }
  const handleCreateSetMarca = (response:IBrand) => {
    setModalMarca(false)
    setArticle({
      ...article,
      marca: {
        id: response._id.$oid,
        descripcion: response.descripcion
      }
    })
  }

  return (
    <>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="grupo_id">Grupo</label>
          <SelectDinamico
            handleChange={handleChangeGrupo}
            setModal={setModalGrupo}
            value={article.grupo.id}
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
            value={article.familia.id}
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
            value={article.codigo_barras}
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
            value={article.codigo_articulo}
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
            value={article.codigo_sunat}
          />
          <span onClick={() => setModalSunat(true)} title="Consulta Web Sunat">
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
            value={article.nombre_articulo}
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
            value={article.nombre_corto}
          />
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.f_g}>
          <label htmlFor="marca">Marca</label>
          <SelectDinamico
            handleChange={handleMarcaChange}
            setModal={setModalMarca}
            value={article.marca.id}
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
            value={article.ubicacion}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="estado_articulo">Estado</label>
          <select
            id="estado_articulo"
            name="estado_articulo"
            onChange={handleSelectEstadoArticleChange}
            value={article.estado_articulo.id}
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
            value={article.isc}
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
            value={article.inafec}
          />
        </div>
        <div className={styles.f_g}>
          <label htmlFor="descripcion_utilidad">Descripcion/Utilidad</label>
          <input
            autoComplete="off"
            id="descripcion_utilidad"
            name="descripcion_utilidad"
            type="text"
            value={article.descripcion_utilidad}
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
            vocab={article.calidad}
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
            value={article.stock_minimo}
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
            value={article.stock_maximo}
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
            checked={article.exonerado_igv}
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
            checked={article.formula_derivado}
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
        handleCreateSetGrupo={handleCreateSetGrupo}
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
        handleCreateSetFamilia={handleCreateSetFamilia}
      />
      <NuevaMarca
        modal={modalMarca}
        setModal={setModalMarca}
        closeAlertTimeOut={closeAlertTimeOut}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        getBrandsList={getBrandsList}
        handleCreateSetMarca={handleCreateSetMarca}
      />
      <CodigoSunat
        closeAlertTimeOut={closeAlertTimeOut}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        showAlert={showAlert}
        setShow={setModalSunat}
        show={modalSunat}
        articulo={article.nombre_articulo}
        segmentosList={segmentosList}
        handleSetCodigo={handleSetCodigo}
      />
    </>
  );
};
