import React, { useState } from 'react';
import { useInventory } from '../context/InventoryContext';
import { X } from 'lucide-react';

const MOVEMENT_TYPES = ['Entrada', 'Saída', 'Temporário', 'Manutenção'];

export function MovementForm({ onClose }) {
  const { products, addMovement } = useInventory();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'Saída',
    prodId: '',
    requester: '',
    receiver: '',
    deliveryDate: '',
    vendor: '',
    sentDate: '',
    returnDate: '',
    obs: ''
  });

  const availableProducts = products;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const selectedProduct = products.find(p => p.id === formData.prodId);
    if (!selectedProduct) return;

    const newMovement = {
      ...formData,
      prodCollab: selectedProduct.collab,
      serial: selectedProduct.serial
    };

    addMovement(newMovement);
    onClose();
  };

  const isExitOrTemp = formData.type === 'Saída' || formData.type === 'Temporário';
  const isMaintenance = formData.type === 'Manutenção';

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>Nova Movimentação</h2>
          <button className="btn-icon" type="button" onClick={onClose}><X size={24} /></button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="modal-body">
            <div className="form-grid">
              
              <div className="form-group">
                <label className="form-label">Data da Movimentação *</label>
                <input required type="date" className="form-input" name="date" value={formData.date} onChange={handleChange} />
              </div>

              <div className="form-group">
                <label className="form-label">Tipo de Movimentação *</label>
                <select required className="form-select" name="type" value={formData.type} onChange={handleChange}>
                  {MOVEMENT_TYPES.map(type => (
                    <option key={type} value={type}>{type === 'Entrada' ? 'Entrada (Devolução)' : type}</option>
                  ))}
                </select>
              </div>



              <div className="form-group">
                <label className="form-label">Equipamento *</label>
                <select 
                  required 
                  className="form-select" 
                  name="prodId" 
                  value={formData.prodId} 
                  onChange={handleChange}
                >
                  <option value="">Selecione o equipamento...</option>
                  {availableProducts.map(p => (
                    <option key={p.id} value={p.id}>
                      TAG: {p.serial} - Colab: {p.collab || 'Nenhum'} ({p.status})
                    </option>
                  ))}
                </select>
              </div>

              {isExitOrTemp && (
                <>
                  <div className="form-group">
                    <label className="form-label">Solicitante *</label>
                    <input required type="text" className="form-input" name="requester" value={formData.requester} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Recebedor *</label>
                    <input required type="text" className="form-input" name="receiver" value={formData.receiver} onChange={handleChange} />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Data de Entrega *</label>
                    <input required type="date" className="form-input" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} />
                  </div>
                  {formData.type === 'Temporário' && (
                    <div className="form-group">
                      <label className="form-label">Previsão de Devolução</label>
                      <input type="date" className="form-input" name="returnDate" value={formData.returnDate} onChange={handleChange} />
                    </div>
                  )}
                </>
              )}

              {isMaintenance && (
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

              <div className="form-group full">
                <label className="form-label">Observação / Motivo *</label>
                <textarea 
                  required 
                  className="form-textarea" 
                  name="obs" 
                  value={formData.obs} 
                  onChange={handleChange}
                  placeholder="Detalhes adicionais da movimentação..."
                ></textarea>
              </div>

            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-outline" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Salvar Movimentação</button>
          </div>
        </form>
      </div>
    </div>
  );
}
