import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, LogOut, Package, Users, Activity, ChevronRight } from 'lucide-react';

export const AdminPanel = () => {
  const navigate = useNavigate();

  const modules = [
    {
      id: 'equipments',
      title: 'Gerenciar Equipamentos',
      description: 'Cadastre, edite e acompanhe todo o inventário de hardware e periféricos da empresa.',
      icon: Package,
      path: '/equipments'
    },
    {
      id: 'users',
      title: 'Usuários do Sistema',
      description: 'Administre os acessos, permissões e gerencie a equipe que utiliza a plataforma.',
      icon: Users,
      path: '/users'
    },
    {
      id: 'movements',
      title: 'Movimentações',
      description: 'Acompanhe o histórico de entradas, saídas e transferências de equipamentos.',
      icon: Activity,
      path: '/movements'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white overflow-hidden relative selection:bg-[#F8C300] selection:text-[#0B0F19] font-sans">
      {/* Dynamic Background with Radial Gradients */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[#1e3a8a]/20 blur-[120px] mix-blend-screen"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#F8C300]/5 blur-[150px] mix-blend-screen"></div>
        <div className="absolute inset-0 opacity-[0.02] mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")` }}></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 md:px-8 py-6">
        {/* Glassmorphism Header */}
        <motion.header 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row justify-between items-center gap-4 shadow-[0_8px_32px_rgba(0,0,0,0.3)] mb-10"
        >
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform duration-300" />
              <span className="text-sm font-medium">Voltar</span>
            </button>
            <div className="h-6 w-px bg-white/10 hidden md:block"></div>
            <h1 className="text-xl font-bold tracking-wide text-center md:text-left">
              Painel Admin <span className="text-[#F8C300] font-extrabold">- FEBRAFAR</span>
            </h1>
          </div>

          <button 
            onClick={() => navigate('/')}
            className="w-full md:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/60 hover:text-red-300 transition-all duration-300 font-medium text-sm group focus:outline-none focus:ring-2 focus:ring-red-500/40"
          >
            <LogOut size={16} className="group-hover:translate-x-0.5 transition-transform duration-300" />
            <span>Sair do Sistema</span>
          </button>
        </motion.header>

        {/* Dashboard Content */}
        <div className="max-w-6xl mx-auto">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8 text-center md:text-left"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Visão Geral</h2>
            <p className="text-white/50 text-sm">Selecione o módulo que deseja administrar.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => {
              const Icon = module.icon;
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                  whileHover={{ y: -5 }}
                  className="group cursor-pointer relative rounded-2xl bg-white/[0.02] backdrop-blur-lg border border-white/[0.05] p-6 shadow-lg hover:shadow-[0_15px_30px_rgba(248,195,0,0.12)] hover:border-[#F8C300]/40 hover:bg-white/[0.04] transition-all duration-500 ease-out flex flex-col h-full overflow-hidden"
                  onClick={() => navigate(module.path)}
                >
                  {/* Hover highlight effect at the top */}
                  <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#F8C300] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  <div className="w-14 h-14 rounded-xl bg-[#0a0a0c] border border-white/10 flex items-center justify-center mb-6 group-hover:border-[#F8C300]/50 group-hover:bg-[#F8C300]/10 transition-all duration-500 shadow-inner">
                    <Icon size={26} className="text-white/70 group-hover:text-[#F8C300] transition-colors duration-500" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-[#F8C300] mb-3 tracking-wide">{module.title}</h3>
                  
                  <p className="text-white/60 text-sm leading-relaxed mb-8 flex-grow">
                    {module.description}
                  </p>
                  
                  <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between group-hover:border-[#F8C300]/20 transition-colors duration-500">
                    <span className="text-sm font-semibold text-white/80 group-hover:text-white transition-colors">Acessar Módulo</span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#F8C300] group-hover:text-[#0a0a0c] text-white/50 transition-all duration-300">
                      <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};