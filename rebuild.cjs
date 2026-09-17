const fs = require('fs');

const code = `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Sparkles, 
  CheckCircle2, 
  Shield, 
  Target, 
  Clock, 
  Check, 
  HeartHandshake, 
  Compass, 
  Zap, 
  HelpCircle, 
  ArrowRight,
  Send,
  Copy,
  ExternalLink,
  Phone,
  ShieldCheck,
  Activity,
  Layers,
  BarChart3
} from 'lucide-react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';

export function Landing() {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [copied, setCopied] = useState(false);
  const telegramNumber = "+16452507786";
  const formattedNumber = "+1 (645) 250-7786";
  const telegramUrl = "https://t.me/+16452507786";

  React.useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          const navOffset = 80;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - navOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 150);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleCopyNumber = () => {
    navigator.clipboard.writeText(telegramNumber);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const features = [
    {
      title: "Science-Backed Methodology",
      desc: "Built on proven principles of time-blocking, deliberate practice, and atomic habit compounding.",
      icon: HeartHandshake
    },
    {
      title: "Zero-Friction Execution",
      desc: "Open your workspace, pick your key milestone, hit start, and immerse in pure undistracted flow.",
      icon: Zap
    },
    {
      title: "Privacy First Architecture",
      desc: "Your goals, notes, and habits are completely private. Zero surveillance, zero ads, zero data monetization.",
      icon: Shield
    }
  ];

  const steps = [
    {
      num: "01",
      title: "SET YOUR GOALS",
      desc: "Decide what truly matters and break high-level aspirations into actionable milestones."
    },
    {
      num: "02",
      title: "ENTER DEEP FOCUS",
      desc: "Start a structured focus session with distraction-free timers dedicated to your priority."
    },
    {
      num: "03",
      title: "TRACK YOUR PROGRESS",
      desc: "Build sustainable habits, complete daily tasks, and watch your consistency compound."
    }
  ];

  const benefits = [
    { title: "STAY ORGANIZED", desc: "Know exactly what deserves your attention and eliminate cognitive overload." },
    { title: "BUILD BETTER HABITS", desc: "Turn small daily actions into unbreakable routines with visual streaks." },
    { title: "PROTECT YOUR FOCUS", desc: "Create dedicated, distraction-free time blocks for high-value work." },
    { title: "SEE YOUR PROGRESS", desc: "Stay intrinsically motivated by seeing how far your efforts have brought you." }
  ];

  const statCards = [
    { title: "GOAL TRACKING", desc: "Turn your biggest goals into clear, measurable milestones.", icon: Target },
    { title: "FOCUS SESSIONS", desc: "Create dedicated focus sessions and give your most important work your full attention.", icon: Clock },
    { title: "HABIT TRACKING", desc: "Build consistency by tracking the micro-habits that move you forward daily.", icon: Activity },
    { title: "PROGRESS ANALYTICS", desc: "See your daily actions add up into undeniable momentum over time.", icon: BarChart3 }
  ];

  const faqItems = [
    {
      q: "What makes FocusFlow different from traditional to-do lists?",
      a: "Traditional to-do apps isolate task lists from time allocation. FocusFlow uniquely bridges high-level goal mapping with daily micro-habits and integrated deep work focus timers. Instead of staring at an overwhelming backlog, you enter distraction-free focus sessions dedicated to specific outcomes."
    },
    {
      q: "Is FocusFlow free to use?",
      a: "Yes! You can start using FocusFlow completely free with unrestricted access to goal tracking, focus timers, and habit analytics. We also offer optional premium tiers for advanced team collaboration and deep historical metrics."
    },
    {
      q: "How do the focus sessions work?",
      a: "Focus sessions allow you to initiate customizable Pomodoro intervals (e.g. 25m focus / 5m break) or open-ended flow-state blocks directly tied to your active goals. It tracks your deep work streaks and visualizes your focus momentum."
    },
    {
      q: "Can I access FocusFlow across mobile and desktop?",
      a: "Absolutely. FocusFlow is fully responsive and cloud-synced across desktop browsers, tablets, and mobile devices so your progress and daily habit check-ins follow you anywhere."
    },
    {
      q: "How does FocusFlow handle my personal data and privacy?",
      a: "Your privacy is our utmost priority. All personal workspace data is encrypted both in transit and at rest. We never sell your data, run targeted ads, or share your progress metrics with third parties."
    }
  ];

  return (
    <div className="bg-[#02040a] min-h-screen text-white font-sans selection:bg-blue-500/30 relative flex flex-col">
      {/* BACKGROUND VIDEO */}
      <div className="fixed inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        <video 
          src="https://res.cloudinary.com/nmizpaiu/video/upload/q_auto,f_auto/kling_20260812_VIDEO_Animate_th_3049_0.mp4" 
          autoPlay loop muted playsInline
          className="w-full h-full min-w-full min-h-full object-cover scale-110 pointer-events-none opacity-45 md:opacity-55"
          style={{ width: '100%', height: '100%' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#02040a]/75 via-[#02040a]/45 to-[#02040a]/85 pointer-events-none" />
      </div>

      <div className="fixed inset-0 pointer-events-none overflow-hidden flex items-center justify-center z-[1]">
        <span className="text-[8rem] sm:text-[14rem] md:text-[18rem] font-black text-white/[0.018] tracking-tighter select-none">FOCUSFLOW</span>
      </div>

      <div className="relative z-10 flex-1 flex flex-col">
        <Navigation />

        {/* HERO SECTION */}
        <section id="hero" className="relative pt-32 sm:pt-40 pb-16 md:pb-24 overflow-hidden scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="max-w-2xl">
              <motion.div 
                initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 uppercase tracking-widest mb-6">
                  <Sparkles size={14} /> The Ultimate Focus App
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
                  Plan with clarity. Focus with purpose.
                </h1>
                <p className="text-lg md:text-xl text-gray-400 mb-8 leading-relaxed max-w-xl">
                  FocusFlow uniquely bridges high-level goal mapping with daily micro-habits and integrated deep work focus timers. Achieve consistency every single day.
                </p>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <Link to="/dashboard" className="px-8 py-3.5 rounded-full bg-white text-black text-base font-semibold hover:bg-gray-200 transition-colors text-center shadow-lg hover:shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                    Launch App
                  </Link>
                  <a href="#how-it-works" className="px-8 py-3.5 rounded-full bg-white/10 border border-white/10 text-white text-base font-medium hover:bg-white/15 transition-colors text-center backdrop-blur-md">
                    How it Works
                  </a>
                </div>
              </motion.div>
            </div>
            <div>
              <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="relative aspect-square md:aspect-auto md:h-[600px] w-full max-w-lg mx-auto">
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full pointer-events-none"></div>
                <div className="w-full h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10 bg-black/80 backdrop-blur-md">
                  <video 
                    src="https://res.cloudinary.com/nmizpaiu/video/upload/q_auto,f_auto/Smartphone_rotating_on_pedestal_202608132346.mp4" 
                    autoPlay loop muted playsInline
                    className="w-full h-full object-cover scale-105"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FEATURES SECTION (CARDS NO ANIMATION) */}
        <section id="features" className="py-16 md:py-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {features.map((feature, i) => (
                <div 
                  key={i} 
                  className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-9 hover:bg-white/15 hover:border-blue-500/40 transition-all shadow-xl group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="text-blue-400 text-xs font-bold tracking-widest uppercase">{feature.title}</div>
                    <div className="w-10 h-10 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400 group-hover:scale-110 group-hover:bg-blue-500/10 transition-all">
                      <feature.icon size={20} />
                    </div>
                  </div>
                  <p className="text-lg sm:text-xl text-white font-medium leading-snug">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* HOW IT WORKS (CARDS NO ANIMATION) */}
        <section id="how-it-works" className="py-16 md:py-24 scroll-mt-24 relative">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">FRAMEWORK</div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Simple by design.</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {steps.map((step, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-7 sm:p-8 hover:bg-white/15 hover:border-blue-500/30 transition-all flex flex-col justify-between group shadow-xl">
                  <div>
                    <div className="text-4xl sm:text-6xl font-bold text-blue-400/20 mb-5 group-hover:text-blue-400/40 transition-colors font-mono">{step.num}</div>
                    <div className="text-lg sm:text-xl font-bold tracking-wide mb-3 text-white">{step.title}</div>
                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SEE YOUR PROGRESS (CARDS NO ANIMATION) */}
        <section id="see-your-progress" className="py-16 md:py-24 scroll-mt-24">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="mb-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 uppercase">See your progress</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">Stay intrinsically motivated by seeing how far your efforts have brought you.</p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {statCards.map((stat, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 flex flex-col hover:bg-white/15 hover:border-blue-500/40 transition-all shadow-xl group">
                  <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400 mb-6 group-hover:bg-blue-500/20 transition-colors">
                    <stat.icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">{stat.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{stat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* BENEFITS SECTION (CARDS NO ANIMATION) */}
        <section id="benefits" className="py-16 md:py-24 scroll-mt-24 relative">
          <div className="max-w-7xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="mb-12 text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">WHY FOCUSFLOW</div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Designed to help you make progress.</h2>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {benefits.map((benefit, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-2xl p-6 sm:p-8 flex flex-col hover:bg-white/15 hover:border-purple-500/40 transition-all shadow-lg">
                  <h3 className="text-xl font-bold text-white mb-2 uppercase tracking-wide">{benefit.title}</h3>
                  <p className="text-gray-400 text-base">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ (CARDS NO ANIMATION) */}
        <section id="faq" className="py-16 md:py-24 scroll-mt-24">
          <div className="max-w-3xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
                <HelpCircle size={14} /> FREQUENTLY ASKED QUESTIONS
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-4">Got questions? We've got answers.</h2>
              <p className="text-gray-400 text-lg">Everything you need to know about getting started and finding your flow.</p>
            </motion.div>
            <div className="space-y-4">
              {faqItems.map((item, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div key={index} className="rounded-2xl border border-white/10 bg-white/10 backdrop-blur-xl overflow-hidden transition-all hover:border-white/20">
                    <button
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full px-6 sm:px-8 py-5 flex items-center justify-between text-left gap-4 focus:outline-none"
                    >
                      <span className="text-base sm:text-lg font-semibold text-white">{item.q}</span>
                      <div className={\`w-7 h-7 rounded-full bg-white/10 border border-white/10 flex items-center justify-center shrink-0 transition-transform duration-300 \${isOpen ? 'rotate-180 bg-blue-500/20 text-blue-400 border-blue-500/30' : 'text-gray-400'}\`}>
                        <ChevronDown size={16} />
                      </div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: "easeInOut" }}>
                          <div className="px-6 sm:px-8 pb-6 text-gray-400 text-sm sm:text-base leading-relaxed">
                            {item.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* CONTACT TELEGRAM */}
        <section id="contact" className="py-16 md:py-24 scroll-mt-24 relative z-10">
          <div className="max-w-5xl mx-auto px-6 w-full">
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-xs font-bold text-blue-400 uppercase tracking-widest mb-4">
                <Send size={14} /> OFFICIAL SUPPORT CHANNEL
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold tracking-tight text-white mb-3">Contact us on Telegram</h2>
              <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">
                Telegram is our exclusive direct communication and support channel. Connect with us instantly anytime.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.97 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} transition={{ duration: 0.5 }} className="relative rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-white/15 via-white/10 to-[#050b18]/70 backdrop-blur-2xl p-8 sm:p-12 shadow-2xl shadow-blue-950/40">
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#229ED9]/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="absolute -bottom-24 -left-24 w-72 h-72 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#229ED9] to-[#0088cc] flex items-center justify-center shadow-lg shadow-[#229ED9]/30">
                      <Send size={26} className="text-white transform -translate-y-0.5 translate-x-0.5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Active & Verified
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">FocusFlow Telegram</h3>
                    </div>
                  </div>
                  <p className="text-gray-300 text-base leading-relaxed mb-6">
                    For direct support, setup inquiries, feature recommendations, or partnerships, message our dedicated Telegram account directly.
                  </p>
                  <div className="space-y-3 mb-6 sm:mb-8">
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <ShieldCheck size={18} className="text-blue-400 shrink-0" />
                      <span>Direct 1-on-1 private messaging line</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-300">
                      <Clock size={18} className="text-purple-400 shrink-0" />
                      <span>Rapid response time • 24/7 Availability</span>
                    </div>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/40 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/10 flex items-center justify-center text-blue-400">
                        <Phone size={18} />
                      </div>
                      <div>
                        <div className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider">Telegram Number</div>
                        <div className="text-lg font-mono font-bold text-white tracking-wide">{formattedNumber}</div>
                      </div>
                    </div>
                    <button onClick={handleCopyNumber} className={\`px-4 py-2 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer w-full sm:w-auto justify-center \${copied ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-white/10 hover:bg-white/20 text-white border border-white/15'}\`}> 
                      {copied ? <><Check size={14} /><span>Copied to Clipboard!</span></> : <><Copy size={14} /><span>Copy Number</span></>}
                    </button>
                  </div>
                </div>
                <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 sm:p-8 rounded-2xl bg-white/10 border border-white/10 text-center">
                  <div className="w-16 h-16 rounded-full bg-[#229ED9]/15 border border-[#229ED9]/30 flex items-center justify-center text-[#229ED9] mb-4">
                    <Send size={28} />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Open Chat in Telegram</h4>
                  <p className="text-gray-400 text-xs sm:text-sm mb-6 leading-relaxed">
                    Click below to open Telegram on mobile or desktop and start a direct conversation immediately.
                  </p>
                  <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-[#229ED9] via-blue-600 to-indigo-600 text-white font-semibold text-base hover:shadow-[0_0_25px_rgba(34,158,217,0.5)] transition-all flex items-center justify-center gap-2 shadow-lg cursor-pointer">
                    <span>Message on Telegram</span>
                    <ExternalLink size={17} />
                  </a>
                  <div className="mt-4 text-[11px] text-gray-500 font-mono">Telegram: {telegramNumber}</div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="relative py-20 md:py-28 z-20 border-t border-white/10">
          <div className="max-w-4xl mx-auto px-6 text-center">
            <motion.h2 initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-5 tracking-tight">
              Ready to find your flow?
            </motion.h2>
            <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} transition={{ delay: 0.1 }} className="text-base sm:text-lg md:text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
              Start focusing on what matters and turn your goals into consistent daily progress.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "0px 0px -25% 0px" }} transition={{ delay: 0.2 }} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/dashboard" className="px-9 py-4 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-lg font-semibold hover:shadow-[0_0_25px_rgba(37,99,235,0.5)] transition-all w-full sm:w-auto text-center flex items-center justify-center gap-2">
                Launch App
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  );
}
`;

fs.writeFileSync('src/pages/Landing.tsx', code);
