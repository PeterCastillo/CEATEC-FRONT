import {
  IBox,
  INewBox,
} from "@/interfaces/comercial/mantenimiento/caja/cajaInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaCajasServiceForBranchOffice = async (
  sucursal_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cajas/por_sucursal/${sucursal_id}`,
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

export const getListaCajasService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cajas/por_empresa/${empresa_id}`,
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

export const postCajasService = async (data: INewBox, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/cajas`, {
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

export const putCajasService = async (
  data: IBox,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/cajas/${id}`, {
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

export const deleteCajasService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/cajas/${id}`, {
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
