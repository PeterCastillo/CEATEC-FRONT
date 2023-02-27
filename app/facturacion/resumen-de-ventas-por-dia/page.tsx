"use client";
import { FaFileDownload, FaMailBulk } from "react-icons/fa";
import page from "./page.module.scss";
import { BsSearch } from "react-icons/bs";
import { RiMailSendLine } from "react-icons/ri";
import { useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";

export default function LibroDocumentos() {
  const [render, setRender] = useState(1);
  const renderComponent = () => {
    switch (render) {
      case 1:
        return (
          <div className={page.datatable}>
            <table className={page.table}>
              <thead>
                <tr>
                  <th>Tipo Documento</th>
                  <th>Total</th>
                  <th>Total Sin Anulados</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 2:
        return (
          <div className={page.datatable}>
            <table className={page.table}>
              <thead>
                <tr>
                  <th>TipHGJHGJGJHGJo DoHJHGcumento</th>
                  <th>Total</th>
                  <th>Total Sin AnuJGHJGGJlados</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 3:
        return (
          <div className={page.datatable}>
            <table className={page.table}>
              <thead>
                <tr>
                  <th>Tipo DoFGHGFHGFHGFHGcumento</th>
                  <th>ToGHGFGFHGFHtal</th>
                  <th>Total HGGHHGFH Anulados</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      case 4:
        return (
          <div className={page.datatable}>
            <table className={page.table}>
              <thead>
                <tr>
                  <th>ghfghhh</th>
                  <th>Totfghghgal</th>
                  <th>Total Sin Anulados</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        );
    }
  };

  return (
    <>
      <div className={page.header}>
        <div className={page.head}>
          <span className={page.title}>Resumen de Ventas por Dia</span>
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
            <button>
              <BsSearch /> Buscar
            </button>
          </div>
        </div>
        <div className={page.render}>
          <div className={page.options_render}>
            <button className={`${render == 1 && page.active}`} onClick={()=> setRender(1)}>Ventas Sunat</button>
            <button className={`${render == 2 && page.active}`} onClick={()=> setRender(2)}>Ventas Comerciales</button>
            <button className={`${render == 3 && page.active}`} onClick={()=> setRender(3)}>Comerciales</button>
            <button className={`${render == 4 && page.active}`} onClick={()=> setRender(4)}>Ventas Web</button>
            <span onClick={()=> setRender(render + 1 > 4 ? 1 : render + 1)}><AiOutlineArrowRight/></span>
          </div>
          <div>{renderComponent()}</div>
        </div>
        <div className={page.datatable}>
          <table className={page.table}>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Serie</th>
                <th>Minimo</th>
                <th>Maximo</th>
                <th>Nro. Registros</th>
                <th>Monto</th>
                <th>Faltantes</th>
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
              </tr>
            </tbody>
          </table>
        </div>
        <div className={page.separator}>
          <div className={page.line}></div>
          <div className={page.subtitle}>
            DETALLE DE DOCUMENTOS - VENTAS SUNAT
          </div>
          <div className={page.line}></div>
        </div>
        <div className={page.datatable}>
          <table className={page.table}>
            <thead>
              <tr>
                <th>Emision</th>
                <th>Direccion</th>
                <th>Nombre XLM</th>
                <th>Tipo</th>
                <th>Documento</th>
                <th>Monto</th>
                <th>Bonif</th>
                <th>Fecha Envio</th>
                <th>F.R</th>
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
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
