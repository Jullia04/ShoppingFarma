export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role?: 'cliente' | 'admin'; // opcional, se quiser diferenciar permissões
}
