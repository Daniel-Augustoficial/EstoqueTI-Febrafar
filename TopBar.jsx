import React from 'react';
import { Sun, Moon, Menu, ArrowLeft, LogOut } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export function TopBar({ title, onMenuClick, onBack, showBack, onLogout }) {
  const { theme, toggleTheme } = useInventory();

  return (
    <header className="topbar">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button className="md:hidden btn-icon" onClick={onMenuClick}>
          <Menu size={20} />
        </button>
        {showBack && (
          <button 
            onClick={onBack}
            className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium bg-[var(--color-table-stripe)] hover:bg-[var(--color-border)] transition-colors text-[var(--color-text-main)]"
          >
            <ArrowLeft size={16} /> Voltar
          </button>
        )}
        <h1 className="page-title">{title}</h1>
      </div>

      <div className="topbar-actions">
        <div className="theme-switch" onClick={toggleTheme}>
          <Sun className="theme-icon sun" />
          <Moon className="theme-icon moon" />
          <div className="theme-switch-slider"></div>
        </div>
        
        <button 
          onClick={onLogout}
          className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium border border-red-500/30 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300"
        >
          <LogOut size={16} /> Sair
        </button>
      </div>
    </header>
  );
}
