import { 
  Hammer, 
  Shovel, 
  Trash2, 
  Truck, 
  Paintbrush, 
  Wrench, 
  Zap, 
  Droplets 
} from 'lucide-react';
import { Category } from './types';

export const CATEGORIES: Category[] = [
  { id: 'reparaciones', name: 'Reparaciones', icon: Wrench, description: 'Pequeños arreglos en el hogar' },
  { id: 'jardineria', name: 'Jardinería', icon: Shovel, description: 'Cortar césped, poda y mantenimiento' },
  { id: 'limpieza', name: 'Limpieza', icon: Trash2, description: 'Limpieza puntual o profunda' },
  { id: 'mudanzas', name: 'Mudanzas', icon: Truck, description: 'Portes y pequeñas mudanzas' },
  { id: 'pintura', name: 'Pintura', icon: Paintbrush, description: 'Pintar habitaciones o retoques' },
  { id: 'montaje', name: 'Montaje', icon: Hammer, description: 'Montaje de muebles y estanterías' },
  { id: 'electricidad', name: 'Electricidad', icon: Zap, description: 'Cambio de enchufes, lámparas, etc.' },
  { id: 'fontaneria', name: 'Fontanería', icon: Droplets, description: 'Desatascos y pequeñas fugas' },
];
