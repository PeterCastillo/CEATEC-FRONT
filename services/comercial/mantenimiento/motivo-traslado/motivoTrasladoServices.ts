import { IMotivoTraslado, INewMotivoTraslado } from "@/interfaces/comercial/mantenimiento/motivo-traslado/MotivoTrasladoInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListMotivoTrasladoService = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/motivo_traslado`, {
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

export const postMotivoTrasladoService = async (
  data: INewMotivoTraslado,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/motivo_traslado`, {
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

export const putMotivoTrasladoService = async (
  data: IMotivoTraslado,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/motivo_traslado/${id}`, {
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

export const deleteMotivoTrasladoService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/motivo_traslado/${id}`, {
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
