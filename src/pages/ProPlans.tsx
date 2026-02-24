import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Check, Zap, Rocket, Award, ShieldCheck, ArrowRight, Star, Users } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Plan } from '../types';

const PLANS: Plan[] = [
  {
    id: 'free',
    nombre: 'Plan Gratuito',
    precio_mensual: 0,
    descripcion: [
      'Perfil básico',
      'Aparición normal en búsquedas',
      'Sin prioridad',
      'Sin badge especial'
    ]
  },
  {
    id: 'pro',
    nombre: 'Plan PRO',
    precio_mensual: 9.99,
    popular: true,
    recomendado: true,
    descripcion: [
      'Badge "PRO Verificado" visible',
      'Prioridad en búsquedas',
      '1 Perfil Boost automático al mes',
      'Mayor visibilidad en categoría',
      'Mejora posición en algoritmo',
      'Acceso anticipado a trabajos urgentes'
    ]
  },
  {
    id: 'pro_plus',
    nombre: 'Plan PRO PLUS',
    precio_mensual: 14.99,
    descripcion: [
      'Todo lo del Plan PRO',
      'Boost ilimitado (hasta 3/semana)',
      'Badge destacado más visible',
      'Prioridad sobre PRO estándar',
      'Soporte prioritario',
      'Estadísticas avanzadas'
    ]
  }
];

export const ProPlansPage = () => {
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [promoActive, setPromoActive] = useState(true);

  const handleSubscribe = (planId: string) => {
    setLoading(true);
    // Simulate Stripe Checkout
    setTimeout(() => {
      alert(`Redirigiendo a Stripe para el plan: ${planId}`);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-bg min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 bg-primary/10 text-primary border-2 border-primary px-4 py-1 font-mono text-xs font-black uppercase mb-6 shadow-[4px_4px_0px_0px_rgba(37,99,235,1)]"
          >
            <Star size={14} fill="currentColor" /> Haz crecer tu perfil
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6 leading-none">
            Aparece antes. <br />
            <span className="text-primary">Gana más.</span> Trabaja más.
          </h1>
          <p className="text-xl text-ink/60 font-medium max-w-2xl mx-auto mb-8">
            Los profesionales visibles reciben hasta <span className="text-ink font-black underline decoration-primary decoration-4">3x más solicitudes</span>. Invierte en visibilidad, multiplica tus ingresos.
          </p>
          
          <div className="flex items-center justify-center gap-4 text-sm font-mono uppercase font-black text-ink/40">
            <div className="flex items-center gap-2">
              <Users size={18} className="text-primary" /> +347 trabajadores ya son PRO
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        {promoActive && (
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="card-brutal bg-alert p-4 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 border-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
          >
            <div className="flex items-center gap-4">
              <div className="bg-white p-2 border-2 border-ink animate-bounce">
                <Zap size={24} className="text-alert fill-alert" />
              </div>
              <div>
                <div className="font-black uppercase text-lg leading-none">PROMO LANZAMIENTO: 50% Dto.</div>
                <div className="text-xs font-bold uppercase opacity-70">Oferta válida por tiempo limitado</div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden md:block">
                <div className="text-xs font-mono uppercase font-black opacity-50">Termina en:</div>
                <div className="font-black text-xl tabular-nums">02:45:12</div>
              </div>
              <button className="btn-primary bg-ink text-white border-white shadow-none hover:translate-x-1 hover:translate-y-1">
                Aprovechar ahora
              </button>
            </div>
          </motion.div>
        )}

        {/* Plans Grid */}
        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {PLANS.map((plan) => (
            <motion.div 
              key={plan.id}
              whileHover={{ y: -8 }}
              className={`card-brutal p-8 flex flex-col relative ${
                plan.recomendado 
                ? 'bg-white border-primary shadow-[12px_12px_0px_0px_rgba(37,99,235,1)] ring-4 ring-primary/20' 
                : 'bg-white border-ink shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 border-2 border-ink font-mono text-[10px] font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  Más Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-black uppercase mb-2 tracking-tight">{plan.nombre}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black tracking-tighter">{plan.precio_mensual}€</span>
                  <span className="text-ink/40 font-mono text-xs uppercase font-black">/ mes</span>
                </div>
              </div>

              <div className="space-y-4 mb-10 flex-grow">
                {plan.descripcion.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className={`mt-1 p-0.5 border-2 border-ink ${plan.id === 'free' ? 'bg-ink/10' : 'bg-success/20 text-success'}`}>
                      <Check size={12} strokeWidth={4} />
                    </div>
                    <span className="text-sm font-bold text-ink/70 leading-tight">{item}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan.id)}
                disabled={loading || plan.id === 'free'}
                className={`w-full py-4 font-black uppercase text-sm flex items-center justify-center gap-2 transition-all ${
                  plan.id === 'free'
                  ? 'bg-ink/5 text-ink/30 border-2 border-ink/10 cursor-not-allowed'
                  : plan.recomendado
                  ? 'bg-primary text-white border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                  : 'bg-white text-ink border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1'
                }`}
              >
                {plan.id === 'free' ? 'Plan Actual' : 'Activar PRO ahora'}
                {plan.id !== 'free' && <ArrowRight size={18} />}
              </button>
              
              {plan.id !== 'free' && (
                <p className="text-[9px] text-center mt-4 font-mono uppercase text-ink/40 font-bold">
                  Renovación automática. Cancela cuando quieras.
                </p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Benefits Detail */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {[
            { icon: <Rocket />, title: 'Visibilidad', desc: 'Aparece en las primeras posiciones de tu categoría.' },
            { icon: <Award />, title: 'Confianza', desc: 'Badge exclusivo que transmite profesionalidad.' },
            { icon: <Zap />, title: 'Impulso', desc: 'Boosts mensuales incluidos para picos de trabajo.' },
            { icon: <ShieldCheck />, title: 'Prioridad', desc: 'Acceso antes que nadie a los mejores trabajos.' },
          ].map((benefit, i) => (
            <div key={i} className="text-center p-6">
              <div className="w-16 h-16 bg-white border-2 border-ink mx-auto mb-4 flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-primary">
                {benefit.icon}
              </div>
              <h4 className="font-black uppercase text-sm mb-2">{benefit.title}</h4>
              <p className="text-xs text-ink/60 font-medium leading-relaxed">{benefit.desc}</p>
            </div>
          ))}
        </div>

        {/* Social Proof */}
        <div className="card-brutal bg-ink text-white p-12 text-center border-white shadow-[12px_12px_0px_0px_rgba(255,255,255,0.1)]">
          <h3 className="text-3xl font-black uppercase mb-8">¿Aún tienes dudas?</h3>
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="text-4xl font-black text-primary mb-2">+300%</div>
              <p className="text-xs font-mono uppercase opacity-60">Más visualizaciones de perfil</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">2x</div>
              <p className="text-xs font-mono uppercase opacity-60">Más trabajos completados</p>
            </div>
            <div>
              <div className="text-4xl font-black text-primary mb-2">24h</div>
              <p className="text-xs font-mono uppercase opacity-60">Soporte prioritario para PROs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
