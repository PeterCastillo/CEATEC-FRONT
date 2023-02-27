import { INewClientProvider } from "../../../../interfaces/comercial/mantenimiento/cliente-proveedor/proveedorClientInterfaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaClienteProveedorService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cliente_proveedor/por_empresa/${empresa_id}`,
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

export const getOneClienteProveedorService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cliente_proveedor/${id}`,
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

export const getOneClienteProveedorDniRucService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cliente_proveedor/dni_ruc/${id}`,
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

export const postClienteProveedorService = async (
  data: INewClientProvider,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/cliente_proveedor/  `, {
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

export const putClienteProveedorService = async (
  data: INewClientProvider,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cliente_proveedor/${id}`,
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

export const deleteClienteProveedorService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cliente_proveedor/${id}`,
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

export const getOneClienteProveedorByDniRucService = async (
  id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/cliente_proveedor/dni_ruc/${id}`,
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


export const getConsultaSunatOneClienteProveedorByDniService = async (
  id: string
) => {
  try {
    const response = await fetch(
      `https://consultardoc.ceatec.com.pe/dni/${id}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
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

export const getConsultaSunatOneClienteProveedorByRucService = async (
  id: string
) => {
  try {
    const response = await fetch(
      `https://consultardoc.ceatec.com.pe/ruc/${id}`,
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
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