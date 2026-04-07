// src/App.js
import React from 'react';
import Detector from './Componentes/Detector';

function App() {
  return (
    <div style={{ textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ backgroundColor: '#282c34', padding: '20px', color: 'white' }}>
        <h1>Sistema de Reconocimiento Facial</h1>
      </header>
      
      <main style={{ marginTop: '40px' }}>
        <Detector />
      </main>

      <footer style={{ marginTop: '50px', color: '#888' }}>
        <p>Proyecto IA - Python + React</p>
      </footer>
    </div>
  );
}

export default App;