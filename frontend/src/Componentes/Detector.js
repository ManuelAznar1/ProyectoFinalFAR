import React, { useRef, useState } from "react";
import axios from "axios";
import Sidebar from "./Sidebar";
import VideoDirecto from "./VideoDirecto";
import CargarImagen from "./CargarImagen";
import Historial from "./Historial";
import Perfil from "./Perfil";
import "../estilos/detectorEstilos.css";

const Detector = ({ onLogout }) => {
  const webcamRef = useRef(null);
  const [previewImage, setPreviewImage] = useState(null); // Añade esta línea si falta
  const [mensaje, setMensaje] = useState("Sistema listo.");
  const [view, setView] = useState("camera");
  const [camaraEncendida, setCamaraEncendida] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageSelected, setImageSelected] = useState(null);

  // Historial volátil: se recupera de sessionStorage
  const [historial, setHistorial] = useState(() => {
    const saved = sessionStorage.getItem("historial_imagenes");
    return saved ? JSON.parse(saved) : [];
  });

  const enviarAlBackend = async (base64) => {
    if (!base64) return;
    setMensaje("Analizando...");
    try {
      const res = await axios.post("http://localhost:8000/reconocer", {
        img_base64: base64,
      });
      const nuevoResultado = res.data.mensaje;

      const nuevoAnalisis = {
        img: base64,
        resultado: nuevoResultado,
        fecha: new Date().toLocaleString(),
      };

      const nuevoHistorial = [nuevoAnalisis, ...historial].slice(0, 20);
      setHistorial(nuevoHistorial);
      // Guardado volátil en la sesión
      sessionStorage.setItem(
        "historial_imagenes",
        JSON.stringify(nuevoHistorial),
      );
      setMensaje(nuevoResultado);
    } catch (err) {
      setMensaje("Error de conexión");
    }
  };

  return (
    <div className="detector-container">
      {/* Modal para ver imágenes del historial en grande */}
      {imageSelected && (
        <div className="modal-overlay" onClick={() => setImageSelected(null)}>
          <div className="modal-content">
            <img src={imageSelected} alt="Zoom" className="img-zoom" />
            <button className="btn-close-modal">✕</button>
          </div>
        </div>
      )}

      {/* Botón para abrir la sidebar si está cerrada */}
      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="btn-open">
          ☰
        </button>
      )}

      {/* Sidebar con navegación y función de cierre de sesión */}
      <Sidebar
        view={view}
        setView={setView}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="main-content">
        <div className="content-wrapper">
          {/* Renderizado condicional de vistas */}
          {view === "camera" && (
            <VideoDirecto
              camaraEncendida={camaraEncendida}
              setCamaraEncendida={setCamaraEncendida}
              webcamRef={webcamRef}
              enviarAlBackend={enviarAlBackend}
            />
          )}

          {view === "upload" && (
            <CargarImagen
              previewImage={previewImage} /* Falta esta prop */
              setPreviewImage={setPreviewImage}
              setMensaje={setMensaje}
              enviarAlBackend={enviarAlBackend}
            />
          )}

          {view === "history" && (
            <Historial
              historial={historial}
              setImageSelected={setImageSelected}
            />
          )}

          {view === "profile" && <Perfil />}

          {/* Mensaje de estado inferior */}
          {view !== "history" && view !== "profile" && (
            <div className="message-container">
              <p className="status-text">{mensaje}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Detector;
