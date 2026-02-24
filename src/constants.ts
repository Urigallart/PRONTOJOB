import { 
  Hammer, 
  Shovel, 
  Trash2, 
  Truck, 
  Paintbrush, 
  Wrench, 
  Zap, 
  Droplets,
  Dog,
  Heart,
  Monitor,
  BookOpen,
  Music,
  Users,
  Car,
  Camera,
  Palette,
  ChefHat,
  LayoutGrid,
  HelpCircle
} from 'lucide-react';
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { 
    id: 'hogar-limpieza', 
    name: 'Hogar y limpieza', 
    icon: Trash2, 
    description: 'Limpieza puntual, fin de obra, plancha',
    subcategories: ['Limpieza puntual', 'Fin de obra', 'Plancha', 'Limpieza profunda']
  },
  { 
    id: 'jardineria', 
    name: 'Jardinería', 
    icon: Shovel, 
    description: 'Cortar césped, poda, riego',
    subcategories: ['Cortar césped', 'Poda', 'Riego', 'Mantenimiento']
  },
  { 
    id: 'bricolaje', 
    name: 'Bricolaje y montaje', 
    icon: Hammer, 
    description: 'Muebles, cortinas, colgar TV',
    subcategories: ['Montaje muebles', 'Cortinas', 'Colgar TV', 'Estanterías']
  },
  { 
    id: 'reparaciones', 
    name: 'Reparaciones hogar', 
    icon: Wrench, 
    description: 'Persianas, grifos, silicona',
    subcategories: ['Persianas', 'Grifos', 'Silicona', 'Pequeños arreglos']
  },
  { 
    id: 'mudanzas', 
    name: 'Mudanzas y recados', 
    icon: Truck, 
    description: 'Carga/descarga, paquetes, Ikea pickup',
    subcategories: ['Carga/Descarga', 'Paquetes', 'Ikea pickup', 'Portes']
  },
  { 
    id: 'pintura', 
    name: 'Pintura y paredes', 
    icon: Paintbrush, 
    description: 'Pintar habitación, desconchones',
    subcategories: ['Pintar habitación', 'Retocar desconchones', 'Papel pintado']
  },
  { 
    id: 'mascotas', 
    name: 'Mascotas', 
    icon: Dog, 
    description: 'Paseo, cuidado, veterinario',
    subcategories: ['Paseo', 'Cuidado 1 día', 'Veterinario']
  },
  { 
    id: 'cuidado', 
    name: 'Cuidado de personas', 
    icon: Heart, 
    description: 'Acompañamiento, ayuda puntual',
    subcategories: ['Acompañamiento', 'Ayuda puntual']
  },
  { 
    id: 'tecnologia', 
    name: 'Tecnología', 
    icon: Monitor, 
    description: 'Router, impresora, limpieza PC',
    subcategories: ['Router', 'Impresora', 'Limpieza PC', 'Configuración']
  },
  { 
    id: 'clases', 
    name: 'Clases', 
    icon: BookOpen, 
    description: 'Repaso, idiomas, música',
    subcategories: ['Repaso', 'Idiomas', 'Música', 'Sesiones puntuales']
  },
  { 
    id: 'eventos', 
    name: 'Eventos', 
    icon: Users, 
    description: 'Montaje, camarero, logística',
    subcategories: ['Montaje/Desmontaje', 'Camarero por horas', 'Apoyo logístico']
  },
  { 
    id: 'vehiculos', 
    name: 'Vehículos', 
    icon: Car, 
    description: 'Limpieza, batería, recados ITV',
    subcategories: ['Limpieza interior', 'Cambio batería', 'Recados ITV']
  },
  { 
    id: 'delivery', 
    name: 'Delivery / Repartos', 
    icon: Truck, 
    description: 'Repartos locales inmediatos',
    subcategories: ['Reparto local']
  },
  { 
    id: 'fotografia', 
    name: 'Fotografía / Vídeo', 
    icon: Camera, 
    description: 'Sesión 1h, edición rápida',
    subcategories: ['Sesión 1h', 'Edición rápida']
  },
  { 
    id: 'diseno', 
    name: 'Diseño', 
    icon: Palette, 
    description: 'Logos, carteles, flyers',
    subcategories: ['Mini logos', 'Carteles', 'Flyers']
  },
  { 
    id: 'cocina', 
    name: 'Cocina', 
    icon: ChefHat, 
    description: 'Batch cooking, ayuda en casa',
    subcategories: ['Batch cooking 2h', 'Ayuda en casa']
  },
  { 
    id: 'organizacion', 
    name: 'Organización', 
    icon: LayoutGrid, 
    description: 'Trastero, armario, mudanza',
    subcategories: ['Ordenar trastero', 'Armario', 'Mudanza']
  },
  { 
    id: 'otros', 
    name: 'Otros', 
    icon: HelpCircle, 
    description: 'Otras tareas con validación',
    subcategories: ['Otros']
  },
];
