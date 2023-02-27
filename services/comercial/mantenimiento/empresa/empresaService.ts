import { IBusiness, INewBusiness } from "../../../../interfaces/comercial/mantenimiento/empresa/empresasInterfaces"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getListaEmpresasService = async (token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/empresas`, {
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

export const postEmpresaService = async (data: INewBusiness, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/empresas`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
    const status = response.status
    const json = await response.json()
    if (!response.ok) {
      throw new Error("Error de conexión en el servidor")
    }
    return { json, status }
  } catch (error) {
    if (error instanceof Error) {
      return false
    }
  }
}

export const putEmpresaService = async (
  data: IBusiness,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/empresas/${id}`, {
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

export const deleteEmpresaService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/empresas/${id}`, {
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
