import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, 
  MapPin, 
  ShieldCheck, 
  Clock, 
  Wallet,
  Star
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants';
import { Job } from '../types';

export const HomePage = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetch('/api/jobs')
      .then(res => res.json())
      .then(data => setJobs(data.slice(0, 3)));
  }, []);

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden bg-white border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-block bg-alert text-ink font-mono text-xs font-bold px-3 py-1 mb-6 border border-ink uppercase">
                Marketplace Hiperlocal • España
              </div>
              <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 uppercase tracking-tighter">
                Soluciones <br />
                <span className="text-primary">Al Instante.</span>
              </h1>
              <p className="text-xl text-ink/70 mb-10 max-w-lg font-medium">
                Conectamos a personas que necesitan ayuda inmediata con profesionales verificados a la vuelta de la esquina. Precio cerrado. Sin rodeos.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/explore" className="btn-primary flex items-center justify-center gap-2 text-lg">
                  Necesito Ayuda <ArrowRight size={20} />
                </Link>
                <Link to="/explore" className="btn-outline flex items-center justify-center gap-2 text-lg">
                  Quiero Trabajar
                </Link>
              </div>
              
              <div className="mt-12 flex items-center gap-8 border-t-2 border-ink/10 pt-8">
                <div>
                  <div className="text-3xl font-black font-display">15k+</div>
                  <div className="text-xs font-mono uppercase text-ink/50">Trabajos Realizados</div>
                </div>
                <div className="w-px h-10 bg-ink/10"></div>
                <div>
                  <div className="text-3xl font-black font-display">4.9/5</div>
                  <div className="text-xs font-mono uppercase text-ink/50">Valoración Media</div>
                </div>
                <div className="w-px h-10 bg-ink/10"></div>
                <div>
                  <div className="text-3xl font-black font-display">100%</div>
                  <div className="text-xs font-mono uppercase text-ink/50">Pagos Seguros</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <div className="card-brutal bg-primary/5 p-2">
                <img 
                  src="https://picsum.photos/seed/worker/800/800" 
                  alt="Trabajador" 
                  className="w-full grayscale hover:grayscale-0 transition-all duration-500 border-2 border-ink"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute -bottom-6 -left-6 card-brutal bg-white max-w-xs">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-alert border border-ink"></div>
                    <div>
                      <div className="font-bold text-sm">Carlos M.</div>
                      <div className="text-xs text-ink/60">Montaje de muebles</div>
                    </div>
                  </div>
                  <div className="text-xs font-medium">"Acabo de terminar un montaje en Chamberí. ¡Cliente muy satisfecho!"</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -z-10 border-l-2 border-ink/5"></div>
      </section>

      {/* Categories Section */}
      <section className="py-20 bg-white border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">¿Qué necesitas hoy?</h2>
              <p className="text-ink/60 font-mono text-sm uppercase">Categorías más demandadas en tu zona</p>
            </div>
            <Link to="/explore" className="hidden sm:flex items-center gap-2 font-display font-bold uppercase text-sm hover:underline">
              Ver todas <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {CATEGORIES.map((cat) => (
              <motion.div 
                key={cat.id}
                whileHover={{ y: -5, x: 5 }}
                className="card-brutal group cursor-pointer hover:bg-primary hover:text-white transition-colors"
              >
                <cat.icon size={32} className="mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-black uppercase mb-1">{cat.name}</h3>
                <p className="text-xs opacity-60 font-medium">{cat.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Trabajos Urgentes</h2>
            <p className="text-ink/60 font-mono text-sm uppercase">Cerca de ti ahora mismo</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {jobs.length > 0 ? jobs.map(job => (
              <div key={job.id} className="card-brutal bg-white flex flex-col h-full">
                <div className="flex justify-between items-start mb-4">
                  <span className="bg-error text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-ink uppercase">Urgente</span>
                  <span className="text-2xl font-black text-primary">{job.precio}€</span>
                </div>
                <h3 className="text-xl font-black uppercase mb-2 line-clamp-1">{job.titulo}</h3>
                <p className="text-sm text-ink/70 mb-6 line-clamp-2 flex-grow">{job.descripcion}</p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase text-ink/50 mb-6">
                  <MapPin size={14} /> {job.direccion}
                </div>
                <Link to={`/job/${job.id}`} className="w-full btn-outline py-2 text-sm text-center">Ver detalles</Link>
              </div>
            )) : (
              [1, 2, 3].map(i => (
                <div key={i} className="card-brutal bg-white animate-pulse">
                  <div className="h-4 w-16 bg-ink/10 mb-4"></div>
                  <div className="h-8 w-full bg-ink/10 mb-2"></div>
                  <div className="h-12 w-full bg-ink/10 mb-6"></div>
                  <div className="h-10 w-full bg-ink/10"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-20 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="text-center md:text-left">
              <ShieldCheck size={48} className="text-primary mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-black uppercase mb-4">Identidad Verificada</h3>
              <p className="text-white/60 text-sm font-medium">Todos nuestros trabajadores pasan un riguroso proceso de verificación de identidad para tu total tranquilidad.</p>
            </div>
            <div className="text-center md:text-left">
              <Wallet size={48} className="text-success mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-black uppercase mb-4">Pago Seguro</h3>
              <p className="text-white/60 text-sm font-medium">El dinero se retiene de forma segura y solo se libera cuando confirmas que el trabajo se ha completado correctamente.</p>
            </div>
            <div className="text-center md:text-left">
              <Clock size={48} className="text-alert mb-6 mx-auto md:mx-0" />
              <h3 className="text-2xl font-black uppercase mb-4">Sin Chat, Sin Esperas</h3>
              <p className="text-white/60 text-sm font-medium">Olvídate de negociaciones infinitas. Precio cerrado y comunicación directa mediante mensajes predefinidos.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-primary text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-8">
            ¿Listo para empezar?
          </h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto font-medium opacity-90">
            Únete a miles de personas que ya están ahorrando tiempo y ganando dinero extra con ProntoJob.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/post-job" className="bg-white text-ink px-10 py-5 font-display font-black uppercase tracking-wider hover:bg-ink hover:text-white transition-all border-2 border-ink shadow-[6px_6px_0px_0px_rgba(17,24,39,1)]">
              Publicar mi primer trabajo
            </Link>
            <Link to="/explore" className="bg-ink text-white px-10 py-5 font-display font-black uppercase tracking-wider hover:bg-white hover:text-ink transition-all border-2 border-white shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
              Registrarme como profesional
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};
