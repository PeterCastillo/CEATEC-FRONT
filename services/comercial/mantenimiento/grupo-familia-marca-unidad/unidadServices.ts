import {
  INewUnit,
  IUnit,
} from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/unidadInterface";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getListaUnidadService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/unidades/por_empresa/${empresa_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const status = response.status
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor")
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const getOneUnidadService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/unidades/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const status = response.status
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor")
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const postUnidadService = async (data: INewUnit, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/unidades`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const status = response.status
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor")
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const putUnidadService = async (
  data: IUnit,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/unidades/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const status = response.status
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor")
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const deleteUnidadService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/unidades/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const status = response.status
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor")
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}
