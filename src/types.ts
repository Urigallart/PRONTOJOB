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
  verification_status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  fecha_registro: string;
  estado_cuenta: 'activa' | 'suspendida' | 'bloqueada';
  is_pro?: boolean;
  is_pro_plus?: boolean;
  is_boosted?: boolean;
  plan_id?: string;
  subscription_status?: 'active' | 'canceled' | 'past_due';
}

export interface Plan {
  id: string;
  nombre: string;
  precio_mensual: number;
  descripcion: string[];
  popular?: boolean;
  recomendado?: boolean;
}

export interface Job {
  id: string;
  cliente_id: string;
  trabajador_id?: string;
  titulo: string;
  descripcion: string;
  descripcion_corta: string;
  categoria: string;
  subcategoria?: string;
  precio: number;
  precio_cerrado: boolean;
  urgente: boolean;
  destacado: boolean;
  latitud: number;
  longitud: number;
  direccion: string;
  ubicacion_texto: string; // ciudad + barrio
  duracion_estimada: string;
  fecha: string;
  franja_horaria: string;
  nivel: 'básico' | 'medio' | 'pro';
  material_aportado_por: 'cliente' | 'trabajador' | 'mixto';
  verificacion_requerida: boolean;
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
  subcategories: string[];
}
