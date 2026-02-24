import { Job } from '../types';

const CITIES = [
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, neighborhoods: ['Chamberí', 'Malasaña', 'Retiro', 'Salamanca', 'Usera', 'Vallecas', 'Carabanchel'] },
  { name: 'Barcelona', lat: 41.3851, lng: 2.1734, neighborhoods: ['Eixample', 'Gràcia', 'Poblenou', 'Sants', 'Gòtic', 'Sarrià', 'Horta'] },
  { name: 'Valencia', lat: 39.4699, lng: -0.3763, neighborhoods: ['Ruzafa', 'El Carmen', 'Benimaclet', 'Patraix', 'Cabañal'] },
  { name: 'Sevilla', lat: 37.3891, lng: -5.9845, neighborhoods: ['Triana', 'Nervión', 'Santa Cruz', 'Los Remedios', 'Macarena'] },
  { name: 'Zaragoza', lat: 41.6488, lng: -0.8891, neighborhoods: ['Delicias', 'Actur', 'Centro', 'Las Fuentes'] },
  { name: 'Málaga', lat: 36.7213, lng: -4.4214, neighborhoods: ['El Palo', 'Teatinos', 'Centro', 'Huelin'] },
  { name: 'Bilbao', lat: 43.2630, lng: -2.9350, neighborhoods: ['Indautxu', 'Deusto', 'Casco Viejo', 'Santutxu'] },
  { name: 'Palma', lat: 39.5696, lng: 2.6502, neighborhoods: ['Santa Catalina', 'Portixol', 'Centro'] },
  { name: 'Alicante', lat: 38.3452, lng: -0.4810, neighborhoods: ['San Blas', 'El Campello', 'Centro'] },
  { name: 'Murcia', lat: 37.9922, lng: -1.1307, neighborhoods: ['Vistalegre', 'Espinardo', 'Centro'] },
  { name: 'Valladolid', lat: 41.6523, lng: -4.7245, neighborhoods: ['Parquesol', 'Delicias', 'Centro'] },
  { name: 'Vigo', lat: 42.2406, lng: -8.7207, neighborhoods: ['Coia', 'Bouzas', 'Centro'] },
  { name: 'Gijón', lat: 43.5357, lng: -5.6615, neighborhoods: ['Cimadevilla', 'La Arena', 'Centro'] },
  { name: 'Granada', lat: 37.1773, lng: -3.5986, neighborhoods: ['Albaicín', 'Realejo', 'Centro'] },
];

const CATEGORIES_DATA = [
  { id: 'hogar-limpieza', titles: ['Limpieza de piso', 'Limpieza fin de obra', 'Planchado de ropa', 'Limpieza de cristales'] },
  { id: 'jardineria', titles: ['Cortar césped', 'Poda de setos', 'Instalación de riego', 'Limpieza de jardín'] },
  { id: 'bricolaje', titles: ['Montaje de muebles IKEA', 'Colgar cuadros y espejos', 'Instalar soporte TV', 'Montaje de estanterías'] },
  { id: 'reparaciones', titles: ['Reparar persiana', 'Cambiar grifo cocina', 'Sellar bañera con silicona', 'Arreglar cisterna'] },
  { id: 'mudanzas', titles: ['Ayuda carga y descarga', 'Porte de sofá', 'Recogida IKEA', 'Pequeña mudanza'] },
  { id: 'pintura', titles: ['Pintar habitación', 'Retocar techos', 'Quitar gotelé', 'Pintar salón'] },
  { id: 'mascotas', titles: ['Paseo de perro', 'Cuidado de gato', 'Llevar al veterinario', 'Baño de mascota'] },
  { id: 'cuidado', titles: ['Acompañamiento mayores', 'Ayuda compra semanal', 'Paseo terapéutico'] },
  { id: 'tecnologia', titles: ['Configurar Router WiFi', 'Instalar impresora', 'Limpieza de virus PC', 'Formatear portátil'] },
  { id: 'clases', titles: ['Clase de Matemáticas', 'Clase de Inglés', 'Iniciación Guitarra', 'Apoyo escolar'] },
  { id: 'eventos', titles: ['Ayuda montaje evento', 'Camarero extra', 'Carga de equipos sonido', 'Azafata/o puntual'] },
  { id: 'vehiculos', titles: ['Limpieza interior coche', 'Cambio de batería', 'Pasar la ITV por ti', 'Limpieza de moto'] },
];

const generateMockJobs = (count: number): Job[] => {
  const jobs: Job[] = [];
  const now = new Date();

  for (let i = 1; i <= count; i++) {
    const city = CITIES[Math.floor(Math.random() * CITIES.length)];
    const neighborhood = city.neighborhoods[Math.floor(Math.random() * city.neighborhoods.length)];
    const catData = CATEGORIES_DATA[Math.floor(Math.random() * CATEGORIES_DATA.length)];
    const title = catData.titles[Math.floor(Math.random() * catData.titles.length)];
    const isUrgent = Math.random() < 0.18;
    const price = Math.floor(Math.random() * (180 - 15 + 1)) + 15;
    
    jobs.push({
      id: `job-${i}`,
      cliente_id: `user-${Math.floor(Math.random() * 10)}`,
      titulo: `${title} en ${city.name}`,
      descripcion: `Necesito ayuda con ${title.toLowerCase()} en el barrio de ${neighborhood}. Busco a alguien con experiencia y herramientas propias si es necesario. El trabajo es para realizar de forma inmediata o programada según disponibilidad.`,
      descripcion_corta: `${title} en ${neighborhood}`,
      categoria: catData.id,
      precio: price,
      precio_cerrado: true,
      urgente: isUrgent,
      destacado: Math.random() < 0.1,
      latitud: city.lat + (Math.random() - 0.5) * 0.02,
      longitud: city.lng + (Math.random() - 0.5) * 0.02,
      direccion: `Calle Ficticia ${i}, ${neighborhood}, ${city.name}`,
      ubicacion_texto: `${city.name}, ${neighborhood}`,
      duracion_estimada: `${Math.floor(Math.random() * 4) + 1}h`,
      fecha: new Date(now.getTime() + Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      franja_horaria: Math.random() > 0.5 ? 'Mañana' : 'Tarde',
      nivel: Math.random() > 0.7 ? 'pro' : Math.random() > 0.4 ? 'medio' : 'básico',
      material_aportado_por: Math.random() > 0.6 ? 'cliente' : Math.random() > 0.3 ? 'trabajador' : 'mixto',
      verificacion_requerida: true,
      estado: 'publicado',
      fecha_publicacion: new Date(now.getTime() - Math.random() * 48 * 60 * 60 * 1000).toISOString(),
    });
  }
  return jobs;
};

export const MOCK_JOBS = generateMockJobs(55);
