export interface IUser {
  _id: {
    $oid: string;
  };
  nombre_completo: string;
  contrasena: string;
  correo: string;
  empresa_id: string;
  estado: boolean;
  rol: {
    id: string;
    descripcion: string;
  };
}

export interface INewUser {
  nombre_completo: string;
  contrasena: string;
  correo: string;
  empresa_id: string;
  rol: {
    id: string;
    descripcion: string;
  };
}

export interface IUpdateUser {
  nombre_completo: string;
  correo: string;
  constrasena?: string
  rol: {
    id: string;
    descripcion: string;
  };
}

export interface INewRol {
  descripcion: string;
  modulos: {
    descripcion: string;
    estado: boolean;
  }[];
  empresa_id: string;
}

export interface IRol {
  _id: {
    $oid: string;
  };
  descripcion: string;
  modulos: {
    descripcion: string;
    estado: boolean;
  }[];
  empresa_id: string;
  estado: boolean;
}
