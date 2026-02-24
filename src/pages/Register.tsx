import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { User, Mail, Lock, Phone, Calendar, MapPin, Hash, Camera, Shield, AlertCircle, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const RegisterPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Step 1 Data
  const [step1Data, setStep1Data] = useState({
    nombre: '',
    apellidos: '',
    birth_date: '',
    address: '',
    postal_code: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });

  // Step 2 Data
  const [step2Data, setStep2Data] = useState({
    dni_number: '',
    dni_front: null as File | null,
    dni_back: null as File | null
  });

  // Load Step 1 from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('register_step1');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setStep1Data(prev => ({ ...prev, ...parsed, password: '', confirmPassword: '' }));
      } catch (e) {}
    }
  }, []);

  // Save Step 1 to localStorage
  useEffect(() => {
    const { password, confirmPassword, ...rest } = step1Data;
    localStorage.setItem('register_step1', JSON.stringify(rest));
  }, [step1Data]);

  const validateStep1 = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+?[0-9]{9,15}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{6,}$/;

    if (!step1Data.nombre || !step1Data.apellidos || !step1Data.birth_date || !step1Data.address || !step1Data.postal_code || !step1Data.email || !step1Data.password || !step1Data.phone) {
      return "Todos los campos son obligatorios";
    }
    if (!emailRegex.test(step1Data.email)) return "Introduce un correo válido";
    if (!phoneRegex.test(step1Data.phone)) return "Introduce un teléfono válido (ej: +34XXXXXXXXX)";
    if (!passwordRegex.test(step1Data.password)) return "Mínimo 6 caracteres, 1 mayúscula y 1 carácter especial";
    if (step1Data.password !== step1Data.confirmPassword) return "Las contraseñas no coinciden";
    
    return null;
  };

  const handleStep1Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const err = validateStep1();
    if (err) {
      setError(err);
      return;
    }

    setLoading(true);
    setError('');
    // Simulated delay
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 1000);
  };

  const handleStep2Submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!step2Data.dni_number || !step2Data.dni_front || !step2Data.dni_back) {
      setError('Debes completar todos los campos y subir las fotos');
      return;
    }

    setLoading(true);
    setError('');
    // Simulated delay
    setTimeout(() => {
      setLoading(false);
      localStorage.removeItem('register_step1');
      login({
        id: 'u_new',
        nombre: step1Data.nombre,
        apellidos: step1Data.apellidos,
        email: step1Data.email,
        tipo_usuario: 'cliente',
        verification_status: 'PENDING' // Start as pending as requested
      });
      navigate('/profile');
    }, 1500);
  };

  return (
    <div className="bg-bg min-h-screen py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="flex gap-2 mb-8">
          <div className={`h-2 flex-1 border-2 border-ink ${step >= 1 ? 'bg-primary' : 'bg-white'}`}></div>
          <div className={`h-2 flex-1 border-2 border-ink ${step >= 2 ? 'bg-primary' : 'bg-white'}`}></div>
        </div>

        <motion.div 
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="card-brutal bg-white p-8 md:p-12"
        >
          <div className="mb-8">
            <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">
              {step === 1 ? 'Crea tu cuenta' : 'Verifica tu identidad'}
            </h1>
            <p className="text-ink/60 font-mono text-sm uppercase">
              {step === 1 ? 'Paso 1: Datos Personales' : 'Paso 2: Documentación'}
            </p>
          </div>

          {error && (
            <div className="bg-error/10 border-2 border-error p-4 mb-8 flex items-center gap-3 text-error text-sm font-bold">
              <AlertCircle size={18} /> {error}
            </div>
          )}

          {step === 1 ? (
            <form onSubmit={handleStep1Submit} className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Nombre</label>
                <input 
                  type="text" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.nombre}
                  onChange={e => setStep1Data({...step1Data, nombre: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Apellidos</label>
                <input 
                  type="text" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.apellidos}
                  onChange={e => setStep1Data({...step1Data, apellidos: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Fecha de Nacimiento</label>
                <input 
                  type="date" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.birth_date}
                  onChange={e => setStep1Data({...step1Data, birth_date: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Teléfono</label>
                <input 
                  type="tel" required
                  placeholder="+34XXXXXXXXX"
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.phone}
                  onChange={e => setStep1Data({...step1Data, phone: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="block font-display font-bold uppercase text-xs">Dirección</label>
                <input 
                  type="text" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.address}
                  onChange={e => setStep1Data({...step1Data, address: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Código Postal</label>
                <input 
                  type="text" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.postal_code}
                  onChange={e => setStep1Data({...step1Data, postal_code: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Email</label>
                <input 
                  type="email" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.email}
                  onChange={e => setStep1Data({...step1Data, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Contraseña</label>
                <input 
                  type="password" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.password}
                  onChange={e => setStep1Data({...step1Data, password: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Confirmar Contraseña</label>
                <input 
                  type="password" required
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5"
                  value={step1Data.confirmPassword}
                  onChange={e => setStep1Data({...step1Data, confirmPassword: e.target.value})}
                />
              </div>

              <div className="md:col-span-2 pt-4">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full btn-primary py-5 text-lg flex items-center justify-center gap-3"
                >
                  {loading ? 'Guardando...' : 'Siguiente'} <ArrowRight size={20} />
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleStep2Submit} className="space-y-8">
              <div className="space-y-2">
                <label className="block font-display font-bold uppercase text-xs">Número de DNI / NIE</label>
                <input 
                  type="text" required
                  placeholder="12345678X"
                  className="w-full border-2 border-ink p-4 font-display focus:outline-none focus:bg-primary/5 uppercase"
                  value={step2Data.dni_number}
                  onChange={e => setStep2Data({...step2Data, dni_number: e.target.value})}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <label className="block font-display font-bold uppercase text-xs">DNI Anverso</label>
                  <div className="border-2 border-dashed border-ink/20 p-8 text-center relative group hover:border-primary transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={e => setStep2Data({...step2Data, dni_front: e.target.files?.[0] || null})}
                    />
                    {step2Data.dni_front ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle2 className="text-success" size={32} />
                        <span className="text-xs font-bold uppercase">{step2Data.dni_front.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="text-ink/30 group-hover:text-primary transition-colors" size={32} />
                        <span className="text-xs font-bold uppercase text-ink/40">Subir Foto</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="block font-display font-bold uppercase text-xs">DNI Reverso</label>
                  <div className="border-2 border-dashed border-ink/20 p-8 text-center relative group hover:border-primary transition-colors">
                    <input 
                      type="file" 
                      accept="image/*"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={e => setStep2Data({...step2Data, dni_back: e.target.files?.[0] || null})}
                    />
                    {step2Data.dni_back ? (
                      <div className="flex flex-col items-center gap-2">
                        <CheckCircle2 className="text-success" size={32} />
                        <span className="text-xs font-bold uppercase">{step2Data.dni_back.name}</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Camera className="text-ink/30 group-hover:text-primary transition-colors" size={32} />
                        <span className="text-xs font-bold uppercase text-ink/40">Subir Foto</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-bg p-6 border-2 border-ink flex items-start gap-4">
                <Shield className="text-primary shrink-0" size={24} />
                <p className="text-xs font-medium leading-relaxed text-ink/70">
                  Tus documentos se procesan de forma segura y solo se utilizan para verificar tu identidad. Una vez verificado, recibirás el distintivo de confianza en tu perfil.
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex-1 btn-outline py-5 font-black uppercase tracking-wider flex items-center justify-center gap-3"
                >
                  <ArrowLeft size={20} /> Atrás
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="flex-[2] btn-primary py-5 text-lg flex items-center justify-center gap-3"
                >
                  {loading ? 'Finalizando...' : 'Completar Registro'}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
};
