import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";
import {
  IArticle,
  INewArticle,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";
import { ISegmentoCodigoSunat } from "@/interfaces/comercial/mantenimiento/codigo-sunat/codigoSunatInterfaces";
import { IFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces";
import { IGroup } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces";
import { IBrand } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces";
import { IAlert } from "@/interfaces/componentsInterfaces";
import { NAF } from "./NuevoArticuloForm";

export const NuevoArticulo = ({
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
  articulosList,
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
  setShowAlert: (alert: IAlert) => void;
  showAlert: IAlert;
  getGroupsList: (handleCreateSetGrupo?: () => void) => void;
  getBrandsList: (handleCreateSetMarca?: () => void) => void;
  articulosList: IArticle[];
  segmentosList: ISegmentoCodigoSunat[];
}) => {
  return (
    <NAF
      segmentosList={segmentosList}
      articulosList={articulosList}
      brandsList={brandsList}
      familiesList={familiesList}
      groupsList={groupsList}
      newArticle={newArticle}
      setNewArticle={setNewArticle}
      setShowLoader={setShowLoader}
      stateArticlesList={stateArticlesList}
      closeAlertTimeOut={closeAlertTimeOut}
      getGroupsList={getGroupsList}
      setShowAlert={setShowAlert}
      showAlert={showAlert}
      getBrandsList={getBrandsList}
    />
  );
};
