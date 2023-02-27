import React, { FC, useRef, useState } from "react";
import Image from "next/image";
import { clsx } from "@/lib/clsx";
import style from "./Sidebar.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { sidebarFacturacionOptions } from "@/utils/sidebarFacturacionOptions";
import { FaBars, FaDoorClosed } from "react-icons/fa";
import { AiOutlineMinus } from "react-icons/ai";

interface ISidebar {
  show: boolean;
  handleShowSidebar: () => void;
}

interface IListOptions {
  icon: JSX.Element;
  name: string;
  url?: string;
  show?: boolean;
  submenu?: {
    icon: JSX.Element;
    name: string;
    url: string;
  }[];
}

export const Sidebar: FC<ISidebar> = ({ show, handleShowSidebar }) => {
  const [showListOptions, setShowListOptions] = useState<string>("");
  const pathName = usePathname();

  const isPathActive = (route: string) => {
    console.log(route)
    if (pathName) {
      if (pathName.includes(route)){
        return style.nav_item_activate
      }
    }
  }

  const handleShowListOptions = (name: string) => {
    if (showListOptions === name) {
      return setShowListOptions("");
    }
    return setShowListOptions(name);
  };

  return (
    <>
      <aside className={clsx(style.sidebar, show && style.show)}>
        <div>
          <div className={style.logo}>
            <span className={style.title}>CEA FACTURACION</span>
            <span className={clsx(style.icon)} onClick={handleShowSidebar}>
              <AiOutlineMinus />
            </span>
          </div>
          <ul className={style.nav}>
            {sidebarFacturacionOptions.map((data) =>
              !data.url ? (
                <li
                  className={clsx(
                    style.nav_item,
                    isPathActive(data.name)
                  )}
                  onClick={() => handleShowListOptions(data.name)}
                  key={data.name}
                ></li>
              ) : (
                <Link href={data.url} key={data.name}>
                  <li
                    className={clsx(
                      style.nav_item,
                      isPathActive(data.url)
                      
                    )}
                    onClick={() => handleShowListOptions(data.name)}
                    key={data.name}
                  >
                    <div className={style.nav_link}>
                      <span className={style.menu_icon}>{data.icon}</span>
                      <span>{data.name}</span>
                    </div>
                  </li>
                </Link>
              )
            )}
          </ul>
        </div>
        <div className={style.user}>
          <picture className={style.user_picture}>
            <Image
              src="/user.jpg"
              width={32}
              height={32}
              alt="Foto del usuario"
            />
          </picture>
          <div className={style.user_data}>
            <span className={style.user_name}>Bruno Chan</span>
            <span className={style.user_name}>brunoacy12@gmail.com</span>
          </div>
          <div className={style.user_button_close}>
            <FaDoorClosed />
          </div>
        </div>
      </aside>
      <div className={style.button_float} onClick={handleShowSidebar}>
        <span><FaBars /></span>
      </div>
    </>
  );
};
