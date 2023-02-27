import { IReporteCompra } from "@/interfaces/comercial/reporte/reporteCompra/reporteCompraIntefaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postReporteCompraService = async (
    data: IReporteCompra,
    token: string
  ) => {
    try {
      const response = await fetch(`${apiUrl}/comercial/reportes/compras`, {
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
  