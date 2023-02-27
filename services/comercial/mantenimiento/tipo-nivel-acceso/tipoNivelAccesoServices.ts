import {
  INewTipoNivelAcceso,
  ITipoNivelAcceso,
} from "@/interfaces/comercial/mantenimiento/tipo-nivel-acceso/tipoNivelAcceso";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaTipoNivelAccesoService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/nivel_acceso/por_empresa/${empresa_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const status = response.status;
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor");
    }
    const json = await response.json();
    return { json, status };
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};

export const postTipoNivelAccesoService = async (
  data: INewTipoNivelAcceso,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/nivel_acceso`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const status = response.status;
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor");
    }
    const json = await response.json();
    return { json, status };
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};

export const putTipoNivelAccesoService = async (
  data: ITipoNivelAcceso,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/nivel_acceso/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const status = response.status;
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor");
    }
    const json = await response.json();
    return { json, status };
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};
