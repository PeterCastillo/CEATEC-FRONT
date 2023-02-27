import {
  IGroup,
  INewGroup,
} from "../../../../interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/grupoInterfaces"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getListaGrupoService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/grupos/por_empresa/${empresa_id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    const status = response.status
    if (!response.ok) {
      throw "Error de conexión en el servidor"
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const postGrupoService = async (data: INewGroup, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/grupos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const status = response.status
    if (!response.ok) {
      throw "Error de conexión en el servidor"
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const putGrupoService = async (
  data: IGroup,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/grupos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const status = response.status
    if (!response.ok) {
      throw "Error de conexión en el servidor"
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const deleteGrupoService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/grupos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const status = response.status
    if (!response.ok) {
      throw "Error de conexión en el servidor"
    }
    const json = await response.json()
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}
