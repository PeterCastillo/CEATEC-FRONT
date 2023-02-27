import { IArticuloProveedor } from "@/interfaces/comercial/mantenimiento/articulo-proveedor/articulosProveedorInterface";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

interface IArt {
  articulo: {
    id: string | undefined;
    nombre_articulo: string;
    marca: string;
  };
  _id: {
    $oid: string;
  };
  selected?: boolean;
}

export const getListaArticulosProveedorService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos_proveedor/${id}`,
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

export const postArticuloProveedorService = async (
  data: IArticuloProveedor,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/articulos_proveedor`, {
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

export const deleteArticuloProveedorService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos_proveedor/${id}`,
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
