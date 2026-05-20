import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Lock, ArrowRight, Eye, EyeOff, Check } from 'lucide-react';

const FloatingInput = ({ label, type, value, onChange, icon: Icon, rightElement, id }) => {
  const [active, setActive] = useState(false);

  return (
    <div className="relative w-full mb-5">
      <div 
        className={`relative flex items-center bg-[#0B0F19]/60 backdrop-blur-md border rounded-xl transition-all duration-300 ${
          active || value ? 'border-[#F8C300] shadow-[0_0_15px_rgba(248,195,0,0.15)]' : 'border-white/10 hover:border-white/20'
        }`}
      >
        <div className="pl-4 z-10">
          <Icon size={20} className={`transition-colors duration-300 ${active || value ? 'text-[#F8C300]' : 'text-white/40'}`} />
        </div>
        <div className="relative w-full h-14">
          <motion.label
            htmlFor={id}
            initial={false}
            animate={{
              y: active || value ? -26 : 14,
              x: active || value ? -36 : 0,
              scale: active || value ? 0.85 : 1,
              color: active || value ? '#F8C300' : 'rgba(255, 255, 255, 0.5)'
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="absolute left-3 top-0 origin-top-left pointer-events-none text-sm"
          >
            {label}
          </motion.label>
          <input
            id={id}
            type={type}
            value={value}
            onChange={onChange}
            onFocus={() => setActive(true)}
            onBlur={() => setActive(false)}
            className="absolute bottom-0 left-0 w-full bg-transparent text-white p-3 pl-3 outline-none z-20 h-10 text-sm font-medium"
          />
        </div>
        {rightElement && (
          <div className="pr-3 z-10">
            {rightElement}
          </div>
        )}
      </div>
    </div>
  );
};

const LoadingSpinner = () => (
  <motion.div 
    animate={{ rotate: 360 }}
    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    className="w-5 h-5 border-2 border-[#0B0F19]/30 border-t-[#0B0F19] rounded-full"
  />
);

export function LoginPage({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  
  // Background interactive state
  const [mousePosition, setMousePosition] = useState({ x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0, y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0 });
  
  // Ref for the button to add magnetic effect
  const btnRef = useRef(null);
  const [btnPos, setBtnPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleBtnMouseMove = (e) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setBtnPos({ x: x * 0.2, y: y * 0.2 }); // subtle magnetic pull
  };

  const handleBtnMouseLeave = () => {
    setBtnPos({ x: 0, y: 0 });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError(true);
      setTimeout(() => setError(false), 600);
      return;
    }

    setIsLoading(true);
    setError(false);

    // Simulate network delay for the spinner animation
    await new Promise(r => setTimeout(r, 1500));

    const saved = localStorage.getItem('ti_users');
    let users = [];
    if (saved) {
      users = JSON.parse(saved);
    } else {
      users = [{ email: 'admin', password: 'admin', role: 'Admin', name: 'Admin' }];
      localStorage.setItem('ti_users', JSON.stringify(users));
    }

    const user = users.find(u => u.email === username && u.password === password);
    if (user) {
      onLogin(user);
    } else {
      setError(true);
      setIsLoading(false);
      setTimeout(() => setError(false), 600);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#05080f] font-sans selection:bg-[#F8C300] selection:text-[#0B0F19]">
      {/* 1. Dynamic Mesh Gradient Background */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            x: ["0%", "15%", "-10%", "0%"],
            y: ["0%", "-15%", "10%", "0%"],
            scale: [1, 1.1, 0.9, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#1e3a8a]/20 blur-[140px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["0%", "-20%", "15%", "0%"],
            y: ["0%", "20%", "-15%", "0%"],
            scale: [1, 0.9, 1.15, 1]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-20%] right-[-10%] w-[70%] h-[70%] rounded-full bg-[#F8C300]/10 blur-[160px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["0%", "10%", "-10%", "0%"],
            y: ["0%", "10%", "-10%", "0%"],
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[30%] left-[40%] w-[40%] h-[40%] rounded-full bg-[#ffffff]/5 blur-[120px] mix-blend-screen"
        />
        
        {/* Subtle noise texture */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" 
          style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
        />

        {/* Cursor tracking particle/glow */}
        <div 
          className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(248, 195, 0, 0.06), transparent 40%)`
          }}
        />
      </div>

      {/* 2. Glassmorphism Login Card */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-[420px] mx-4"
      >
        <motion.div
          animate={error ? { x: [-8, 8, -8, 8, 0] } : {}}
          transition={{ duration: 0.4 }}
          className="bg-white/[0.02] border border-white/[0.08] p-8 sm:p-10 rounded-[2rem] shadow-[0_20px_40px_rgba(0,0,0,0.4)] backdrop-blur-2xl relative overflow-hidden group"
        >
          {/* Subtle inner top highlight */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          
          {/* 3. Logo & Header */}
          <motion.div 
            animate={{ scale: [1, 1.02, 1] }} 
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center justify-center mb-10"
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#F8C300] to-[#c79c00] flex items-center justify-center shadow-[0_0_30px_rgba(248,195,0,0.3)] mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-white/20" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 30%, 0 70%)' }} />
              <div className="w-8 h-8 border-[3.5px] border-[#0B0F19] rounded-[4px] relative">
                 <div className="absolute -top-[8px] left-1/2 -translate-x-1/2 w-4 h-2 bg-[#0B0F19] rounded-t-[2px]" />
              </div>
            </div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow-md">
              FEBRAFAR
            </h1>
            <p className="text-[#F8C300] text-[0.7rem] font-bold tracking-[0.25em] uppercase mt-1">Estoque TI</p>
          </motion.div>

          <form onSubmit={handleLogin} className="flex flex-col relative z-10">
            <FloatingInput
              id="username"
              label="E-mail corporativo ou Usuário"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              icon={User}
            />

            <FloatingInput
              id="password"
              label="Senha"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={Lock}
              rightElement={
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="p-1.5 text-white/40 hover:text-[#F8C300] transition-colors focus:outline-none rounded-md hover:bg-white/5"
                  title={showPassword ? "Ocultar senha" : "Mostrar senha"}
                >
                  <motion.div
                    initial={false}
                    animate={{ scale: showPassword ? 1.1 : 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </motion.div>
                </button>
              }
            />

            <AnimatePresence>
              {error && (
                <motion.p 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="text-red-400 text-xs font-medium text-center mt-[-12px] mb-3"
                >
                  Credenciais inválidas. Tente novamente.
                </motion.p>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center mb-8 mt-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className={`relative flex items-center justify-center w-4 h-4 rounded border transition-colors ${rememberMe ? 'border-[#F8C300] bg-[#F8C300]/10' : 'border-white/30 group-hover:border-[#F8C300]/60'}`}>
                  <input 
                    type="checkbox" 
                    className="absolute opacity-0 cursor-pointer" 
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <AnimatePresence>
                    {rememberMe && (
                      <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className="text-[#F8C300]"
                      >
                        <Check size={12} strokeWidth={4} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <span className="text-white/60 text-xs group-hover:text-white transition-colors font-medium">Lembrar-me</span>
              </label>

              <a href="#" className="relative text-white/60 hover:text-white text-xs transition-colors group font-medium">
                Esqueceu a senha?
                <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-[#F8C300] group-hover:w-full transition-all duration-300 ease-out" />
              </a>
            </div>

            <motion.div
              ref={btnRef}
              onMouseMove={handleBtnMouseMove}
              onMouseLeave={handleBtnMouseLeave}
              animate={{ x: btnPos.x, y: btnPos.y }}
              transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
              className="relative w-full"
            >
              <button
                type="submit"
                disabled={isLoading}
                className="relative w-full h-[52px] bg-[#F8C300] text-[#0B0F19] font-bold rounded-xl overflow-hidden group shadow-[0_0_20px_rgba(248,195,0,0.15)] hover:shadow-[0_0_35px_rgba(248,195,0,0.3)] transition-all duration-300 disabled:opacity-80 disabled:cursor-not-allowed"
              >
                {/* Highlight overlay on hover */}
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                
                <div className="relative z-10 flex items-center justify-center h-full">
                  <AnimatePresence mode="wait">
                    {isLoading ? (
                      <motion.div
                        key="loading"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                      >
                        <LoadingSpinner />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="text"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="flex items-center gap-2"
                      >
                        <span className="text-[0.95rem]">Acessar Sistema</span>
                        <motion.div 
                          className="group-hover:translate-x-1 transition-transform duration-300"
                        >
                          <ArrowRight size={18} strokeWidth={2.5} />
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </button>
            </motion.div>
          </form>
        </motion.div>
        
        <p className="text-center text-white/30 text-[0.65rem] mt-6 tracking-wide font-medium">
          © {new Date().getFullYear()} FEBRAFAR. Todos os direitos reservados.
        </p>
      </motion.div>
    </div>
  );
}

