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
  const [camaraEncendida, setCamaraEncendida] = useState(false);
  const [previewImage, setPreviewImage] = useState(null); 
  const [archivoFisico, setArchivoFisico] = useState(null); 
  const [mensaje, setMensaje] = useState("Sistema listo.");
  const [view, setView] = useState("camera");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [imageSelected, setImageSelected] = useState(null);

  const [historial, setHistorial] = useState(() => {
    const saved = sessionStorage.getItem("historial_imagenes");
    return saved ? JSON.parse(saved) : [];
  });

  const enviarAlBackend = async (archivoManual = null) => { 
      const archivoParaSubir = archivoManual || archivoFisico;

      if (!archivoParaSubir) {
        setMensaje("No hay imagen que enviar.");
        return;
      }

      setMensaje("Enviando captura al servidor FAR...");

      try {
        const formData = new FormData();
        formData.append("foto", archivoParaSubir); 

        const res = await axios.post("http://localhost:8000/api/capturas", formData);

        const nuevaCaptura = {
          img: res.data.url, 
          resultado: res.data.message,
          fecha: new Date().toLocaleString(),
        };

        setHistorial([nuevaCaptura, ...historial]);
        setMensaje("¡Guardado en base de datos!");
        
      } catch (err) {
        console.error(err);
        setMensaje("Error de conexión con Laravel");
      }
  };

  return (
    <div className="detector-container">
      {imageSelected && (
        <div className="modal-overlay" onClick={() => setImageSelected(null)}>
          <div className="modal-content">
            <img src={imageSelected} alt="Zoom" className="img-zoom" />
            <button className="btn-close-modal">✕</button>
          </div>
        </div>
      )}

      {!sidebarOpen && (
        <button onClick={() => setSidebarOpen(true)} className="btn-open">☰</button>
      )}

      <Sidebar
        view={view}
        setView={setView}
        isOpen={sidebarOpen}
        toggleSidebar={() => setSidebarOpen(false)}
        onLogout={onLogout}
      />

      <div className="main-content">
        <div className="content-wrapper">
          {view === "camera" && (
            <VideoDirecto
              camaraEncendida={camaraEncendida}
              setCamaraEncendida={setCamaraEncendida}
              webcamRef={webcamRef}
              enviarAlBackend={enviarAlBackend}
              setArchivoFisico={setArchivoFisico} 
              setPreviewImage={setPreviewImage}
            />
          )}

          {view === "upload" && (
            <CargarImagen
              previewImage={previewImage}
              setPreviewImage={setPreviewImage}
              setArchivoFisico={setArchivoFisico} 
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