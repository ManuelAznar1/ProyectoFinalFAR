import React, { useRef, useState } from 'react';
import Webcam from "react-webcam";
import axios from 'axios';

const Detector = () => {
    const webcamRef = useRef(null);
    const [mensaje, setMensaje] = useState("Sistema listo");
    const [camaraEncendida, setCamaraEncendida] = useState(false); // Nuevo estado

    const capturarYEnviar = async () => {
        const imagenBase64 = webcamRef.current.getScreenshot();

        if (imagenBase64) {
            setMensaje("Analizando...");
            try {
                const res = await axios.post('http://localhost:8000/reconocer', {
                    img_base64: imagenBase64
                });
                setMensaje(res.data.mensaje);
            } catch (err) {
                setMensaje("Error de conexión");
            }
        }
    };

    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <button 
                onClick={() => setCamaraEncendida(!camaraEncendida)}
                style={{
                    backgroundColor: camaraEncendida ? '#ff4d4d' : '#4CAF50',
                    color: 'white',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    border: 'none',
                    cursor: 'pointer',
                    marginBottom: '20px'
                }}
            >
                {camaraEncendida ? "APAGAR CÁMARA" : "ENCENDER CÁMARA"}
            </button>

            <br />

            {camaraEncendida ? (
                <div>
                    <Webcam
                        audio={false}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        width={480}
                        style={{ borderRadius: '10px', border: '2px solid #333' }}
                    />
                    <br />
                    <button 
                        onClick={capturarYEnviar}
                        style={{ marginTop: '15px', padding: '10px 25px', cursor: 'pointer' }}
                    >
                        ESCANEAR ROSTRO
                    </button>
                </div>
            ) : (
                <div style={{ 
                    width: '480px', 
                    height: '360px', 
                    backgroundColor: '#eee', 
                    margin: '0 auto', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    borderRadius: '10px',
                    border: '2px dashed #ccc'
                }}>
                    <p>La cámara está desactivada</p>
                </div>
            )}

            <p style={{ fontWeight: 'bold', color: '#007bff', marginTop: '15px' }}>{mensaje}</p>
        </div>
    );
};

export default Detector;