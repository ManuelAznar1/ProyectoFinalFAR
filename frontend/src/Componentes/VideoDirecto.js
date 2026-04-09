import React from 'react';
import Webcam from "react-webcam";

const VideoDirecto = ({ camaraEncendida, setCamaraEncendida, webcamRef, enviarAlBackend }) => {
    
    const capturarYEnviar = () => {
        if (webcamRef.current) {
            const foto = webcamRef.current.getScreenshot();
            enviarAlBackend(foto);
        }
    };

    return (
        <div className="view-section">
            <header className="detector-header">
                <h2 className="detector-title">LIVE VIDEO ANALYSIS</h2>
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
                    <Webcam audio={false} ref={webcamRef} screenshotFormat="image/jpeg" className="img-fit" />
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
                    Escanear ahora
                </button>
            </div>
        </div>
    );
};

export default VideoDirecto;