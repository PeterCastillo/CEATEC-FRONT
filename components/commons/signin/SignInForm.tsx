"use client";

import { FormEvent, useState, FC } from "react";
import style from "./SignInForm.module.scss";
import { FaRegUser } from "react-icons/fa";
import { ISignInUserData } from "../../../interfaces/componentsInterfaces";
import { signInService } from "../../../services/auth/signInServices";
import { useRouter } from "next/navigation";
import { Alert } from "../alert/Alert";

interface ISignInForm {
  _id: { $oid: string };
  razon_social: string;
  ruc: string;
  direccion: string;
  representante_legal: string;
  telefono1: string;
  telefono2: string;
  telefono3: string;
  estado: boolean;
  tipo_empresa_id: string;
}

export const SignInForm: FC = () => {
  const [userData, setUserData] = useState<ISignInUserData>({
    email: "",
    password: "",
    business: "",
    module: "",
  });
  const [showAlert, setShowAlert] = useState({
    show: false,
    icon: "",
    title: "",
    message: "",
  });
  const router = useRouter();
  const [businesses, setBusinesses] = useState<ISignInForm[]>([]);

  const handleInputChange = (
    event: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.currentTarget;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const closeAlertTimeOut = () => {
    setTimeout(() => {
      setShowAlert({
        ...showAlert,
        icon: "",
        message: "",
        title: "",
        show: false,
      });
    }, 4000);
  };

  const signIn = async (event: FormEvent) => {
    event.preventDefault();
    const response = await signInService(userData);
    if (response.status === 200) {
      localStorage.setItem("empresa", "63af5f2ddd782976c860e549");
      localStorage.setItem("ceatec", response.json.access_token);
      var now = new Date();
      var time = now.getTime();
      var expireTime = time + response.json.expires;
      now.setTime(expireTime);
      document.cookie = `ceatec=${
        response.json.access_token
      }expires=${now.toUTCString()}`;
      return router.push("/comercial");
    }
    setShowAlert({
      ...showAlert,
      icon: "error",
      title: "Sin autorización",
      message: "Las credenciales son incorrectas, revise los campos",
      show: true,
    });
    return closeAlertTimeOut();
  };

  return (
    <div className={style.form_container}>
      <form onSubmit={signIn} className={style.form}>
        <div className={style.form_title}>
          <FaRegUser />
          <h3>Iniciar Sesión</h3>
          <span>Por favor ingresa tus credenciales</span>
        </div>
        <div className={style.form_control}>
          <label htmlFor="email">Correo</label>
          <input autoComplete="off"
            id="email"
            name="email"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.form_control}>
          <label htmlFor="password">Contraseña</label>
          <input autoComplete="off"
            id="password"
            name="password"
            type="password"
            onChange={handleInputChange}
          />
        </div>
        <div className={style.form_control}>
          <label htmlFor="module">Modulo</label>
          <select id="module" name="module" onChange={handleInputChange}>
            <option hidden value={""}>
              Seleccionar modulo
            </option>
            <option value="comercial">comercial</option>
            <option value="contabilidad">contabilidad</option>
            <option value="restaurante">restaurante</option>
          </select>
        </div>
        <div className={style.reset_password}>
          <a>¿Olvidaste tu contraseña?</a>
        </div>
        <button type="submit" className={style.form_button} onClick={signIn}>
          INICIAR SESIÓN
        </button>
      </form>
      <div className={style.shadow}></div>

      <Alert
        show={showAlert.show}
        icon={showAlert.icon}
        message={showAlert.message}
        title={showAlert.title}
      />
    </div>
  );
};
