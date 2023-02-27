import {
  INewTipoDocumentoCompra,
  ITipoDocumentoCompra,
} from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoCompraInterface";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaTipoDocumentoCompraService = async (
  por_empresa: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_compra/por_empresa/${por_empresa}`,
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

export const getOneTipoDocumentoCompraService = async (id: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_compra/${id}`
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

export const postTipoDocumentoCompraService = async (
  data: INewTipoDocumentoCompra,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_documento_compra`, {
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

export const putTipoDocumentoCompraService = async (
  data: ITipoDocumentoCompra,
  id: string | undefined,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_compra/${id}`,
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

export const deleteTipoDocumentoCompraService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_compra/${id}`,
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
