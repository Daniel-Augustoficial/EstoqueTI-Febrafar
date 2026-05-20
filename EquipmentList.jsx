import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { EquipmentForm } from './EquipmentForm';
import { Edit2, Trash2, Plus } from 'lucide-react';

export function EquipmentList({ filter }) {
  const { products, deleteProduct } = useInventory();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEquipment, setEditingEquipment] = useState(null);

  let filteredProducts = products;
  
  if (filter === 'Descartados') {
    filteredProducts = products.filter(p => p.status === 'Descartado');
  } else if (filter && filter !== 'Todos' && filter !== 'Estoque Geral') {
    filteredProducts = products.filter(p => (p.category === filter || p.dept === filter) && p.status !== 'Descartado');
  } else {
    filteredProducts = products.filter(p => p.status !== 'Descartado');
  }

  // Render front to back (recent first)
  const displayProducts = [...filteredProducts].reverse();

  const handleEdit = (product) => {
    setEditingEquipment(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este equipamento? Esta ação não pode ser desfeita.')) {
      deleteProduct(id);
    }
  };

  const handleNew = () => {
    setEditingEquipment(null);
    setIsModalOpen(true);
  };

  const calculateAge = (dateString) => {
    if (!dateString) return '-';
    const start = new Date(dateString);
    const end = new Date();
    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();
    if (months < 0) {
      years--;
      months += 12;
    }
    if (years === 0 && months === 0) return 'Novo';
    if (years === 0) return `${months}m`;
    if (months === 0) return `${years}a`;
    return `${years}a ${months}m`;
  };

  const getStatusBadge = (status) => {
    let badgeClass = 'badge ';
    switch (status) {
      case 'Disponível': badgeClass += 'success'; break;
      case 'Em uso': badgeClass += 'info'; break;
      case 'Empréstimo': badgeClass += 'temp'; break;
      case 'Manutenção': badgeClass += 'danger'; break;
      case 'Descartado': badgeClass += 'alert'; break;
      default: break;
    }
    return <span className={badgeClass}>{status}</span>;
  };

  const getCurrentInfo = (p) => {
    if (p.status === 'Em uso' || p.status === 'Empréstimo') {
      return (
        <span style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)' }}>
          Entregue: {p.deliveryDate ? new Date(p.deliveryDate).toLocaleDateString('pt-BR') : '-'}
        </span>
      );
    }
    if (p.status === 'Manutenção') {
      return (
        <>
          <strong>{p.vendor}</strong>
          <br/>
          <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
            Enviado: {p.sentDate ? new Date(p.sentDate).toLocaleDateString('pt-BR') : '-'}
          </span>
        </>
      );
    }
    return <span style={{ color: 'var(--color-text-muted)' }}>-</span>;
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2>Equipamentos {filter && filter !== 'Todos' ? `- ${filter}` : ''}</h2>
        <button className="btn-primary" onClick={handleNew}>
          <Plus size={20} /> Novo Equipamento
        </button>
      </div>
      
      <div className="table-container">
        <table>
          <thead>
            <tr>
              {(filter === 'Todos' || filter === 'Descartados') && <th>Equipamento</th>}
              <th>TAG</th>
              {filter !== 'Descartados' && <th>Colaborador</th>}
              {filter !== 'Descartados' && <th>Departamento</th>}
              {filter === 'Headset' && <th>Modelo</th>}
              <th>Info. Atual / Obs</th>
              <th>Status</th>
              <th>Idade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {displayProducts.length === 0 ? (
              <tr>
                <td 
                  colSpan={5 + (filter !== 'Descartados' ? 2 : 0) + ((filter === 'Todos' || filter === 'Descartados') ? 1 : 0) + (filter === 'Headset' ? 1 : 0)} 
                  style={{ textAlign: 'center', padding: '30px' }}
                >
                  Nenhum equipamento encontrado.
                </td>
              </tr>
            ) : (
              displayProducts.map(p => (
                <tr key={p.id}>
                  {(filter === 'Todos' || filter === 'Descartados') && <td>{p.category || '-'}</td>}
                  <td style={{ fontWeight: 500 }}>{p.serial}</td>
                  {filter !== 'Descartados' && <td>{p.collab || '-'}</td>}
                  {filter !== 'Descartados' && <td>{p.dept || '-'}</td>}
                  {filter === 'Headset' && <td>{p.model || '-'}</td>}
                  <td>{getCurrentInfo(p)}</td>
                  <td>{getStatusBadge(p.status)}</td>
                  <td>{calculateAge(p.date)}</td>
                  <td>
                    <div className="actions-cell">
                      <button className="btn-icon" onClick={() => handleEdit(p)} title="Editar">
                        <Edit2 size={18} />
                      </button>
                      <button className="btn-icon delete" onClick={() => handleDelete(p.id)} title="Excluir">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <EquipmentForm 
          equipment={editingEquipment} 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
}
