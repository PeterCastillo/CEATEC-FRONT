import {
  INewCompra,
  ICompra,
} from "@/interfaces/comercial/movimientos/comprasIntefaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaRegistroCompraService = async (
  empresa_id: string,
  token: string,
  query_params?: any
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/compra/por_empresa/${empresa_id}?${query_params}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    console.log(`${apiUrl}/comercial/compra/por_empresa/${empresa_id}?${query_params}`)
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

export const postRegistroCompraService = async (
  data: INewCompra,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/compra`, {
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

export const putRegistroCompraService = async (
  data: ICompra,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/compra/${id}`, {
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

export const getListaRegistroCompraByProveedorService = async (
  proveedor_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/compra/proveedor/${proveedor_id}`,
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
