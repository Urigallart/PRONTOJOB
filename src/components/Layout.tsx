import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  Wallet, 
  Plus, 
  Search,
  Bell
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Explorar', path: '/explore' },
    { name: 'Cómo funciona', path: '/how-it-works' },
  ];

  return (
    <nav className="border-b-2 border-ink bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-display font-black tracking-tighter uppercase">
              Pronto<span className="text-primary">Job</span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-display font-bold uppercase text-sm hover:text-primary transition-colors ${location.pathname === link.path ? 'text-primary' : ''}`}
              >
                {link.name}
              </Link>
            ))}
            <Link to="/wallet" className="p-2 hover:bg-bg transition-colors border-2 border-transparent hover:border-ink">
              <Wallet size={20} />
            </Link>
            <Link to="/profile" className="p-2 hover:bg-bg transition-colors border-2 border-transparent hover:border-ink">
              <UserIcon size={20} />
            </Link>
            <Link to="/post-job" className="btn-primary text-sm py-2 flex items-center gap-2">
              <Plus size={16} /> Publicar Trabajo
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-4">
            <Link to="/wallet" className="p-2"><Wallet size={20} /></Link>
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden border-t-2 border-ink bg-white p-4 space-y-4"
          >
            {navLinks.map(link => (
              <Link 
                key={link.path}
                to={link.path} 
                onClick={() => setIsOpen(false)}
                className="block font-display font-bold uppercase text-lg"
              >
                {link.name}
              </Link>
            ))}
            <Link to="/profile" onClick={() => setIsOpen(false)} className="block font-display font-bold uppercase text-lg">Mi Perfil</Link>
            <Link to="/post-job" onClick={() => setIsOpen(false)} className="w-full btn-primary text-sm block text-center">Publicar Trabajo</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-ink py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-2">
            <span className="text-3xl font-black tracking-tighter uppercase mb-6 block">
              Pronto<span className="text-primary">Job</span>
            </span>
            <p className="text-ink/60 max-w-sm font-medium">
              La plataforma líder en España para trabajos inmediatos. Conectando talento local con necesidades reales.
            </p>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6">Plataforma</h4>
            <ul className="space-y-4 text-sm font-bold uppercase text-ink/60">
              <li><Link to="/explore" className="hover:text-primary">Explorar</Link></li>
              <li><Link to="/how-it-works" className="hover:text-primary">Cómo funciona</Link></li>
              <li><Link to="/security" className="hover:text-primary">Seguridad</Link></li>
              <li><Link to="/help" className="hover:text-primary">Ayuda</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-black uppercase mb-6">Legal</h4>
            <ul className="space-y-4 text-sm font-bold uppercase text-ink/60">
              <li><a href="#" className="hover:text-primary">Términos</a></li>
              <li><a href="#" className="hover:text-primary">Privacidad</a></li>
              <li><a href="#" className="hover:text-primary">Cookies</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t-2 border-ink/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs font-mono uppercase text-ink/40">© 2024 ProntoJob. Hecho con <span className="text-error">♥</span> en España.</p>
          <div className="flex gap-6">
            <div className="w-8 h-8 border-2 border-ink flex items-center justify-center font-black text-xs">IG</div>
            <div className="w-8 h-8 border-2 border-ink flex items-center justify-center font-black text-xs">TW</div>
            <div className="w-8 h-8 border-2 border-ink flex items-center justify-center font-black text-xs">FB</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
