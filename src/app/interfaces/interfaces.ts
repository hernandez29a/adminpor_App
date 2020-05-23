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