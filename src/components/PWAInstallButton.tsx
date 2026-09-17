import React, { useState } from 'react';
import { usePWAInstall } from '../hooks/usePWAInstall';
import { Download, X, ArrowRight } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

export const PWAInstallButton: React.FC = () => {
  const { isInstallable, isInstalled, isIOS, install } = usePWAInstall();
  const [showIOSGuide, setShowIOSGuide] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // If already running as an installed PWA, hide the button
  if (isInstalled) {
    return null;
  }

  // Chromium / Android / Desktop flow
  if (isInstallable) {
    return (
      <button
        onClick={install}
        className="flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-500/30 px-4 py-2 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-colors shadow-lg"
      >
        <Download size={16} />
        Install App
      </button>
    );
  }

  // iOS Safari flow (beforeinstallprompt is not supported by WebKit)
  if (isIOS) {
    return (
      <>
        <button
          onClick={() => setShowIOSGuide(true)}
          className="flex items-center gap-2 rounded-full bg-blue-500/20 border border-blue-500/30 px-4 py-2 text-sm font-semibold text-blue-400 hover:bg-blue-500/30 transition-colors shadow-lg"
        >
          <Download size={16} />
          Install on iOS
        </button>

        {showIOSGuide && (
          <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm p-4 sm:p-0">
            <div className="w-full max-w-sm rounded-3xl bg-[#0a0f1c] border border-white/10 p-6 shadow-2xl relative">
              <button 
                onClick={() => setShowIOSGuide(false)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/20 transition-colors"
              >
                <X size={16} />
              </button>
              
              <h3 className="text-xl font-bold text-white mb-2">Install FocusFlow App</h3>
              <p className="text-sm text-gray-400 mb-6">
                Add the FocusFlow web app directly to your home screen for an instant, full-screen native experience.
              </p>
              
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 mb-4">
                <p className="text-sm text-gray-300 leading-relaxed">
                  1. Tap the <strong className="text-blue-400">Share</strong> button in the Safari toolbar.<br /><br />
                  2. Scroll down and select <strong className="text-blue-400">Add to Home Screen</strong>.
                </p>
              </div>

              {location.pathname !== '/dashboard' && (
                <button
                  onClick={() => {
                    setShowIOSGuide(false);
                    navigate('/dashboard');
                  }}
                  className="w-full mb-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <span>Open Web App First</span>
                  <ArrowRight size={16} />
                </button>
              )}
              
              <button
                onClick={() => setShowIOSGuide(false)}
                className="w-full rounded-xl bg-white/10 py-3 text-sm font-semibold text-gray-300 hover:bg-white/15 transition-colors"
              >
                Got it
              </button>
            </div>
          </div>
        )}
      </>
    );
  }

  return null;
};
