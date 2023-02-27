import { INewTipoClienteProveedor, ITipoClienteProveedor } from "../../../../interfaces/comercial/mantenimiento/tipo-cliente-proveedor/tipoClientProvedorinterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaTipoClienteProveedoreService = async (
  por_empresa: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_cliente_proveedor/por_empresa/${por_empresa}`,
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

export const getOneTipoClienteProveedorService = async (id: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_cliente_proveedor/${id}`
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

export const postTipoClienteProveedoreService = async (
  data: INewTipoClienteProveedor,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_cliente_proveedor`, {
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

export const putTipoClienteProveedoreService = async (
  data: ITipoClienteProveedor,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_cliente_proveedor/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
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

export const deleteTipoClienteProveedoreService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_cliente_proveedor/${id}`,
      {
        method: "DELETE",
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
