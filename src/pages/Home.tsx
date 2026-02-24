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
      <section className="relative py-20 lg:py-32 overflow-hidden bg-white border-b-4 border-ink">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 bg-alert text-ink font-mono text-xs font-black px-4 py-2 mb-8 border-2 border-ink uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-ink opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-ink"></span>
                </span>
                Marketplace Hiperlocal • España
              </div>
              <h1 className="text-6xl md:text-9xl font-black leading-[0.85] mb-8 uppercase tracking-tighter">
                Soluciones <br />
                <span className="text-primary italic">Al Instante.</span>
              </h1>
              <p className="text-xl md:text-2xl text-ink/80 mb-12 max-w-xl font-bold leading-tight">
                Conectamos a personas que necesitan ayuda inmediata con profesionales verificados a la vuelta de la esquina. <span className="bg-primary/10 px-1">Precio cerrado. Sin rodeos.</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <Link to="/explore" className="btn-primary flex items-center justify-center gap-3 text-xl py-6 px-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
                  Necesito Ayuda <ArrowRight size={24} />
                </Link>
                <Link to="/explore" className="btn-outline flex items-center justify-center gap-3 text-xl py-6 px-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all bg-white">
                  Quiero Trabajar
                </Link>
              </div>
              
              <div className="mt-16 flex items-center gap-6 md:gap-12 border-t-4 border-ink pt-10">
                <div>
                  <div className="text-3xl md:text-5xl font-black font-display tracking-tighter">15k+</div>
                  <div className="text-xs font-mono uppercase font-black text-ink/40">Trabajos</div>
                </div>
                <div className="w-1 h-12 bg-ink/10"></div>
                <div>
                  <div className="text-3xl md:text-5xl font-black font-display tracking-tighter">4.9/5</div>
                  <div className="text-xs font-mono uppercase font-black text-ink/40">Valoración</div>
                </div>
                <div className="w-1 h-12 bg-ink/10"></div>
                <div>
                  <div className="text-3xl md:text-5xl font-black font-display tracking-tighter">100%</div>
                  <div className="text-xs font-mono uppercase font-black text-ink/40">Seguro</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, type: 'spring' }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10">
                <div className="card-brutal bg-white p-3 rotate-3 hover:rotate-0 transition-all duration-500 shadow-[20px_20px_0px_0px_rgba(242,125,38,1)]">
                  <img 
                    src="https://images.unsplash.com/photo-1592419044706-39796d40f98c?auto=format&fit=crop&q=80&w=800&h=800" 
                    alt="Jardinero cortando césped" 
                    className="w-full grayscale hover:grayscale-0 transition-all duration-700 border-4 border-ink aspect-square object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-10 -left-10 card-brutal bg-white max-w-xs -rotate-6 hover:rotate-0 transition-all p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-12 h-12 bg-alert border-2 border-ink flex items-center justify-center font-black text-xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">D</div>
                      <div>
                        <div className="font-black text-lg uppercase tracking-tighter">David L.</div>
                        <div className="text-xs font-mono font-bold text-primary uppercase">Jardinería • Verificado</div>
                      </div>
                    </div>
                    <div className="text-sm font-bold leading-snug italic">"ProntoJob me ha permitido encontrar clientes en mi barrio para cuidar sus jardines de forma sencilla."</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative blobs */}
              <div className="absolute -top-12 -right-12 w-48 h-48 bg-primary/20 rounded-full blur-3xl -z-10"></div>
              <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-alert/20 rounded-full blur-3xl -z-10"></div>
            </motion.div>
          </div>
        </div>
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

      {/* How it Works Section */}
      <section className="py-24 bg-white border-b-4 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">¿Cómo funciona?</h2>
            <p className="text-xl text-ink/60 font-medium max-w-2xl mx-auto">Tres pasos sencillos para solucionar cualquier problema o ganar dinero extra.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-1/4 left-0 w-full h-1 border-t-4 border-dashed border-ink/10 -z-0"></div>
            
            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-primary text-white border-4 border-ink flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-3">1</div>
              <h3 className="text-2xl font-black uppercase mb-4">Publica o Busca</h3>
              <p className="text-ink/70 font-medium">Describe lo que necesitas o explora los trabajos disponibles en tu zona.</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-alert text-ink border-4 border-ink flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] -rotate-3">2</div>
              <h3 className="text-2xl font-black uppercase mb-4">Conecta al Instante</h3>
              <p className="text-ink/70 font-medium">Acepta un presupuesto cerrado o envía una oferta. Sin negociaciones infinitas.</p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 bg-success text-white border-4 border-ink flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rotate-6">3</div>
              <h3 className="text-2xl font-black uppercase mb-4">Pago Garantizado</h3>
              <p className="text-ink/70 font-medium">El pago se libera solo cuando el trabajo está terminado y tú estás satisfecho.</p>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link to="/how-it-works" className="btn-outline py-4 px-10 text-lg bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              Saber más sobre el proceso
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-20 bg-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex flex-col md:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-tighter mb-2">Trabajos Urgentes</h2>
              <p className="text-ink/60 font-mono text-sm uppercase">Cerca de ti ahora mismo</p>
            </div>
            <Link to="/explore" className="btn-outline text-xs py-2">Ver todos los trabajos</Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {jobs.length > 0 ? jobs.map(job => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={job.id} 
                className="card-brutal bg-white flex flex-col h-full"
              >
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
              </motion.div>
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
