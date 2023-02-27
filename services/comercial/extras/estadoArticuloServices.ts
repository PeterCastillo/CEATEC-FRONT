import { IEstadoArticulo } from "@/interfaces/comercial/extras/estadoArticuloInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaEstadoArticuloService = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/estado_articulo`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const postEstadoArticuloService = async (
  data: IEstadoArticulo,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/estado_articulo`, {
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

export const updateEstadoArticuloService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/estado_articulo/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const deleteEstadoArticuloService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/estado_articulo/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
