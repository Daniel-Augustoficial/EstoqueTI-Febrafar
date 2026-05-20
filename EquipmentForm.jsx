import React, { useState, useEffect } from 'react';
import { useInventory } from '../context/InventoryContext';
import { X } from 'lucide-react';

const STATUSES = ['Disponível', 'Em uso', 'Empréstimo', 'Descartado'];

export function EquipmentForm({ onClose, equipment = null }) {
  const { addProduct, updateProduct } = useInventory();
  const isEditing = !!equipment;

  const [isVacant, setIsVacant] = useState(() => {
    if (equipment) {
      return !equipment.collab || equipment.collab === '-' || equipment.collab.toLowerCase() === 'vago';
    }
    return true; // Default para novo equipamento
  });

  const [formData, setFormData] = useState({
    serial: '',
    status: 'Disponível',
    date: new Date().toISOString().split('T')[0], // Aquisição
    collab: 'Vago',
    dept: 'Estoque TI',
    category: 'Headset',
    model: '',
    deliveryDate: '',
    vendor: '',
    sentDate: '',
    returnDate: ''
  });

  useEffect(() => {
    if (equipment) {
      setFormData(equipment);
      const isCollabVacant = !equipment.collab || equipment.collab === '-' || equipment.collab.toLowerCase() === 'vago';
      setIsVacant(isCollabVacant);
    }
  }, [equipment]);

  const handleVacantToggle = (vacant) => {
    setIsVacant(vacant);
    if (vacant) {
      setFormData(prev => ({ ...prev, collab: 'Vago' }));
    } else {
      setFormData(prev => ({
        ...prev,
        collab: (prev.collab === 'Vago' || prev.collab === '-') ? '' : prev.collab
      }));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'status') {
      if (value === 'Disponível') {
        setIsVacant(true);
        setFormData(prev => ({ ...prev, status: value, collab: 'Vago' }));
        return;
      } else if (value === 'Em uso' || value === 'Empréstimo') {
        setIsVacant(false);
        setFormData(prev => ({
          ...prev,
          status: value,
          collab: (prev.collab === 'Vago' || prev.collab === '-') ? '' : prev.collab
        }));
        return;
      }
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEditing) {
      updateProduct(formData);
    } else {
      addProduct(formData);
    }
    onClose();
  };

  const showUsageFields = formData.status === 'Em uso' || formData.status === 'Empréstimo';
  const showMaintenanceFields = formData.status === 'Manutenção';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>{isEditing ? 'Editar Equipamento' : 'Novo Equipamento'}</h2>
          <button className="btn-icon" onClick={onClose}><X size={24} /></button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">

              <div className="form-group full">
                <label className="form-label">Vínculo do Equipamento</label>
                <div className="flex items-center gap-2 bg-gray-800/40 p-1 rounded-lg border border-gray-700/50 w-fit">
                  <button
                    type="button"
                    onClick={() => handleVacantToggle(true)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isVacant
                      ? 'bg-amber-500 text-gray-900 shadow-md shadow-amber-500/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      }`}
                  >
                    Vago
                  </button>
                  <button
                    type="button"
                    onClick={() => handleVacantToggle(false)}
                    className={`px-6 py-2 rounded-md text-sm font-medium transition-all duration-300 ${!isVacant
                      ? 'bg-amber-500 text-gray-900 shadow-md shadow-amber-500/20'
                      : 'text-gray-400 hover:text-gray-200 hover:bg-gray-700/50'
                      }`}
                  >
                    Usuário
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Nome do Colaborador {!isVacant && '*'}</label>
                {isVacant ? (
                  <input
                    type="text"
                    className="form-input opacity-40 cursor-not-allowed bg-gray-800/50 border-gray-700 text-gray-500"
                    value="Nenhum usuário - Vago"
                    disabled
                  />
                ) : (
                  <input
                    required
                    type="text"
                    className="form-input transition-all duration-300 focus:ring-2 focus:ring-amber-500/50"
                    name="collab"
                    value={formData.collab}
                    onChange={handleChange}
                    placeholder="Digite o nome do colaborador"
                  />
                )}
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Equipamento *</label>
                <select required className="form-select" name="category" value={formData.category || 'Headset'} onChange={handleChange}>
                  <option value="Headset">Headset</option>
                  <option value="Mouse">Mouse</option>
                  <option value="Teclado">Teclado</option>
                  <option value="Kit Teclado e Mouse">Kit Teclado e Mouse</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Modelo</label>
                <input type="text" className="form-input" name="model" value={formData.model || ''} onChange={handleChange} placeholder="Digite o modelo" />
              </div>

              <div className="form-group">
                <label className="form-label">Departamento *</label>
                <select required className="form-select" name="dept" value={formData.dept} onChange={handleChange}>
                  <option value="Estoque TI">Estoque TI</option>
                  <option value="Administrativo">Administrativo</option>
                  <option value="Comercial">Comercial</option>
                  <option value="Financeiro">Financeiro</option>
                  <option value="RH">RH</option>
                  <option value="TI">TI</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Operações">Operações</option>
                  <option value="Outro">Outro</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label">Data de Aquisição *</label>
                <input required type="date" className="form-input" name="date" value={formData.date} onChange={handleChange} />
              </div>

              <div className="form-group full">
                <label className="form-label">Status *</label>
                <select required className="form-select" name="status" value={formData.status} onChange={handleChange}>
                  {STATUSES.map(status => <option key={status} value={status}>{status}</option>)}
                </select>
              </div>

              {showUsageFields && (
                <>

                  <div className="form-group">
                    <label className="form-label">Data de Entrega *</label>
                    <input required type="date" className="form-input" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} />
                  </div>
                </>
              )}

              {showMaintenanceFields && (
                <>
                  <div className="form-group">
                    <label className="form-label">Fornecedor *</label>
                    <input required type="text" className="form-input" name="vendor" value={formData.vendor} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Data de Envio *</label>
                    <input required type="date" className="form-input" name="sentDate" value={formData.sentDate} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Previsão de Retorno</label>
                    <input type="date" className="form-input" name="returnDate" value={formData.returnDate} onChange={handleChange} />
                  </div>
                </>
              )}

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
