import React, { useState } from 'react';
import Login from './Componentes/Login';
import Detector from './Componentes/Detector';

function App() {
  // Empezamos en false para que pida login
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogout = () => {
    sessionStorage.clear(); // Borra los datos volátiles
    setIsAuthenticated(false); // Nos manda de vuelta al Login
  };

  return (
    <div className="App">
      {!isAuthenticated ? (
        <Login onLoginSuccess={() => setIsAuthenticated(true)} />
      ) : (
        // Le pasamos la función al Detector[cite: 2]
        <Detector onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
