import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle, CheckSquare, Square } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    termsAccepted: false,
    commissionAccepted: false
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.termsAccepted || !formData.commissionAccepted) {
      setError('Debes aceptar los términos y la comisión del 15%');
      return;
    }

    setLoading(true);
    // Simulated delay
    setTimeout(() => {
      login({
        id: 'u_mock',
        nombre: formData.email.split('@')[0],
        apellidos: 'Usuario',
        email: formData.email,
        tipo_usuario: 'cliente',
        verification_status: 'VERIFIED'
      });
      setLoading(false);
      navigate('/');
    }, 1000);
  };

  const isFormValid = formData.email && formData.password && formData.termsAccepted && formData.commissionAccepted;

  return (
    <div className="bg-bg min-h-screen py-12 flex items-center justify-center px-4">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-brutal bg-white w-full max-w-md p-8"
      >
        <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Bienvenido</h1>
        <p className="text-ink/60 font-mono text-sm uppercase mb-8">Inicia sesión en ProntoJob</p>

        {error && (
          <div className="bg-error/10 border-2 border-error p-4 mb-6 flex items-center gap-3 text-error text-sm font-bold">
            <AlertCircle size={18} /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="block font-display font-bold uppercase text-xs">Correo Electrónico</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={20} />
              <input 
                type="email" 
                required
                className="w-full border-2 border-ink p-4 pl-12 font-display focus:outline-none focus:bg-primary/5"
                placeholder="tu@email.com"
                value={formData.email}
                onChange={e => setFormData({...formData, email: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="block font-display font-bold uppercase text-xs">Contraseña</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-ink/30" size={20} />
              <input 
                type="password" 
                required
                className="w-full border-2 border-ink p-4 pl-12 font-display focus:outline-none focus:bg-primary/5"
                placeholder="••••••••"
                value={formData.password}
                onChange={e => setFormData({...formData, password: e.target.value})}
              />
            </div>
          </div>

          <div className="space-y-4 pt-2">
            <button 
              type="button"
              onClick={() => setFormData({...formData, termsAccepted: !formData.termsAccepted})}
              className="flex items-start gap-3 text-left group"
            >
              {formData.termsAccepted ? <CheckSquare className="text-primary shrink-0" size={20} /> : <Square className="text-ink/30 shrink-0" size={20} />}
              <span className="text-xs font-bold uppercase leading-tight">Acepto los términos y condiciones</span>
            </button>

            <button 
              type="button"
              onClick={() => setFormData({...formData, commissionAccepted: !formData.commissionAccepted})}
              className="flex items-start gap-3 text-left group"
            >
              {formData.commissionAccepted ? <CheckSquare className="text-primary shrink-0" size={20} /> : <Square className="text-ink/30 shrink-0" size={20} />}
              <span className="text-xs font-bold uppercase leading-tight">Acepto que la empresa se queda un 15% de comisión</span>
            </button>
          </div>

          <button 
            disabled={loading || !isFormValid}
            type="submit" 
            className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Iniciando...' : 'Iniciar Sesión'}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-sm font-bold uppercase text-ink/40">
            ¿No tienes cuenta? <Link to="/register" className="text-primary hover:underline">Regístrate</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
