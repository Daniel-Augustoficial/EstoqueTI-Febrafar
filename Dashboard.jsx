import React from 'react';
import { Monitor, HardDrive, Headphones, Mouse, Keyboard, Smartphone, Activity, CheckCircle, AlertTriangle, PenTool } from 'lucide-react';
import { useInventory } from '../context/InventoryContext';

export function Dashboard() {
  const { products, movements } = useInventory();

  // Statistics calculations
  const totalEquipments = products.length;
  const availableCount = products.filter(p => p.status === 'Disponível').length;
  const inUseCount = products.filter(p => p.status === 'Em uso').length;
  const tempCount = products.filter(p => p.status === 'Empréstimo').length;
  const maintenanceCount = products.filter(p => p.status === 'Manutenção').length;

  const recentMovements = [...movements]
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 10);

  return (
    <div>
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon blue"><Monitor /></div>
          <div className="stat-content">
            <h3>Total Cadastrado</h3>
            <p>{totalEquipments}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><CheckCircle /></div>
          <div className="stat-content">
            <h3>Disponíveis</h3>
            <p>{availableCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><Activity /></div>
          <div className="stat-content">
            <h3>Em Uso</h3>
            <p>{inUseCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><AlertTriangle /></div>
          <div className="stat-content">
            <h3>Empréstimos</h3>
            <p>{tempCount}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon red"><PenTool /></div>
          <div className="stat-content">
            <h3>Em Manutenção</h3>
            <p>{maintenanceCount}</p>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <h2 style={{ fontSize: '1.125rem', fontWeight: 600 }}>Atividades Recentes</h2>
        </div>
        <div className="activity-feed">
          {recentMovements.length === 0 ? (
            <p style={{ color: 'var(--color-text-muted)', textAlign: 'center', padding: '20px' }}>Nenhuma movimentação registrada ainda.</p>
          ) : (
            recentMovements.map(mov => (
              <div key={mov.id} className="activity-item">
                <div className="activity-icon">
                  <Activity size={20} />
                </div>
                <div className="activity-content">
                  <p>
                    <strong>{mov.type}</strong>: Equipamento <strong>{mov.prodName}</strong> (TAG: {mov.serial})
                    {mov.receiver && ` atribuído para ${mov.receiver}`}
                    {mov.requester && ` (Solicitante: ${mov.requester})`}
                    {mov.vendor && ` enviado para ${mov.vendor}`}
                  </p>
                  <small>{new Date(mov.date).toLocaleString('pt-BR')}</small>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
