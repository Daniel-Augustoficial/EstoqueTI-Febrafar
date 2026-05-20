import React, { useState } from 'react';
import { ChevronDown, ChevronRight, LayoutDashboard, Monitor, Package, ArrowRightLeft, FileSpreadsheet, Settings } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';
import { exportToExcel } from '../utils/exportExcel';

const CATEGORIES = ['Headset', 'Mouse', 'Teclado', 'Kit Teclado e Mouse'];
const MOVEMENT_TYPES = ['Entrada', 'Saída', 'Temporário', 'Manutenção'];

export function Sidebar({ currentView, setCurrentView, loggedUser }) {
  const { products, movements } = useInventory();
  const [equipmentsOpen, setEquipmentsOpen] = useState(true);
  const [movementsOpen, setMovementsOpen] = useState(true);
  const [adminOpen, setAdminOpen] = useState(false);

  const handleExport = () => {
    exportToExcel(products, movements);
  };

  const navItemClass = (viewName) => {
    return `nav-item ${currentView.name === viewName ? 'active' : ''}`;
  };
  
  const subItemClass = (viewName, filterValue) => {
    return `nav-subitem ${currentView.name === viewName && currentView.filter === filterValue ? 'active' : ''}`;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <Monitor className="sidebar-title" size={28} color="var(--color-secondary)" />
        <h2 className="sidebar-title" style={{ margin: 0 }}>TI Febrafar</h2>
      </div>

      <nav className="sidebar-nav">
        <a className={navItemClass('Dashboard')} onClick={() => setCurrentView({ name: 'Dashboard' })}>
          <LayoutDashboard size={20} /> Dashboard
        </a>

        <div>
          <div className="nav-group-title" onClick={() => setEquipmentsOpen(!equipmentsOpen)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Package size={16} /> Estoque Geral
            </span>
            {equipmentsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {equipmentsOpen && (
            <div>
              <a className={subItemClass('Equipamentos', 'Todos')} onClick={() => setCurrentView({ name: 'Equipamentos', filter: 'Todos' })}>
                Todos
              </a>
              {CATEGORIES.map(cat => (
                <a key={cat} className={subItemClass('Equipamentos', cat)} onClick={() => setCurrentView({ name: 'Equipamentos', filter: cat })}>
                  {cat}
                </a>
              ))}
              <a className={subItemClass('Equipamentos', 'Descartados')} onClick={() => setCurrentView({ name: 'Equipamentos', filter: 'Descartados' })}>
                🗑️ Descartados
              </a>
            </div>
          )}
        </div>

        <div>
          <div className="nav-group-title" onClick={() => setMovementsOpen(!movementsOpen)}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowRightLeft size={16} /> Movimentações
            </span>
            {movementsOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </div>
          {movementsOpen && (
            <div>
              <a className={subItemClass('Movimentações', 'Todos')} onClick={() => setCurrentView({ name: 'Movimentações', filter: 'Todos' })}>Todas</a>
              {MOVEMENT_TYPES.map(type => (
                <a key={type} className={subItemClass('Movimentações', type)} onClick={() => setCurrentView({ name: 'Movimentações', filter: type })}>
                  {type === 'Entrada' ? 'Devoluções (Entrada)' : type}
                </a>
              ))}
            </div>
          )}
        </div>

        {loggedUser?.role === 'Admin' && (
          <div>
            <div className="nav-group-title" onClick={() => setAdminOpen(!adminOpen)}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#F8C300' }}>
                <Settings size={16} /> Painel Admin
              </span>
              {adminOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
            </div>
            {adminOpen && (
              <div>
                <a className={subItemClass('Admin', 'Usuários')} onClick={() => setCurrentView({ name: 'Admin', filter: 'Usuários' })}>Gerenciar Usuários</a>
                <a className={subItemClass('Admin', 'Permissões')} onClick={() => setCurrentView({ name: 'Admin', filter: 'Permissões' })}>Perfis e Permissões</a>
                <a className={subItemClass('Admin', 'Logs')} onClick={() => setCurrentView({ name: 'Admin', filter: 'Logs' })}>Logs de Sistema</a>
                <a className={subItemClass('Admin', 'Config')} onClick={() => setCurrentView({ name: 'Admin', filter: 'Config' })}>Configurações Globais</a>
              </div>
            )}
          </div>
        )}
      </nav>

      <div className="sidebar-footer">
        <button className="btn-yellow" style={{ width: '100%', justifyContent: 'center' }} onClick={handleExport}>
          <FileSpreadsheet size={18} /> Baixar Excel
        </button>
      </div>
    </aside>
  );
}
