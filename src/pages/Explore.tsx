import React, { useState, useEffect } from 'react';
import { Search, MapPin, Filter, ArrowRight, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { Job } from '../types';
import { CATEGORIES } from '../constants';
import { Link } from 'react-router-dom';

export const ExplorePage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data));
  }, []);

  const filteredJobs = jobs.filter(job => {
    const matchesSearch = job.titulo.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         job.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? job.categoria === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Explorar Trabajos</h1>
          <p className="text-ink/60 font-mono text-sm uppercase">Encuentra oportunidades inmediatas cerca de ti</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-brutal bg-white">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <Search size={18} /> Buscar
              </h3>
              <input 
                type="text" 
                placeholder="Ej: Montaje, Limpieza..."
                className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="card-brutal bg-white">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2">
                <Filter size={18} /> Categorías
              </h3>
              <div className="space-y-2">
                <button 
                  onClick={() => setSelectedCategory(null)}
                  className={`w-full text-left px-3 py-2 font-display font-bold uppercase text-xs border-2 transition-all ${!selectedCategory ? 'bg-ink text-white border-ink' : 'border-transparent hover:border-ink/20'}`}
                >
                  Todas
                </button>
                {CATEGORIES.map(cat => (
                  <button 
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`w-full text-left px-3 py-2 font-display font-bold uppercase text-xs border-2 transition-all ${selectedCategory === cat.id ? 'bg-ink text-white border-ink' : 'border-transparent hover:border-ink/20'}`}
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Jobs Grid */}
          <div className="lg:col-span-3">
            <div className="grid md:grid-cols-2 gap-6">
              {filteredJobs.length > 0 ? filteredJobs.map(job => (
                <motion.div 
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  key={job.id} 
                  className="card-brutal bg-white flex flex-col"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex gap-2">
                      {job.urgente && (
                        <span className="bg-error text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-ink uppercase">Urgente</span>
                      )}
                      <span className="bg-bg text-ink font-mono text-[10px] font-bold px-2 py-0.5 border border-ink uppercase">{job.categoria}</span>
                    </div>
                    <span className="text-2xl font-black text-primary">{job.precio}€</span>
                  </div>
                  <h3 className="text-xl font-black uppercase mb-2 line-clamp-1">{job.titulo}</h3>
                  <p className="text-sm text-ink/70 mb-6 line-clamp-2 flex-grow">{job.descripcion}</p>
                  
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-ink/50">
                      <MapPin size={14} /> {job.direccion}
                    </div>
                    <div className="flex items-center gap-2 text-xs font-bold uppercase text-ink/50">
                      <Clock size={14} /> Publicado hace 2h
                    </div>
                  </div>

                  <Link to={`/job/${job.id}`} className="w-full btn-outline py-3 text-sm text-center flex items-center justify-center gap-2">
                    Ver detalles <ArrowRight size={16} />
                  </Link>
                </motion.div>
              )) : (
                <div className="col-span-full py-20 text-center card-brutal bg-white">
                  <p className="font-display font-bold uppercase text-ink/40">No se encontraron trabajos con estos filtros</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
