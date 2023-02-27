export interface IClientProvider {
  _id: {
    $oid: string
  }
  empresa_id: string;
  tipo_cliente_proveedor_id: string;
  clasificacion: string;
  dni_ruc: string;
  // # personaJuridica
  nombre_comercial: string;
  // # personaNatura
  nombre_natural: string;
  apellido_paterno_natural: string;
  apellido_materno_natural: string;
  fecha_nacimiento_natural: string;

  codigo_ubigeo: string;
  sector_id: string;
  zona_id: string;
  direccion: string;
  email: string;
  telefono1: string;
  telefono2: string;
  // # otroDatos
  nombre_contacto_otro: string;
  telefono_contacto_otro: string;
  descripcion_contacto_otro: string;
  precio_credito: number | null;
  estado: boolean;
}


export interface INewClientProvider {
  empresa_id: string;
  tipo_cliente_proveedor_id: string;
  clasificacion: string;
  dni_ruc: string;
  // # personaJuridica
  nombre_comercial: string;
  // # personaNatura
  nombre_natural: string;
  apellido_paterno_natural: string;
  apellido_materno_natural: string;
  fecha_nacimiento_natural: string;

  codigo_ubigeo: string;
  sector_id: string;
  zona_id: string;
  direccion: string;
  email: string;
  telefono1: string;
  telefono2: string;
  // # otroDatos
  nombre_contacto_otro: string;
  telefono_contacto_otro: string;
  descripcion_contacto_otro: string;
  precio_credito: number | null;
}
