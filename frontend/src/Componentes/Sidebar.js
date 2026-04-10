import React from "react";
import "../estilos/sidebar.css";

const Sidebar = ({ view, setView, isOpen, toggleSidebar }) => {
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
    </div>
  );
};

export default Sidebar;
