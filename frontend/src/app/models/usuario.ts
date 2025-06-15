export interface Usuario {
  nombre: string;
  rut: string;
  correo: string;
  region: string;
  comuna: string;
  contrasena: string;

  fotoPerfil: string | null;    
  descripcion: string;
}
