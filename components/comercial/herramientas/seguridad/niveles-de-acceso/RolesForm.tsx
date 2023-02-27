"use client";
import { FC, FormEvent } from "react";
import style from "@/app/comercial/herramientas/niveles-de-acceso/page.module.scss";
import { INewRol } from "@/interfaces/autenticacion/usuariosInterface";

interface IRolesForm {
  newRol: INewRol;
  setNewRol: (state: INewRol) => void;
}
export const RolesForm: FC<IRolesForm> = ({ newRol, setNewRol }) => {
  const handleInputChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setNewRol({
      ...newRol,
      [name]: value,
    });
  };

  const handleModuleChange = (descripcion: string) => {
    const validaro = newRol.modulos.find(
      (item) => item.descripcion == descripcion
    );
    if (validaro) {
      return setNewRol({
        ...newRol,
        modulos: newRol.modulos.map((item) =>
          item.descripcion == descripcion
            ? { ...item, estado: !item.estado }
            : item
        ),
      });
    }
    setNewRol({
      ...newRol,
      modulos: [...newRol.modulos, { descripcion: descripcion, estado: true }],
    });
  };

  return (
    <div className={style.content}>
      <div className={style.niveles_cabezera}>
        <label htmlFor="">Nivel Acceso:</label>
        <div>
          <input
            type="text"
            onChange={handleInputChange}
            name="descripcion"
            value={newRol.descripcion}
          />
        </div>
      </div>
      <div className={style.acces_container}>
        <div className={style.acces_section}>
          <div className={style.form_section}>
            <div className={style.item}></div>
            <span>Archicos</span>
            <div className={style.item}></div>
          </div>
          <div className={style.input_container}>
            {/* <div>
              <input type="checkbox" />
              <label htmlFor="">Activar Todos</label>
            </div> */}
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Tipo de Cambio")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Tipo de Cambio"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Tipo de Cambio")}
              >
                Tipo de Cambio
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Salir")}
                checked={
                  newRol.modulos.find((item) => item.descripcion == "Salir")
                    ?.estado ?? false
                }
              />
              <label htmlFor="" onClick={() => handleModuleChange("Salir")}>
                Salir
              </label>
            </div>
          </div>
        </div>
        <div className={style.acces_section}>
          <div className={style.form_section}>
            <div className={style.item}></div>
            <span>Ventas</span>
            <div className={style.item}></div>
          </div>
          <div className={style.input_container}>
            {/* <div>
              <input type="checkbox" />
              <label htmlFor="">Activar Todos</label>
            </div> */}
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Venta Producto")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Venta Producto"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Venta Producto")}
              >
                Venta Producto
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Modificar/Eliminar Venta")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Modificar/Eliminar Venta"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Modificar/Eliminar Venta")}
              >
                Modificar/Eliminar Venta
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Nota de Credito")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Nota de Credito"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Nota de Credito")}
              >
                Nota de Credito
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Nota de Debito")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Nota de Debito"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Nota de Debito")}
              >
                Nota de Debito
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() =>
                  handleModuleChange("Generar Cronograma de Pago")
                }
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Generar Cronograma de Pago"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Generar Cronograma de Pago")}
              >
                Generar Cronograma de Pago
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Gestion")}
                checked={
                  newRol.modulos.find((item) => item.descripcion == "Gestion")
                    ?.estado ?? false
                }
              />
              <label htmlFor="" onClick={() => handleModuleChange("Gestion")}>
                Gestion
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Reimprimir Ventas")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Reimprimir Ventas"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Reimprimir Ventas")}
              >
                Reimprimir Ventas
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Cobranzas")}
                checked={
                  newRol.modulos.find((item) => item.descripcion == "Cobranzas")
                    ?.estado ?? false
                }
              />
              <label htmlFor="" onClick={() => handleModuleChange("Cobranzas")}>
                Cobranzas
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Reimprimir Cobranzas")}
                checked={
                  newRol.modulos.find(
                    (item) => item.descripcion == "Reimprimir Cobranzas"
                  )?.estado ?? false
                }
              />
              <label
                htmlFor=""
                onClick={() => handleModuleChange("Reimprimir Cobranzas")}
              >
                Reimprimir Cobranza
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                onChange={() => handleModuleChange("Mesas")}
                checked={
                  newRol.modulos.find((item) => item.descripcion == "Mesas")
                    ?.estado ?? false
                }
              />
              <label htmlFor="" onClick={() => handleModuleChange("Mesas")}>
                Mesas
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
