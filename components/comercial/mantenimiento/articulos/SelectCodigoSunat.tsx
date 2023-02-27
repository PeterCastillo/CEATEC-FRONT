import { FC } from "react";
import style from "./Select.module.scss";
import { FaPlus } from "react-icons/fa";
import { CgSearchFound } from "react-icons/cg";
import { AiOutlineSearch } from "react-icons/ai";
import { FiX } from "react-icons/fi";
import { useState, FormEvent, useEffect } from "react";

interface IData {
  id: string;
  descripcion: string;
  sub_nombre: string;
}

interface ISelectCodigoSunat {
  dataList: IData[];
  handleChange: (value: string) => void;
  value: string;
}

export const SelectCodigoSunat: FC<ISelectCodigoSunat> = ({
  value,
  dataList,
  handleChange,
}) => {
  const [modalList, setModalList] = useState(false);

  const [state, setState] = useState({
    proveedor: "",
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
    const selected = dataList.find((proveedor) => proveedor.id == value);
    if (selected) {
      setState({
        ...state,
        proveedor: selected.sub_nombre.toUpperCase(),
      });
      setData([]);
      return;
    }
    setState({
      proveedor: "",
    });
  }, [value, dataList]);

  return (
    <div className={style.select_articulo}>
      <div className={style.buscador}>
        <div>
          <input
            autoComplete="off"
            type="text"
            value={state.proveedor}
            name="proveedor"
            onChange={handleBusquedaChange}
            className={style.input}
            onBlur={() => {
              setTimeout(() => setModalList(false), 200);
            }}
            onFocus={() => {
              setModalList(true);
              setData(
                state.proveedor
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
          <div
            className={style.delete}
            onClick={() => {
              handleChange("")
              setState({ proveedor: "" });
            }}
          >
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
