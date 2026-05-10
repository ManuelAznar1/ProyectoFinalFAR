import React, { useRef } from 'react';

const CargarImagen = ({ previewImage, setPreviewImage, setMensaje, enviarAlBackend, setArchivoFisico }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setArchivoFisico(file); 

            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result); 
                setMensaje("Imagen cargada. Lista para el servidor.");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="view-section">
            <header className="detector-header">
                <h2 className="detector-title">ANÁLISIS DE IMAGEN ESTÁTICA</h2>
            </header>

            <div className="drop-zone">
                {previewImage ? (
                    <img src={previewImage} alt="Preview" className="img-fit" />
                ) : (
                    <div className="placeholder-text">
                        <p>Arrastra una foto o usa el botón</p>
                    </div>
                )}
            </div>

            <div className="button-group" style={{marginTop: '20px'}}>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{display: 'none'}} 
                    onChange={handleFileChange} 
                    accept="image/png, image/jpeg" 
                />
                
                <button className="btn-secondary" onClick={() => fileInputRef.current.click()}>
                    Seleccionar Archivo
                </button>
                
                <button className="btn-primary" onClick={() => enviarAlBackend()}disabled={!previewImage}>
                    Subir al Servidor FAR
                </button>

                {previewImage && (
                    <button className="btn-secondary" onClick={() => {
                        setPreviewImage(null); 
                        setArchivoFisico(null);
                        setMensaje("Sistema listo.");
                    }}>
                        Quitar
                    </button>
                )}
            </div>
        </div>
    );
};

export default CargarImagen;