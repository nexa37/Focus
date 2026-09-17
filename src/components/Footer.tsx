import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Send, Zap } from 'lucide-react';
import React from 'react';

export function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();

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
    <footer className="border-t border-white/10 relative z-20 pt-16 pb-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 lg:gap-12">
        <div className="md:col-span-2">
          <Link to="/" className="flex items-center gap-2.5 mb-4 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-purple-600 flex items-center justify-center shadow-lg group-hover:shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all">
              <Zap size={17} className="text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">FocusFlow</span>
          </Link>
          <p className="text-gray-400 text-base max-w-sm mb-4">Plan with clarity. Focus with purpose. Achieve consistency every single day.</p>
          <div className="flex items-center gap-3 text-xs text-gray-500 font-mono">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            All systems operational • Direct Telegram Support
          </div>
        </div>

        <div>
          <h4 className="text-xs text-blue-400 uppercase tracking-widest font-bold mb-4">Product</h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a 
                href="#features" 
                onClick={(e) => handleNavClick(e, 'features')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
              >
                Features
              </a>
            </li>
            <li>
              <a 
                href="#how-it-works" 
                onClick={(e) => handleNavClick(e, 'how-it-works')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
              >
                How It Works
              </a>
            </li>
            <li>
              <a 
                href="#benefits" 
                onClick={(e) => handleNavClick(e, 'benefits')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
              >
                Benefits
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h4 className="text-xs text-purple-400 uppercase tracking-widest font-bold mb-4">Support & Contact</h4>
          <ul className="flex flex-col gap-2.5">
            <li>
              <a 
                href="#about" 
                onClick={(e) => handleNavClick(e, 'about')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
              >
                About FocusFlow
              </a>
            </li>
            <li>
              <a 
                href="#faq" 
                onClick={(e) => handleNavClick(e, 'faq')}
                className="text-gray-400 hover:text-white transition-colors cursor-pointer text-sm"
              >
                FAQ & Help
              </a>
            </li>
            <li>
              <a 
                href="https://t.me/+16452507786"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#229ED9] hover:text-blue-300 font-medium transition-colors text-sm flex items-center gap-1.5"
              >
                <Send size={13} />
                <span>Telegram: +1 645 250 7786</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-gray-500 text-sm">© {new Date().getFullYear()} FocusFlow Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <Link to="/dashboard" className="text-sm text-gray-400 hover:text-white transition-colors">Launch App</Link>
        </div>
      </div>
    </footer>
  );
}

