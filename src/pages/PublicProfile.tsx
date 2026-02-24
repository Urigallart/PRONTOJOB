import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  User as UserIcon, 
  Star, 
  MapPin, 
  ShieldCheck, 
  Briefcase, 
  Clock,
  CheckCircle2,
  MessageSquare,
  Award,
  Zap,
  ArrowRight,
  Rocket
} from 'lucide-react';
import { motion } from 'motion/react';

export const PublicProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-20 text-center font-display font-black uppercase">Cargando perfil...</div>;
  if (!user) return <div className="p-20 text-center font-display font-black uppercase">Usuario no encontrado</div>;

  const isWorker = user.tipo_usuario === 'trabajador';

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header Card */}
        <div className="card-brutal bg-white p-8 md:p-12 mb-8 relative overflow-hidden">
          {/* Background Decorative */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 -rotate-12 translate-x-1/2 -translate-y-1/2 -z-0"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
            <div className="w-40 h-40 bg-bg border-4 border-ink flex items-center justify-center relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
              <UserIcon size={80} className="text-ink/20" />
              {user.verificado_identidad === 1 && (
                <div className="absolute -bottom-3 -right-3 bg-success text-white p-2 border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  <ShieldCheck size={24} />
                </div>
              )}
            </div>

            <div className="flex-grow text-center md:text-left">
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-4">
                {user.is_pro_plus && (
                  <span className="bg-alert text-ink font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Award size={12} /> PRO PLUS
                  </span>
                )}
                {user.is_pro && !user.is_pro_plus && (
                  <span className="bg-primary text-white font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Award size={12} /> PRO
                  </span>
                )}
                {user.is_boosted && (
                  <span className="bg-primary text-white font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase flex items-center gap-1 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <Rocket size={12} /> Boosted
                  </span>
                )}
                <span className="bg-bg text-ink font-mono text-[10px] font-black px-2 py-1 border-2 border-ink uppercase">
                  {user.tipo_usuario}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-2">
                {user.nombre} {user.apellidos}
              </h1>
              
              <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-sm font-bold uppercase text-ink/60 mb-8">
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-primary" /> {user.ciudad}
                </div>
                <div className="flex items-center gap-2">
                  <Star size={18} className="text-alert fill-alert" /> {user.valoracion_media || '4.9'} ({user.total_trabajos_completados || '0'} trabajos)
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-primary" /> Miembro desde {new Date(user.fecha_registro).getFullYear()}
                </div>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                {isWorker ? (
                  <button className="btn-primary px-8 py-4 flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    Enviar Oferta de Trabajo <Zap size={20} />
                  </button>
                ) : (
                  <Link to="/explore" className="btn-primary px-8 py-4 flex items-center gap-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                    Ver Trabajos Publicados <ArrowRight size={20} />
                  </Link>
                )}
                <button className="btn-outline px-8 py-4 bg-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  Contactar
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column: Stats & Info */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-brutal bg-white p-8">
              <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-ink pb-2">Estadísticas</h3>
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase font-bold text-ink/50">Tasa de éxito</span>
                  <span className="font-black text-lg">{(100 - (user.tasa_cancelacion || 0))}%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase font-bold text-ink/50">Tiempo respuesta</span>
                  <span className="font-black text-lg">{user.tiempo_respuesta_medio || '< 1h'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-mono uppercase font-bold text-ink/50">Trabajos totales</span>
                  <span className="font-black text-lg">{user.total_trabajos_completados || 0}</span>
                </div>
                {isWorker && (
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-mono uppercase font-bold text-ink/50">Radio servicio</span>
                    <span className="font-black text-lg">{user.radio_trabajo_km || 25} km</span>
                  </div>
                )}
              </div>
            </div>

            {isWorker && (
              <div className="card-brutal bg-white p-8">
                <h3 className="text-xl font-black uppercase mb-6 border-b-2 border-ink pb-2">Disponibilidad</h3>
                <div className="flex items-center gap-3 text-success font-bold uppercase text-sm">
                  <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                  {user.disponibilidad || 'Disponible ahora'}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: About & Reviews */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card-brutal bg-white p-8">
              <h3 className="text-2xl font-black uppercase mb-6">Sobre {user.nombre}</h3>
              <p className="text-ink/70 leading-relaxed font-medium mb-8">
                {user.descripcion_profesional || 'Este usuario aún no ha añadido una descripción profesional.'}
              </p>
              
              {isWorker && user.categorias && (
                <div>
                  <h4 className="text-sm font-mono uppercase font-black text-ink/40 mb-4">Especialidades</h4>
                  <div className="flex flex-wrap gap-3">
                    {(typeof user.categorias === 'string' ? JSON.parse(user.categorias) : user.categorias).map((cat: string) => (
                      <span key={cat} className="bg-bg border-2 border-ink px-4 py-2 font-display font-bold uppercase text-xs">
                        {cat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Reviews Section */}
            <div className="space-y-6">
              <h3 className="text-2xl font-black uppercase">Últimas Valoraciones</h3>
              {[1, 2, 3].map(i => (
                <div key={i} className="card-brutal bg-white p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-bg border-2 border-ink flex items-center justify-center font-black">
                        {String.fromCharCode(64 + i)}
                      </div>
                      <div>
                        <div className="font-black uppercase text-sm">Usuario {i}</div>
                        <div className="text-[10px] font-mono text-ink/40 uppercase">Hace {i * 2} días</div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <Star key={star} size={12} className="text-alert fill-alert" />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm font-medium text-ink/70 italic">
                    "Excelente trabajo, muy puntual y profesional. Lo recomiendo totalmente para cualquier tarea similar."
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
