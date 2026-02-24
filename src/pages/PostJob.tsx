import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Send, AlertCircle, ShieldAlert, Zap, Plus, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../constants';
import { useAuth } from '../context/AuthContext';

export const PostJobPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: CATEGORIES[0].id,
    precio: '',
    direccion: '',
    urgente: false,
    destacado: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate('/login');
      return;
    }

    if (user.verification_status !== 'VERIFIED') {
      setError('Debes verificar tu identidad para publicar trabajos');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulated delay
    setTimeout(() => {
      setLoading(false);
      navigate('/explore');
    }, 1500);
  };

  if (!user) {
    return (
      <div className="bg-bg min-h-screen py-24 flex items-center justify-center px-4">
        <div className="card-brutal bg-white p-12 text-center max-w-md">
          <AlertCircle size={48} className="text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-black uppercase mb-4">Inicia Sesión</h2>
          <p className="text-ink/60 font-medium mb-8">Debes estar registrado para poder publicar ofertas de trabajo.</p>
          <div className="flex gap-4">
            <Link to="/login" className="flex-1 btn-primary py-4">Entrar</Link>
            <Link to="/register" className="flex-1 btn-outline py-4">Registrarse</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-3xl mx-auto px-4">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 font-display font-bold uppercase text-sm mb-8 hover:text-primary transition-colors"
        >
          <ArrowLeft size={18} /> Volver
        </button>

        <div className="card-brutal bg-white p-8 md:p-12">
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Publicar Trabajo</h1>
          <p className="text-ink/60 font-mono text-sm uppercase mb-10">Describe lo que necesitas y recibe ofertas al instante</p>

          {user.verification_status !== 'VERIFIED' && (
            <div className="bg-alert/10 border-2 border-alert p-6 mb-10 flex items-start gap-4">
              <ShieldAlert className="text-alert shrink-0" size={24} />
              <div>
                <h3 className="font-black uppercase text-sm mb-1">Identidad no verificada</h3>
                <p className="text-xs font-medium text-ink/70 mb-4">
                  Para publicar trabajos, primero debemos verificar tu identidad. Es un proceso rápido y obligatorio por seguridad.
                </p>
                <Link to="/register" className="text-xs font-black uppercase underline hover:text-primary">Verificar ahora</Link>
              </div>
            </div>
          )}

          {error && (
            <div className="bg-error/10 border-2 border-error p-4 mb-8 flex items-center gap-3 text-error text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block font-display font-bold uppercase text-xs">Título del trabajo</label>
              <input 
                required
                disabled={user.verification_status !== 'VERIFIED'}
                type="text" 
                placeholder="Ej: Montaje de estantería Kallax"
                className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5 disabled:opacity-50"
                value={formData.titulo}
                onChange={e => setFormData({...formData, titulo: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Categoría</label>
                <select 
                  disabled={user.verification_status !== 'VERIFIED'}
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none bg-white disabled:opacity-50"
                  value={formData.categoria}
                  onChange={e => setFormData({...formData, categoria: e.target.value})}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Precio Cerrado (€)</label>
                <input 
                  required
                  disabled={user.verification_status !== 'VERIFIED'}
                  type="number" 
                  placeholder="Ej: 50"
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5 disabled:opacity-50"
                  value={formData.precio}
                  onChange={e => setFormData({...formData, precio: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-display font-bold uppercase text-xs">Descripción detallada</label>
              <textarea 
                required
                disabled={user.verification_status !== 'VERIFIED'}
                rows={4}
                placeholder="Explica qué hay que hacer, si aportas herramientas, etc."
                className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5 disabled:opacity-50"
                value={formData.descripcion}
                onChange={e => setFormData({...formData, descripcion: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-display font-bold uppercase text-xs">Dirección / Zona</label>
              <input 
                required
                disabled={user.verification_status !== 'VERIFIED'}
                type="text" 
                placeholder="Ej: Calle Mayor, Madrid"
                className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5 disabled:opacity-50"
                value={formData.direccion}
                onChange={e => setFormData({...formData, direccion: e.target.value})}
              />
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-black uppercase flex items-center gap-2">
                <Plus size={20} className="text-primary" /> Impulsa tu anuncio
              </h3>
              <p className="text-xs font-medium text-ink/60">Recibe más solicitudes en menos tiempo con nuestras opciones premium.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <button 
                  type="button"
                  disabled={user.verification_status !== 'VERIFIED'}
                  onClick={() => setFormData({...formData, destacado: !formData.destacado})}
                  className={`card-brutal p-4 text-left transition-all ${formData.destacado ? 'bg-primary/10 border-primary' : 'bg-white border-ink'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 bg-primary/20 border-2 border-ink flex items-center justify-center">
                      <ArrowRight className="-rotate-45" size={20} />
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg">2,99€</div>
                      <div className="text-[10px] font-mono uppercase opacity-40">24 Horas</div>
                    </div>
                  </div>
                  <h4 className="font-black uppercase text-sm mb-1">Destacar Anuncio</h4>
                  <p className="text-[10px] font-medium text-ink/60 leading-tight">Aparece en las primeras posiciones y consigue trabajadores más rápido.</p>
                </button>

                <button 
                  type="button"
                  disabled={user.verification_status !== 'VERIFIED'}
                  onClick={() => setFormData({...formData, urgente: !formData.urgente})}
                  className={`card-brutal p-4 text-left transition-all ${formData.urgente ? 'bg-error/10 border-error' : 'bg-white border-ink'}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-10 h-10 bg-error/20 border-2 border-ink flex items-center justify-center">
                      <Zap size={20} className="text-error" />
                    </div>
                    <div className="text-right">
                      <div className="font-black text-lg">2,50€</div>
                      <div className="text-[10px] font-mono uppercase opacity-40">Notificación Push</div>
                    </div>
                  </div>
                  <h4 className="font-black uppercase text-sm mb-1">Trabajo Urgente</h4>
                  <p className="text-[10px] font-medium text-ink/60 leading-tight">Badge rojo visible y aviso inmediato a trabajadores cercanos.</p>
                </button>
              </div>
            </div>

            <div className="bg-alert/10 border-2 border-alert p-4 flex gap-4">
              <AlertCircle className="text-alert shrink-0" />
              <p className="text-xs font-medium text-ink/80">
                Recuerda que el precio es cerrado. No se permite la negociación externa. El pago se realiza a través de la plataforma una vez aceptes a un trabajador.
              </p>
            </div>

            <button 
              disabled={loading || user.verification_status !== 'VERIFIED'}
              type="submit" 
              className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50"
            >
              {loading ? 'Publicando...' : (
                <>Publicar Trabajo <Send size={20} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
