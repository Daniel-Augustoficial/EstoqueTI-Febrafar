import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { Dashboard } from './components/Dashboard';
import { EquipmentList } from './components/EquipmentList';
import { MovementList } from './components/MovementList';
import { LoginPage } from './components/LoginPage';
import { AdminUsers, AdminPermissions, AdminLogs, AdminConfig } from './components/AdminViews';
import { AnimatePresence } from 'framer-motion';

function App() {
  const [viewHistory, setViewHistory] = useState([{ name: 'Dashboard', filter: '' }]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loggedUser, setLoggedUser] = useState(null);

  const currentView = viewHistory[viewHistory.length - 1];

  useEffect(() => {
    const loggedIn = sessionStorage.getItem('isAuthenticated');
    const user = sessionStorage.getItem('loggedUser');
    if (loggedIn === 'true' && user) {
      setIsAuthenticated(true);
      setLoggedUser(JSON.parse(user));
    }
  }, []);

  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setLoggedUser(user);
    sessionStorage.setItem('isAuthenticated', 'true');
    sessionStorage.setItem('loggedUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    sessionStorage.removeItem('isAuthenticated');
    sessionStorage.removeItem('loggedUser');
    setIsAuthenticated(false);
    setLoggedUser(null);
    setViewHistory([{ name: 'Dashboard', filter: '' }]);
  };

  const navigateTo = (view) => {
    setViewHistory(prev => [...prev, view]);
    setIsMobileMenuOpen(false);
  };

  const handleBack = () => {
    if (viewHistory.length > 1) {
      setViewHistory(prev => prev.slice(0, -1));
    }
  };

  if (!isAuthenticated) {
    return (
      <AnimatePresence>
        <LoginPage onLogin={handleLogin} />
      </AnimatePresence>
    );
  }

  const renderContent = () => {
    switch (currentView.name) {
      case 'Dashboard':
        return <Dashboard loggedUser={loggedUser} />;
      case 'Equipamentos':
        return <EquipmentList filter={currentView.filter} loggedUser={loggedUser} />;
      case 'Movimentações':
        return <MovementList filter={currentView.filter} loggedUser={loggedUser} />;
      case 'Admin':
        if (currentView.filter === 'Usuários') return <AdminUsers />;
        if (currentView.filter === 'Permissões') return <AdminPermissions />;
        if (currentView.filter === 'Logs') return <AdminLogs />;
        if (currentView.filter === 'Config') return <AdminConfig />;
        return <Dashboard loggedUser={loggedUser} />;
      default:
        return <Dashboard loggedUser={loggedUser} />;
    }
  };

  const getPageTitle = () => {
    if (currentView.name === 'Dashboard') return 'Dashboard';
    if (currentView.filter && currentView.filter !== 'Todos') {
      return `${currentView.name} - ${currentView.filter}`;
    }
    return currentView.name;
  };

  return (
    <div className="app-container">
      {isMobileMenuOpen && (
        <div className="sidebar-overlay show" onClick={() => setIsMobileMenuOpen(false)}></div>
      )}
      <Sidebar
        currentView={currentView}
        setCurrentView={navigateTo}
        isOpen={isMobileMenuOpen}
        loggedUser={loggedUser}
      />
      <div className="main-wrapper">
        <TopBar
          title={getPageTitle()}
          onMenuClick={() => setIsMobileMenuOpen(true)}
          onBack={handleBack}
          showBack={viewHistory.length > 1 && currentView.name !== 'Dashboard'}
          onLogout={handleLogout}
        />
        <main className="main-content">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}

export default App;
