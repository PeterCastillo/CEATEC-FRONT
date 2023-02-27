const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getSegmentosListService = async () => {
  try {
    const response = await fetch(`${apiUrl}/comercial/codigo_sunat/segmentos`);
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

export const getFamiliesBySegmentoService = async (segmento_id: string) => {
  try {
    const response = await fetch(
      `${apiUrl}/comercial/codigo_sunat/familias/${segmento_id}`
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

export const getClasesByFamilyService = async (familia_id: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/comercial/codigo_sunat/clases/${familia_id}`
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

  export const getCodigosByClaseService = async (clase_id: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/comercial/codigo_sunat/productos/${clase_id}`
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

  export const getArticulosByDescripcion = async (descripcion: string) => {
    try {
      const response = await fetch(
        `${apiUrl}/comercial/codigo_sunat/buscar_producto/${descripcion}`
      );
      console.log(`${apiUrl}/comercial/codigo_sunat/buscar_producto/${descripcion}`)
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


