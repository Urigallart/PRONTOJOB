import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
  ExternalLink,
  X,
  Rocket,
  Zap,
  Shield,
  Award,
  Lock,
  Globe,
  Mail,
  Phone,
  CreditCard,
  Edit3
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage = () => {
  const { user: authUser } = useAuth();
  const [activeSection, setActiveSection] = useState<'trabajador' | 'cliente'>('trabajador');
  const [activeTab, setActiveTab] = useState<'publica' | 'privada'>('publica');
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  const [editForm, setEditForm] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    telefono: '',
    ciudad: '',
    direccion_base: '',
    descripcion_profesional: '',
    categorias: [] as string[],
    radio_trabajo_km: 25,
    disponibilidad: 'Disponible ahora'
  });

  useEffect(() => {
    if (authUser) {
      setUser(authUser);
      setEditForm({
        nombre: authUser.nombre,
        apellidos: authUser.apellidos,
        email: authUser.email,
        telefono: authUser.telefono || '',
        ciudad: authUser.ciudad,
        direccion_base: authUser.direccion_base || '',
        descripcion_profesional: authUser.descripcion_profesional || '',
        categorias: typeof authUser.categorias === 'string' ? JSON.parse(authUser.categorias) : authUser.categorias || [],
        radio_trabajo_km: authUser.radio_trabajo_km || 25,
        disponibilidad: authUser.disponibilidad || 'Disponible ahora'
      });
    }
  }, [authUser]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate API save
    setUser({ ...user, ...editForm });
    setIsEditing(false);
  };

  if (!user) return <div className="p-20 text-center font-display font-black uppercase">Cargando...</div>;

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div>
            <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Mi Perfil</h1>
            <div className="flex gap-4">
              <button 
                onClick={() => setActiveSection('trabajador')}
                className={`px-6 py-2 font-display font-black uppercase text-xs border-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 ${activeSection === 'trabajador' ? 'bg-primary text-white border-ink' : 'bg-white text-ink border-ink hover:bg-primary/5'}`}
              >
                Perfil Trabajador
              </button>
              <button 
                onClick={() => setActiveSection('cliente')}
                className={`px-6 py-2 font-display font-black uppercase text-xs border-2 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-0.5 active:translate-y-0.5 ${activeSection === 'cliente' ? 'bg-ink text-white border-ink' : 'bg-white text-ink border-ink hover:bg-ink/5'}`}
              >
                Perfil Cliente
              </button>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(true)}
            className="btn-outline flex items-center gap-2 text-sm"
          >
            <Edit3 size={18} /> Editar {activeTab === 'publica' ? 'Info Pública' : 'Info Privada'}
          </button>
        </div>

        {/* Edit Modal */}
        <AnimatePresence>
          {isEditing && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-ink/50 backdrop-blur-sm">
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="card-brutal bg-white w-full max-w-2xl p-8 max-h-[90vh] overflow-y-auto"
              >
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-3xl font-black uppercase tracking-tighter">Editar Información</h2>
                  <button onClick={() => setIsEditing(false)} className="p-2 hover:bg-bg transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6">
                  {activeTab === 'privada' ? (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-display font-bold uppercase text-xs">Email</label>
                          <input 
                            type="email" 
                            className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                            value={editForm.email}
                            onChange={e => setEditForm({...editForm, email: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-display font-bold uppercase text-xs">Teléfono</label>
                          <input 
                            type="tel" 
                            className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                            value={editForm.telefono}
                            onChange={e => setEditForm({...editForm, telefono: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block font-display font-bold uppercase text-xs">Dirección Exacta</label>
                        <input 
                          type="text" 
                          className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                          value={editForm.direccion_base}
                          onChange={e => setEditForm({...editForm, direccion_base: e.target.value})}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="block font-display font-bold uppercase text-xs">Nombre</label>
                          <input 
                            type="text" 
                            className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                            value={editForm.nombre}
                            onChange={e => setEditForm({...editForm, nombre: e.target.value})}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="block font-display font-bold uppercase text-xs">Apellidos</label>
                          <input 
                            type="text" 
                            className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                            value={editForm.apellidos}
                            onChange={e => setEditForm({...editForm, apellidos: e.target.value})}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="block font-display font-bold uppercase text-xs">Ciudad</label>
                        <input 
                          type="text" 
                          className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                          value={editForm.ciudad}
                          onChange={e => setEditForm({...editForm, ciudad: e.target.value})}
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="block font-display font-bold uppercase text-xs">Biografía / Descripción</label>
                        <textarea 
                          rows={4}
                          className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                          value={editForm.descripcion_profesional}
                          onChange={e => setEditForm({...editForm, descripcion_profesional: e.target.value})}
                        />
                      </div>
                      {activeSection === 'trabajador' && (
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="block font-display font-bold uppercase text-xs">Radio de Trabajo (km)</label>
                            <input 
                              type="number" 
                              className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                              value={editForm.radio_trabajo_km}
                              onChange={e => setEditForm({...editForm, radio_trabajo_km: parseInt(e.target.value)})}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="block font-display font-bold uppercase text-xs">Disponibilidad</label>
                            <input 
                              type="text" 
                              className="w-full border-2 border-ink p-3 font-display focus:outline-none focus:bg-primary/5"
                              value={editForm.disponibilidad}
                              onChange={e => setEditForm({...editForm, disponibilidad: e.target.value})}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  <div className="flex gap-4 pt-4">
                    <button type="submit" className="flex-1 btn-primary py-4">Guardar Cambios</button>
                    <button type="button" onClick={() => setIsEditing(false)} className="flex-1 btn-outline py-4">Cancelar</button>
                  </div>
                </form>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-brutal bg-white p-8 text-center">
              <div className="w-32 h-32 bg-bg border-2 border-ink mx-auto mb-6 flex items-center justify-center relative">
                <UserIcon size={64} className="text-ink/20" />
                {user.verificado_identidad && (
                  <div className="absolute -bottom-2 -right-2 bg-success text-white p-1 border-2 border-ink">
                    <ShieldCheck size={20} />
                  </div>
                )}
              </div>
              <h2 className="text-2xl font-black uppercase mb-1">{user.nombre}</h2>
              <p className="text-xs font-mono uppercase text-ink/50 mb-6">ID: {user.id}</p>
              
              <div className="space-y-2">
                <button 
                  onClick={() => setActiveTab('publica')}
                  className={`w-full text-left px-4 py-3 font-display font-black uppercase text-[10px] border-2 transition-all flex items-center gap-2 ${activeTab === 'publica' ? 'bg-ink text-white border-ink' : 'bg-white border-ink hover:bg-primary/5'}`}
                >
                  <Globe size={14} /> Información Pública
                </button>
                <button 
                  onClick={() => setActiveTab('privada')}
                  className={`w-full text-left px-4 py-3 font-display font-black uppercase text-[10px] border-2 transition-all flex items-center gap-2 ${activeTab === 'privada' ? 'bg-ink text-white border-ink' : 'bg-white border-ink hover:bg-primary/5'}`}
                >
                  <Lock size={14} /> Información Privada
                </button>
              </div>
            </div>

            {activeSection === 'trabajador' && (
              <div className="card-brutal bg-ink text-white p-6">
                <h3 className="font-black uppercase mb-4 text-sm flex items-center gap-2">
                  <Rocket size={18} className="text-primary" /> Impulsa tu perfil
                </h3>
                <div className="space-y-4">
                  <button className="w-full p-3 border-2 border-white/20 hover:border-white transition-all text-left">
                    <div className="font-black uppercase text-[10px]">Perfil Boost</div>
                    <div className="text-[9px] text-white/40">2,99€ / 24h</div>
                  </button>
                  <button className="w-full p-3 border-2 border-white/20 hover:border-white transition-all text-left">
                    <div className="font-black uppercase text-[10px]">Perfil PRO</div>
                    <div className="text-[9px] text-white/40">4,99€ / mes</div>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            <AnimatePresence mode="wait">
              {activeTab === 'publica' ? (
                <motion.div 
                  key="publica"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="card-brutal bg-white p-8">
                    <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
                      <UserIcon size={20} className="text-primary" /> 
                      {activeSection === 'trabajador' ? 'Perfil Profesional' : 'Perfil de Cliente'}
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Nombre Público</label>
                          <div className="font-black uppercase text-lg">{user.nombre} {user.apellidos}</div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Ubicación</label>
                          <div className="font-bold uppercase flex items-center gap-2">
                            <MapPin size={16} className="text-primary" /> {user.ciudad}
                          </div>
                        </div>
                        {activeSection === 'trabajador' && (
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Disponibilidad</label>
                            <div className="font-bold uppercase flex items-center gap-2">
                              <Clock size={16} className="text-success" /> {user.disponibilidad || 'Disponible'}
                            </div>
                          </div>
                        )}
                      </div>
                      
                      <div className="space-y-6">
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Valoración Media</label>
                          <div className="flex items-center gap-2">
                            <div className="text-3xl font-black">4.9</div>
                            <div className="flex text-alert">
                              <Star size={16} fill="currentColor" />
                              <Star size={16} fill="currentColor" />
                              <Star size={16} fill="currentColor" />
                              <Star size={16} fill="currentColor" />
                              <Star size={16} fill="currentColor" />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Trabajos Realizados</label>
                          <div className="text-3xl font-black">28</div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-12 pt-12 border-t-2 border-ink/5">
                      <label className="block text-[10px] font-mono uppercase text-ink/40 mb-4">Biografía Profesional</label>
                      <p className="text-ink/70 leading-relaxed font-medium">
                        {user.descripcion_profesional || 'Sin descripción pública definida.'}
                      </p>
                    </div>
                  </div>

                  {activeSection === 'trabajador' && (
                    <div className="card-brutal bg-white p-8">
                      <h3 className="text-xl font-black uppercase mb-6">Especialidades</h3>
                      <div className="flex flex-wrap gap-3">
                        {editForm.categorias.map(cat => (
                          <span key={cat} className="bg-bg border-2 border-ink px-4 py-2 font-display font-bold uppercase text-xs">
                            {cat}
                          </span>
                        ))}
                        {editForm.categorias.length === 0 && <p className="text-ink/40 italic">No has seleccionado categorías aún.</p>}
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="privada"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="card-brutal bg-white p-8">
                    <h3 className="text-xl font-black uppercase mb-8 flex items-center gap-2">
                      <Lock size={20} className="text-error" /> Información Privada
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-12">
                      <div className="space-y-8">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-bg border-2 border-ink flex items-center justify-center shrink-0">
                            <Mail size={20} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Correo Electrónico</label>
                            <div className="font-bold">{user.email}</div>
                            <div className="text-[10px] text-success font-bold uppercase mt-1">Verificado</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-bg border-2 border-ink flex items-center justify-center shrink-0">
                            <Phone size={20} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Teléfono</label>
                            <div className="font-bold">{user.telefono || 'No configurado'}</div>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-8">
                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-bg border-2 border-ink flex items-center justify-center shrink-0">
                            <MapPin size={20} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Dirección de Facturación</label>
                            <div className="font-bold">{user.direccion_base || 'No configurada'}</div>
                          </div>
                        </div>

                        <div className="flex items-start gap-4">
                          <div className="w-10 h-10 bg-bg border-2 border-ink flex items-center justify-center shrink-0">
                            <CreditCard size={20} />
                          </div>
                          <div>
                            <label className="block text-[10px] font-mono uppercase text-ink/40 mb-1">Método de Pago</label>
                            <div className="font-bold">Visa terminada en 4421</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card-brutal bg-alert/5 border-alert p-8">
                    <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-alert">
                      <Shield size={18} /> Seguridad de la cuenta
                    </h3>
                    <p className="text-xs font-medium text-ink/70 mb-6">
                      Tu información privada nunca se comparte con otros usuarios. Solo se utiliza para facturación y verificaciones de seguridad.
                    </p>
                    <button className="btn-outline text-xs py-2 px-4 border-alert text-alert hover:bg-alert hover:text-white">
                      Cambiar Contraseña
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};
