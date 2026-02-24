import React from 'react';
import { Shield, Lock, Eye, Smartphone, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export const SecurityPage = () => {
  const features = [
    {
      icon: Shield,
      title: 'Identidad Verificada',
      description: 'Todos los profesionales deben pasar un proceso de verificación con DNI/NIE antes de poder trabajar.'
    },
    {
      icon: Lock,
      title: 'Pagos Protegidos',
      description: 'Usamos un sistema de depósito (escrow). El dinero se retiene de forma segura hasta que confirmas el trabajo.'
    },
    {
      icon: Eye,
      title: 'Privacidad de Datos',
      description: 'Tus datos personales solo se comparten con el trabajador una vez aceptado el presupuesto.'
    },
    {
      icon: Smartphone,
      title: 'Autenticación en dos pasos',
      description: 'Protege tu cuenta con un código adicional enviado a tu móvil en cada inicio de sesión.'
    }
  ];

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Seguridad en ProntoJob</h1>
          <p className="text-ink/60 font-mono text-sm uppercase">Tu tranquilidad es nuestra prioridad número uno</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="card-brutal bg-white p-8"
            >
              <f.icon size={40} className="text-primary mb-6" />
              <h3 className="text-xl font-black uppercase mb-4">{f.title}</h3>
              <p className="text-sm text-ink/70 font-medium leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="card-brutal bg-ink text-white p-8 md:p-12">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-20 h-20 bg-primary border-2 border-white flex items-center justify-center shrink-0 rotate-3">
              <AlertTriangle size={40} />
            </div>
            <div>
              <h3 className="text-2xl font-black uppercase mb-4">¿Has detectado algo sospechoso?</h3>
              <p className="text-white/60 text-sm font-medium mb-6">
                Si un usuario te pide pagar fuera de la plataforma o detectas un perfil falso, infórmanos de inmediato. Nuestro equipo de seguridad revisará el caso en menos de 24h.
              </p>
              <button className="bg-white text-ink px-8 py-3 font-display font-black uppercase text-sm border-2 border-white hover:bg-transparent hover:text-white transition-all">
                Reportar Incidencia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
