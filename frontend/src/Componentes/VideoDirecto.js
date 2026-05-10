import React from 'react';
import Webcam from "react-webcam";

const VideoDirecto = ({ camaraEncendida, setCamaraEncendida, webcamRef, enviarAlBackend, setArchivoFisico, setPreviewImage }) => {
    
    const capturarYEnviar = async () => {
        if (webcamRef.current) {
            const fotoBase64 = webcamRef.current.getScreenshot();
            
            if (fotoBase64) {
                const res = await fetch(fotoBase64);
                const blob = await res.blob();
                
                const archivo = new File([blob], "captura_webcam.jpg", { type: "image/jpeg" });

                setArchivoFisico(archivo);
                setPreviewImage(fotoBase64); 
                enviarAlBackend(archivo);
            }
        }
    };

    return (
        <div className="view-section">
            <header className="detector-header">
                <h2 className="detector-title">ANÁLISIS EN DIRECTO</h2>
                <button 
                    onClick={() => setCamaraEncendida(!camaraEncendida)}
                    className="btn-toggle"
                    style={{backgroundColor: camaraEncendida ? '#e74c3c' : '#2ecc71'}}
                >
                    {camaraEncendida ? "APAGAR CÁMARA" : "ENCENDER CÁMARA"}
                </button>
            </header>

            <div className="drop-zone">
                {camaraEncendida ? (
                    <Webcam 
                        audio={false} 
                        ref={webcamRef} 
                        screenshotFormat="image/jpeg" 
                        className="img-fit" 
                    />
                ) : (
                    <div className="placeholder-text"><p>Cámara en espera...</p></div>
                )}
            </div>

            <div className="button-group" style={{marginTop: '20px'}}>
                <button 
                    className="btn-primary" 
                    onClick={capturarYEnviar} 
                    disabled={!camaraEncendida}
                >
                    Capturar y Analizar
                </button>
            </div>
        </div>
    );
};

export default VideoDirecto;