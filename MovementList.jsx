import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { MovementForm } from './MovementForm';
import { Plus, Trash2 } from 'lucide-react';

export function MovementList({ filter }) {
  const { movements, deleteMovement } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredMovements = (filter && filter !== 'Todos')
    ? movements.filter(m => m.type === filter)
    : movements;

  const displayMovements = [...filteredMovements];

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir o histórico desta movimentação? Isso NÃO reverterá o status do equipamento.')) {
      deleteMovement(id);
    }
  };

  const getDetails = (m) => {
    if (m.type === 'Saída' || m.type === 'Temporário') {
      return (
        <>
          <strong>Recebedor:</strong> {m.receiver} <br/>
          <strong>Solicitante:</strong> {m.requester}
        </>
      );
    }
    if (m.type === 'Manutenção') {
      return (
        <>
          <strong>Fornecedor:</strong> {m.vendor} <br/>
          <strong>Envio:</strong> {m.sentDate ? new Date(m.sentDate).toLocaleDateString('pt-BR') : '-'}
        </>
      );
    }
    return <span style={{ color: 'var(--color-text-muted)' }}>-</span>;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Movimentações {filter && filter !== 'Todos' ? `- ${filter === 'Entrada' ? 'Devoluções' : filter}` : ''}</h2>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Nova Movimentação
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Data</th>
              <th>Tipo</th>
              <th>Equipamento</th>
              <th>Detalhes</th>
              <th>Observação</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayMovements.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: 'center', padding: '30px' }}>Nenhuma movimentação encontrada.</td>
              </tr>
            ) : (
              displayMovements.map(m => (
                <tr key={m.id}>
                  <td>{new Date(m.date).toLocaleDateString('pt-BR')}</td>
                  <td><strong>{m.type}</strong></td>
                  <td>
                    {m.prodName} <br/>
                    <small style={{ color: 'var(--color-text-muted)' }}>TAG: {m.serial}</small>
                  </td>
                  <td>{getDetails(m)}</td>
                  <td style={{ maxWidth: '300px' }}>{m.obs}</td>
                  <td>
                    <button className="btn-icon delete" onClick={() => handleDelete(m.id)} title="Excluir Histórico">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && <MovementForm onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
