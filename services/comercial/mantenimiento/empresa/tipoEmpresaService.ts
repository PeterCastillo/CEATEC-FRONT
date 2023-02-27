import { INewTypesBusiness, ITypesBusiness } from "../../../../interfaces/comercial/mantenimiento/empresa/tipoEmpresaInterface"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getListaTipoEmpresaService = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_empresa`, {
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

export const postTipoEmpresaService = async (
  data: INewTypesBusiness,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_empresa`, {
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

export const putTipoEmpresaService = async (
  data: ITypesBusiness,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_empresa/${id}`, {
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

export const deleteTipoEmpresaService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/tipo_empresa/${id}`, {
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
