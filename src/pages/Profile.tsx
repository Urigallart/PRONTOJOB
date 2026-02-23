import React, { useState } from 'react';
import { 
  User as UserIcon, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Settings, 
  Briefcase, 
  History,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState<'perfil' | 'historial'>('perfil');

  const user = {
    nombre: 'María García',
    tipo: 'Trabajador',
    ciudad: 'Madrid, España',
    valoracion: 4.9,
    trabajos: 28,
    bio: 'Especialista en montaje de muebles y pequeñas reparaciones del hogar. Más de 5 años de experiencia. Puntualidad y limpieza garantizada.',
    categorias: ['Montaje', 'Reparaciones', 'Pintura'],
    verificado: true,
    miembroDesde: 'Ene 2024'
  };

  const history = [
    { id: 1, titulo: 'Montaje Armario Pax', fecha: '22 Feb 2024', precio: 60, status: 'completado' },
    { id: 2, titulo: 'Reparación de Grifo', fecha: '15 Feb 2024', precio: 35, status: 'completado' },
    { id: 3, titulo: 'Pintar Salón', fecha: '10 Feb 2024', precio: 120, status: 'completado' },
  ];

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Mi Perfil</h1>
            <p className="text-ink/60 font-mono text-sm uppercase">Gestiona tu presencia en ProntoJob</p>
          </div>
          <button className="btn-outline flex items-center gap-2 text-sm">
            <Settings size={18} /> Editar Perfil
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Sidebar Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-brutal bg-white p-8 text-center">
              <div className="w-32 h-32 bg-bg border-2 border-ink mx-auto mb-6 flex items-center justify-center relative">
                <UserIcon size={64} className="text-ink/20" />
                {user.verificado && (
                  <div className="absolute -bottom-2 -right-2 bg-success text-white p-1 border-2 border-ink">
                    <ShieldCheck size={20} />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-black uppercase mb-1">{user.nombre}</h2>
              <p className="text-xs font-mono uppercase text-ink/50 mb-6">{user.tipo} Verificado</p>
              
              <div className="grid grid-cols-2 gap-4 border-t-2 border-ink/5 pt-6">
                <div>
                  <div className="text-xl font-black">{user.valoracion}</div>
                  <div className="text-[10px] font-mono uppercase text-ink/40">Valoración</div>
                </div>
                <div>
                  <div className="text-xl font-black">{user.trabajos}</div>
                  <div className="text-[10px] font-mono uppercase text-ink/40">Trabajos</div>
                </div>
              </div>
            </div>

            <div className="card-brutal bg-white p-6">
              <h3 className="font-black uppercase mb-4 text-sm">Información</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm font-bold uppercase text-ink/70">
                  <MapPin size={18} className="text-primary" /> {user.ciudad}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold uppercase text-ink/70">
                  <Clock size={18} className="text-primary" /> Miembro desde {user.miembroDesde}
                </div>
                <div className="flex items-center gap-3 text-sm font-bold uppercase text-ink/70">
                  <ShieldCheck size={18} className="text-success" /> Identidad Verificada
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tabs */}
            <div className="flex border-b-2 border-ink">
              <button 
                onClick={() => setActiveTab('perfil')}
                className={`px-8 py-4 font-display font-black uppercase text-sm transition-all ${activeTab === 'perfil' ? 'bg-ink text-white' : 'hover:bg-ink/5'}`}
              >
                Sobre mí
              </button>
              <button 
                onClick={() => setActiveTab('historial')}
                className={`px-8 py-4 font-display font-black uppercase text-sm transition-all ${activeTab === 'historial' ? 'bg-ink text-white' : 'hover:bg-ink/5'}`}
              >
                Historial
              </button>
            </div>

            <AnimatePresence mode="wait">
              {activeTab === 'perfil' ? (
                <motion.div 
                  key="perfil"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-8"
                >
                  <div className="card-brutal bg-white p-8">
                    <h3 className="text-xl font-black uppercase mb-4">Biografía</h3>
                    <p className="text-ink/70 leading-relaxed font-medium">
                      {user.bio}
                    </p>
                  </div>

                  <div className="card-brutal bg-white p-8">
                    <h3 className="text-xl font-black uppercase mb-6">Categorías de Trabajo</h3>
                    <div className="flex flex-wrap gap-3">
                      {user.categorias.map(cat => (
                        <span key={cat} className="bg-bg border-2 border-ink px-4 py-2 font-display font-bold uppercase text-xs">
                          {cat}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="card-brutal bg-primary/5 border-primary p-8">
                    <h3 className="text-xl font-black uppercase mb-4 text-primary">Estado de Cuenta</h3>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-success/20 text-success border-2 border-success flex items-center justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      <div>
                        <div className="font-black uppercase text-sm">Cuenta Activa y Saludable</div>
                        <div className="text-xs font-medium text-ink/60">Tu tasa de cancelación es del 0%. ¡Sigue así!</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div 
                  key="historial"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {history.map(item => (
                    <div key={item.id} className="card-brutal bg-white p-6 flex justify-between items-center">
                      <div>
                        <h4 className="font-black uppercase mb-1">{item.titulo}</h4>
                        <div className="flex gap-4 text-[10px] font-mono uppercase text-ink/40">
                          <span>{item.fecha}</span>
                          <span className="text-success font-bold">Completado</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-black">{item.precio}€</div>
                        <button className="text-[10px] font-mono uppercase font-bold text-primary hover:underline flex items-center gap-1">
                          Ver Recibo <ExternalLink size={10} />
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
