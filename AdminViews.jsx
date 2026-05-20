import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Save, ShieldAlert, FileText, Settings } from 'lucide-react';

export function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', password: '', role: 'Técnico' });

  useEffect(() => {
    const saved = localStorage.getItem('ti_users');
    if (saved) {
      setUsers(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    const newUsers = [...users, { ...formData, id: Date.now().toString() }];
    setUsers(newUsers);
    localStorage.setItem('ti_users', JSON.stringify(newUsers));
    setIsModalOpen(false);
    setFormData({ name: '', email: '', password: '', role: 'Técnico' });
  };

  const handleDelete = (id) => {
    if(confirm('Tem certeza que deseja remover este usuário?')) {
      const newUsers = users.filter(u => u.id !== id);
      setUsers(newUsers);
      localStorage.setItem('ti_users', JSON.stringify(newUsers));
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold">Gerenciar Usuários</h2>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary">
          <Plus size={18} /> Novo Usuário
        </button>
      </div>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Nome</th>
              <th>E-mail/Usuário</th>
              <th>Nível de Acesso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user.id || idx}>
                <td className="font-medium">{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <span className={`badge ${user.role === 'Admin' ? 'alert' : 'info'}`}>
                    {user.role}
                  </span>
                </td>
                <td>
                  <div className="actions-cell">
                    <button className="btn-icon delete" onClick={() => handleDelete(user.id)} title="Excluir">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {users.length === 0 && (
              <tr><td colSpan="4" className="text-center py-8">Nenhum usuário encontrado.</td></tr>
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3 className="text-lg font-bold">Novo Usuário</h3>
              <button onClick={() => setIsModalOpen(false)} className="btn-icon"><X size={20} /></button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body">
                <div className="form-grid">
                  <div className="form-group full">
                    <label className="form-label">Nome Completo</label>
                    <input required type="text" className="form-input" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Ex: João Silva" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">E-mail ou Usuário</label>
                    <input required type="text" className="form-input" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} placeholder="joao.silva" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Senha</label>
                    <input required type="password" className="form-input" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} placeholder="••••••" />
                  </div>
                  <div className="form-group full">
                    <label className="form-label">Nível de Acesso</label>
                    <select className="form-select" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})}>
                      <option value="Técnico">Técnico</option>
                      <option value="Admin">Administrador</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancelar</button>
                <button type="submit" className="btn-primary"><Save size={18}/> Salvar Usuário</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export function AdminPermissions() {
  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-6">
        <ShieldAlert size={28} className="text-[#F8C300]" />
        <h2 className="text-xl font-bold">Perfis e Permissões</h2>
      </div>
      <p className="mb-6 text-[var(--color-text-muted)]">O sistema possui dois perfis de acesso predefinidos. Abaixo as diretrizes de cada perfil:</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 border border-[var(--color-border)] rounded-xl bg-[var(--color-table-stripe)]">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><span className="badge alert">Admin</span></h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-text-main)]">
            <li>Acesso total ao sistema.</li>
            <li>Visualiza, cria, edita e exclui equipamentos e movimentações.</li>
            <li>Acesso ao Painel Admin para criar/excluir usuários.</li>
            <li>Acesso aos Logs de Sistema e Configurações Globais.</li>
          </ul>
        </div>
        <div className="p-6 border border-[var(--color-border)] rounded-xl bg-[var(--color-table-stripe)]">
          <h3 className="text-lg font-bold mb-3 flex items-center gap-2"><span className="badge info">Técnico</span></h3>
          <ul className="list-disc list-inside space-y-2 text-sm text-[var(--color-text-main)]">
            <li>Acesso apenas ao Dashboard, Equipamentos e Movimentações.</li>
            <li>Pode visualizar, criar e editar registros do estoque.</li>
            <li><strong>Não pode</strong> excluir históricos de movimentações.</li>
            <li><strong>Não pode</strong> acessar o Painel Admin.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export function AdminLogs() {
  return (
    <div className="card">
      <div className="card-header">
        <h2 className="text-xl font-bold flex items-center gap-2"><FileText size={20} /> Logs de Sistema</h2>
      </div>
      <div className="table-container">
        <table>
          <thead>
            <tr><th>Data/Hora</th><th>Usuário</th><th>Ação</th></tr>
          </thead>
          <tbody>
            <tr>
              <td>{new Date().toLocaleString()}</td>
              <td>admin</td>
              <td>Acessou o sistema</td>
            </tr>
            <tr>
              <td>{new Date(Date.now() - 3600000).toLocaleString()}</td>
              <td>João Técnico</td>
              <td>Registrou entrada de Notebook (NTB-001)</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminConfig() {
  return (
    <div className="card p-8">
      <div className="flex items-center gap-3 mb-6">
        <Settings size={28} className="text-[#F8C300]" />
        <h2 className="text-xl font-bold">Configurações Globais</h2>
      </div>
      
      <div className="form-grid max-w-2xl">
        <div className="form-group full">
          <label className="form-label">Nome da Empresa</label>
          <input type="text" className="form-input" defaultValue="FEBRAFAR" />
        </div>
        <div className="form-group full mt-6 pt-6 border-t border-[var(--color-border)]">
          <h3 className="text-red-500 font-bold mb-2">Zona de Perigo</h3>
          <p className="text-sm text-[var(--color-text-muted)] mb-4">Ações abaixo não podem ser desfeitas.</p>
          <button className="btn-danger w-max" onClick={() => alert('Recurso bloqueado por segurança.')}>
            Limpar Todo o Banco de Dados
          </button>
        </div>
      </div>
    </div>
  );
}
