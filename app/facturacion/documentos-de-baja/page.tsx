import { FaFileDownload, FaMailBulk } from "react-icons/fa";
import page from "./page.module.scss";
import { BsSearch } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";

export default function LibroDocumentos() {
  return (
    <>
      <div className={page.header}>
        <div className={page.head}>
          <span className={page.title}>Documentos de Baja</span>
        </div>
      </div>
      <div className={page.contenedor}>
        <div className={page.form_container}>
          <div className={page.form}>
            <div className={page.c_2}>
              <div className={page.input_group}>
                <div>
                  <label htmlFor="">Filtro</label>
                  <input type="text" />
                </div>
              </div>
              <div className={page.input_group}>
                <div>
                  <label htmlFor="">Seleccionar Tipo</label>
                  <select />
                </div>
                <div>
                  <label htmlFor="">Seleccionar Tipo</label>
                  <select />
                </div>
              </div>
            </div>
            <div className={page.c_1}>
              <div className={page.input_group}>
                <div>
                  <label htmlFor="">Desde</label>
                  <input type="date" />
                </div>
              </div>
              <div className={page.input_group}>
                <div>
                  <label htmlFor="">Hasta</label>
                  <input type="date" />
                </div>
              </div>
            </div>
          </div>
          <div className={page.search}>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Solo Anulado</label>
            </div>
            <button>
              <BsSearch /> Buscar
            </button>
          </div>
        </div>
        <div className={page.datatable}>
          <table className={page.table}>
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Documento</th>
                <th>Doc. Referencia</th>
                <th>Ruc</th>
                <th>Cliente</th>
                <th>Monto</th>
                <th>Bonificacion</th>
                <th>F. Rpta</th>
                <th>Estado</th>
                <th>Situacion</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={page.buttons}>
          <button>
            <FaFileDownload /> XML
          </button>
        </div>
      </div>
    </>
  );
}
