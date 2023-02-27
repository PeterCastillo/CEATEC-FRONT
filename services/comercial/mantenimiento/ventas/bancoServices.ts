import {
  IBanco,
  INewBanco,
} from "@/interfaces/comercial/mantenimiento/ventas/bancosInterface";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaBancoService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/bancos/por_empresa/${empresa_id}`,
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

export const postBancoService = async (data: INewBanco, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/bancos`, {
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

export const putBancoService = async (
  data: IBanco,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/bancos/${id}`, {
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

export const deleteBancoService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/bancos/${id}`, {
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
