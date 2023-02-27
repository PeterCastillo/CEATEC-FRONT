import { FC, useState, FormEvent } from "react";
import style from "@/app/comercial/herramientas/usuarios/page.module.scss";
import { INewUser, IRol } from "@/interfaces/autenticacion/usuariosInterface";
import { SelectDinamico } from "@/components/commons/select/Select";
import { NuevoRol } from "./NuevoRol";
import { IAlert } from "@/interfaces/componentsInterfaces";

interface IUsuarioForm {
  newUser: INewUser;
  setNewUser: (state: INewUser) => void;
  roles: IRol[];
  closeAlertTimeOut: () => void;
  getRolesList: () => void;
  setShowAlert: (state: IAlert) => void;
  setShowLoader: (state: boolean) => void;
  showAlert: IAlert;
}
export const UsuarioForm: FC<IUsuarioForm> = ({
  newUser,
  setNewUser,
  roles,
  closeAlertTimeOut,
  getRolesList,
  setShowAlert,
  setShowLoader,
  showAlert,
}) => {
  const [modalRol,setModalRol] = useState(false)
  const handleInputChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const [modal, setModal] = useState(true);
  const handleModal = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setModal(!modal);
  };

  const handleChangeRol = (value: string) => {
    const rol = roles.find((item) => item._id.$oid == value);
    if (rol) {
      return setNewUser({
        ...newUser,
        rol: {
          id: rol._id.$oid,
          descripcion: rol.descripcion,
        },
      });
    }
    setNewUser({
      ...newUser,
      rol: {
        id: "",
        descripcion: "",
      },
    });
  };

  return (
    <div className={style.content}>
      <div className={style.form_container}>
        <div className={style.group_colum_inputs}>
          <div>
            <label htmlFor="nombre_completo">Nombre de Usuario:</label>
            <input
              type="text"
              name="nombre_completo"
              value={newUser.nombre_completo}
              id="nombre_completo"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div className={style.row_input}>
          <label htmlFor="correo">Correo:</label>
          <input
            type="text"
            name="correo"
            value={newUser.correo}
            id="correo"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.group_colum_inputs}>
          <div>
            <label htmlFor="contrasena">Contraseña:</label>
            <input
              type="text"
              name="contrasena"
              value={newUser.contrasena}
              id="contrasena"
              onChange={handleInputChange}
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Nivel de Acceso:</label>
          <SelectDinamico
            dataList={roles.map((item) => {
              return {
                id: item._id.$oid,
                descripcion: item.descripcion,
              };
            })}
            handleChange={handleChangeRol}
            setModal={setModalRol}
            value={newUser.rol.id}
          />
          {/* <button onClick={handleModal}>mas accesos...</button> */}
        </div>
        {/* <div className={clsx(style.modal,modal && style.disable)}>
          <div className={style.row_input}>
            <label htmlFor="">Usuario</label>
            <input type="text" />
          </div>
          <div className={style.group_colum_inputs}>
            <div>
              <label htmlFor="">Serie:</label>
              <input type="text" />
            </div>
            <div>
              <label htmlFor="">DNI:</label>
              <input type="text" />
            </div>
          </div>
          <div className={style.row_input}>
            <label htmlFor="">Direccion</label>
            <input type="text" />
          </div>
          <div className={style.modal_colums_container}>
            <div className={style.first_colum}>
              <div>
                <label htmlFor="">Telefono 1:</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Telefono 2:</label>
                <input type="text" />
              </div>
              <div>
                <label htmlFor="">Turno</label>
                <select name="" id=""></select>
              </div>
            </div>
            <div className={style.last_colum}>
              <div className={style.group_check}>
                <div>
                  <label htmlFor="">Precio 1</label>
                  <input type="checkbox" />
                </div>
                <div>
                  <label htmlFor="">Precio 2</label>
                  <input type="checkbox" />
                </div>
              </div>
              <div className={style.group_check}>
                <div>
                  <label htmlFor="">Precio 3</label>
                  <input type="checkbox" />
                </div>
                <div>
                  <label htmlFor="">Precio 4</label>
                  <input type="checkbox" />
                </div>
              </div>
              <div className={style.group_check}>
                <div>
                  <label htmlFor="">Precio 5</label>
                  <input type="checkbox" />
                </div>
                <div>
                  <label htmlFor="" hidden>
                    Precio 4
                  </label>
                  <input type="checkbox" hidden />
                </div>
              </div>
              <div className={style.last_column_last}>
                <div className={style.row_input_special}>
                  <label htmlFor="">Precio Predeterminado:</label>
                  <input type="text" />
                </div>
                <div className={style.check_last}>
                  <input type="checkbox" />
                  <label htmlFor="">Ver precio compra</label>
                </div>
              </div>
            </div>
          </div>
          <div>
            <input type="checkbox" />
            <label htmlFor="">Estado</label>
          </div>
          <div className={style.check_modal}>
            <div>
              <input type="checkbox" />
              <label htmlFor="">Usar ticketera</label>
            </div>
            <button>Usar ticketera</button>
          </div>
          <div className={style.row_input}>
            <label htmlFor="">Observacion:</label>
            <input type="text" />
          </div>
        </div> */}
      </div>
      <NuevoRol
        closeAlertTimeOut={closeAlertTimeOut}
        getRolesList={getRolesList}
        setShowAlert={setShowAlert}
        setShowLoader={setShowLoader}
        setShowNewClientModal={setModalRol}
        show={modalRol}
        showAlert={showAlert}
      />
    </div>
  );
};
