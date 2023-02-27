import { IFamily, INewFamily } from "@/interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/familiaInterfaces"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getListaFamiliaService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/familias/por_empresa/${empresa_id}`,
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

export const getFamilysForGroupsService = async (group_id: string, token: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/familias/por_grupo/${group_id}`,
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

export const postFamiliaService = async (data: INewFamily, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/familias`, {
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

export const putFamiliaService = async (
  data: IFamily,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/familias/${id}`, {
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

export const deleteFamiliaService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/familias/${id}`, {
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
