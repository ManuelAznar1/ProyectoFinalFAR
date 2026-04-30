import React, { useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import VideoDirecto from './VideoDirecto';
import CargarImagen from './CargarImagen';
import Historial from './Historial';
import '../estilos/detectorEstilos.css';

const Detector = ({onLogout}) => {
    const webcamRef = useRef(null);
    const [mensaje, setMensaje] = useState("Sistema listo.");
    const [view, setView] = useState('camera'); 
    const [camaraEncendida, setCamaraEncendida] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);
    const [imageSelected, setImageSelected] = useState(null);
    
    const [historial, setHistorial] = useState(() => {
        const saved = localStorage.getItem('historial_imagenes');
        return saved ? JSON.parse(saved) : [];
    });

    const enviarAlBackend = async (base64) => {
        if (!base64) return;
        setMensaje("Analizando...");
        try {
            const res = await axios.post('http://localhost:8000/reconocer', { img_base64: base64 });
            const nuevoResultado = res.data.mensaje;
            setMensaje(nuevoResultado);

            const nuevoAnalisis = {
                img: base64,
                resultado: nuevoResultado,
                fecha: new Date().toLocaleString()
            };
            const nuevoHistorial = [nuevoAnalisis, ...historial].slice(0, 20);
            setHistorial(nuevoHistorial);
            localStorage.setItem('historial_imagenes', JSON.stringify(nuevoHistorial));
        } catch (err) { 
            setMensaje("Error de conexión"); 
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

            {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="btn-open">☰</button>}

            <Sidebar view={view} setView={setView} isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} onLogout={onLogout}/>

            <div className="main-content">
                <div className="content-wrapper">
                    {view === 'camera' && (
                        <VideoDirecto 
                            camaraEncendida={camaraEncendida} setCamaraEncendida={setCamaraEncendida}
                            webcamRef={webcamRef} enviarAlBackend={enviarAlBackend}
                        />
                    )}
                    {view === 'upload' && (
                        <CargarImagen 
                            previewImage={previewImage} setPreviewImage={setPreviewImage}
                            setMensaje={setMensaje} enviarAlBackend={enviarAlBackend}
                        />
                    )}
                    {view === 'history' && (
                        <Historial historial={historial} setHistorial={setHistorial} setImageSelected={setImageSelected} />
                    )}

                    {view !== 'history' && (
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