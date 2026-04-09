import React, { useRef, useState } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import VideoDirecto from './VideoDirecto';
import CargarImagen from './CargarImagen';
import '../estilos/detectorEstilos.css';

const Detector = () => {
    const webcamRef = useRef(null);
    const [mensaje, setMensaje] = useState("Sistema listo.");
    const [view, setView] = useState('camera'); 
    const [camaraEncendida, setCamaraEncendida] = useState(false);
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [previewImage, setPreviewImage] = useState(null);

    const enviarAlBackend = async (base64) => {
        if (!base64) return;
        setMensaje("Analizando...");
        try {
            const res = await axios.post('http://localhost:8000/reconocer', { img_base64: base64 });
            setMensaje(res.data.mensaje);
        } catch (err) { 
            setMensaje("Error de conexión con el servidor"); 
        }
    };

    return (
        <div className="detector-container">
            {!sidebarOpen && (
                <button onClick={() => setSidebarOpen(true)} className="btn-open">☰</button>
            )}

            <Sidebar 
                view={view} setView={setView} 
                isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(false)} 
            />

            <div className="main-content">
                <div className="content-wrapper">
                    {view === 'camera' ? (
                        <VideoDirecto 
                            camaraEncendida={camaraEncendida} 
                            setCamaraEncendida={setCamaraEncendida}
                            webcamRef={webcamRef}
                            enviarAlBackend={enviarAlBackend}
                        />
                    ) : (
                        <CargarImagen 
                            previewImage={previewImage}
                            setPreviewImage={setPreviewImage}
                            setMensaje={setMensaje}
                            enviarAlBackend={enviarAlBackend}
                        />
                    )}

                    <div className="message-container" style={{marginTop: '20px'}}>
                        <p className="status-text">{mensaje}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Detector;