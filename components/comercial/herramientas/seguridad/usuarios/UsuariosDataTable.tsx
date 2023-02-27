"use client";
import { FC, useState, FormEvent, useEffect } from "react";
import styles from "@/styles/DataTable.module.scss";
import { IRol, IUser } from "@/interfaces/autenticacion/usuariosInterface";

interface IUserDataTable {
  rows: number;
  columns: IUser[];
  action: (data: IUser) => void;
  roles: IRol[];
}
export const UserDataTable: FC<IUserDataTable> = ({
  rows,
  columns,
  action,
  roles,
}) => {
  const [pagination, setPagination] = useState(1);
  const [data, setData] = useState(columns);
  const [filtros, setFiltros] = useState({
    nombre: "",
    correo: "",
    rol: "",
  });

  useEffect(() => {
    searchGastos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtros]);

  useEffect(() => {
    setData(columns);
  }, [columns]);

  const searchGastos = () => {
    const filterSectors = columns.filter((user) => {
      if (filtros.nombre) {
        return user.nombre_completo
          .toUpperCase()
          .includes(filtros.nombre.toUpperCase());
      }
      if (filtros.correo) {
        return user.correo.toUpperCase().includes(filtros.correo.toUpperCase());
      }
      if (filtros.rol) {
        return filtros.rol == user.rol.id
      }
      return user;
    });
    setData(filterSectors);
  };

  const renderRows = () => {
    const startIndex = rows * pagination - rows;
    const endIndex = rows * pagination;
    if (!data.length) {
      return (
        <tr>
          <td>No tiene datos</td>
          <td></td>
          <td></td>
        </tr>
      );
    }
    return data
      .map((column, index) => (
        <tr key={index} onClick={() => action(column)}>
          <td>{column.nombre_completo}</td>
          <td>{column.correo}</td>
          <td>{column.rol.descripcion}</td>
          <td>{column.estado ? "ACTIVO" : "INACTIVO"}</td>
        </tr>
      ))
      .slice(startIndex, endIndex);
  };

  const handleFiltrosChange = (
    e: FormEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.currentTarget;
    setFiltros({
      ...filtros,
      nombre: name == "nombre" ? value.toUpperCase() : "",
      correo: name == "correo" ? value.toUpperCase() : "",
      rol: name == "rol" ? value : "",
    });
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Rol</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        <tr className={styles.buscador}>
          <td>
            <input
              autoComplete="off"
              type="text"
              name="nombre"
              value={filtros.nombre}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <input
              autoComplete="off"
              type="text"
              name="correo"
              value={filtros.correo}
              onChange={handleFiltrosChange}
            />
          </td>
          <td>
            <select
              name="rol"
              value={filtros.rol}
              onChange={handleFiltrosChange}
            >
              <option value={""} hidden></option>
              <option value={""}>TODOS</option>
              {roles.map((item) => (
                <option value={item._id.$oid} key={item._id.$oid}>
                  {item.descripcion}
                </option>
              ))}
            </select>
          </td>
          <td></td>
        </tr>
        {renderRows()}
      </tbody>
    </table>
  );
};
