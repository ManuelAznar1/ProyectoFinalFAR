import React, { useRef } from 'react';

const CargarImagen = ({ previewImage, setPreviewImage, setMensaje, enviarAlBackend }) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
                setMensaje("Imagen cargada con éxito.");
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="view-section">
            <header className="detector-header">
                <h2 className="detector-title">STATIC IMAGE ANALYSIS</h2>
            </header>

            <div className="drop-zone">
                {previewImage ? (
                    <img src={previewImage} alt="Preview" className="img-fit" />
                ) : (
                    <div className="placeholder-text">
                        <p>No hay imagen seleccionada</p>
                    </div>
                )}
            </div>

            <div className="button-group" style={{marginTop: '20px'}}>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    style={{display: 'none'}} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                />
                <button className="btn-secondary" onClick={() => fileInputRef.current.click()}>
                    Buscar Archivo
                </button>
                
                <button 
                    className="btn-primary" 
                    onClick={() => enviarAlBackend(previewImage)}
                    disabled={!previewImage}
                >
                    Analizar Imagen
                </button>

                {previewImage && (
                    <button className="btn-secondary" onClick={() => {setPreviewImage(null); setMensaje("Sistema listo.");}}>
                        Quitar
                    </button>
                )}
            </div>
        </div>
    );
};

export default CargarImagen;