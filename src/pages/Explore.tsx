import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, ArrowRight, Clock, User as UserIcon, Briefcase, Award, Rocket, Star, Zap, Euro, Calendar, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';
import { Job, User } from '../types';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';
import { MOCK_JOBS } from '../data/mockData';

export const ExplorePage = () => {
  const [view, setView] = useState<'jobs' | 'workers'>('jobs');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [workers, setWorkers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedCity, setSelectedCity] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 200]);
  const [onlyUrgent, setOnlyUrgent] = useState(false);

  const cities = Array.from(new Set(MOCK_JOBS.map(j => j.ubicacion_texto.split(',')[0]))).sort();

  useEffect(() => {
    setLoading(true);
    // Simulate API fetch
    setTimeout(() => {
      setJobs(MOCK_JOBS);
      setWorkers([
        {
          id: 'w1',
          nombre: 'Carlos',
          apellidos: 'Ruiz',
          email: 'carlos@example.com',
          telefono: '600000001',
          tipo_usuario: 'trabajador',
          ciudad: 'Madrid',
          direccion_base: 'Calle Mayor',
          latitud: 40.4168,
          longitud: -3.7038,
          verificado_identidad: true,
          verification_status: 'VERIFIED',
          fecha_registro: '2024-01-01',
          estado_cuenta: 'activa',
          is_pro: true,
          is_pro_plus: true,
          is_boosted: true
        },
        {
          id: 'w2',
          nombre: 'Elena',
          apellidos: 'Sanz',
          email: 'elena@example.com',
          telefono: '600000002',
          tipo_usuario: 'trabajador',
          ciudad: 'Barcelona',
          direccion_base: 'Eixample',
          latitud: 41.3851,
          longitud: 2.1734,
          verificado_identidad: true,
          verification_status: 'VERIFIED',
          fecha_registro: '2024-01-05',
          estado_cuenta: 'activa',
          is_pro: false,
          is_pro_plus: false,
          is_boosted: false
        },
        {
          id: 'w3',
          nombre: 'Jordi',
          apellidos: 'Vila',
          email: 'jordi@example.com',
          telefono: '600000003',
          tipo_usuario: 'trabajador',
          ciudad: 'Valencia',
          direccion_base: 'Ruzafa',
          latitud: 39.4699,
          longitud: -0.3763,
          verificado_identidad: true,
          verification_status: 'VERIFIED',
          fecha_registro: '2024-01-10',
          estado_cuenta: 'activa',
          is_pro: true,
          is_pro_plus: false,
          is_boosted: false
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);

  const filteredJobs = jobs
    .filter(job => {
      const matchesSearch = job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           job.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory ? job.categoria === selectedCategory : true;
      const matchesCity = selectedCity ? job.ubicacion_texto.startsWith(selectedCity) : true;
      const matchesPrice = job.precio >= priceRange[0] && job.precio <= priceRange[1];
      const matchesUrgent = onlyUrgent ? job.urgente : true;
      return matchesSearch && matchesCategory && matchesCity && matchesPrice && matchesUrgent;
    })
    .sort((a, b) => {
      if (a.destacado && !b.destacado) return -1;
      if (!a.destacado && b.destacado) return 1;
      if (a.urgente && !b.urgente) return -1;
      if (!a.urgente && b.urgente) return 1;
      return new Date(b.fecha_publicacion).getTime() - new Date(a.fecha_publicacion).getTime();
    });

  const filteredWorkers = workers
    .filter(worker => {
      const matchesSearch = worker.nombre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                           worker.apellidos.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCity = selectedCity ? worker.ciudad === selectedCity : true;
      return matchesSearch && matchesCity;
    })
    .sort((a, b) => {
      if (a.is_pro_plus && !b.is_pro_plus) return -1;
      if (!a.is_pro_plus && b.is_pro_plus) return 1;
      if (a.is_pro && !b.is_pro) return -1;
      if (!a.is_pro && b.is_pro) return 1;
      if (a.is_boosted && !b.is_boosted) return -1;
      if (!a.is_boosted && b.is_boosted) return 1;
      return 0;
    });

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Explorar</h1>
          <p className="text-ink/60 font-mono text-sm uppercase mb-8">Encuentra oportunidades o profesionales cerca de ti</p>
          
          <div className="flex gap-4 border-b-4 border-ink">
            <button 
              onClick={() => setView('jobs')}
              className={`px-8 py-4 font-display font-black uppercase text-lg flex items-center gap-2 transition-all ${view === 'jobs' ? 'bg-ink text-white' : 'hover:bg-ink/5'}`}
            >
              <Briefcase size={24} /> Trabajos
            </button>
            <button 
              onClick={() => setView('workers')}
              className={`px-8 py-4 font-display font-black uppercase text-lg flex items-center gap-2 transition-all ${view === 'workers' ? 'bg-ink text-white' : 'hover:bg-ink/5'}`}
            >
              <UserIcon size={24} /> Trabajadores
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-brutal bg-white p-6">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-sm">
                <Search size={18} /> Buscar
              </h3>
              <input 
                type="text" 
                placeholder="Ej: Montaje, Limpieza..."
                className="w-full border-2 border-ink p-3 font-display font-bold focus:outline-none focus:bg-primary/5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="card-brutal bg-white p-6">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-sm">
                <Filter size={18} /> Filtros
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-[10px] font-mono uppercase font-black mb-2">Ciudad</label>
                  <select 
                    value={selectedCity || ''} 
                    onChange={(e) => setSelectedCity(e.target.value || null)}
                    className="w-full border-2 border-ink p-2 font-display font-bold text-xs focus:outline-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                  >
                    <option value="">Todas las ciudades</option>
                    {cities.map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[10px] font-mono uppercase font-black mb-2">Precio Máximo: {priceRange[1]}€</label>
                  <input 
                    type="range" 
                    min="0" 
                    max="200" 
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                    className="w-full accent-primary"
                  />
                </div>
                
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className={`w-6 h-6 border-2 border-ink transition-colors flex items-center justify-center ${onlyUrgent ? 'bg-error' : 'bg-white'}`}>
                    {onlyUrgent && <Zap size={14} className="text-white" />}
                  </div>
                  <input 
                    type="checkbox" 
                    className="hidden"
                    checked={onlyUrgent}
                    onChange={() => setOnlyUrgent(!onlyUrgent)}
                  />
                  <span className="font-display font-bold uppercase text-xs">Solo Urgentes</span>
                </label>
              </div>
            </div>

            <div className="card-brutal bg-white p-6">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-sm">
                <LayoutGrid className="size-4" /> Categorías
              </h3>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-4 py-3 font-display font-black uppercase text-[10px] border-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 ${!selectedCategory ? 'bg-ink text-white border-ink' : 'bg-white border-ink hover:bg-primary/5'}`}
                >
                  Todas
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-4 py-3 font-display font-black uppercase text-[10px] border-2 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 ${selectedCategory === cat.id ? 'bg-ink text-white border-ink' : 'bg-white border-ink hover:bg-primary/5'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs/Workers Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-8">
              {loading ? (
                [1, 2, 4, 5, 6].map(i => (
                  <div key={i} className="card-brutal bg-white p-6 animate-pulse">
                    <div className="flex justify-between mb-6">
                      <div className="h-6 w-20 bg-ink/10"></div>
                      <div className="h-8 w-16 bg-ink/10"></div>
                    </div>
                    <div className="h-8 w-full bg-ink/10 mb-4"></div>
                    <div className="h-20 w-full bg-ink/10 mb-6"></div>
                    <div className="h-12 w-full bg-ink/10"></div>
                  </div>
                ))
              ) : view === 'jobs' ? (
                filteredJobs.length > 0 ? filteredJobs.map(job => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={job.id} 
                    className={`card-brutal p-6 flex flex-col hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${job.destacado ? 'bg-primary/5 border-primary shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]' : 'bg-white border-ink'}`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-wrap gap-2">
                        {job.destacado && (
                          <span className="bg-primary text-white font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                            <ArrowRight className="-rotate-45" size={10} /> TOP
                          </span>
                        )}
                        {job.urgente && (
                          <span className="bg-error text-white font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Urgente</span>
                        )}
                        <span className="bg-bg text-ink font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">{job.categoria}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-3xl font-black text-primary tracking-tighter block">{job.precio}€</span>
                        <span className="text-[10px] font-mono uppercase font-black text-ink/40">Precio Cerrado</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-black uppercase mb-3 line-clamp-1 tracking-tight">{job.titulo}</h3>
                    <p className="text-sm text-ink/70 mb-8 line-clamp-2 flex-grow font-medium leading-relaxed">{job.descripcion_corta}</p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-8 border-t-2 border-ink/5 pt-6">
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-ink/60">
                        <MapPin size={14} className="text-primary" /> {job.ubicacion_texto}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-ink/60">
                        <Clock size={14} className="text-primary" /> {job.duracion_estimada}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-ink/60">
                        <Calendar size={14} className="text-primary" /> {job.fecha}
                      </div>
                      <div className="flex items-center gap-2 text-[10px] font-black uppercase text-ink/60">
                        <Zap size={14} className="text-primary" /> {job.nivel}
                      </div>
                    </div>

                    <Link to={`/job/${job.id}`} className="w-full btn-outline py-4 text-sm text-center flex items-center justify-center gap-2 bg-white hover:bg-ink hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                      Ver detalles <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-32 text-center card-brutal bg-white">
                    <p className="font-display font-black uppercase text-ink/30 text-2xl tracking-tighter">No se encontraron trabajos</p>
                    <button 
                      onClick={() => {setSearchTerm(''); setSelectedCategory(null); setPriceRange([0, 200]); setOnlyUrgent(false);}}
                      className="mt-6 text-primary font-black uppercase text-sm hover:underline"
                    >
                      Limpiar filtros
                    </button>
                  </div>
                )
              ) : (
                filteredWorkers.length > 0 ? filteredWorkers.map(worker => (
                  <motion.div 
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    key={worker.id} 
                    className={`card-brutal p-6 flex flex-col hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all ${
                      worker.is_pro_plus 
                      ? 'bg-alert/5 border-alert shadow-[6px_6px_0px_0px_rgba(242,125,38,1)]' 
                      : worker.is_pro 
                      ? 'bg-primary/5 border-primary shadow-[6px_6px_0px_0px_rgba(37,99,235,1)]' 
                      : worker.is_boosted 
                      ? 'bg-ink/5 border-ink shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]' 
                      : 'bg-white border-ink'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <div className="flex flex-wrap gap-2">
                        {worker.is_pro_plus && (
                          <span className="bg-alert text-ink font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                            <Award size={10} /> PRO PLUS
                          </span>
                        )}
                        {worker.is_pro && !worker.is_pro_plus && (
                          <span className="bg-primary text-white font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                            <Award size={10} /> PRO
                          </span>
                        )}
                        {worker.is_boosted && (
                          <span className="bg-ink text-white font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                            <Rocket size={10} /> Boosted
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-1 text-alert">
                        <Star size={16} fill="currentColor" />
                        <span className="font-black text-lg">4.9</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 bg-bg border-2 border-ink flex items-center justify-center">
                        <UserIcon size={32} className="text-ink/20" />
                      </div>
                      <div>
                        <h3 className="text-xl font-black uppercase tracking-tight">{worker.nombre} {worker.apellidos}</h3>
                        <p className="text-[10px] font-mono uppercase text-ink/40">{worker.ciudad}</p>
                      </div>
                    </div>

                    <p className="text-sm text-ink/70 mb-8 line-clamp-2 flex-grow font-medium leading-relaxed">
                      Especialista en reparaciones del hogar y montaje de muebles con más de 5 años de experiencia.
                    </p>
                    
                    <Link to={`/profile/${worker.id}`} className="w-full btn-outline py-4 text-sm text-center flex items-center justify-center gap-2 bg-white hover:bg-ink hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none">
                      Ver Perfil <ArrowRight size={18} />
                    </Link>
                  </motion.div>
                )) : (
                  <div className="col-span-full py-32 text-center card-brutal bg-white">
                    <p className="font-display font-black uppercase text-ink/30 text-2xl tracking-tighter">No se encontraron trabajadores</p>
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="mt-6 text-primary font-black uppercase text-sm hover:underline"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
