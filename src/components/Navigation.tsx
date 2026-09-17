import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, Zap } from 'lucide-react';
import React, { useState } from 'react';
import { PWAInstallButton } from './PWAInstallButton';

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);

    if (location.pathname === '/') {
      const element = document.getElementById(targetId);
      if (element) {
        const navOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - navOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    } else {
      navigate(`/#${targetId}`);
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 lg:px-8 pt-3 pb-2 transition-all">
      <div className="max-w-7xl mx-auto bg-[#060a14]/92 border border-slate-800/90 rounded-2xl px-5 sm:px-6 h-16 flex items-center justify-between shadow-[inset_0_1px_0_0_rgba(255,255,255,0.1),0_15px_30px_rgba(0,0,0,0.6)]">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all">
            <Zap size={18} className="text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-blue-400 via-indigo-200 to-purple-400 bg-clip-text text-transparent">
            FocusFlow
          </span>
        </Link>

        {/* Center Nav Links */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {[
            { label: 'Features', id: 'features' },
            { label: 'How It Works', id: 'how-it-works' },
            { label: 'Benefits', id: 'benefits' },
            { label: 'About', id: 'about' },
            { label: 'FAQ', id: 'faq' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="px-3 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all cursor-pointer"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <PWAInstallButton />
          <Link
            to="/dashboard"
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all flex items-center gap-1"
          >
            <span>Launch App</span>
            <ArrowUpRight size={15} />
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          className="md:hidden text-slate-300 hover:text-white p-2 hover:bg-white/10 rounded-xl transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isMobileMenuOpen && (
        <div className="md:hidden max-w-7xl mx-auto mt-2 bg-[#060a14]/98 border border-slate-800 rounded-2xl p-5 flex flex-col gap-3 shadow-2xl shadow-black/90">
          {[
            { label: 'Features', id: 'features' },
            { label: 'How It Works', id: 'how-it-works' },
            { label: 'Benefits', id: 'benefits' },
            { label: 'About', id: 'about' },
            { label: 'FAQ', id: 'faq' },
            { label: 'Contact', id: 'contact' },
          ].map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className="px-3 py-2.5 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
            >
              {item.label}
            </a>
          ))}

          <div className="flex flex-col gap-2.5 pt-3 border-t border-slate-800 mt-1">
            <div className="flex justify-center mb-2">
              <PWAInstallButton />
            </div>
            <Link
              to="/dashboard"
              className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-sm font-semibold text-center hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center justify-center gap-1.5"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span>Launch App</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

