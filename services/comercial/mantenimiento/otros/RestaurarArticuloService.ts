import { IActivateArticulo } from "@/interfaces/comercial/mantenimiento/otros/restaurarArticulosInterface";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaAticuloEliminadoService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos/eliminados/por_empresa/${empresa_id}`,
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

export const putAticuloEliminadoService = async (
  data: IActivateArticulo,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos/eliminados/habilitar`,
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
