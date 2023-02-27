import { IReporteVenta } from "@/interfaces/comercial/reporte/reporteVenta/reporteVentaIntefaces";

const apiUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

export const postReporteVentasService = async (
    data: IReporteVenta,
    token: string
  ) => {
    try {
      const response = await fetch(`${apiUrl}/comercial/reportes/ventas`, {
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
  