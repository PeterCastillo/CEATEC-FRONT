import {
  INewArticle,
  IArticle,
} from "@/interfaces/comercial/mantenimiento/articulo/articulosInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaArticulosService = async (
  store_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos/por_empresa/${store_id}`,
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

export const getOneArticulosService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/articulos/${id}`, {
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

export const postArticuloService = async (data: INewArticle, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/articulos`, {
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

export const putArticuloService = async (
  data: IArticle,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/articulos/${id}`, {
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

export const deleteArticuloService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/articulos/${id}`, {
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

export const getArticuloByCodeService = async (id: string, token: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos/article_code/${id}`,
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


export const getCodigoBarrasService = async (
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/articulos/codigo_barras/generar`,
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