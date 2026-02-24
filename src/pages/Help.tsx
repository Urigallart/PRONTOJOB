import React from 'react';
import { HelpCircle, MessageSquare, FileText, Phone, Search, ChevronRight } from 'lucide-react';

export const HelpPage = () => {
  const faqs = [
    {
      q: '¿Cómo publico mi primer trabajo?',
      a: 'Haz clic en el botón "Publicar Trabajo" en el menú superior, rellena los detalles, fija un precio y ¡listo!'
    },
    {
      q: '¿Qué pasa si el trabajo no se hace bien?',
      a: 'Puedes abrir una disputa desde el historial de trabajos. Nuestro equipo mediará para encontrar una solución justa.'
    },
    {
      q: '¿Cómo recibo mi dinero como trabajador?',
      a: 'Una vez el cliente confirme el trabajo, el saldo pasará a tu billetera. Podrás retirarlo a tu cuenta bancaria en 24-48h.'
    },
    {
      q: '¿Es obligatorio verificar mi identidad?',
      a: 'Sí, para garantizar la seguridad de todos, exigimos verificación de identidad antes de realizar o contratar trabajos.'
    }
  ];

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Centro de Ayuda</h1>
          <p className="text-ink/60 font-mono text-sm uppercase">¿En qué podemos ayudarte hoy?</p>
        </div>

        {/* Search Bar */}
        <div className="card-brutal bg-white p-4 mb-12 flex items-center gap-4">
          <Search size={24} className="text-ink/30" />
          <input 
            type="text" 
            placeholder="Busca por palabras clave (pagos, perfiles, disputas...)"
            className="w-full font-display font-bold focus:outline-none text-lg"
          />
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black uppercase mb-6">Preguntas Frecuentes</h2>
            {faqs.map((faq, i) => (
              <div key={i} className="card-brutal bg-white p-6 hover:bg-primary/5 cursor-pointer transition-colors group">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-black uppercase text-sm group-hover:text-primary transition-colors">{faq.q}</h3>
                  <ChevronRight size={18} className="text-ink/20" />
                </div>
                <p className="text-xs text-ink/60 font-medium leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>

          <div className="space-y-8">
            <h2 className="text-2xl font-black uppercase mb-6">Contacto Directo</h2>
            <div className="card-brutal bg-primary text-white p-8">
              <MessageSquare size={40} className="mb-6" />
              <h3 className="text-xl font-black uppercase mb-2">Chat en Vivo</h3>
              <p className="text-white/70 text-sm font-medium mb-6">Habla con un agente ahora mismo. Tiempo medio de espera: 2 min.</p>
              <button className="w-full bg-white text-ink py-3 font-display font-black uppercase text-sm border-2 border-white hover:bg-transparent hover:text-white transition-all">
                Iniciar Chat
              </button>
            </div>

            <div className="card-brutal bg-white p-8">
              <Phone size={40} className="text-primary mb-6" />
              <h3 className="text-xl font-black uppercase mb-2">Soporte Telefónico</h3>
              <p className="text-ink/60 text-sm font-medium mb-6">Disponible de Lunes a Viernes de 9:00 a 18:00.</p>
              <div className="text-2xl font-black font-display text-primary">+34 900 123 456</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
