export interface RespuestaUsuarios {
    ok: boolean;
    usuarios: Usuario[];
    total: number;
  }
  
export interface Usuario {
  //Se cambio google de boolean a string
    role?: string;
    google?: string;
    _id?: string;
    nombre?: string;
    email?: string;
    img?: string;
    password?: string;
  }

  export interface RespuestaHospitales {
    ok: boolean;
    hospitales: Hospital[];
    total: number;
  }
  
  export interface Hospital {
    _id?: string;
    nombre?: string;
    usuario?: Usuario;
    img?: string;
  }