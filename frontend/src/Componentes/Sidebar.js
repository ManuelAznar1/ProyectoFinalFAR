import React from "react";
import "../estilos/sidebar.css";

const Sidebar = ({ view, setView, isOpen, toggleSidebar, onLogout }) => {
  if (!isOpen) return null;

  return (
    <div className="sidebar">
      <div className="header-sidebar">
        <div className="logo">💎 FAR SYSTEM</div>
        <button onClick={toggleSidebar} className="btn-close">
          ✕
        </button>
      </div>

      <div className="divider" />

      {/* --- Secciones de navegación superiores --- */}
      <div
        className={view === "camera" ? "menu-item-active" : "menu-item"}
        onClick={() => setView("camera")}
      >
        🎥 Video en directo <span>❯</span>
      </div>

      <div
        className={view === "upload" ? "menu-item-active" : "menu-item"}
        onClick={() => setView("upload")}
      >
        📤 Cargar Imagen <span>❯</span>
      </div>

      <div
        className={view === "history" ? "menu-item-active" : "menu-item"}
        onClick={() => setView("history")}
      >
        📁 Historial <span>❯</span>
      </div>

      {/* --- Secciones inferiores (Perfil y Salir) --- */}
      <div className="bottom-menu" style={{ marginTop: 'auto' }}>
        {/* Perfil justo encima de cerrar sesión */}
        <div
          className={view === "profile" ? "menu-item-active" : "menu-item"}
          onClick={() => setView("profile")}
        >
          👤 Mi Perfil <span>❯</span>
        </div>

        {/* Botón de Cerrar Sesión al final de todo */}
        <div
          className="menu-item"
          onClick={onLogout}
          style={{ color: '#e74c3c' }} 
        >
          🚪 Cerrar Sesión <span>❯</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
