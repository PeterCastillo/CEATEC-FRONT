import { INewTipoDocumentoVenta } from "@/interfaces/comercial/mantenimiento/tipo-documento/tipoDocumentoVentaInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaTipoDocumentoVentaService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_venta/por_empresa/${empresa_id}`,
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

export const postTipoDocumentoVentaService = async (
  data: INewTipoDocumentoVenta,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_documento_venta`, {
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

export const putTipoDocumentoVentaService = async (
  data: INewTipoDocumentoVenta,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_venta/${id}`,
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

export const deleteTipoDocumentoVentaService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_venta/${id}`,
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

export const getCorrelativoDocumentoVenta = async (
  documento_venta: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/tipo_documento_venta/correlativo/${documento_venta}`,
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
