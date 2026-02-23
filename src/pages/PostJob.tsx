import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, AlertCircle } from 'lucide-react';
import { CATEGORIES } from '../constants';

export const PostJobPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    categoria: CATEGORIES[0].id,
    precio: '',
    direccion: '',
    urgente: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const newJob = {
      id: `t${Date.now()}`,
      cliente_id: 'u1', // Mock current user
      ...formData,
      precio: parseFloat(formData.precio),
      latitud: 40.4168, // Mock Madrid
      longitud: -3.7038,
      estado: 'publicado'
    };

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newJob)
      });
      
      if (res.ok) {
        navigate('/explore');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-2">
              <label className="block font-display font-bold uppercase text-xs">Título del trabajo</label>
              <input 
                required
                type="text" 
                placeholder="Ej: Montaje de estantería Kallax"
                className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                value={formData.titulo}
                onChange={e => setFormData({...formData, titulo: e.target.value})}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Categoría</label>
                <select 
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none bg-white"
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
                  type="number" 
                  placeholder="Ej: 50"
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={formData.precio}
                  onChange={e => setFormData({...formData, precio: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block font-display font-bold uppercase text-xs">Descripción detallada</label>
              <textarea 
                required
                rows={4}
                placeholder="Explica qué hay que hacer, si aportas herramientas, etc."
                className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                value={formData.descripcion}
                onChange={e => setFormData({...formData, descripcion: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="block font-display font-bold uppercase text-xs">Dirección / Zona</label>
              <input 
                required
                type="text" 
                placeholder="Ej: Calle Mayor, Madrid"
                className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                value={formData.direccion}
                onChange={e => setFormData({...formData, direccion: e.target.value})}
              />
            </div>

            <div className="flex items-center gap-3 p-4 border-2 border-ink bg-bg">
              <input 
                type="checkbox" 
                id="urgente"
                className="w-6 h-6 border-2 border-ink accent-primary"
                checked={formData.urgente}
                onChange={e => setFormData({...formData, urgente: e.target.checked})}
              />
              <label htmlFor="urgente" className="font-display font-bold uppercase text-sm cursor-pointer flex items-center gap-2">
                Marcar como <span className="text-error">Urgente</span> (+5€ comisión)
              </label>
            </div>

            <div className="bg-alert/10 border-2 border-alert p-4 flex gap-4">
              <AlertCircle className="text-alert shrink-0" />
              <p className="text-xs font-medium text-ink/80">
                Recuerda que el precio es cerrado. No se permite la negociación externa. El pago se realiza a través de la plataforma una vez aceptes a un trabajador.
              </p>
            </div>

            <button 
              disabled={loading}
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
