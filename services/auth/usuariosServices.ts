import {
  INewRol,
  INewUser,
  IRol,
  IUpdateUser,
} from "@/interfaces/autenticacion/usuariosInterface";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaUsuariosService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/auth/usuarios/por_empresa/${empresa_id}`,
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

export const postUserService = async (data: INewUser, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const status = response.status;
    const json = await response.json();
    return { json, status };
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};

export const putUserService = async (
  data: IUpdateUser,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/auth/usuarios/${id}`, {
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

export const getListRolesService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/auth/roles/por_empresa/${empresa_id}`,
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

export const postRolService = async (data: INewRol, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/auth/roles/crear`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const status = response.status;
    const json = await response.json();
    return { json, status };
  } catch (error) {
    if (error instanceof Error) {
      return false;
    }
  }
};


export const putRolService = async (
  data: IRol,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/auth/roles/${id}`, {
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