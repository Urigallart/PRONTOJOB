import React from 'react';
import { 
  Wallet as WalletIcon, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  ShieldCheck,
  CreditCard,
  Plus
} from 'lucide-react';

export const WalletPage = () => {
  const transactions = [
    { id: 1, type: 'ingreso', amount: 60, title: 'Montaje Armario', date: '24 Feb 2024', status: 'completado' },
    { id: 2, type: 'retiro', amount: 100, title: 'Retirada a banco', date: '23 Feb 2024', status: 'procesando' },
    { id: 3, type: 'ingreso', amount: 45, title: 'Limpieza Jardín', date: '22 Feb 2024', status: 'completado' },
    { id: 4, type: 'ingreso', amount: 120, title: 'Pintura Habitación', date: '21 Feb 2024', status: 'completado' },
    { id: 5, type: 'ingreso', amount: 30, title: 'Paseo de Perros', date: '20 Feb 2024', status: 'completado' },
    { id: 6, type: 'retiro', amount: 50, title: 'Retirada a banco', date: '19 Feb 2024', status: 'completado' },
    { id: 7, type: 'ingreso', amount: 85, title: 'Reparación Grifo', date: '18 Feb 2024', status: 'completado' },
    { id: 8, type: 'ingreso', amount: 40, title: 'Recado IKEA', date: '17 Feb 2024', status: 'completado' },
    { id: 9, type: 'ingreso', amount: 55, title: 'Clase de Inglés', date: '16 Feb 2024', status: 'completado' },
    { id: 10, type: 'retiro', amount: 200, title: 'Retirada a banco', date: '15 Feb 2024', status: 'completado' },
  ];

  return (
    <div className="bg-bg min-h-screen py-12">
      <div className="max-w-5xl mx-auto px-4">
        <div className="mb-12">
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-4">Mi Cartera</h1>
          <p className="text-ink/60 font-mono text-sm uppercase">Gestiona tus ingresos y pagos de forma segura</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Balance Card */}
          <div className="lg:col-span-2 space-y-8">
            <div className="card-brutal bg-ink text-white p-8 relative overflow-hidden">
              <div className="relative z-10">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <div className="text-[10px] font-mono uppercase text-white/40 mb-1">Saldo Disponible</div>
                    <div className="text-6xl font-black tracking-tighter">285.50€</div>
                  </div>
                  <WalletIcon size={48} className="text-primary opacity-50" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/5 p-4 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-white/40 mb-1">Retenido (Escrow)</div>
                    <div className="text-xl font-black">120.00€</div>
                  </div>
                  <div className="bg-white/5 p-4 border border-white/10">
                    <div className="text-[10px] font-mono uppercase text-white/40 mb-1">Total Ganado</div>
                    <div className="text-xl font-black">1,840€</div>
                  </div>
                </div>
              </div>
              
              {/* Decorative grid */}
              <div className="absolute top-0 right-0 w-full h-full opacity-5 pointer-events-none">
                <div className="grid grid-cols-12 h-full">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="border-r border-white h-full"></div>
                  ))}
                </div>
              </div>
            </div>

            {/* Transaction History */}
            <div className="card-brutal bg-white p-8">
              <h3 className="text-xl font-black uppercase mb-8">Últimos 10 Movimientos</h3>
              <div className="space-y-6">
                {transactions.map(tx => (
                  <div key={tx.id} className="flex items-center justify-between py-4 border-b-2 border-ink/5 last:border-0">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 border-2 border-ink ${tx.type === 'ingreso' ? 'bg-success/10 text-success' : 'bg-error/10 text-error'}`}>
                        {tx.type === 'ingreso' ? <ArrowDownLeft size={20} /> : <ArrowUpRight size={20} />}
                      </div>
                      <div>
                        <div className="font-black uppercase text-sm">{tx.title}</div>
                        <div className="text-[10px] font-mono uppercase text-ink/40">{tx.date}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`font-black ${tx.type === 'ingreso' ? 'text-success' : 'text-error'}`}>
                        {tx.type === 'ingreso' ? '+' : '-'}{tx.amount}€
                      </div>
                      <span className="text-[10px] font-mono uppercase font-bold opacity-40">
                        {tx.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Actions */}
          <div className="lg:col-span-1 space-y-8">
            <div className="card-brutal bg-white">
              <h3 className="font-black uppercase mb-6 text-sm">Acciones Rápidas</h3>
              <div className="space-y-4">
                <button 
                  onClick={() => alert('Funcionalidad de retirada próximamente. Tu saldo está seguro.')}
                  className="w-full btn-primary flex items-center justify-center gap-2 py-4"
                >
                  <ArrowUpRight size={18} /> Retirar Fondos
                </button>
                <button 
                  onClick={() => alert('Gestión de métodos de pago próximamente.')}
                  className="w-full btn-outline flex items-center justify-center gap-2 py-4"
                >
                  <CreditCard size={18} /> Métodos de Pago
                </button>
              </div>
            </div>

            <div className="card-brutal bg-primary/5 border-primary">
              <h3 className="font-black uppercase mb-4 flex items-center gap-2 text-primary">
                <ShieldCheck size={18} /> Sistema Escrow
              </h3>
              <p className="text-xs font-medium text-ink/70 leading-relaxed">
                Tu dinero está siempre protegido. Cuando un cliente paga, los fondos se retienen de forma segura hasta que el trabajo se completa y ambas partes están satisfechas.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
