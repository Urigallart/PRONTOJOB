import React from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  User as UserIcon, 
  Wallet, 
  Plus, 
  Search,
  Bell,
  LogOut,
  ShieldAlert,
  Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [profileOpen, setProfileOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const navLinks = [
    { name: 'Explorar', path: '/explore' },
    { name: 'Cómo funciona', path: '/how-it-works' },
    { name: 'Planes PRO', path: '/pro-plans' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/');
    setIsOpen(false);
    setProfileOpen(false);
  };

  // Close profile dropdown on click outside or Escape
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setProfileOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, []);

  return (
    <>
      {user && user.verification_status !== 'VERIFIED' && (
        <div className="bg-alert text-ink py-2 px-4 text-center text-xs font-black uppercase tracking-wider border-b-2 border-ink flex items-center justify-center gap-2">
          <ShieldAlert size={14} /> Verifica tu identidad para poder publicar o solicitar trabajos. <Link to="/register" className="underline hover:text-white">Completar Verificación</Link>
        </div>
      )}
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
              
              {user ? (
                <div className="flex items-center gap-6">
                  <Link to="/post-job" className="btn-primary text-sm py-2 px-6 flex items-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none transition-all">
                    <Plus size={18} /> Publicar Trabajo
                  </Link>
                  
                  <div className="relative" ref={dropdownRef}>
                    <button 
                      onClick={() => setProfileOpen(!profileOpen)}
                      className="w-10 h-10 rounded-full border-2 border-ink flex items-center justify-center bg-bg hover:bg-primary/10 transition-colors overflow-hidden"
                      aria-label="Menú de perfil"
                      aria-haspopup="true"
                      aria-expanded={profileOpen}
                    >
                      {user.foto_perfil ? (
                        <img src={user.foto_perfil} alt={user.nombre} className="w-full h-full object-cover" />
                      ) : (
                        <UserIcon size={20} />
                      )}
                    </button>

                    <AnimatePresence>
                      {profileOpen && (
                        <motion.div 
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute right-0 mt-2 w-48 bg-white border-2 border-ink shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50 py-2"
                          role="menu"
                        >
                          <Link 
                            to="/profile" 
                            className="flex items-center gap-3 px-4 py-3 font-display font-bold uppercase text-xs hover:bg-primary/5 transition-colors"
                            role="menuitem"
                            onClick={() => setProfileOpen(false)}
                          >
                            <UserIcon size={16} /> Mi Perfil
                          </Link>
                          <Link 
                            to="/wallet" 
                            className="flex items-center gap-3 px-4 py-3 font-display font-bold uppercase text-xs hover:bg-primary/5 transition-colors"
                            role="menuitem"
                            onClick={() => setProfileOpen(false)}
                          >
                            <Wallet size={16} /> Cartera
                          </Link>
                          <div className="border-t-2 border-ink/5 my-1"></div>
                          <button 
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 font-display font-bold uppercase text-xs hover:bg-error/5 text-error transition-colors text-left"
                            role="menuitem"
                          >
                            <LogOut size={16} /> Cerrar Sesión
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              ) : (
                <div className="flex items-center gap-4">
                  <Link to="/login" className="font-display font-bold uppercase text-sm hover:text-primary transition-colors">Iniciar Sesión</Link>
                  <Link to="/register" className="btn-primary text-sm py-2 px-6">Registrarse</Link>
                </div>
              )}
            </div>

            <div className="md:hidden flex items-center gap-4">
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
              
              {user ? (
                <>
                  <Link to="/profile" onClick={() => setIsOpen(false)} className="block font-display font-bold uppercase text-lg">Mi Perfil</Link>
                  <Link to="/wallet" onClick={() => setIsOpen(false)} className="block font-display font-bold uppercase text-lg">Billetera</Link>
                  <Link to="/post-job" onClick={() => setIsOpen(false)} className="w-full btn-primary text-sm block text-center">Publicar Trabajo</Link>
                  <button onClick={handleLogout} className="w-full border-2 border-error text-error py-3 font-display font-bold uppercase text-sm">Cerrar Sesión</button>
                </>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="block font-display font-bold uppercase text-lg">Iniciar Sesión</Link>
                  <Link to="/register" onClick={() => setIsOpen(false)} className="w-full btn-primary text-sm block text-center">Registrarse</Link>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </>
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
