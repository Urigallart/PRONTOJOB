import React from 'react';
import { 
  Plus, 
  Search, 
  ShieldCheck, 
  Wallet, 
  CheckCircle2, 
  ArrowRight,
  UserCheck,
  Zap,
  MessageSquareOff
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export const HowItWorksPage = () => {
  const steps = [
    {
      icon: Plus,
      title: 'Publica tu necesidad',
      description: 'Describe el trabajo, fija un precio cerrado y añade fotos si es necesario. Es gratis y rápido.',
      color: 'bg-primary/10 text-primary'
    },
    {
      icon: UserCheck,
      title: 'Recibe solicitudes',
      description: 'Profesionales verificados cerca de ti enviarán su interés. Revisa sus perfiles y valoraciones.',
      color: 'bg-alert/10 text-alert'
    },
    {
      icon: Wallet,
      title: 'Pago Seguro (Escrow)',
      description: 'Al aceptar a un trabajador, el dinero se retiene de forma segura en nuestra plataforma.',
      color: 'bg-success/10 text-success'
    },
    {
      icon: CheckCircle2,
      title: 'Trabajo Completado',
      description: 'Una vez finalizado el trabajo, confirmas la recepción y liberamos el pago al profesional.',
      color: 'bg-ink/5 text-ink'
    }
  ];

  const features = [
    {
      icon: MessageSquareOff,
      title: 'Sin Chat Libre',
      description: 'Evitamos negociaciones infinitas. Todo se gestiona con mensajes predefinidos y precios cerrados.'
    },
    {
      icon: Zap,
      title: 'Inmediatez Real',
      description: 'Diseñado para trabajos que necesitan hacerse hoy, no la semana que viene.'
    },
    {
      icon: ShieldCheck,
      title: 'Seguridad Total',
      description: 'Identidad verificada obligatoria y sistema de disputas para proteger a ambas partes.'
    }
  ];

  return (
    <div className="bg-bg min-h-screen">
      {/* Hero */}
      <section className="py-24 bg-white border-b-2 border-ink overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-8 leading-[0.9]">
              Cómo funciona <br />
              <span className="text-primary">ProntoJob</span>
            </h1>
            <p className="text-xl text-ink/60 max-w-2xl mx-auto font-medium mb-12">
              Hemos simplificado el mercado de trabajos puntuales. Sin rodeos, sin regateos, solo soluciones.
            </p>
            <div className="flex justify-center gap-4">
              <Link to="/post-job" className="btn-primary">Publicar Trabajo</Link>
              <Link to="/explore" className="btn-outline">Explorar Ofertas</Link>
            </div>
          </motion.div>
        </div>
        
        {/* Decorative grid */}
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <div className="grid grid-cols-12 h-full">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="border-r border-ink h-full"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-24 bg-bg border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="card-brutal bg-white relative pt-16"
              >
                <div className="absolute top-6 left-6 text-4xl font-black text-ink/10">0{index + 1}</div>
                <div className={`w-16 h-16 ${step.color} border-2 border-ink flex items-center justify-center mb-6`}>
                  <step.icon size={32} />
                </div>
                <h3 className="text-xl font-black uppercase mb-4">{step.title}</h3>
                <p className="text-sm text-ink/60 font-medium leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why ProntoJob */}
      <section className="py-24 bg-white border-b-2 border-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">¿Por qué elegirnos?</h2>
            <p className="text-ink/60 font-mono text-sm uppercase">La diferencia está en el formato</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="text-center md:text-left">
                <feature.icon size={48} className="text-primary mb-6 mx-auto md:mx-0" />
                <h3 className="text-2xl font-black uppercase mb-4">{feature.title}</h3>
                <p className="text-ink/60 text-sm font-medium leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-ink text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl font-black uppercase tracking-tighter mb-8">¿Listo para tu primer trabajo?</h2>
          <p className="text-xl mb-12 max-w-2xl mx-auto font-medium opacity-60">
            Únete a la comunidad que está revolucionando los trabajos inmediatos en España.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Link to="/post-job" className="btn-primary bg-primary border-ink hover:bg-white hover:text-ink shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all">
              Publicar Trabajo
            </Link>
            <Link to="/explore" className="btn-outline border-white text-white hover:bg-white hover:text-ink shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none transition-all">
              Ver Trabajos Disponibles
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
