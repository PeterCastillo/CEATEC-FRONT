import { FC } from "react";
import style from "./SelectUser.module.scss";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FaPlus } from "react-icons/fa";
import { useState, FormEvent, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { CgSearchFound } from "react-icons/cg";
import { FiX } from "react-icons/fi";

interface IData {
  id: string;
  descripcion: string;
}

interface ISelectUser {
  dataList: IData[];
  handleChange: (value: string) => void;
  value: string;
}

export const SelectUser: FC<ISelectUser> = ({
  value,
  dataList,
  handleChange,
}) => {
  const [modalList, setModalList] = useState(false);

  const [state, setState] = useState({
    input: "",
  });
  const [data, setData] = useState<IData[]>([]);

  const handleBusquedaChange = (e: FormEvent<HTMLInputElement>) => {
    const { name, value } = e.currentTarget;
    setState({
      ...state,
      [name]: value.toUpperCase(),
    });
    if (value.length > 0) {
      const filtro = dataList.filter((item) =>
        item.descripcion.toUpperCase().startsWith(value.toUpperCase())
      );
      setData(filtro);
      return;
    }
    setData(dataList);
  };

  useEffect(() => {
    setData(dataList);
  }, [dataList]);

  useEffect(() => {
    const selected = dataList.find((proveedor) => proveedor.id == value);
    if (selected) {
      setState({
        ...state,
        input: selected.descripcion.toUpperCase(),
      });
      setData([]);
      return;
    }
    setState({
      input: "",
    });
  }, [value]);

  return (
    <div className={style.select_articulo}>
      <div className={style.buscador}>
        <div>
          <input
            autoComplete="off"
            type="text"
            value={state.input}
            name="input"
            onChange={handleBusquedaChange}
            className={style.input}
            onBlur={() => {
              setTimeout(() => setModalList(false), 200);
            }}
            onFocus={() => {
              console.log(dataList);
              setModalList(true);
              setData(
                state.input
                  ? dataList
                  : // dataList.filter((item) =>
                    //     item.descripcion
                    //       .toUpperCase()
                    //       .startsWith(state.proveedor.toUpperCase())
                    //   )
                    dataList
              );
            }}
          />
          <div className={style.search}>
            <AiOutlineSearch />
          </div>
          <div className={style.delete} onClick={() => setState({ input: "" })}>
            <FiX />
          </div>
        </div>
      </div>
      {modalList && (
        <div className={style.dropDownContainer}>
          <div className={style.art_container}>
            {data.map((item) => (
              <div
                className={style.art}
                onClick={() => handleChange(item.id)}
                key={item.id}
              >
                <div className={style.icon}>
                  <CgSearchFound />
                </div>
                <div className={style.element}>{item.descripcion}</div>
              </div>
            ))}
            {data.length == 0 && (
              <div className={style.art}>
                <div className={style.icon}>
                  <CgSearchFound />
                </div>
                <div className={style.element}>
                  No existen datos relacionados
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
