import React from 'react';

const Historial = ({ historial, setHistorial, setImageSelected }) => {
    const borrarHistorial = () => {
        localStorage.removeItem('historial_imagenes');
        setHistorial([]);
    };

    return (
        <div className="view-section">
            <header className="detector-header">
                <h2 className="detector-title">HISTORIAL</h2>
                {historial.length > 0 && <button className="btn-toggle" style={{backgroundColor: '#e74c3c'}} onClick={borrarHistorial}>BORRAR TODO</button>}
            </header>
            <div className="history-grid">
                {historial.map((item, index) => (
                    <div key={index} className="history-item" onDoubleClick={() => setImageSelected(item.img)}>
                        <img src={item.img} alt="Historial" className="img-history" />
                        <div className="history-info">
                            <span className="history-date">{item.fecha}</span>
                            <p className="history-result">{item.resultado}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Historial;