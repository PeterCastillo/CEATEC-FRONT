import { INewZone } from "../../../../interfaces/comercial/mantenimiento/empresa/zonaInterfaces"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getListaZonasService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/zonas/por_empresa/${empresa_id}`,
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

export const postZonasService = async (data: INewZone, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/zonas`, {
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

export const putZonasService = async (
  data: INewZone,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/zonas/${id}`, {
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

export const deleteZonasService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/zonas/${id}`, {
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
