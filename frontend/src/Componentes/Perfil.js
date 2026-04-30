import React from 'react';
import '../estilos/perfil.css';

const Perfil = () => {
    // Recuperamos los datos guardados al iniciar sesión
    const usuario = JSON.parse(sessionStorage.getItem('usuario_actual'));

    if (!usuario) return <p>No hay datos de usuario.</p>;

    return (
        <div className="perfil-container">
            <h2 className="section-title">MI PERFIL</h2>
            <div className="perfil-card">
                <div className="avatar-circle">
                    {usuario.user.charAt(0).toUpperCase()}
                </div>
                <div className="perfil-info">
                    <label>Nombre de Usuario</label>
                    <p>{usuario.user}</p>
                    
                    <div className="divider" />
                    
                    <label>Correo Electrónico</label>
                    <p>{usuario.email}</p>
                </div>
            </div>
        </div>
    );
};

export default Perfil;