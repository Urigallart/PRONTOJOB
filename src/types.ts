import { LucideIcon } from 'lucide-react';

export interface User {
  id: string;
  nombre: string;
  apellidos: string;
  email: string;
  telefono: string;
  tipo_usuario: 'cliente' | 'trabajador';
  foto_perfil?: string;
  ciudad: string;
  direccion_base: string;
  latitud: number;
  longitud: number;
  verificado_identidad: boolean;
  fecha_registro: string;
  estado_cuenta: 'activa' | 'suspendida' | 'bloqueada';
}

export interface Job {
  id: string;
  cliente_id: string;
  trabajador_id?: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  precio: number;
  urgente: boolean;
  destacado: boolean;
  latitud: number;
  longitud: number;
  direccion: string;
  estado: 'publicado' | 'pendiente_pago' | 'pagado_retenido' | 'en_progreso' | 'completado' | 'en_disputa' | 'cancelado';
  fecha_publicacion: string;
  fecha_aceptacion?: string;
  fecha_finalizacion?: string;
}

export interface Category {
  id: string;
  name: string;
  icon: LucideIcon;
  description: string;
}
