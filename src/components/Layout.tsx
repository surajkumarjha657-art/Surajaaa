import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, Instagram, Facebook, Phone, MapPin, Clock } from 'lucide-react';
import { useState, useEffect } from 'react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Story', path: '/about' },
    { name: 'Menu', path: '/menu' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Reservation', path: '/reserve' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="fixed w-full z-50 bg-cafe-cream/80 backdrop-blur-md border-b border-cafe-brown/10 h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 rounded-full border border-cafe-terracotta flex items-center justify-center transition-transform group-hover:scale-110">
            <div className="w-4 h-4 bg-cafe-terracotta rounded-full shadow-[0_0_8px_rgba(194,109,77,0.4)]"></div>
          </div>
          <span className="text-sm font-semibold tracking-widest uppercase text-cafe-brown hidden sm:block">Triveni Terrace Cafe</span>
        </Link>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex space-x-8 items-center">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[11px] uppercase tracking-[0.2em] font-medium hover:text-cafe-terracotta transition-colors ${location.pathname === link.path ? 'text-cafe-terracotta' : 'text-cafe-dark opacity-80'}`}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            to="/reserve" 
            className="px-6 py-2 border border-cafe-brown text-[11px] uppercase tracking-[0.2em] hover:bg-cafe-brown hover:text-white transition-all ml-4"
          >
            BOOK TABLE
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-cafe-dark p-2" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full left-0 w-full bg-cafe-cream border-b border-cafe-brown/10 md:hidden overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="text-sm uppercase tracking-[0.25em] font-medium text-cafe-dark hover:text-cafe-terracotta transition-colors"
                >
                  {link.name}
                </Link>
              ))}
              <Link 
                to="/reserve"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-4 bg-cafe-terracotta text-white text-[11px] uppercase tracking-[0.2em] font-bold shadow-lg"
              >
                Book Table
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export const Footer = () => {
  return (
    <footer className="bg-cafe-cream border-t border-cafe-brown/10 py-12">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full border border-cafe-terracotta flex items-center justify-center">
              <div className="w-3 h-3 bg-cafe-terracotta rounded-full"></div>
            </div>
            <h3 className="font-serif text-xl italic leading-none">Triveni</h3>
          </div>
          <p className="text-xs opacity-60 leading-relaxed font-light">
            A beautiful light-filled sanctuary serving traditional North Indian flavors amidst the legacy of Triveni Kala Sangam.
          </p>
        </div>
        
        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-widest opacity-50 font-bold block">Story</label>
          <div className="flex flex-col space-y-2 text-[11px] uppercase tracking-widest font-medium opacity-80">
            <Link to="/about" className="hover:text-cafe-terracotta transition-colors">Our Ethos</Link>
            <Link to="/menu" className="hover:text-cafe-terracotta transition-colors">Signature Recipes</Link>
            <Link to="/gallery" className="hover:text-cafe-terracotta transition-colors">Art Space</Link>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-widest opacity-50 font-bold block">Visit</label>
          <div className="flex flex-col space-y-4 text-xs opacity-80">
            <div className="flex items-start space-x-3 leading-relaxed">
              <MapPin size={14} className="mt-0.5 text-cafe-terracotta shrink-0" />
              <span>Triveni Kala Sangam, Tansen Marg, Mandi House, New Delhi</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] uppercase tracking-widest opacity-50 font-bold block">Social</label>
          <div className="flex gap-4 text-cafe-dark/60">
            <Instagram size={18} className="hover:text-cafe-terracotta cursor-pointer transition-colors" />
            <Facebook size={18} className="hover:text-cafe-terracotta cursor-pointer transition-colors" />
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 border-t border-cafe-brown/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] tracking-[0.2em] uppercase opacity-40">
          &copy; 2026 TRIVENI TERRACE CAFE
        </div>
        <div className="flex gap-8 text-[10px] tracking-[0.2em] uppercase font-bold text-cafe-olive">
          <a href="#" className="hover:text-cafe-terracotta transition-colors">INSTAGRAM</a>
          <a href="#" className="hover:text-cafe-terracotta transition-colors">FACEBOOK</a>
          <a href="#" className="hover:text-cafe-terracotta transition-colors">WHATSAPP</a>
        </div>
      </div>
    </footer>
  );
};
