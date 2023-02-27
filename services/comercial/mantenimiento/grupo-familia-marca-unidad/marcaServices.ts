import {
  IBrand,
  INewBrand,
} from "../../../../interfaces/comercial/mantenimiento/grupo-familia-marca-unidad/marcaInterfaces"

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL

export const getListaMarcaService = async (
  empresa_id: string,
  token: string
) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/marcas/por_empresa/${empresa_id}`,
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

export const postMarcaService = async (data: INewBrand, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/marcas`, {
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

export const putMarcaService = async (
  data: IBrand,
  id: string,
  token: string
) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/marcas/${id}`, {
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

export const deleteMarcaService = async (id: string, token: string) => {
  try {
    const response = await fetch(`${apiUrl}/comercial/marcas/${id}`, {
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
