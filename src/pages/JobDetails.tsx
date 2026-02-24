import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  User as UserIcon,
  Star,
  CheckCircle2,
  AlertTriangle,
  ShieldAlert,
  Calendar,
  Zap
} from 'lucide-react';
import { Job, User } from '../types';
import { useAuth } from '../context/AuthContext';
import { MOCK_JOBS } from '../data/mockData';

export const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();
  const [job, setJob] = useState<Job | null>(null);
  const [applied, setApplied] = useState(false);

  useEffect(() => {
    // Simulate API fetch with mock data
    const found = MOCK_JOBS.find(j => j.id === id);
    if (found) {
      setJob(found);
    } else {
      // Fallback if not found in MOCK_JOBS
      setJob(null);
    }
  }, [id]);

  const handleApply = () => {
    if (!currentUser) {
      navigate('/login');
      return;
    }
    if (currentUser.verification_status !== 'VERIFIED') {
      return;
    }
    setApplied(true);
  };

  if (!job) return <div className="p-20 text-center font-display font-bold uppercase">Cargando...</div>;

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-display font-bold uppercase text-sm mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} /> Volver a explorar
        </button>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card-brutal bg-white p-8">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <div className="flex gap-2 mb-4">
                    {job.urgente && (
                      <span className="bg-error text-white font-mono text-[10px] font-bold px-2 py-0.5 border border-ink uppercase">Urgente</span>
                    )}
                    <span className="bg-bg text-ink font-mono text-[10px] font-bold px-2 py-0.5 border border-ink uppercase">{job.categoria}</span>
                  </div>
                  <h1 className="text-4xl font-black uppercase tracking-tighter">{job.titulo}</h1>
                </div>
                <div className="text-right">
                  <div className="text-4xl font-black text-primary">{job.precio}€</div>
                  <div className="text-[10px] font-mono uppercase text-ink/40">Precio Cerrado</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-6 py-6 border-y-2 border-ink/5 mb-8">
                <div className="flex items-center gap-2 text-sm font-bold uppercase">
                  <MapPin size={18} className="text-primary" /> {job.ubicacion_texto}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase">
                  <Clock size={18} className="text-primary" /> {job.duracion_estimada}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase">
                  <Calendar size={18} className="text-primary" /> {job.fecha} ({job.franja_horaria})
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase">
                  <Zap size={18} className="text-primary" /> Nivel: {job.nivel}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold uppercase">
                  <ShieldCheck size={18} className="text-success" /> Pago Garantizado
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-black uppercase">Descripción</h3>
                <p className="text-ink/70 leading-relaxed whitespace-pre-wrap">
                  {job.descripcion}
                </p>
              </div>
            </div>

            {/* Safety Tips */}
            <div className="card-brutal bg-alert/5 border-alert">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-alert">
                <AlertTriangle size={18} /> Consejos de seguridad
              </h3>
              <ul className="text-xs space-y-2 font-medium text-ink/70">
                <li>• No realices pagos fuera de la plataforma.</li>
                <li>• Verifica la identidad del cliente al llegar.</li>
                <li>• Si el trabajo es diferente a lo descrito, abre una disputa.</li>
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            {/* Client Info */}
            <div className="card-brutal bg-white">
              <h3 className="font-black uppercase mb-6 border-b-2 border-ink/5 pb-4 text-sm">Sobre el cliente</h3>
              <Link to={`/profile/${job.cliente_id}`} className="flex items-center gap-4 mb-6 group">
                <div className="w-16 h-16 bg-bg border-2 border-ink flex items-center justify-center group-hover:bg-primary/5 transition-colors">
                  <UserIcon size={32} />
                </div>
                <div>
                  <div className="font-black uppercase group-hover:text-primary transition-colors">Juan P.</div>
                  <div className="flex items-center gap-1 text-alert">
                    <Star size={14} fill="currentColor" />
                    <span className="text-xs font-bold">4.8 (12 trabajos)</span>
                  </div>
                </div>
              </Link>
              <div className="space-y-3">
                <div className="flex justify-between text-[10px] font-mono uppercase">
                  <span className="text-ink/40">Miembro desde</span>
                  <span className="font-bold">Ene 2024</span>
                </div>
                <div className="flex justify-between text-[10px] font-mono uppercase">
                  <span className="text-ink/40">Tasa de pago</span>
                  <span className="font-bold text-success">100%</span>
                </div>
              </div>
            </div>

            {/* Action Card */}
            <div className="card-brutal bg-ink text-white">
              {!applied ? (
                <>
                  <h3 className="text-xl font-black uppercase mb-4">¿Te interesa?</h3>
                  
                  {currentUser && currentUser.verification_status !== 'VERIFIED' ? (
                    <div className="bg-white/10 p-4 border border-white/20 mb-6">
                      <div className="flex items-center gap-2 text-alert mb-2">
                        <ShieldAlert size={16} />
                        <span className="text-[10px] font-black uppercase">Verificación requerida</span>
                      </div>
                      <p className="text-[10px] text-white/60 font-medium mb-4 leading-tight">
                        Debes verificar tu identidad antes de poder enviar solicitudes a trabajos.
                      </p>
                      <Link to="/register" className="text-[10px] font-black uppercase underline hover:text-white">Verificar ahora</Link>
                    </div>
                  ) : (
                    <p className="text-xs text-white/60 mb-8 font-medium">
                      Al solicitar este trabajo, confirmas que puedes realizarlo por el precio indicado y en la ubicación especificada.
                    </p>
                  )}

                  <button 
                    onClick={handleApply}
                    disabled={currentUser?.verification_status !== 'VERIFIED' && !!currentUser}
                    className="w-full bg-primary text-white py-4 font-display font-black uppercase tracking-wider border-2 border-primary hover:bg-white hover:text-primary transition-all shadow-[4px_4px_0px_0px_rgba(37,99,235,1)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {currentUser ? 'Enviar Solicitud' : 'Inicia sesión para aplicar'}
                  </button>
                </>
              ) : (
                <div className="text-center py-4">
                  <CheckCircle2 size={48} className="text-success mx-auto mb-4" />
                  <h3 className="text-xl font-black uppercase mb-2">Solicitud Enviada</h3>
                  <p className="text-xs text-white/60 font-medium">
                    El cliente revisará tu perfil. Te notificaremos si eres seleccionado.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
