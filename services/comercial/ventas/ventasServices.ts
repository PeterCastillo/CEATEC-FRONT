import { INewVenta, IVenta } from "@/interfaces/comercial/ventas/ventasInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaRegistroVentaService = async (
  empresa_id: string,
  token: string,
  query_params?: any
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/venta/por_empresa/${empresa_id}?${query_params}`,
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

export const postRegistroVentaService = async (
  data: INewVenta,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/venta`, {
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

export const putRegistroVentaService = async (
  data: IVenta,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/venta/${id}`, {
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

export const getListaRegistroVentaByProveedorService = async (
  proveedor_id: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/venta/proveedor/${proveedor_id}`
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


export const descargarPdfVenta = async (
  venta_id: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/documentos/venta/${venta_id}`
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